/**
 * FlowCn's slots: the elements a component is made of.
 *
 * Every element of a component is a slot — the root, and each part its
 * template places. A slot is a component in its own right: it paints its
 * element, with its classes and props, and a template finds it by identity
 * when an instance writes it. That is what makes every internal overridable,
 * by name: `<ButtonText className="italic">` inside a `<Button>` reaches the
 * text the button was going to render anyway.
 *
 * A rendered slot's props are merged in a fixed order — the template's wiring,
 * then the author's override. classNames concatenate in that order and `cn`
 * lets the later one win the conflict; event handlers both run, the wiring's
 * first; any other prop is overwritten. `children={null}` empties a slot, and
 * `present={false}` removes it.
 *
 * The third rule — classNames may only target the element they sit on — is
 * enforced by `src/__tests__/selectors.test.ts` reading the source. It is why
 * slots exist: shadcn reaches its icon with `[&_svg]:size-4` on the root, a
 * class on one element that paints another. FlowCn puts that rule on the icon,
 * which it can only do because the icon is addressable.
 */

import type { LucideProps } from "lucide-react";
import {
  Children,
  cloneElement,
  createElement,
  Fragment,
  isValidElement,
  type ComponentProps,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import type { VariantProps as StylesProps } from "tailwind-variants";

import { after } from "./cn.ts";
import { BASE_UI_PORTALS, containedPortal } from "./portal.tsx";
import { renderElement, type RenderProp } from "./render.ts";

/** Brand carried by every slot component, read during extraction. */
const META = Symbol.for("flowcn.slot.meta");

export type SlotMeta = {
  /** The component's exported name, e.g. `"ButtonText"`. */
  readonly name: string;
  /** A root's styles: every part's classes, and the component's variants. */
  readonly styles?: Styles;
  /** A root's declared variants, with their defaults. */
  readonly variants?: Readonly<Record<string, unknown>>;
  /** A root's props per variant value, for its parts: which icon, whether present. */
  readonly props?: PartProps;
  /**
   * The part of another component this one is drawn as — `render` without
   * `as`: `DialogCloseIcon` is `ButtonIcon`, so the close button's Button
   * finds it as its own icon.
   */
  readonly forwards?: unknown;
  /** The icon a part drawn as another's part gives it, unless one is written. */
  readonly forwardsIcon?: unknown;
  /** What an element is: a tag, a Base UI part, or another component. */
  readonly as?: unknown;
  /** What a Base UI part is drawn as: `render` given with `as`. */
  readonly look?: unknown;
  /** An icon element's own icon. */
  readonly icon?: unknown;
  /** A root's structure, as `defineComponent` was given it. */
  readonly structure?: ReactElement;
};

/**
 * A component's styles, as `tailwind-variants` makes them with `slots`: one
 * class list per part, keyed by the part's name — `AccordionTriggerIcon` — and
 * variants that belong to the component, choosing classes for any of its
 * parts.
 */
export type Styles = ((
  props?: Record<string, unknown>,
) => Record<
  string,
  ((props?: Record<string, unknown>) => string) | undefined
>) & {
  readonly variantKeys: readonly (string | number)[];
  readonly slots?: Readonly<Record<string, unknown>>;
  readonly defaultVariants?: Readonly<Record<string, unknown>>;
};

/**
 * Props a component gives its parts, shaped as its styles are: `base` for the
 * ones that always apply, then variant, value, part name, props —
 * `{ base: { AlertDialogCancel: { variant: "outline" } }, withIcon: { true: {
 * AlertIcon: { present: true } } } }`. `base` sits under the template's
 * wiring, the variants' over it, and the author's override over both.
 */
export type PartProps = Readonly<
  Record<string, Readonly<Record<string, Readonly<Record<string, unknown>>>>>
>;

/** How a slot is named: the component's exported name. */
export type SlotName = {
  readonly name: string;
};

/**
 * `data-*` attributes, spelled out so a slot's prop type accepts them.
 *
 * JSX allows any `data-` attribute on a host element, but a plain object type
 * does not, and every slot is wired through plain objects — `data-size`,
 * `data-variant`, or an author's `data-testid` on an override.
 *
 * FlowCn writes no `data-slot`. shadcn tags every part with one so that a
 * parent can reach it — `*:data-[slot=…]:`, `has-data-[slot=…]:` — and FlowCn
 * has no selectors that reach, so nothing would read it.
 */
export type DataAttributes = { [attribute: `data-${string}`]: unknown };

/** Props every slot understands, on top of whatever it adds. */
export type SlotProps = {
  className?: string;
  children?: ReactNode;
  /**
   * `false` removes the slot from the tree entirely.
   *
   * A slot that is merely invisible still occupies layout and is still
   * focusable; a design tool toggling a part off means gone, so this is a real
   * unmount rather than a `hidden` class.
   */
  present?: boolean;
};

export type SlotComponent<P extends SlotProps> = ((props: P) => ReactNode) & {
  readonly displayName: string;
  readonly [META]: SlotMeta;
};

/**
 * Defines a slot: a component that paints itself, and that a template finds
 * by identity when an instance writes it.
 */
export const defineSlot = <P extends SlotProps>(
  named: SlotName &
    Partial<
      Pick<
        SlotMeta,
        | "styles"
        | "props"
        | "forwards"
        | "forwardsIcon"
        | "variants"
        | "as"
        | "look"
        | "icon"
      >
    >,
  render: (props: P) => ReactNode,
): SlotComponent<P> => {
  const meta: SlotMeta = { ...named };
  // `present` is consumed here and never forwarded: it is an instruction to the
  // engine, not a prop, and letting it reach a host element would put a stray
  // `present="true"` attribute on every span in the tree.
  const component = (props: P): ReactNode => {
    if (!("present" in props)) return render(props);
    const { present, ...rest } = props;
    return present === false ? null : render(rest as P);
  };
  component.displayName = meta.name;
  return Object.assign(component, { [META]: meta }) as SlotComponent<P>;
};

/**
 * Defines a slot that is one host element carrying one class list.
 *
 * Most slots are exactly this — `<span>` with `text-sm font-medium`, `<div>`
 * with `p-6` — and writing each one out by hand buries the two facts that
 * matter (which element, which classes) in identical boilerplate. `as` stays
 * overridable so an author can turn a `<span>` into an `<a>` without the
 * component growing a prop for it, and `render` composes the slot into another
 * element the way a Base UI part does.
 *
 * A slot built on a Base UI part (`DialogPrimitive.Title`) keeps the part
 * whatever the author asks for: an `as` there composes onto the part through
 * its own `render`, rather than replacing it and losing what it does — the
 * title's `aria-labelledby`, the item text's registration with its select.
 */
export type ElementSlotProps = SlotProps & {
  as?: ElementType;
  /** A Base UI part also takes its own `(props, state) =>` form. */
  render?: RenderProp | ((props: never, state: never) => ReactElement);
  [prop: string]: unknown;
};

type Styled = {
  /** A root's styles, for the whole component; its variant values are the root's props. */
  styles?: Styles;
  /** A root's props for its parts, per variant value. */
  props?: PartProps;
  /** A root's declared variants, which never reach its element. */
  variants?: Readonly<Record<string, unknown>>;
  /** The other component's part this slot is, painted as that part. */
  forwards?: SlotComponent<never>;
};

/**
 * A styled slot: a component's root or a part its template places. A root
 * renders its template when one is defined for it.
 */
const defineStyledSlot = <P extends SlotProps>(
  base: SlotName & Styled,
  paint: (props: P) => ReactNode,
): SlotComponent<P> => {
  const hook: { fill?: Fill } = {};
  // A part drawn as another's part hands it its own default icon.
  const icon = (base as { icon?: ElementType }).icon;
  const painted = (props: P) =>
    base.forwards === undefined
      ? paint(props)
      : createElement(
          base.forwards as unknown as ElementType,
          icon === undefined || (props as { icon?: unknown }).icon !== undefined
            ? props
            : { ...props, icon },
        );
  const slot = defineSlot<P>(
    {
      name: base.name,
      ...(base.styles !== undefined && { styles: base.styles }),
      ...(base.props !== undefined && { props: base.props }),
      ...(base.forwards !== undefined && { forwards: base.forwards }),
      ...(base.forwards !== undefined &&
        icon !== undefined && { forwardsIcon: icon }),
      ...(base.variants !== undefined && { variants: base.variants }),
      ...((base as { as?: unknown }).as !== undefined && {
        as: (base as { as?: unknown }).as,
      }),
      ...((base as { render?: unknown }).render !== undefined && {
        look: (base as { render?: unknown }).render,
      }),
      ...(icon !== undefined && { icon }),
    },
    (props) =>
      hook.fill === undefined
        ? painted(props)
        : hook.fill(props as ElementSlotProps, painted as Paint),
  );
  return Object.assign(slot, { [FILL]: hook, [OPTIONS]: base });
};

const OPTIONS = Symbol.for("flowcn.options");

const DEFAULTS = Symbol.for("flowcn.variant-defaults");

/** Gives a component's declared variants their default values. */
export const withDefaults = <V extends object>(
  variants: V,
  defaults: Readonly<Record<string, unknown>> | undefined,
): V =>
  defaults === undefined
    ? variants
    : Object.assign({}, variants, { [DEFAULTS]: defaults });

/** The default values a component's declared variants carry. */
export const defaultsOf = (
  variants: unknown,
): Readonly<Record<string, unknown>> =>
  (
    variants as { [DEFAULTS]?: Readonly<Record<string, unknown>> } | undefined
  )?.[DEFAULTS] ?? {};

/** What a slot's styling needs, worked out once per slot. */
type StyleKeys = {
  readonly keys: ReadonlySet<string>;
  readonly passes: ReadonlySet<string>;
  readonly defaults: Readonly<Record<string, unknown>>;
  /** The slot's own classes, by the variant values that chose them. */
  readonly classes: Map<string, string | undefined>;
};

const styleKeys = new WeakMap<object, StyleKeys>();

/** How many sets of variant values a cache keeps; past it, the oldest goes. */
const CACHED = 256;

/** Anything a variant can be given: a primitive, or an object a key cannot read. */
type VariantValue = {} | null | undefined;

/**
 * A cache key for these variant values, or `undefined` when one is not a
 * primitive: two objects would read alike.
 */
export const valuesKey = (
  values: Readonly<Record<string, VariantValue>>,
  names: Iterable<string>,
): string | undefined => {
  let key = "";
  for (const name of names) {
    const value = values[name];
    if (
      value != null &&
      typeof value !== "string" &&
      typeof value !== "number" &&
      typeof value !== "boolean" &&
      typeof value !== "bigint"
    )
      return undefined;
    key += `${String(value)}\u0000`;
  }
  return key;
};

/** `value`, kept under `key` in place of the oldest entry once the cache is full. */
export const remember = <T,>(
  cache: Map<string, T>,
  key: string | undefined,
  value: T,
): T => {
  if (key === undefined) return value;
  if (cache.size >= CACHED) cache.delete(cache.keys().next().value!);
  cache.set(key, value);
  return value;
};

/**
 * Gives a defined root its component's styles and props after the fact, for
 * `defineComponent`: the slot reads them from its options when it paints.
 */
export const attachToRoot = (
  root: unknown,
  given: Pick<Styled, "styles" | "props"> & {
    structure: ReactElement;
  },
): void => {
  const options = (root as { [OPTIONS]?: Styled })[OPTIONS];
  const meta = slotMetaOf(root) as { styles?: Styles; props?: PartProps };
  if (options === undefined || meta === undefined) {
    throw new Error("A component's root is an element from defineElement.");
  }
  Object.assign(options, given);
  Object.assign(meta, given);
  // Styling worked out before the component was defined is no longer right.
  styleKeys.delete(options);
};

/**
 * The Base UI props a variant can also be. A variant with one of these names
 * chooses classes and still reaches its Base UI part; `defineElement` checks
 * that the part takes it, and that no other variant names a prop the part takes.
 */
export const BASE_UI_PROPS = [
  "modal",
  "orientation",
  "swipeDirection",
] as const;

/**
 * The variants that reach what an element is `as`: another component's
 * declared variants, or the Base UI props a part takes. A tag takes none.
 */
const passesOf = (as: ElementType | undefined): readonly string[] => {
  if (as === undefined || typeof as === "string") return [];
  const meta = slotMetaOf(as);
  return meta === undefined ? BASE_UI_PROPS : Object.keys(meta.variants ?? {});
};

const styleKeysOf = (base: Styled & SlotName): StyleKeys => {
  let known = styleKeys.get(base);
  if (known === undefined) {
    known = {
      keys: new Set([
        ...Object.keys(base.variants ?? {}),
        ...(base.styles?.variantKeys ?? []).map(String),
        ...Object.keys(base.props ?? {}).filter((key) => key !== "base"),
      ]),
      passes: new Set(passesOf((base as { as?: ElementType }).as)),
      defaults: defaultsOf(base.variants),
      classes: new Map(),
    };
    styleKeys.set(base, known);
  }
  return known;
};

/** A root's own classes for these props, and the props that are not variant values. */
const styled = (
  base: Styled & SlotName,
  props: Record<string, unknown> & { children?: ReactNode },
): { classes: string | undefined; rest: Record<string, unknown> } => {
  if (
    base.styles === undefined &&
    base.props === undefined &&
    base.variants === undefined
  )
    return { classes: undefined, rest: props };
  const { keys, passes, defaults, classes } = styleKeysOf(base);
  const chosen: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (keys.has(key)) chosen[key] = value;
    if (!keys.has(key) || passes.has(key)) rest[key] = value;
  }
  // A variant that is also a Base UI prop reaches the part with its default
  // too, so the part and the classes agree on it.
  if (passes.size > 0) {
    for (const [key, value] of Object.entries(defaults)) {
      if (passes.has(key) && rest[key] === undefined) rest[key] = value;
    }
  }
  if (base.styles === undefined) return { classes: undefined, rest };
  const values = { ...defaults, ...defined(chosen) };
  const key = valuesKey(values, keys);
  if (key !== undefined && classes.has(key)) {
    return { classes: classes.get(key), rest };
  }
  return {
    classes: remember(classes, key, base.styles(values)[base.name]?.()),
    rest,
  };
};

/**
 * How a component's root renders its template, set by `defineTemplate`: the
 * root's own props, and the root painted as a plain element.
 */
type Paint = (props: ElementSlotProps) => ReactNode;

export type Fill = (props: ElementSlotProps, paint: Paint) => ReactNode;

const FILL = Symbol.for("flowcn.fill");

/** The hook a root's template is attached through. */
export const fillOf = (type: unknown): { fill?: Fill } | undefined =>
  typeof type === "function"
    ? (type as { [FILL]?: { fill?: Fill } })[FILL]
    : undefined;

/**
 * What a slot's `render` takes: an element, or a function of the props it
 * would have painted — a tag's own props, or a Base UI part's
 * `(props, state) =>` form.
 */
type RenderOf<As extends ElementType> = As extends string
  ? ReactElement | ((props: ComponentProps<As>) => ReactElement)
  : "render" extends keyof ComponentProps<As>
    ? ComponentProps<As>["render"]
    : RenderProp;

/**
 * An element slot's props: its element's own and the slot's. `className` is a
 * string, merged after the slot's classes.
 */
export type ElementSlotPropsOf<As extends ElementType> = SlotProps &
  DataAttributes &
  Omit<ComponentProps<As>, "className" | "children" | "render"> & {
    as?: ElementType;
    render?: RenderOf<As>;
  };

/** A root's props for its component's variants. */
type StylesPropsOf<S> = S extends Styles
  ? Omit<StylesProps<S>, "class" | "className">
  : unknown;

/** A root's props for the variants its part props are chosen by. */
type PartPropsOf<V> = V extends PartProps
  ? {
      [K in Exclude<keyof V, "base">]?: keyof V[K] extends "true" | "false"
        ? boolean
        : keyof V[K];
    }
  : unknown;

/**
 * One element with its styles: a component's root or one of its parts. A root
 * renders its template when one is defined for it (`defineTemplate`), which
 * also places its parts.
 */
export const defineElementSlot = <
  As extends ElementType,
  S extends Styles | undefined = undefined,
  V extends PartProps | undefined = undefined,
  R extends ElementType | undefined = undefined,
>(
  base: SlotName & {
    as: As;
    /**
     * What a Base UI part is painted as, as its `render` would say:
     * `{ as: Dialog.Close, render: Button }` is a close button that looks like
     * a Button. The look's own props (its variants, `className`, children) go
     * to it; the rest go to the part, which does what it does.
     */
    render?: R;
    styles?: S;
    props?: V;
    forwards?: SlotComponent<never>;
  },
): SlotComponent<
  ElementSlotPropsOf<As> &
    StylesPropsOf<S> &
    PartPropsOf<V> &
    LookPropsOf<As, R>
> => {
  const look = base.render === undefined ? undefined : lookKeysOf(base.render);
  const PartType = BASE_UI_PORTALS.has(base.as)
    ? containedPortal(base.as as ElementType)
    : (base.as as ElementType);
  const paint = ({ as, render, className, ...props }: ElementSlotProps) => {
    const { classes, rest } = styled(base as Styled & SlotName, props);
    const { children, ...attributes } = rest as typeof rest & {
      children?: ReactNode;
    };
    const merged = after(classes, className) || undefined;
    if (typeof base.as !== "string") {
      const Part = PartType;
      if (look !== undefined && render === undefined && as === undefined) {
        const own: Record<string, unknown> = {};
        const part: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(attributes)) {
          (look.has(key) ? own : part)[key] = value;
        }
        const painted = createElement(base.render as ElementType, {
          ...own,
          ...(merged !== undefined && { className: merged }),
          ...(children !== undefined && { children }),
        });
        return <Part {...part} render={painted} />;
      }
      const composed =
        render ?? (as === undefined ? undefined : createElement(as));
      // Only something to compose is handed on: a plain component drawn as a
      // part sees `render` when its author writes one, and not otherwise.
      return (
        <Part
          className={merged}
          {...(composed !== undefined && { render: composed })}
          {...attributes}
        >
          {children}
        </Part>
      );
    }
    return renderElement(
      as ?? base.as,
      { className: merged, ...attributes, children },
      render as RenderProp | undefined,
    );
  };
  return defineStyledSlot(
    base as unknown as SlotName & Styled,
    paint,
  ) as unknown as SlotComponent<
    ElementSlotPropsOf<As> &
      StylesPropsOf<S> &
      PartPropsOf<V> &
      LookPropsOf<As, R>
  >;
};

/** The props a look has that its Base UI part does not: `variant`, `size`. */
type LookPropsOf<As extends ElementType, R> = R extends ElementType
  ? Omit<
      ComponentProps<R>,
      keyof ComponentProps<As> | "render" | "className" | "children"
    >
  : unknown;

/** The props that belong to a look rather than to the part it paints. */
const lookKeysOf = (look: ElementType): Set<string> => {
  const meta = slotMetaOf(look);
  return new Set([
    ...(meta?.styles?.variantKeys ?? []).map(String),
    ...Object.keys(meta?.props ?? {}),
    "style",
  ]);
};

/**
 * Defines an icon slot — the slot that only exists because of the third rule.
 *
 * shadcn sizes its icons from the component root: `[&_svg]:shrink-0` and
 * `[&_svg:not([class*='size-'])]:size-4` are classes on the button that paint
 * the svg. There is no such class in FlowCn, so every one of those declarations
 * lands here, on the icon itself, where it can be seen and overridden.
 *
 * With `icon` the component IS the element, so the classes go straight onto the
 * svg and `size-4` means what it says. With neither `icon` nor children it still
 * paints an empty box of the right size: a slot an author has switched on but
 * not yet filled should be visible and selectable, not a gap.
 */
export type IconSlotProps = SlotProps & {
  icon?: ElementType;
  [prop: string]: unknown;
};

/**
 * An icon slot's props: an svg's and a Lucide icon's (`size`, `strokeWidth`,
 * `absoluteStrokeWidth`) and the slot's; `icon` replaces the glyph.
 */
export type IconSlotPropsOf = SlotProps &
  DataAttributes &
  Omit<LucideProps, "className" | "children" | "ref"> & {
    icon?: ElementType;
  };

export const defineIconSlot = <
  S extends Styles | undefined = undefined,
  V extends PartProps | undefined = undefined,
>(
  base: SlotName &
    Omit<Styled, "styles" | "props"> & {
      icon?: ElementType;
      styles?: S;
      props?: V;
    },
): SlotComponent<IconSlotPropsOf & StylesPropsOf<S> & PartPropsOf<V>> =>
  defineStyledSlot<IconSlotProps>(
    base,
    ({ icon = base.icon, className, ...props }) => {
      const { classes, rest } = styled(base, props);
      const { children, ...attributes } = rest as typeof rest & {
        children?: ReactNode;
      };
      const merged = after(classes, className) || undefined;
      if (icon !== undefined) {
        const Icon = icon as ElementType;
        return <Icon className={merged} aria-hidden="true" {...attributes} />;
      }
      // What is written in the icon says for itself whether it is announced:
      // a spinner's status is, a decorative svg hides itself.
      return (
        <span className={merged} {...attributes}>
          {children}
        </span>
      );
    },
  ) as unknown as SlotComponent<
    IconSlotPropsOf & StylesPropsOf<S> & PartPropsOf<V>
  >;

export const slotMetaOf = (type: unknown): SlotMeta | undefined =>
  typeof type === "function"
    ? (type as Partial<SlotComponent<SlotProps>>)[META]
    : undefined;

/** Drops keys an author left `undefined` so they cannot blank a default. */
const defined = (props: Record<string, unknown>): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) out[key] = value;
  }
  return out;
};

/**
 * A slot's props from its wiring and an override, as `render` merges them:
 * handlers chain, classNames concatenate, and otherwise the override wins —
 * but an `undefined` it left does not blank a default.
 */
export const mergeProps = (
  wired: Record<string, unknown>,
  authored: Record<string, unknown>,
): Record<string, unknown> => {
  const own = defined(authored);
  // Nothing written over the wiring: it is already what renders.
  if (Object.keys(own).length === 0) return wired;
  return {
    ...wired,
    ...own,
    ...chained(wired, own),
    className: after(wired["className"] as string, own["className"] as string),
  };
};

/**
 * A fragment's children, keyed so they stay unique once they are siblings of
 * everything else.
 *
 * `Children.toArray` keys by position — `.0`, `.1` — so the children of two
 * fragments, or of a fragment and its parent, would all be `.0`. Prefixing
 * with the fragment's own key keeps them apart, and keeps the key an author
 * gave the fragment (`groups.map(g => <Fragment key={g.id}>…`) meaningful.
 */
const flatten = (fragment: ReactElement<{ children?: ReactNode }>) => {
  const prefix = fragment.key ?? "";
  return Children.toArray(fragment.props.children).map((child) =>
    isValidElement(child)
      ? cloneElement(child, { key: `${prefix}/${child.key ?? ""}` })
      : child,
  );
};

/**
 * An instance's children as a flat list, fragments dissolved: a fragment is
 * punctuation, so `<>{a}{b}</>` is two children, not one, and a part produced
 * by a map or a conditional branch is still found.
 */
/** A child as written, and the key its `flattenChildren` copy would have. */
export type Keyed = { readonly node: ReactNode; readonly key: string | null };

const escapeKey = (key: string): string =>
  `$${key.replace(/[=:]/g, (match) => (match === "=" ? "=0" : "=2"))}`;

const keyOf = (child: ReactNode, index: number): string =>
  isValidElement(child) && child.key != null
    ? escapeKey(child.key)
    : index.toString(36);

/**
 * `Children.toArray`'s walk, keeping the children rather than copying them:
 * the same order and the same keys. `false` when it meets anything but text,
 * elements and arrays, for `toArray` itself to handle.
 */
const toArrayKeyed = (
  children: ReactNode,
  out: Keyed[],
  name: string,
): boolean => {
  if (children == null || typeof children === "boolean") return true;
  if (
    typeof children === "string" ||
    typeof children === "number" ||
    typeof children === "bigint"
  ) {
    out.push({ node: children, key: null });
    return true;
  }
  if (Array.isArray(children)) {
    const prefix = name === "" ? "." : `${name}:`;
    for (let index = 0; index < children.length; index++) {
      const child = children[index] as ReactNode;
      if (!toArrayKeyed(child, out, prefix + keyOf(child, index))) return false;
    }
    return true;
  }
  if (isValidElement(children)) {
    out.push({
      node: children,
      key: name === "" ? `.${keyOf(children, 0)}` : name,
    });
    return true;
  }
  return false;
};

/** A fragment's children, keyed as `flatten` and `flattenChildren` would. */
const fragmentKeyed = (
  children: ReactNode,
  fragment: string,
): Keyed[] | undefined => {
  const inner: Keyed[] = [];
  if (!toArrayKeyed(children, inner, "")) return undefined;
  const out: Keyed[] = [];
  for (const entry of inner) {
    if (!isValidElement(entry.node)) {
      out.push(entry);
      continue;
    }
    const key = `.${escapeKey(`${fragment}/${entry.key ?? ""}`)}`;
    if (entry.node.type === Fragment) {
      const nested = fragmentKeyed(
        (entry.node.props as { children?: ReactNode }).children,
        key,
      );
      if (nested === undefined) return undefined;
      out.push(...nested);
    } else out.push({ node: entry.node, key });
  }
  return out;
};

/**
 * What `flattenChildren` returns, without copying an element to key it: each
 * child as written, with the key the copy would have had. A part read from it
 * is never copied; `keyed` copies what is rendered as written.
 */
export const keyedChildren = (children: ReactNode): Keyed[] => {
  const top: Keyed[] = [];
  if (toArrayKeyed(children, top, "")) {
    const out: Keyed[] = [];
    let plain = true;
    for (const entry of top) {
      if (isValidElement(entry.node) && entry.node.type === Fragment) {
        const nested = fragmentKeyed(
          (entry.node.props as { children?: ReactNode }).children,
          entry.key ?? "",
        );
        if (nested === undefined) {
          plain = false;
          break;
        }
        out.push(...nested);
      } else out.push(entry);
    }
    if (plain) return out;
  }
  return flattenChildren(children).map((node) => ({
    node,
    key: isValidElement(node) ? node.key : null,
  }));
};

/** A child as `flattenChildren` would have returned it: an element keyed. */
export const keyed = ({ node, key }: Keyed): ReactNode =>
  isValidElement(node) && node.key !== key ? cloneElement(node, { key }) : node;

export const flattenChildren = (children: ReactNode): ReactNode[] =>
  Children.toArray(children).flatMap((child) =>
    isValidElement(child) && child.type === Fragment
      ? flattenChildren(
          flatten(child as ReactElement<{ children?: ReactNode }>),
        )
      : [child],
  );

/**
 * Handlers both layers set, run one after the other: the wiring's first, since
 * it is the component keeping its own promises, then the author's.
 */
const chained = (
  wired: Record<string, unknown>,
  authored: Record<string, unknown>,
): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, own] of Object.entries(authored)) {
    const base = wired[key];
    if (
      typeof own === "function" &&
      typeof base === "function" &&
      key.startsWith("on") &&
      key.charCodeAt(2) >= 65 &&
      key.charCodeAt(2) <= 90
    ) {
      out[key] = (...args: unknown[]) => {
        base(...args);
        own(...args);
      };
    }
  }
  return out;
};
