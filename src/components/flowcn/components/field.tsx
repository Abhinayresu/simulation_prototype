/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { FieldLabel } from "./fieldLabel.tsx";
import { Label } from "./label.tsx";

const variants = defineVariants(
  {
    orientation: ["vertical", "horizontal", "responsive"],
    withContent: [true, false],
    invalid: [true, false],
    disabled: [true, false],
    inCard: [true, false],
  },
  { defaults: { orientation: "vertical" } },
);

export const Field = defineElement({ name: "Field", as: "div", variants });

const contentVariants = defineVariants(
  { orientation: ["none"] },
  { defaults: { orientation: "none" } },
);

export const FieldContent = defineElement({
  name: "FieldContent",
  as: "div",
  variants: contentVariants,
});

const titleVariants = defineVariants({ disabled: [true, false] });

export const FieldTitle = defineElement({
  name: "FieldTitle",
  as: "div",
  variants: titleVariants,
});

const descriptionVariants = defineVariants({ afterLegend: [true, false] });

export const FieldDescription = defineElement({
  name: "FieldDescription",
  as: "p",
  variants: descriptionVariants,
});

export const FieldError = defineElement({ name: "FieldError", as: "div" });

export const FieldErrorList = defineElement({
  name: "FieldErrorList",
  as: "ul",
});

const styles = defineStyles<
  typeof variants &
    typeof contentVariants &
    typeof titleVariants &
    typeof descriptionVariants
>({
  base: {
    Field: "flex gap-2 w-full",
    FieldContent: "leading-snug flex flex-col flex-1 gap-0.5",
    FieldTitle: "font-medium text-sm flex items-center gap-2 w-fit",
    FieldDescription:
      "font-normal text-left text-muted-foreground text-sm leading-normal -mt-1 last:mt-0",
    FieldError: "font-normal text-destructive text-sm",
    FieldErrorList: "list-disc flex ml-4 flex-col gap-1",
  },
  orientation: {
    vertical: {
      Field: "flex-col",
      FieldLabel: "w-full",
      FieldDescription: "w-full",
      FieldError: "w-full",
    },
    horizontal: {
      Field: "flex-row items-center",
      FieldLabel: "flex-auto",
      FieldDescription: "text-balance",
    },
    responsive: {
      Field: "flex-col @md/field-group:flex-row @md/field-group:items-center",
      FieldLabel: "w-full @md/field-group:flex-auto @md/field-group:w-auto",
    },
  },
  invalid: { true: { Field: "text-destructive" } },
  inCard: { true: { Field: "p-2.5" } },
  compoundVariants: [
    {
      when: { withContent: true, orientation: "horizontal" },
      classes: { Field: "items-start" },
    },
    {
      when: { withContent: true, orientation: "responsive" },
      classes: { Field: "@md/field-group:items-start" },
    },
  ],
  disabled: { true: { FieldTitle: "opacity-50" } },
  afterLegend: { true: { FieldDescription: "-mt-1.5 last:-mt-1.5" } },
});

const props = defineProps<
  typeof variants & typeof contentVariants & typeof titleVariants
>({
  base: {
    Field: { role: "group" },
    FieldError: { role: "alert" },
    FieldErrorList: { present: false },
  },
  disabled: {
    true: { FieldLabel: { inDisabled: true }, Label: { inDisabled: true } },
  },
  orientation: {
    horizontal: { Children: { inField: "horizontal" } },
    responsive: {
      Children: { inField: "responsive", inResponsiveField: true },
    },
  },
  withContent: { true: { Children: { besideContent: true } } },
  inCard: { true: { Children: { inCard: true } } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Field>
      <FieldLabel repeatable />
      <Label repeatable />
      <FieldContent repeatable />
      <FieldTitle repeatable />
      <FieldDescription repeatable />
      <FieldError repeatable>
        <Children />
        <FieldErrorList>
          <Children />
        </FieldErrorList>
      </FieldError>
      <Children />
    </Field>
  ),
});
