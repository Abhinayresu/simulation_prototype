/** @jsxImportSource ../core/template */

import { Input as InputPrimitive } from "@base-ui/react/input";

import {
  defineComponent,
  defineElement,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants({
  inButtonGroup: ["horizontal", "vertical"],
  inResponsiveField: [true, false],
});

export const Input = defineElement({
  name: "Input",
  as: InputPrimitive,
  variants,
});

const styles = defineStyles<typeof variants>({
  base: {
    Input:
      "transition-colors contain-inline-size [contain-intrinsic-inline-size:20ch] rounded-lg bg-transparent text-base border border-input outline-none px-2.5 py-1 w-full h-8 min-w-0 file:font-medium file:bg-transparent file:text-foreground file:text-sm file:border-0 file:inline-flex file:h-6 placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 focus-visible:dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:border-destructive/50",
  },
  inButtonGroup: {
    horizontal: {
      Input:
        "rounded-none border-l-0 flex-1 first:rounded-l-lg first:border-l last:rounded-r-lg focus-visible:relative focus-visible:z-10",
    },
    vertical: {
      Input:
        "rounded-none border-t-0 flex-1 first:rounded-t-lg first:border-t last:rounded-b-lg focus-visible:relative focus-visible:z-10",
    },
  },
  inResponsiveField: { true: { Input: "@md/field-group:w-auto" } },
});

defineComponent({ styles, structure: <Input /> });
