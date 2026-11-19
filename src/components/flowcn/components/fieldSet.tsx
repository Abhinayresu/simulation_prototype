/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { FieldDescription } from "./field.tsx";

const variants = defineVariants({ dense: [true, false] });

export const FieldSet = defineElement({
  name: "FieldSet",
  as: "fieldset",
  variants,
});

const fieldLegendVariants = defineVariants(
  { variant: ["legend", "label"] },
  { defaults: { variant: "legend" } },
);

export const FieldLegend = defineElement({
  name: "FieldLegend",
  as: "legend",
  variants: fieldLegendVariants,
});

const fieldDescriptionVariants = defineVariants({ afterLegend: [true, false] });

const styles = defineStyles<
  typeof variants & typeof fieldLegendVariants & typeof fieldDescriptionVariants
>({
  base: {
    FieldSet: "flex flex-col gap-4",
    FieldLegend: "font-medium mb-1.5",
    FieldDescription:
      "font-normal text-left text-muted-foreground text-sm leading-normal -mt-1 last:mt-0",
  },
  dense: { true: { FieldSet: "gap-3" } },
  variant: {
    legend: { FieldLegend: "text-base" },
    label: { FieldLegend: "text-sm" },
  },
  afterLegend: { true: { FieldDescription: "-mt-1.5 last:-mt-1.5" } },
});

const props = defineProps<typeof variants>({
  base: { FieldLegend: { present: false } },
});

defineComponent({
  styles,
  props,
  structure: (
    <FieldSet>
      <FieldLegend>
        <Children />
      </FieldLegend>
      <FieldDescription repeatable />
      <Children />
    </FieldSet>
  ),
});
