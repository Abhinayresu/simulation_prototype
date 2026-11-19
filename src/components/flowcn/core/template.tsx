/**
 * A component's template: its whole structure, written as its slots — the
 * `structure` given to `defineComponent`, the root written as itself.
 *
 * ```tsx
 * defineComponent({
 *   styles,
 *   structure: (
 *     <Accordion>
 *       <AccordionItem repeatable>
 *         <AccordionHeader>
 *           <AccordionTrigger>
 *             <AccordionTriggerText>
 *               <Children />
 *             </AccordionTriggerText>
 *             <AccordionTriggerIcon />
 *           </AccordionTrigger>
 *         </AccordionHeader>
 *         …
 *       </AccordionItem>
 *     </Accordion>
 *   ),
 * });
 * ```
 *
 * The template is the whole tree, nested as the DOM is, and it is where each
 * part's place is known — no part names an owner. Every part belongs to the
 * component, once per time a repeatable part is written: an instance writes
 * it anywhere inside, nested or bare, and it is found by identity. Props on a
 * template slot are its wiring.
 *
 *  - Loose content goes to the nearest `<Children />` below where it was
 *    written: text in `<AccordionTrigger>` to its text, text in the item to
 *    its content. A part whose only child is `<Children />` is there only
 *    when there is content for it; `<Children>Next</Children>` is a default
 *    the content replaces. With no `<Children />` below, content replaces the
 *    part's own defaults, and `{null}` empties it. Loose content goes to its
 *    `<Children />` whatever its order among the parts written beside it.
 *  - A part that is off by default (`present: false` in the root's `base`)
 *    comes on when the instance writes it or anything inside it:
 *    `<DialogTitle>` alone brings its header. `<DialogTitle>{undefined}</DialogTitle>`
 *    — an optional value that was not there — does not.
 *  - A part written inside content that is not a part — the instance's own
 *    `<div>`, or another component such as a tooltip — stays where it was
 *    written, styled and wired, and that content takes the part's place: a
 *    header row around a collapsible's trigger stays above its panel. With
 *    several parts inside, it takes the first one's place. A part returned
 *    by a component of the author's own is not seen: write it out.
 *  - A `repeatable` part may be written any number of times, none included,
 *    and is rendered once per time, each with its own parts inside, where the
 *    instance wrote it. Repeatable parts side by side are one sequence in the
 *    order the instance wrote them — a separator, two texts, a separator —
 *    and anything else written beside them keeps its place among them. One
 *    written inside another — an item in a group — renders from its own
 *    declaration, where it was written, and so does one written inside
 *    content that is not a part: a wrapper (`<ul><li>`), or another
 *    component. Another instance of the component, or an element drawn as
 *    one, keeps what is written in it. A part written inside a part that
 *    declares variants sees that part's values. Each one's place is among the
 *    parts of its kind written in the same scope, wherever in it: beside each
 *    other, in a wrapper, or inside another part.
 *  - Content is written out, never given as a render function: map the data
 *    to elements.
 *  - The root's `props` may name a `<Children />` — `Children` for an unnamed
 *    one, or the slot's `name`: those props go to each element written there
 *    that declares them as variants, and to nothing deeper. A button group
 *    tells the controls it holds `inButtonGroup`.
 *  - A part's classes are its entry in the root's styles, under its own name.
 *    Variants set on the root choose classes for every part, and props — an
 *    icon, whether a part is present — from the root's `props`. A part may
 *    declare variants too: set where it is written, they choose for that part
 *    and the parts inside it, over the values around it — a destructive menu
 *    item colours its own icon, and the item beside it stays as it was.
 */

import {
  cloneElement,
  createElement,
  isValidElement,
  type Key,
  type ReactElement,
  type ReactNode,
} from "react";

import { after } from "./cn.ts";
import {
  defaultsOf,
  fillOf,
  flattenChildren,
  type Keyed,
  keyed,
  keyedChildren,
  mergeProps,
  remember,
  slotMetaOf,
  type PartProps,
  type SlotMeta,
  type Styles,
  valuesKey,
} from "./slots.tsx";

const CHILDREN = Symbol.for("flowcn.template.children");

/**
 * Where a part puts the instance's loose content among its own parts. What it
 * holds is the default, shown until the instance writes content.
 */
export const Children = Object.assign(
  (_props: { name?: string; children?: ReactNode }): ReactNode => null,
  {
    [CHILDREN]: true,
  },
);

const isChildren = (node: ReactNode): boolean =>
  isValidElement(node) && node.type === Children;

/** How the root's props address a `<Children />`: by its `name`, or as `Children`. */
const slotOf = (node: ReactNode): string =>
  (node as ReactElement<{ name?: string }>).props.name ?? "Children";

type Template = ReactElement<
  Record<string, unknown> & { children?: ReactNode }
>;

/** A part is its slot component; the root is the scope of everything outside a repeatable part. */
type Part = unknown;

type Shape = {
  readonly root: Part;
  /** The component's name, which a part's name starts with. */
  readonly name: string;
  readonly styles?: Styles;
  readonly partProps?: PartProps;
  /** The variant values in force: the root's, and those of the parts around. */
  readonly values: Readonly<Record<string, unknown>>;
  /** Each part's classes, for the variant values in force. */
  readonly sheet?: ReturnType<Styles>;
  /** The sheet's classes as read, by part name, kept with the sheet. */
  readonly classes?: Map<string, string | undefined>;
  /** Each part's props from the variant values in force, by part name. */
  readonly given?: Readonly<Record<string, Record<string, unknown>>>;
  /** Each part's props from the root's `base`, under the template's wiring. */
  readonly base?: Readonly<Record<string, Readonly<Record<string, unknown>>>>;
  readonly scopeOf: Map<Part, Part>;
  readonly repeatable: Set<Part>;
  /** Parts that place loose content with `<Children />`. */
  readonly marked: Set<Part>;
  /** How the root's props address each `<Children />`: its name, or `Children`. */
  readonly slots: Set<string>;
  /** The parts inside each part, so writing one switches on what holds it. */
  readonly inside: Map<Part, Set<Part>>;
  /** Where loose content written in a part goes. */
  readonly target: Map<Part, Part>;
  /** Each part as the template declares it. */
  readonly declared: Map<Part, Template>;
};

/** A template's own elements never change, so each is flattened once. */
const flattened = new WeakMap<Template, ReactNode[]>();

const kidsOf = (node: Template): ReactNode[] => {
  let kids = flattened.get(node);
  if (kids === undefined) {
    kids = flattenChildren(node.props.children);
    flattened.set(node, kids);
  }
  return kids;
};

const partOf = (node: ReactNode): SlotMeta | undefined =>
  isValidElement(node) ? slotMetaOf(node.type) : undefined;

/**
 * A declaration says where a part sits and nothing else: `repeatable`, and its
 * default content. A part's props are written in `defineProps`.
 */
const checkDeclared = (node: Template, component: string): void => {
  const allowed = isChildren(node)
    ? ["name", "children"]
    : partOf(node) !== undefined
      ? ["repeatable", "children"]
      : ["children"];
  const extra = Object.keys(node.props).filter((key) => !allowed.includes(key));
  if (extra.length > 0) {
    const name = isChildren(node)
      ? "Children"
      : (partOf(node)?.name ?? String((node.type as { name?: string }).name));
    throw new Error(
      `<${name}> in ${component}'s structure is given ${extra.map((key) => `\`${key}\``).join(", ")}. A structure takes only \`repeatable\` and default content; props go in defineProps.`,
    );
  }
};

const shapeOf = (tree: Template): Shape => {
  const shape: Shape = {
    root: tree.type,
    name: slotMetaOf(tree.type)!.name,
    values: {},
    scopeOf: new Map(),
    repeatable: new Set(),
    marked: new Set(),
    slots: new Set(),
    inside: new Map(),
    target: new Map(),
    declared: new Map(),
  };
  const nodes = shape.declared;
  nodes.set(tree.type, tree);
  const walk = (
    node: ReactNode,
    scope: Part,
    owner: Part,
    above: readonly Part[],
  ) => {
    if (!isValidElement(node)) return;
    checkDeclared(node as Template, shape.name);
    if (isChildren(node)) {
      shape.marked.add(owner);
      shape.slots.add(slotOf(node));
      return;
    }
    const template = node as Template;
    let inner = scope;
    let within = owner;
    let held = above;
    if (partOf(template) !== undefined) {
      within = template.type;
      for (const part of above) {
        if (!shape.inside.has(part)) shape.inside.set(part, new Set());
        shape.inside.get(part)!.add(template.type);
      }
      held = [...above, template.type];
      if (shape.scopeOf.has(template.type)) {
        throw new Error(
          `<${partOf(template)!.name}> is in the template twice. A part has one place.`,
        );
      }
      shape.scopeOf.set(template.type, scope);
      nodes.set(template.type, template);
      if (template.props["repeatable"] === true) {
        shape.repeatable.add(template.type);
        inner = template.type;
      }
    }
    kidsOf(template).forEach((kid) => walk(kid, inner, within, held));
  };
  checkDeclared(tree, shape.name);
  kidsOf(tree).forEach((kid) => walk(kid, tree.type, tree.type, []));

  // Nearest taker first: breadth first, not into a repeatable part's parts.
  for (const [part, node] of nodes) {
    let queue: Template[] = [node];
    let found: Part = undefined;
    while (queue.length > 0 && found === undefined) {
      const next: Template[] = [];
      for (const at of queue) {
        if (partOf(at) !== undefined && shape.marked.has(at.type)) {
          found = at.type;
          break;
        }
        for (const kid of kidsOf(at)) {
          if (!isValidElement(kid)) continue;
          if (shape.repeatable.has(kid.type)) continue;
          next.push(kid as Template);
        }
      }
      queue = next;
    }
    shape.target.set(part, found ?? part);
  }
  return shape;
};

type Written = {
  readonly props: Record<string, unknown>;
  readonly index: number;
  /**
   * A repeatable part's place among the parts of its kind written in its
   * scope, wherever in it they were written: what `{index: true}` reads.
   */
  readonly place?: number;
  readonly key: Key | null;
  /** `{null}` written as its children: the part is emptied. */
  readonly emptied: boolean;
  readonly children: ReactNode;
};

type Loose = { readonly node: ReactNode; readonly index: number };

/** What an instance wrote for one scope — the component, or one written repeatable part. */
type Scope = {
  readonly overrides: Map<Part, Written>;
  readonly instances: Map<Part, Written[]>;
  readonly loose: Map<Part, Loose[]>;
  /**
   * A wrapper the instance wrote around single parts — a header row around a
   * trigger — by the first part it holds: it takes that part's place.
   */
  readonly wrapped: Map<Part, { wrapper: Keyed; parts: Template[] }>;
  /** Single parts written inside a wrapper, rendered there rather than at their own place. */
  readonly elsewhere: Set<Part>;
  /** Each repeatable part written inside a wrapper, by the element written: its place. */
  readonly places: Map<ReactNode, number>;
};

/** `<Part>{undefined}</Part>` — an optional value that was not there — is not written. */
const unwritten = (element: Template): boolean =>
  "children" in element.props &&
  element.props.children === undefined &&
  Object.keys(element.props).length === 1;

/** A part of another component written as one of this component's: `DialogCloseIcon` is a `ButtonIcon`. */
const forwarded = (shape: Shape, element: Template): Template => {
  if (shape.scopeOf.has(element.type) || element.type === shape.root)
    return element;
  const meta = slotMetaOf(element.type);
  if (meta?.forwards === undefined) return element;
  const icon =
    meta.forwardsIcon !== undefined && element.props["icon"] === undefined
      ? { icon: meta.forwardsIcon }
      : {};
  return {
    ...element,
    type: meta.forwards as string,
    props: { ...element.props, ...icon },
  };
};

type Sheet = {
  readonly sheet: Shape["sheet"];
  readonly given: Shape["given"];
  readonly classes: Map<string, string | undefined>;
};

/**
 * Each component's sheets, by the variant values that choose them: the same
 * values always give the same classes and props, so each is worked out once.
 * Keyed by the component's declarations, which last as long as it does.
 */
const sheets = new WeakMap<
  Shape["declared"],
  { keys: string[]; byValues: Map<string, Sheet> }
>();

const sheetOf = (
  shape: Shape,
  values: Readonly<Record<string, unknown>>,
): Sheet => {
  const { styles, partProps } = shape;
  let cache = sheets.get(shape.declared);
  if (cache === undefined) {
    cache = {
      keys: [
        ...(styles?.variantKeys ?? []).map(String),
        ...Object.keys(partProps ?? {}).filter((key) => key !== "base"),
      ],
      byValues: new Map(),
    };
    sheets.set(shape.declared, cache);
  }
  const key = valuesKey(values, cache.keys);
  const known = key === undefined ? undefined : cache.byValues.get(key);
  if (known !== undefined) return known;
  const sheet = styles?.(
    Object.fromEntries(
      styles.variantKeys
        .map(String)
        .filter((name) => values[name] !== undefined)
        .map((name) => [name, values[name]]),
    ),
  );
  let given: Record<string, Record<string, unknown>> | undefined;
  if (partProps !== undefined) {
    const { base: _always, ...variants } = partProps;
    given = {};
    for (const [variant, choices] of Object.entries(variants)) {
      const value = values[variant] ?? styles?.defaultVariants?.[variant];
      const chosen =
        value === undefined
          ? choices["false"]
          : choices[String(value as string | number | boolean)];
      for (const [part, wiring] of Object.entries(chosen ?? {})) {
        given[part] = {
          ...given[part],
          ...(wiring as Record<string, unknown>),
        };
      }
    }
  }
  return remember(cache.byValues, key, { sheet, given, classes: new Map() });
};

/** The shape under these variant values: each part's classes and props for them. */
const valued = (
  shape: Shape,
  values: Readonly<Record<string, unknown>>,
): Shape => {
  const { sheet, given, classes } = sheetOf(shape, values);
  return shape.partProps === undefined
    ? { ...shape, values, sheet, classes }
    : { ...shape, values, sheet, given, classes };
};

/** A part's classes from the sheet in force, read once per sheet. */
const classesOf = (shape: Shape, name: string): string | undefined => {
  if (shape.classes === undefined) return shape.sheet?.[name]?.();
  if (!shape.classes.has(name)) {
    shape.classes.set(name, shape.sheet?.[name]?.());
  }
  return shape.classes.get(name);
};

/**
 * The shape inside a part that declares variants: its values — its defaults,
 * its wiring, what the instance wrote — over those in force, for it and every
 * part inside it.
 */
/**
 * Scoped shapes, by the sheet around them, the part, and the values the part
 * is given: most instances give none, so a row is scoped once, not per render.
 */
const scopes = new WeakMap<
  Map<string, string | undefined>,
  Map<Part, Map<string, Shape>>
>();

const scoped = (
  shape: Shape,
  node: Template,
  written: Written | undefined,
): Shape => {
  const declared = slotMetaOf(node.type)?.variants;
  if (declared === undefined || node.type === shape.root) return shape;
  const name = slotMetaOf(node.type)!.name;
  const base = shape.base?.[name];
  const given = shape.given?.[name];
  const own = written?.props;
  // As `{ ...base, ...given, ...own }` would have it, a key at a time.
  const chosen: Record<string, unknown> = {};
  for (const variant of Object.keys(declared)) {
    const value =
      own !== undefined && variant in own
        ? own[variant]
        : given !== undefined && variant in given
          ? given[variant]
          : base?.[variant];
    if (value !== undefined) chosen[variant] = value;
  }
  const key = valuesKey(chosen, Object.keys(declared));
  const byPart =
    shape.classes === undefined ? undefined : scopes.get(shape.classes);
  const known =
    key === undefined ? undefined : byPart?.get(node.type)?.get(key);
  if (known !== undefined) return known;
  // Only variant values are read from a shape's values, so only they are kept.
  const values: Record<string, unknown> = {};
  for (const variant of sheets.get(shape.declared)?.keys ?? []) {
    if (shape.values[variant] !== undefined)
      values[variant] = shape.values[variant];
  }
  const made = valued(shape, { ...values, ...defaultsOf(declared), ...chosen });
  if (shape.classes !== undefined && key !== undefined) {
    let parts = scopes.get(shape.classes);
    if (parts === undefined) {
      parts = new Map();
      scopes.set(shape.classes, parts);
    }
    let byValues = parts.get(node.type);
    if (byValues === undefined) {
      byValues = new Map();
      parts.set(node.type, byValues);
    }
    remember(byValues, key, made);
  }
  return made;
};

/** A repeatable part rendered from its declaration, where the instance wrote it. */
const inPlace = (
  shape: Shape,
  element: Template,
  index: number,
  key: Key | null,
  place: number,
): ReactNode => {
  const { children: inner, ...props } = element.props;
  const declared = shape.declared.get(element.type)!;
  const written: Written = {
    props,
    index,
    place,
    key,
    emptied: inner === null,
    children: inner,
  };
  const at = shape;
  return render(
    at,
    declared,
    collect(scoped(at, declared, written), element.type, inner),
    written,
    key ?? `${partOf(element)!.name}:${index}`,
  );
};

/**
 * A repeatable part found inside other content, rendered when React reaches
 * it: after any component around it — a field around a radio — has handed it
 * props through its `<Children />`.
 */
const Deferred = ({
  shape,
  element,
  index,
  keyAs,
  place,
}: {
  shape: Shape;
  element: Template;
  index: number;
  /** The key the part was written under, as `flattenChildren` keys it. */
  keyAs: Key | null;
  place: number;
}): ReactNode => inPlace(shape, element, index, keyAs, place);

/**
 * Children rebuilt after a walk: each child it changed as it left it, and
 * each it did not keyed as `flattenChildren` would have.
 */
const rebuilt = (
  entries: readonly Keyed[],
  kids: readonly (Keyed | ReactNode)[],
): ReactNode[] =>
  kids.map((kid, index) =>
    kid === entries[index] ? keyed(entries[index]!) : (kid as ReactNode),
  );

const NO_PARTS: ReadonlyMap<ReactNode, ReactNode> = new Map();

const NO_PLACES: ReadonlyMap<ReactNode, number> = new Map();

/** Content another instance of the component keeps to itself. */
const ownedElsewhere = (shape: Shape, node: ReactElement): boolean =>
  node.type === shape.root || slotMetaOf(node.type)?.as === shape.root;

/**
 * Gives each repeatable part written anywhere inside `node` — as `within`
 * finds them, not into `skip` — its place among those of its kind, in the
 * order written.
 */
const placeWithin = (
  shape: Shape,
  node: ReactNode,
  place: (part: Part) => number,
  places: Map<ReactNode, number>,
  skip: ReadonlySet<ReactNode> = new Set(),
): void => {
  if (shape.repeatable.size === 0) return;
  if (!isValidElement(node) || ownedElsewhere(shape, node)) return;
  const { children } = node.props as { children?: ReactNode };
  if (children === undefined || typeof children === "function") return;
  for (const { node: child } of keyedChildren(children)) {
    if (!isValidElement(child) || skip.has(child)) continue;
    const element = forwarded(shape, child as Template);
    if (shape.repeatable.has(element.type)) {
      if (!unwritten(element)) places.set(child, place(element.type));
    } else placeWithin(shape, child, place, places, skip);
  }
};

/**
 * Content that is not one of the component's parts — a wrapper, another
 * component — with the repeatable parts written anywhere inside it rendered
 * in place, and each single part in `parts` swapped for it as rendered, found
 * as the element written. Another instance of the component, or an element
 * drawn as one, keeps its own. `key`, when given, is the key a copy takes.
 */
const within = (
  shape: Shape,
  node: ReactNode,
  parts: ReadonlyMap<ReactNode, ReactNode> = NO_PARTS,
  key?: Key | null,
  places: ReadonlyMap<ReactNode, number> = NO_PLACES,
): ReactNode => {
  if (
    (shape.repeatable.size === 0 && parts.size === 0) ||
    !isValidElement(node) ||
    ownedElsewhere(shape, node)
  ) {
    return node;
  }
  const { children } = node.props as { children?: ReactNode };
  if (children === undefined || typeof children === "function") return node;
  let changed = false;
  const entries = keyedChildren(children);
  const kids = entries.map((entry, index): Keyed | ReactNode => {
    const child = entry.node;
    if (parts.has(child)) {
      changed = true;
      return parts.get(child);
    }
    if (!isValidElement(child)) return entry;
    const element = forwarded(shape, child as Template);
    if (shape.repeatable.has(element.type)) {
      changed = true;
      return unwritten(element)
        ? null
        : createElement(Deferred, {
            shape,
            element,
            index,
            keyAs: entry.key,
            place: places.get(child) ?? 0,
            key: entry.key ?? `${partOf(element)!.name}:${index}`,
          });
    }
    const next = within(shape, child, parts, entry.key, places);
    if (next === child) return entry;
    changed = true;
    return next;
  });
  return changed
    ? cloneElement(
        node,
        key === undefined ? undefined : { key },
        ...rebuilt(entries, kids),
      )
    : node;
};

/** `within` for a child as written, keyed as `flattenChildren` would key it. */
const withinKeyed = (
  shape: Shape,
  entry: Keyed,
  parts: ReadonlyMap<ReactNode, ReactNode> | undefined,
  places: ReadonlyMap<ReactNode, number>,
): ReactNode => {
  const next = within(shape, entry.node, parts, entry.key, places);
  return next === entry.node ? keyed(entry) : next;
};

/** Whether this scope has any single parts, which a wrapper could hold. */
const singleScopes = new WeakMap<Shape["scopeOf"], Set<Part>>();

const hasSingles = (shape: Shape, scope: Part): boolean => {
  let scopes = singleScopes.get(shape.scopeOf);
  if (scopes === undefined) {
    scopes = new Set();
    for (const [part, of] of shape.scopeOf) {
      if (!shape.repeatable.has(part)) scopes.add(of);
    }
    singleScopes.set(shape.scopeOf, scopes);
  }
  return scopes.has(scope);
};

/**
 * The single parts of this scope written inside a wrapper — content that is
 * not one of the component's parts, or another component — in the order
 * written. Not into another instance of the component, nor into a part.
 */
const singlesIn = (
  shape: Shape,
  scope: Part,
  node: ReactElement,
): Template[] => {
  const out: Template[] = [];
  const walk = (at: ReactNode) => {
    for (const { node: child } of keyedChildren(at)) {
      if (!isValidElement(child)) continue;
      if (ownedElsewhere(shape, child)) continue;
      const element = forwarded(shape, child as Template);
      if (shape.scopeOf.has(element.type)) {
        if (
          !shape.repeatable.has(element.type) &&
          shape.scopeOf.get(element.type) === scope &&
          !unwritten(element)
        )
          out.push(child as Template);
        continue;
      }
      const { children } = child.props as { children?: ReactNode };
      if (typeof children !== "function") walk(children);
    }
  };
  walk((node.props as { children?: ReactNode }).children);
  return out;
};

const collect = (shape: Shape, scope: Part, children: ReactNode): Scope => {
  const found: Scope = {
    overrides: new Map(),
    instances: new Map(),
    loose: new Map(),
    wrapped: new Map(),
    elsewhere: new Set(),
    places: new Map(),
  };
  const counter = { next: 0 };
  const counts = new Map<Part, number>();
  const placeOf = (part: Part): number => {
    const place = counts.get(part) ?? 0;
    counts.set(part, place + 1);
    return place;
  };
  // `at` is the shape where the content was written: inside a written part
  // that declares variants, its values are in force.
  const walk = (nodes: ReactNode, writtenIn: Part, at: Shape) => {
    if (typeof nodes === "function") {
      throw new Error(
        `<${shape.name}> was given a render function. FlowCn components are written out: map the data to elements instead.`,
      );
    }
    // Each child as written, keyed as `flattenChildren` would key it: a part
    // is read, not copied, and only what renders as written is copied.
    for (const entry of keyedChildren(nodes)) {
      const index = counter.next++;
      const node = entry.node;
      const element = isValidElement(node)
        ? forwarded(shape, node as Template)
        : undefined;
      // A repeatable part written inside another one — an item in a group —
      // is still itself: it renders from its declaration, where it was written.
      if (
        element !== undefined &&
        shape.repeatable.has(element.type) &&
        shape.scopeOf.get(element.type) !== scope
      ) {
        loose(shape.target.get(writtenIn)!, {
          index,
          node: inPlace(
            at,
            element,
            index,
            entry.key,
            unwritten(element) ? 0 : placeOf(element.type),
          ),
        });
        continue;
      }
      // A wrapper that holds single parts keeps them where they were written,
      // and takes the first one's place.
      const held =
        element !== undefined &&
        !shape.scopeOf.has(element.type) &&
        hasSingles(shape, scope)
          ? singlesIn(shape, scope, element)
          : [];
      if (held.length > 0) {
        found.wrapped.set(held[0]!.type, { wrapper: entry, parts: held });
        for (const part of held.slice(1)) found.elsewhere.add(part.type);
        placeWithin(shape, node, placeOf, found.places, new Set(held));
        for (const part of held) record(forwarded(shape, part), index, at);
        continue;
      }
      if (element === undefined || shape.scopeOf.get(element.type) !== scope) {
        const wrapper =
          element !== undefined && !shape.scopeOf.has(element.type);
        if (wrapper) placeWithin(shape, node, placeOf, found.places);
        loose(shape.target.get(writtenIn)!, {
          node: wrapper
            ? withinKeyed(at, entry, undefined, found.places)
            : keyed(entry),
          index,
        });
        continue;
      }
      if (unwritten(element)) continue;
      record(element, index, at, entry.key);
    }
  };
  const loose = (target: Part, item: Loose) => {
    const list = found.loose.get(target);
    if (list === undefined) found.loose.set(target, [item]);
    else list.push(item);
  };
  // A part of this scope as written: an instance of a repeatable one, or the
  // single one, with what is written inside it.
  const record = (
    element: Template,
    index: number,
    at: Shape,
    key: Key | null = element.key,
  ) => {
    const { children: inner, ...props } = element.props;
    const repeatable = shape.repeatable.has(element.type);
    const written: Written = {
      props,
      index,
      ...(repeatable && { place: placeOf(element.type) }),
      key,
      emptied: inner === null,
      children: inner,
    };
    if (repeatable) {
      const list = found.instances.get(element.type);
      if (list === undefined) found.instances.set(element.type, [written]);
      else list.push(written);
      return;
    }
    if (found.overrides.has(element.type)) {
      throw new Error(
        `<${partOf(element)!.name}> was written twice. A part is one element; the second would silently win.`,
      );
    }
    found.overrides.set(element.type, written);
    walk(
      inner,
      element.type,
      scoped(at, shape.declared.get(element.type)!, written),
    );
  };
  walk(children, scope, shape);
  return found;
};

const sorted = (items: readonly Loose[]): ReactNode[] => {
  // Usually already in the order written; sort only when not.
  for (let i = 1; i < items.length; i++) {
    if (items[i]!.index < items[i - 1]!.index) {
      return items
        .toSorted((a, b) => a.index - b.index)
        .map((item) => item.node);
    }
  }
  return items.map((item) => item.node);
};

/** Loose content placed at a `<Children />`, given what the root's props say to give that slot. */
const handed = (
  shape: Shape,
  slot: string,
  nodes: ReactNode[],
): ReactNode[] => {
  const props = {
    ...shape.base?.[slot],
    ...shape.given?.[slot],
  };
  const keys = Object.keys(props).filter((key) => props[key] !== undefined);
  if (keys.length === 0) return nodes;
  const give = (node: ReactElement): ReactElement => {
    const declared = slotMetaOf(node.type)?.variants;
    if (declared === undefined) return node;
    const own = node.props as Record<string, unknown>;
    const gives = Object.fromEntries(
      keys
        .filter((key) => key in declared && own[key] === undefined)
        .map((key) => [key, props[key]]),
    );
    return Object.keys(gives).length === 0 ? node : cloneElement(node, gives);
  };
  return nodes.map((node) => {
    if (!isValidElement(node)) return node;
    if (node.type !== Deferred) return give(node);
    const deferred = node as ReactElement<{ element: Template }>;
    const { element } = deferred.props;
    const given = give(element);
    return given === element
      ? node
      : cloneElement(deferred, { element: given as Template });
  });
};

/** One child as itself, none as nothing: so React's ids match an unwrapped tree. */
const single = (children: ReactNode[]): ReactNode =>
  children.length === 0
    ? undefined
    : children.length === 1
      ? children[0]
      : children;

type Paint = (props: Record<string, unknown>) => ReactNode;

/** Whether the instance wrote any part inside this one, which switches it on. */
const holdsWritten = (shape: Shape, scope: Scope, part: Part): boolean => {
  for (const inner of shape.inside.get(part) ?? []) {
    if (
      (scope.overrides.has(inner) &&
        scope.overrides.get(inner)!.props["present"] !== false) ||
      (scope.instances.get(inner)?.length ?? 0) > 0 ||
      (scope.loose.get(inner)?.length ?? 0) > 0
    )
      return true;
  }
  return false;
};

/**
 * What placing a template node needs that the template alone decides, worked
 * out once per node: the template never changes, so neither does this.
 */
type NodePlan = {
  readonly meta: SlotMeta;
  readonly kids: ReactNode[];
  /** Only a place for content, with no default of its own. */
  readonly onlyContent: boolean;
  /** Holds repeatable parts. */
  readonly holdsRepeat: boolean;
  /** Places loose content with a `<Children />` of its own. */
  readonly marked: boolean;
};

const nodePlans = new WeakMap<Template, NodePlan>();

const nodePlanOf = (shape: Shape, node: Template): NodePlan => {
  let plan = nodePlans.get(node);
  if (plan === undefined) {
    const kids = kidsOf(node);
    plan = {
      meta: slotMetaOf(node.type)!,
      kids,
      onlyContent:
        kids.length === 1 &&
        isChildren(kids[0]) &&
        kidsOf(kids[0] as Template).length === 0,
      holdsRepeat: kids.some(
        (kid) => isValidElement(kid) && shape.repeatable.has(kid.type),
      ),
      marked: shape.marked.has(node.type),
    };
    nodePlans.set(node, plan);
  }
  return plan;
};

/** One of a template node's children, as placing treats it. */
type Step =
  | {
      readonly kind: "children";
      readonly slot: string;
      readonly defaults: ReactNode[];
    }
  | { readonly kind: "text"; readonly node: ReactNode }
  | {
      readonly kind: "plain";
      readonly template: Template;
      readonly kids: ReactNode[];
    }
  | { readonly kind: "repeat" }
  | {
      readonly kind: "part";
      readonly template: Template;
      readonly name: string;
    };

/** How a template node's children are placed, worked out once per node. */
type ChildrenPlan = {
  readonly steps: readonly Step[];
  /** The repeatable parts among them, laid out as one sequence. */
  readonly repeating: readonly Template[];
  /** Loose content goes among the repeatables, not at a `<Children />`. */
  readonly pooled: boolean;
  readonly pooledSlot: string;
};

const childrenPlans = new WeakMap<readonly ReactNode[], ChildrenPlan>();

const childrenPlanOf = (
  shape: Shape,
  nodes: readonly ReactNode[],
): ChildrenPlan => {
  let plan = childrenPlans.get(nodes);
  if (plan !== undefined) return plan;
  const repeating = nodes.filter(
    (node): node is Template =>
      isValidElement(node) && shape.repeatable.has(node.type),
  );
  const pooledChildren = nodes.find(isChildren);
  const steps: Step[] = [];
  let laidOut = false;
  for (const node of nodes) {
    if (isChildren(node)) {
      steps.push({
        kind: "children",
        slot: slotOf(node),
        defaults: kidsOf(node as Template),
      });
    } else if (!isValidElement(node)) {
      steps.push({ kind: "text", node });
    } else if (slotMetaOf(node.type) === undefined) {
      steps.push({
        kind: "plain",
        template: node as Template,
        kids: kidsOf(node as Template),
      });
    } else if (shape.repeatable.has(node.type)) {
      if (!laidOut) steps.push({ kind: "repeat" });
      laidOut = true;
    } else {
      steps.push({
        kind: "part",
        template: node as Template,
        name: slotMetaOf(node.type)!.name,
      });
    }
  }
  plan = {
    steps,
    repeating,
    pooled: repeating.length > 0 && pooledChildren !== undefined,
    pooledSlot:
      pooledChildren === undefined ? "Children" : slotOf(pooledChildren),
  };
  childrenPlans.set(nodes, plan);
  return plan;
};

const render = (
  around: Shape,
  node: Template,
  scope: Scope,
  written: Written | undefined,
  key: Key,
  paint?: Paint,
): ReactNode => {
  const { meta, kids, onlyContent, holdsRepeat, marked } = nodePlanOf(
    around,
    node,
  );
  const shape = scoped(around, node, written);
  const {
    children: _children,
    present: wiredPresent,
    ...own
  } = {
    ...shape.base?.[meta.name],
    ...shape.given?.[meta.name],
  };
  const content = scope.loose.get(node.type) ?? [];
  // A part that is only a place for content, with no default of its own, is
  // there only when there is content for it.
  const present =
    written !== undefined
      ? ((written.props["present"] as boolean | undefined) ?? true)
      : wiredPresent === false
        ? holdsWritten(shape, scope, node.type)
        : ((wiredPresent as boolean | undefined) ??
          (onlyContent ? content.length > 0 : true));
  if (!present) return null;

  // A part's classes are its entry in the component's styles, under its own
  // name. The root styles itself.
  const classes = paint === undefined ? classesOf(shape, meta.name) : undefined;
  const wiring = {
    ...own,
    className: after(classes, own["className"] as string),
  };
  const { present: _present, ...wrote } = written?.props ?? {};

  let children: ReactNode;
  if (written?.emptied === true) {
    children = null;
  } else if (
    kids.length === 0 ||
    (content.length > 0 && !holdsRepeat && !marked)
  ) {
    // A leaf holds its content; a part with nothing below to take what was
    // written in it lets that replace its defaults.
    children = content.length > 0 ? single(sorted(content)) : undefined;
  } else {
    children = single(build(shape, kids, scope, content, marked));
  }

  const props = mergeProps(wiring, wrote);
  return paint === undefined
    ? createElement(node.type as string, { ...props, key }, children)
    : paint({ ...props, children });
};

const build = (
  shape: Shape,
  nodes: readonly ReactNode[],
  scope: Scope,
  between: readonly Loose[] = [],
  marked = false,
): ReactNode[] => {
  // Repeatable parts side by side are one sequence, in the order the instance wrote
  // them, and so is content written beside them: `<Children />` among them
  // places nothing of its own.
  const { steps, repeating, pooled, pooledSlot } = childrenPlanOf(shape, nodes);
  const out: ReactNode[] = [];
  for (const step of steps) {
    if (step.kind === "children") {
      if (pooled) continue;
      out.push(
        ...(between.length > 0
          ? handed(shape, step.slot, sorted(between))
          : step.defaults),
      );
      continue;
    }
    if (step.kind === "text") {
      out.push(step.node);
      continue;
    }
    if (step.kind === "plain") {
      out.push(
        cloneElement(
          step.template,
          undefined,
          ...build(shape, step.kids, scope, marked ? between : [], marked),
        ),
      );
      continue;
    }
    if (step.kind === "repeat") {
      const laid = [
        ...repeating.flatMap((repeat) =>
          (scope.instances.get(repeat.type) ?? []).map((instance) => {
            const at = shape;
            return {
              index: instance.index,
              node: render(
                at,
                repeat,
                collect(
                  scoped(at, repeat, instance),
                  repeat.type,
                  instance.children,
                ),
                instance,
                instance.key ??
                  `${slotMetaOf(repeat.type)!.name}:${instance.index}`,
              ),
            };
          }),
        ),
        ...(pooled
          ? between.map((item) => ({
              ...item,
              node: handed(shape, pooledSlot, [item.node])[0],
            }))
          : marked
            ? []
            : between),
      ];
      out.push(...sorted(laid));
      continue;
    }
    const { template, name } = step;
    if (scope.elsewhere.has(template.type)) {
      continue;
    } else if (scope.wrapped.has(template.type)) {
      const { wrapper, parts } = scope.wrapped.get(template.type)!;
      const rendered = new Map<ReactNode, ReactNode>(
        parts.map((part) => {
          const type = forwarded(shape, part).type;
          return [
            part,
            render(
              shape,
              shape.declared.get(type)!,
              scope,
              scope.overrides.get(type),
              slotMetaOf(type)!.name,
            ),
          ];
        }),
      );
      // The wrapper keeps the key it was written under, so it and what it
      // holds stay mounted when a part in it comes or goes.
      out.push(withinKeyed(shape, wrapper, rendered, scope.places));
    } else {
      out.push(
        render(
          shape,
          template,
          scope,
          scope.overrides.get(template.type),
          name,
        ),
      );
    }
  }
  return out;
};

/**
 * Declares a component's template, rooted in the component itself.
 * `defineComponent` calls it with its `structure`.
 */
export const defineTemplate = (template: ReactElement): void => {
  const hook = fillOf(template.type);
  if (hook === undefined) {
    throw new Error(
      "A template is rooted in its component: an element from defineElement.",
    );
  }
  const tree = template as Template;
  const base = shapeOf(tree);
  const { styles, props: partProps } = slotMetaOf(template.type)!;
  const parts = new Set(
    [base.root, ...base.scopeOf.keys()].map((part) => slotMetaOf(part)!.name),
  );
  for (const key of Object.keys(styles?.slots ?? {})) {
    if (key !== "base" && !parts.has(key)) {
      throw new Error(
        `\`${key}\` in ${base.name}'s styles is not one of its parts.`,
      );
    }
  }
  const { base: always, ...variants } = partProps ?? {};
  const named = [
    ...Object.keys(always ?? {}),
    ...Object.values(variants).flatMap((values) =>
      Object.values(values).flatMap(Object.keys),
    ),
  ];
  for (const key of named) {
    if (!parts.has(key) && !base.slots.has(key)) {
      throw new Error(
        `\`${key}\` in ${base.name}'s props is not one of its parts.`,
      );
    }
  }
  hook.fill = ({ children, ...own }, paint) => {
    const props = {
      ...defaultsOf(slotMetaOf(tree.type)?.variants),
      ...always?.[base.name],
      ...Object.fromEntries(
        Object.entries(own).filter(([, value]) => value !== undefined),
      ),
    };
    const shape = valued(
      {
        ...base,
        ...(styles !== undefined && { styles }),
        ...(partProps !== undefined && { partProps }),
        ...(always !== undefined && { base: always as Shape["base"] }),
      },
      props,
    );
    const scope = collect(shape, shape.root, children);
    return render(
      shape,
      tree,
      scope,
      { props: own, index: 0, key: null, emptied: false, children },
      "root",
      paint as Paint,
    );
  };
};
