/** @jsxImportSource ../core/template */

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";

import {
  defineComponent,
  defineElement,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants({
  inCard: [true, false],
  inField: ["horizontal", "responsive"],
  besideContent: [true, false],
});

export const Checkbox = defineElement({
  name: "Checkbox",
  as: CheckboxPrimitive.Root,
  variants,
});

export const CheckboxIndicator = defineElement({
  name: "CheckboxIndicator",
  as: CheckboxPrimitive.Indicator,
});

export const CheckboxIcon = defineElement({
  name: "CheckboxIcon",
  icon: CheckIcon,
});

const styles = defineStyles<typeof variants>({
  base: {
    Checkbox:
      "transition-colors rounded-[4px] border border-input outline-none flex relative justify-center items-center shrink-0 size-4 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring disabled:opacity-50 disabled:cursor-not-allowed aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive aria-invalid:aria-checked:border-primary focus-visible:aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 focus-visible:dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:border-destructive/50 aria-invalid:aria-checked:dark:border-destructive/50 focus-visible:aria-invalid:aria-checked:dark:border-destructive/50 data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary dark:data-checked:bg-primary data-disabled:opacity-50 data-disabled:cursor-not-allowed",
    CheckboxIndicator:
      "transition-none text-current grid justify-center content-center",
    CheckboxIcon: "size-3.5",
  },
  inCard: {
    true: {
      Checkbox:
        "focus-visible:ring-0 focus-visible:not-data-checked:border-input aria-invalid:focus-visible:ring-3 aria-invalid:focus-visible:not-data-checked:border-destructive dark:aria-invalid:focus-visible:not-data-checked:border-destructive/50 focus-visible:data-checked:border-primary",
    },
  },
  compoundVariants: [
    {
      when: { besideContent: true, inField: "horizontal" },
      classes: { Checkbox: "mt-px" },
    },
    {
      when: { besideContent: true, inField: "responsive" },
      classes: { Checkbox: "@md/field-group:mt-px" },
    },
  ],
});

defineComponent({
  styles,
  structure: (
    <Checkbox>
      <CheckboxIndicator>
        <CheckboxIcon />
      </CheckboxIndicator>
    </Checkbox>
  ),
});
