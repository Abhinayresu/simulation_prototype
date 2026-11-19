/**
 * The JSX of component files, whose elements are declarations in a structure.
 * A component file opts in with a pragma at its top:
 *
 * ```tsx
 * /** @jsxImportSource ../core/template *\/
 * ```
 *
 * At runtime it is React's JSX. Only the types differ: a declaration says
 * where a part sits, and nothing else. It takes `repeatable` and the part's
 * default content as children; `<Children />` takes its `name`. A part's props
 * are set in the component's `defineProps`, the one place they are written.
 * Outside component files an element is an instance, checked as React checks
 * it.
 */

import type { JSX as ReactJSX, ReactNode } from "react";

import type { Children } from "../template.tsx";

export { Fragment, jsx, jsxs } from "react/jsx-runtime";

export declare namespace JSX {
  type ElementType = ReactJSX.ElementType;
  interface Element extends ReactJSX.Element {}
  interface ElementClass extends ReactJSX.ElementClass {}
  interface ElementAttributesProperty
    extends ReactJSX.ElementAttributesProperty {}
  interface ElementChildrenAttribute
    extends ReactJSX.ElementChildrenAttribute {}
  type LibraryManagedAttributes<C, _P> = C extends typeof Children
    ? {
        /** How the root's props address this place, when not `Children`. */
        name?: string;
        /** What shows until the instance writes content. */
        children?: ReactNode;
      }
    : {
        /** The instance may write this part any number of times, where it likes. */
        repeatable?: boolean;
        /** The part's default content. */
        children?: ReactNode;
      };
  interface IntrinsicAttributes extends ReactJSX.IntrinsicAttributes {}
  interface IntrinsicClassAttributes<
    T,
  > extends ReactJSX.IntrinsicClassAttributes<T> {}
  interface IntrinsicElements extends ReactJSX.IntrinsicElements {}
}
