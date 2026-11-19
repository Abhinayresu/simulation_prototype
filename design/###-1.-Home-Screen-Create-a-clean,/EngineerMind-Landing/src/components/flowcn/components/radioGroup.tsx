/** @jsxImportSource ../core/template */

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { CircleIcon } from "lucide-react";

import {
  defineComponent,
  defineElement,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

export const RadioGroup = defineElement({
  name: "RadioGroup",
  as: RadioGroupPrimitive,
});

const itemVariants = defineVariants({
  inCard: [true, false],
  inField: ["horizontal", "responsive"],
  besideContent: [true, false],
});

export const RadioGroupItem = defineElement({
  name: "RadioGroupItem",
  as: RadioPrimitive.Root,
  variants: itemVariants,
});

export const RadioGroupItemIndicator = defineElement({
  name: "RadioGroupItemIndicator",
  as: RadioPrimitive.Indicator,
});

export const RadioGroupItemIcon = defineElement({
  name: "RadioGroupItemIcon",
  icon: CircleIcon,
});

const styles = defineStyles<typeof itemVariants>({
  base: {
    RadioGroup: "grid gap-2 w-full",
    RadioGroupItem:
      "rounded-full border border-input outline-none flex relative justify-center items-center shrink-0 size-4 aspect-square after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring disabled:opacity-50 disabled:cursor-not-allowed aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive aria-invalid:aria-checked:border-primary focus-visible:aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 focus-visible:dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:border-destructive/50 aria-invalid:aria-checked:dark:border-destructive/50 focus-visible:aria-invalid:aria-checked:dark:border-destructive/50 data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary dark:data-checked:bg-primary data-disabled:opacity-50 data-disabled:cursor-not-allowed",
    RadioGroupItemIndicator: "flex justify-center items-center size-4",
    RadioGroupItemIcon:
      "-translate-1/2 rounded-full bg-primary-foreground absolute top-1/2 left-1/2 size-2",
  },
  inCard: {
    true: {
      RadioGroupItem:
        "focus-visible:ring-0 focus-visible:not-data-checked:border-input aria-invalid:focus-visible:ring-3 aria-invalid:focus-visible:not-data-checked:border-destructive dark:aria-invalid:focus-visible:not-data-checked:border-destructive/50 focus-visible:data-checked:border-primary",
    },
  },
  compoundVariants: [
    {
      when: { besideContent: true, inField: "horizontal" },
      classes: { RadioGroupItem: "mt-px" },
    },
    {
      when: { besideContent: true, inField: "responsive" },
      classes: { RadioGroupItem: "@md/field-group:mt-px" },
    },
  ],
});

defineComponent({
  styles,
  structure: (
    <RadioGroup>
      <RadioGroupItem repeatable>
        <RadioGroupItemIndicator>
          <RadioGroupItemIcon />
        </RadioGroupItemIndicator>
      </RadioGroupItem>
    </RadioGroup>
  ),
});
