/** @jsxImportSource ../core/template */

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

export const Textarea = defineElement({
  name: "Textarea",
  as: "textarea",
  variants,
});

const styles = defineStyles<typeof variants>({
  base: {
    Textarea:
      "transition-colors field-sizing-content rounded-lg bg-transparent text-base border border-input outline-none flex px-2.5 py-2 w-full min-h-16 placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-input/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 focus-visible:dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:border-destructive/50",
  },
  inButtonGroup: {
    horizontal: {
      Textarea:
        "rounded-none border-l-0 first:rounded-l-lg first:border-l last:rounded-r-lg focus-visible:relative focus-visible:z-10",
    },
    vertical: {
      Textarea:
        "rounded-none border-t-0 first:rounded-t-lg first:border-t last:rounded-b-lg focus-visible:relative focus-visible:z-10",
    },
  },
  inResponsiveField: { true: { Textarea: "@md/field-group:w-auto" } },
});

defineComponent({ styles, structure: <Textarea /> });
