/** @jsxImportSource ../core/template */

import {
  defineComponent,
  defineElement,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants(
  { ratio: ["square", "video"] },
  { defaults: { ratio: "square" } },
);

export const AspectRatio = defineElement({
  name: "AspectRatio",
  as: "div",
  variants,
});

const styles = defineStyles<typeof variants>({
  base: { AspectRatio: "relative" },
  ratio: {
    square: { AspectRatio: "aspect-square" },
    video: { AspectRatio: "aspect-video" },
  },
});

defineComponent({ styles, structure: <AspectRatio /> });
