/** @jsxImportSource ../core/template */

import { defineComponent, defineElement, defineStyles } from "../core/index.ts";

export const Skeleton = defineElement({ name: "Skeleton", as: "div" });

const styles = defineStyles({
  base: { Skeleton: "animate-pulse rounded-md bg-muted" },
});

defineComponent({ styles, structure: <Skeleton /> });
