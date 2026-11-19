/** @jsxImportSource ../core/template */

import { defineComponent, defineElement, defineStyles } from "../core/index.ts";

import { Kbd } from "./kbd.tsx";

export const KbdGroup = defineElement({ name: "KbdGroup", as: "kbd" });

const styles = defineStyles({
  base: { KbdGroup: "inline-flex items-center gap-1" },
});

defineComponent({
  styles,
  structure: (
    <KbdGroup>
      <Kbd repeatable />
    </KbdGroup>
  ),
});
