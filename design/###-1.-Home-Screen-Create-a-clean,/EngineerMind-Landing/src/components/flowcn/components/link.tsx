/** @jsxImportSource ../core/template */

import {
  defineComponent,
  defineElement,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants(
  { variant: ["default", "primary"] },
  { defaults: { variant: "default" } },
);

export const Link = defineElement({ name: "Link", as: "a", variants });

const styles = defineStyles<typeof variants>({
  base: { Link: "underline" },
  variant: {
    default: { Link: "underline-offset-3 hover:text-foreground" },
    primary: { Link: "underline-offset-4 hover:text-primary" },
  },
});

defineComponent({ styles, structure: <Link /> });
