/**
 * A component: its variants, its styles and props, and its structure.
 *
 * ```tsx
 * const variants = defineVariants(
 *   { variant: ["default", "destructive"], withIcon: [true, false] },
 *   { defaults: { variant: "default" } },
 * );
 *
 * export const Alert = defineElement({ name: "Alert", as: "div", variants });
 * export const AlertIcon = defineElement({ name: "AlertIcon" });
 * …
 *
 * const styles = defineStyles<typeof variants>({
 *   base: { Alert: "relative grid …", AlertIcon: "size-4 …" },
 *   variant: { destructive: { Alert: "text-destructive" } },
 * });
 *
 * const props = defineProps<typeof variants>({
 *   base: { Alert: { role: "alert" }, AlertIcon: { present: false } },
 *   withIcon: { true: { AlertIcon: { present: true } } },
 * });
 *
 * defineComponent({ styles, props, structure: (<Alert><AlertIcon />…</Alert>) });
 * ```
 *
 * Styles and props share a shape: `base` for what always applies, then
 * variant, value, part. Styles also take `compoundVariants`, for classes that
 * apply only while several variant values hold at once. A variant applies when it has a value, its own or its
 * default; in `defineProps` an unset boolean variant is `false`, so its
 * `false` entry applies. tailwind-variants stays behind `defineStyles`.
 */

import type { ReactElement } from "react";
import { tv } from "tailwind-variants";

import {
  attachToRoot,
  withDefaults,
  type PartProps,
  type Styles,
} from "./slots.tsx";
import { defineTemplate } from "./template.tsx";

/** A component's variants: each name and the values it takes. */
export type VariantSpec = Readonly<
  Record<string, readonly (string | boolean)[]>
>;

type ValueOf<V, K extends keyof V> = V[K] extends readonly (infer T)[]
  ? T
  : never;

/** The props a component's variants add to its root. */
export type VariantValuesOf<V> = V extends VariantSpec
  ? {
      [K in keyof V]?: ValueOf<V, K> extends boolean ? boolean : ValueOf<V, K>;
    }
  : unknown;

type Keyed<V, K extends keyof V> = `${ValueOf<V, K> & (string | boolean)}`;

/**
 * Declares a component's variants; `[true, false]` is a boolean. A variant
 * with a default always has a value; one without chooses classes only when
 * set. For props, an unset boolean variant is `false`: its `false` entry in
 * `defineProps` applies.
 */
export const defineVariants = <const V extends VariantSpec>(
  variants: V,
  options?: { defaults?: VariantValuesOf<V> },
): V => withDefaults(variants, options?.defaults);

type PartClasses = Readonly<Record<string, string>>;

/**
 * Classes for when several variants hold at once: a link badge's hover is
 * `variant: "default"` AND `interactive: true`. Every value named must hold,
 * and an unset boolean variant is `false`, as in `defineProps`. Applied after
 * the variants' own classes, so they win over them.
 */
export type CompoundStyles<V> = {
  readonly when: VariantValuesOf<V>;
  readonly classes: PartClasses;
};

/**
 * Each part's classes, always, per variant value, and per combination of
 * values in `compoundVariants`.
 */
export type StylesSpec<V> = {
  base?: PartClasses;
  compoundVariants?: readonly CompoundStyles<V>[];
} & {
  [K in keyof V]?: { [Value in Keyed<V, K>]?: PartClasses };
};

/** A component's classes: each part's, and each variant value's, by part name. */
export const defineStyles = <V extends VariantSpec = Record<never, never>>(
  spec: NoInfer<StylesSpec<V>>,
): Styles => {
  const {
    base = {},
    compoundVariants = [],
    ...variants
  } = spec as {
    base?: PartClasses;
    compoundVariants?: readonly CompoundStyles<VariantSpec>[];
  } & Record<string, Record<string, PartClasses | undefined> | undefined>;
  for (const { when } of compoundVariants) {
    if (Object.keys(when).length < 2) {
      throw new Error(
        `A compound variant names two or more variants; ${JSON.stringify(when)} is an ordinary variant entry.`,
      );
    }
  }
  const named = [
    ...Object.keys(base),
    ...Object.values(variants).flatMap((values) =>
      Object.values(values ?? {}).flatMap((parts) => Object.keys(parts ?? {})),
    ),
    ...compoundVariants.flatMap(({ classes }) => Object.keys(classes)),
  ];
  // A variant or value only a compound names still has to be one
  // tailwind-variants knows, or it never reaches the compound. Added after the
  // written ones, whose order is the order their classes apply in.
  const declared: Record<string, Record<string, PartClasses>> = {
    ...(variants as Record<string, Record<string, PartClasses>>),
  };
  for (const { when } of compoundVariants) {
    for (const [variant, value] of Object.entries(when)) {
      declared[variant] = { [String(value)]: {}, ...declared[variant] };
    }
  }
  return tv({
    slots: Object.fromEntries(named.map((part) => [part, base[part] ?? ""])),
    variants: declared as never,
    compoundVariants: compoundVariants.map(({ when, classes }) => ({
      ...when,
      class: classes,
    })) as never,
  }) as unknown as Styles;
};

type PartValues = Readonly<Record<string, Readonly<Record<string, unknown>>>>;

export type PropsSpec<V> = { base?: PartValues } & {
  [K in keyof V]?: { [Value in Keyed<V, K>]?: PartValues };
};

/** A component's props for its parts: always, and per variant value. */
export const defineProps = <V extends VariantSpec = Record<never, never>>(
  spec: NoInfer<PropsSpec<V>>,
): PartProps => spec as PartProps;

/**
 * Makes a component of its root: the root's styles and props, and its
 * structure — the root written as itself, its parts inside.
 */
export const defineComponent = (component: {
  structure: ReactElement;
  styles?: Styles;
  props?: PartProps;
}): void => {
  const { structure, styles, props } = component;
  attachToRoot(structure.type, {
    structure,
    ...(styles !== undefined && { styles }),
    ...(props !== undefined && { props }),
  });
  defineTemplate(structure);
};
