/**
 * A part as its component's template draws it, for code that builds the tree
 * itself.
 *
 * A component's template gives each part its classes, from the root's styles,
 * and its props, from the root's props, for the variant values in force. A
 * library that renders a component's tree — react-day-picker its days, cmdk
 * its items — never runs that template, so the code a component is exported
 * as asks for each part here and draws it with what it gets.
 */

import { defaultsOf, slotMetaOf } from "./slots.tsx";

export type DrawnPart = {
  /** The part's classes for these values; `undefined` when it has none. */
  className: string | undefined;
  /** The props the root gives the part for these values, `present` aside. */
  props: Record<string, unknown>;
  /**
   * Whether the part is drawn for these values when an instance does not
   * write it: `present` in its props, `false` in `base` being "off until
   * written".
   */
  present: boolean;
  /** Whether it is drawn when written: only a variant's `present` turns it off. */
  presentWhenWritten: boolean;
};

const nameOf = (element: unknown): string => {
  const meta = slotMetaOf(element);
  if (meta === undefined) throw new Error("A part is a FlowCn element.");
  return meta.name;
};

/**
 * `part` of `root`'s component, drawn for `values`: the root's variants and
 * the part's own, each falling back to its default.
 */
export const partOf = (
  root: unknown,
  part: unknown,
  values: Readonly<Record<string, unknown>> = {},
): DrawnPart => {
  const meta = slotMetaOf(root);
  if (meta === undefined) throw new Error("A root is a FlowCn element.");
  const name = nameOf(part);
  const chosen: Record<string, unknown> = {
    ...defaultsOf(meta.variants),
    ...defaultsOf(slotMetaOf(part)?.variants),
  };
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined) chosen[key] = value;
  }
  const styles = meta.styles as
    | ((values: Record<string, unknown>) => Record<string, () => string>)
    | undefined;
  const className = styles?.(chosen)[name]?.() || undefined;

  const { base, ...byVariant } = meta.props ?? {};
  const props: Record<string, unknown> = { ...base?.[name] };
  let byValues: unknown;
  for (const [variant, perValue] of Object.entries(byVariant)) {
    const value = chosen[variant];
    if (typeof value !== "string" && typeof value !== "boolean") continue;
    const layer = perValue[String(value)]?.[name] as
      Readonly<Record<string, unknown>> | undefined;
    if (layer === undefined) continue;
    Object.assign(props, layer);
    if ("present" in layer) byValues = layer["present"];
  }
  const { present, ...rest } = props;
  return {
    className,
    props: rest,
    present: present !== false,
    presentWhenWritten: byValues !== false,
  };
};
