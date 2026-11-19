/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Button, ButtonEndIcon, ButtonIcon, ButtonText } from "./button.tsx";

const variants = defineVariants(
  { size: ["xs", "sm", "icon-xs", "icon-sm"] },
  { defaults: { size: "xs" } },
);

export const InputGroupButton = defineElement({
  name: "InputGroupButton",
  as: Button,
  variants,
});

const styles = defineStyles<typeof variants>({
  base: {
    InputGroupButton: "shadow-none text-sm flex items-center gap-2",
    ButtonIcon: "ml-0",
    ButtonEndIcon: "mr-0",
  },
  size: {
    xs: {
      InputGroupButton: "rounded-[calc(var(--radius)-3px)] px-1.5 gap-1 h-6",
      ButtonIcon: "size-3.5",
      ButtonEndIcon: "size-3.5",
    },
    sm: {
      InputGroupButton: "rounded-lg h-8",
      ButtonIcon: "size-4",
      ButtonEndIcon: "size-4",
    },
    "icon-xs": {
      InputGroupButton: "rounded-[calc(var(--radius)-3px)] p-0 size-6",
      ButtonIcon: "size-4",
      ButtonEndIcon: "size-4",
    },
    "icon-sm": { InputGroupButton: "rounded-lg p-0 size-8" },
  },
});

const props = defineProps<typeof variants>({
  base: {
    InputGroupButton: { type: "button", variant: "ghost" },
    ButtonIcon: { present: false },
    ButtonEndIcon: { present: false },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <InputGroupButton>
      <ButtonIcon />
      <ButtonText>
        <Children />
      </ButtonText>
      <ButtonEndIcon />
    </InputGroupButton>
  ),
});
