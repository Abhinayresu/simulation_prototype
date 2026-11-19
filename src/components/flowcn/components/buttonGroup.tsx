/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Separator } from "./separator.tsx";

const variants = defineVariants(
  { orientation: ["horizontal", "vertical"], nested: [true, false] },
  { defaults: { orientation: "horizontal", nested: false } },
);

export const ButtonGroup = defineElement({
  name: "ButtonGroup",
  as: "div",
  variants,
});

export const ButtonGroupSeparator = defineElement({
  name: "ButtonGroupSeparator",
  as: Separator,
});

export const ButtonGroupText = defineElement({
  name: "ButtonGroupText",
  as: "div",
});

export const ButtonGroupTextIcon = defineElement({
  name: "ButtonGroupTextIcon",
});

export const ButtonGroupTextLabel = defineElement({
  name: "ButtonGroupTextLabel",
  as: "span",
});

const styles = defineStyles<typeof variants>({
  base: {
    ButtonGroup: "flex items-stretch w-fit",
    ButtonGroupSeparator:
      "bg-input relative self-stretch data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto",
    ButtonGroupText:
      "font-medium rounded-lg bg-muted text-sm border flex px-2.5 items-center gap-2",
    ButtonGroupTextIcon: "pointer-events-none size-4",
  },
  orientation: {
    horizontal: {
      ButtonGroupText:
        "rounded-none border-l-0 first:rounded-l-lg first:border-l last:rounded-r-lg focus-visible:relative focus-visible:z-10",
    },
    vertical: {
      ButtonGroup: "flex-col",
      ButtonGroupText:
        "rounded-none border-t-0 first:rounded-t-lg first:border-t last:rounded-b-lg focus-visible:relative focus-visible:z-10",
    },
  },
  nested: { true: { ButtonGroup: "gap-2" } },
});

const props = defineProps<typeof variants>({
  base: {
    ButtonGroup: { role: "group" },
    ButtonGroupSeparator: { orientation: "vertical" },
    ButtonGroupTextIcon: { present: false },
  },
  orientation: {
    horizontal: { Children: { inButtonGroup: "horizontal" } },
    vertical: {
      ButtonGroupSeparator: { orientation: "horizontal" },
      Children: { inButtonGroup: "vertical" },
    },
  },
  nested: { true: { Children: { inButtonGroup: undefined } } },
});

defineComponent({
  styles,
  props,
  structure: (
    <ButtonGroup>
      <ButtonGroupSeparator repeatable />
      <ButtonGroupText repeatable>
        <ButtonGroupTextIcon />
        <ButtonGroupTextLabel>
          <Children />
        </ButtonGroupTextLabel>
      </ButtonGroupText>
      <Children />
    </ButtonGroup>
  ),
});
