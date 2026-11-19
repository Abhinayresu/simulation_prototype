/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineStyles,
} from "../core/index.ts";

export const Trace = defineElement({ name: "Trace", as: "div" });

const styles = defineStyles({
  base: { Trace: "flex flex-col gap-2 w-full min-w-0" },
});

defineComponent({
  styles,
  structure: (
    <Trace>
      <Children />
    </Trace>
  ),
});
