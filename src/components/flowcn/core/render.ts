/**
 * Base UI's `render` prop, for FlowCn's own elements.
 *
 * shadcn composes an element into another with `render={<a href="…"/>}`: the
 * badge keeps its classes and what it does and becomes the anchor. Base UI parts
 * take `render` natively, but a FlowCn element that is a plain `<span>` or
 * `<div>` has to do the composing itself — otherwise `render` lands on the
 * element as an attribute, `render="[object Object]"`, and nothing composes.
 *
 * The merge is Base UI's: the rendered element's own props win, class names
 * concatenate with the component's first, and the component's children fill
 * the element unless it brought its own.
 */

import {
  cloneElement,
  createElement,
  isValidElement,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "./cn.ts";

type Props = Record<string, unknown> & {
  className?: string;
  children?: ReactNode;
};

export type RenderProp =
  ReactElement | ((props: Record<string, unknown>) => ReactElement);

/** Renders `tag` with `props`, or composes the props into `render` when given. */
export const renderElement = (
  tag: ElementType,
  props: Props,
  render: RenderProp | undefined,
): ReactElement => {
  if (render === undefined) return createElement(tag, props);
  if (typeof render === "function") return render(props);
  if (!isValidElement(render)) return createElement(tag, props);
  const own = render.props as Props;
  return cloneElement(render, {
    ...props,
    ...own,
    className: cn(props.className, own.className),
    children: own.children ?? props.children,
  } as Props);
};
