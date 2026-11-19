/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Input } from "./input.tsx";
import { Kbd } from "./kbd.tsx";
import { Textarea } from "./textarea.tsx";

const variants = defineVariants(
  {
    textarea: [true, false],
    blockStart: [true, false],
    blockEnd: [true, false],
    disabled: [true, false],
    invalid: [true, false],
    inButtonGroup: ["horizontal", "vertical"],
    inResponsiveField: [true, false],
  },
  { defaults: { invalid: false } },
);

export const InputGroup = defineElement({
  name: "InputGroup",
  as: "div",
  variants,
});

export const InputGroupInput = defineElement({
  name: "InputGroupInput",
  as: Input,
});

export const InputGroupTextarea = defineElement({
  name: "InputGroupTextarea",
  as: Textarea,
});

const addonVariants = defineVariants(
  {
    align: ["inline-start", "inline-end", "block-start", "block-end"],
    inset: ["none", "button", "kbd"],
    bordered: [true, false],
  },
  { defaults: { align: "inline-start", inset: "none" } },
);

export const InputGroupAddon = defineElement({
  name: "InputGroupAddon",
  as: "div",
  variants: addonVariants,
});

export const InputGroupAddonIcon = defineElement({
  name: "InputGroupAddonIcon",
});

const styles = defineStyles<typeof variants & typeof addonVariants>({
  base: {
    InputGroup:
      "transition-colors rounded-lg border border-input outline-none flex relative items-center w-full h-8 min-w-0 dark:bg-input/30",
    InputGroupInput:
      "ring-0 rounded-none bg-transparent border-0 flex-1 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
    InputGroupTextarea:
      "resize-none ring-0 rounded-none bg-transparent border-0 py-2 flex-1 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
    InputGroupAddon:
      "font-medium select-none cursor-text text-muted-foreground text-sm flex py-1.5 justify-center items-center gap-2 h-auto",
    InputGroupAddonIcon: "shrink-0 size-4",
    Kbd: "rounded-[calc(var(--radius)-5px)]",
  },
  textarea: { true: { InputGroup: "h-auto" } },
  blockStart: {
    true: { InputGroup: "flex-col h-auto", InputGroupInput: "pb-3" },
  },
  blockEnd: {
    true: { InputGroup: "flex-col h-auto", InputGroupInput: "pt-3" },
  },
  disabled: { true: { InputGroup: "opacity-50 bg-input/50 dark:bg-input/80" } },
  invalid: {
    true: {
      InputGroup:
        "ring-3 ring-destructive/20 border-destructive dark:ring-destructive/40 dark:border-destructive/50",
    },
    false: {
      InputGroup:
        "focus-within:ring-3 focus-within:ring-ring/50 focus-within:border-ring",
    },
  },
  inButtonGroup: {
    horizontal: {
      InputGroup:
        "rounded-none border-l-0 first:rounded-l-lg first:border-l last:rounded-r-lg focus-visible:relative focus-visible:z-10",
    },
    vertical: {
      InputGroup:
        "rounded-none border-t-0 first:rounded-t-lg first:border-t last:rounded-b-lg focus-visible:relative focus-visible:z-10",
    },
  },
  inResponsiveField: { true: { InputGroup: "@md/field-group:w-auto" } },
  align: {
    "inline-start": { InputGroupAddon: "-mr-1 pl-2 order-first" },
    "inline-end": { InputGroupAddon: "-ml-1 pr-2 order-last" },
    "block-start": {
      InputGroupAddon: "px-2.5 pt-2 justify-start order-first w-full",
    },
    "block-end": {
      InputGroupAddon: "px-2.5 pb-2 justify-start order-last w-full",
    },
  },
  compoundVariants: [
    {
      when: { bordered: true, align: "block-start" },
      classes: { InputGroupAddon: "border-b pb-2" },
    },
    {
      when: { bordered: true, align: "block-end" },
      classes: { InputGroupAddon: "border-t pt-2" },
    },
    {
      when: { inset: "button", align: "inline-start" },
      classes: { InputGroupAddon: "-ml-[0.3rem]" },
    },
    {
      when: { inset: "kbd", align: "inline-start" },
      classes: { InputGroupAddon: "-ml-[0.15rem]" },
    },
    {
      when: { inset: "button", align: "inline-end" },
      classes: { InputGroupAddon: "-mr-[0.3rem]" },
    },
    {
      when: { inset: "kbd", align: "inline-end" },
      classes: { InputGroupAddon: "-mr-[0.15rem]" },
    },
  ],
});

const props = defineProps<typeof variants>({
  base: {
    InputGroup: { role: "group" },
    InputGroupInput: { present: false },
    InputGroupTextarea: { present: false },
    InputGroupAddon: { role: "group" },
    InputGroupAddonIcon: { present: false },
  },
  disabled: {
    true: {
      InputGroupInput: { disabled: true },
      InputGroupTextarea: { disabled: true },
    },
  },
  invalid: {
    true: {
      InputGroupInput: { "aria-invalid": true },
      InputGroupTextarea: { "aria-invalid": true },
    },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <InputGroup>
      <InputGroupInput />
      <InputGroupTextarea />
      <InputGroupAddon repeatable>
        <InputGroupAddonIcon />
        <Kbd repeatable />
        <Children />
      </InputGroupAddon>
      <Children />
    </InputGroup>
  ),
});
