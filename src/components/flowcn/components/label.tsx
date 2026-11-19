/** @jsxImportSource ../core/template */

import {
  defineComponent,
  defineElement,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants({
  disabled: [true, false],
  inDisabled: [true, false],
});

export const Label = defineElement({ name: "Label", as: "label", variants });

const styles = defineStyles<typeof variants>({
  base: {
    Label:
      "font-medium select-none text-sm leading-none flex items-center gap-2",
  },
  disabled: { true: { Label: "opacity-50 cursor-not-allowed" } },
  inDisabled: { true: { Label: "opacity-50 pointer-events-none" } },
});

defineComponent({ styles, structure: <Label /> });
