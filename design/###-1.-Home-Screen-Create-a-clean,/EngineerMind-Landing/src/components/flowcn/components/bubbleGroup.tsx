/** @jsxImportSource ../core/template */

import { defineComponent, defineElement, defineStyles } from "../core/index.ts";

import { Bubble } from "./bubble.tsx";

export const BubbleGroup = defineElement({ name: "BubbleGroup", as: "div" });

const styles = defineStyles({
  base: { BubbleGroup: "flex flex-col gap-2 min-w-0" },
});

defineComponent({
  styles,
  structure: (
    <BubbleGroup>
      <Bubble repeatable />
    </BubbleGroup>
  ),
});
