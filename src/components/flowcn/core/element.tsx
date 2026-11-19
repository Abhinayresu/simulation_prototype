/**
 * An element of a component: its root or one of its parts.
 *
 * ```tsx
 * export const Accordion = defineElement({ name: "Accordion", as: AccordionPrimitive.Root });
 * export const AccordionTriggerIcon = defineElement({ name: "AccordionTriggerIcon", icon: ChevronDownIcon });
 * ```
 *
 * `as` makes it an element — a tag or a Base UI part, what it behaves as;
 * `render` is what it is drawn as: with `as`, a look for that part
 * (`{ as: Dialog.Close, render: Button }`); without, another component's part
 * under this name (`{ render: ButtonIcon }`, the close button's icon). `icon`
 * alone makes an icon. An element declares its `variants`, which type its
 * props: a root's choose for the whole component, a part's for itself and the
 * parts inside it. `defineComponent` gives the root styles, props and
 * structure.
 *
 * A variant chooses classes and stops there, unless what the element is `as`
 * takes it too: another component that declares the same variant, or a Base UI
 * part whose prop it is (`orientation`, `modal`, from `BASE_UI_PROPS`) — its
 * default included. The types check every Base UI part against that list.
 *
 * `generic: true` keeps a generic Base UI root's type parameters: a select's
 * value type reaches its `onValueChange`.
 */

import type { ComponentProps, ElementType, ReactNode } from "react";

import type { VariantSpec, VariantValuesOf } from "./component.tsx";
import type { RenderProp } from "./render.ts";
import {
  type BASE_UI_PROPS,
  type DataAttributes,
  defineElementSlot,
  defineIconSlot,
  type SlotComponent,
  type SlotProps,
} from "./slots.tsx";

type Declared<V> = {
  /** The element's variants, from `defineVariants`. */
  variants?: V;
};

type BaseUiProp = (typeof BASE_UI_PROPS)[number];

/**
 * A Base UI part's variants the engine would get wrong: a prop the part takes
 * that is not in `BASE_UI_PROPS`, so it would never reach it, or one in the list
 * the part does not take, so it would reach the DOM.
 */
type Mispassed<As, V> = As extends string | SlotComponent<never>
  ? never
  : {
      [K in keyof V]: K extends keyof ComponentProps<As & ElementType>
        ? Exclude<K, BaseUiProp>
        : Extract<K, BaseUiProp>;
    }[keyof V];

type Passing<As, V> = [Mispassed<As, V>] extends [never]
  ? unknown
  : {
      "a variant named as a Base UI prop": `${Mispassed<As, V> & string} — list it in BASE_UI_PROPS, or rename it`;
    };

type WithVariants<C, V> =
  C extends SlotComponent<infer P extends SlotProps>
    ? SlotComponent<P & VariantValuesOf<V>>
    : C;

type IconOptions = Omit<
  Parameters<typeof defineIconSlot<undefined, undefined>>[0],
  "styles" | "props" | "forwards"
> & {
  /** The other component's part this one is drawn as. */
  render?: SlotComponent<never>;
};

type ElementOptions<
  As extends ElementType,
  R extends ElementType | undefined,
> = Omit<
  Parameters<typeof defineElementSlot<As, undefined, undefined, R>>[0],
  "styles" | "props"
>;

export function defineElement<V extends VariantSpec | undefined = undefined>(
  options: IconOptions & Declared<V>,
): WithVariants<ReturnType<typeof defineIconSlot<undefined, undefined>>, V>;
/**
 * A generic Base UI root, `Select.Root` say, with `generic: true`: the element
 * keeps the root's type parameters, so `onValueChange` sees the values the
 * instance gives. It is typed as a plain function of the root's props, which
 * is what lets TypeScript carry them; at runtime it is the same element.
 */
export function defineElement<
  P extends object,
  V extends VariantSpec | undefined = undefined,
>(
  options: {
    name: string;
    as: (props: P) => ReactNode;
    generic: true;
  } & Declared<V> &
    Passing<(props: P) => ReactNode, V>,
): (
  props: SlotProps &
    DataAttributes &
    Omit<P, "className" | "children" | "render"> & {
      as?: ElementType;
      render?: "render" extends keyof P ? P["render"] : RenderProp;
    } & VariantValuesOf<V>,
) => ReactNode;
export function defineElement<
  As extends ElementType,
  R extends ElementType | undefined = undefined,
  V extends VariantSpec | undefined = undefined,
>(
  options: ElementOptions<As, R> & Declared<V> & Passing<As, V>,
): WithVariants<
  ReturnType<typeof defineElementSlot<As, undefined, undefined, R>>,
  V
>;
export function defineElement(
  options: (
    | Parameters<typeof defineIconSlot>[0]
    | Parameters<typeof defineElementSlot>[0]
  ) &
    Declared<VariantSpec>,
): unknown {
  if ("as" in options) {
    const { generic: _generic, ...element } = options as Parameters<
      typeof defineElementSlot
    >[0] & { generic?: true };
    return defineElementSlot(element);
  }
  const { render, ...icon } = options as IconOptions;
  return defineIconSlot({
    ...icon,
    ...(render !== undefined && { forwards: render }),
  } as Parameters<typeof defineIconSlot>[0]);
}
