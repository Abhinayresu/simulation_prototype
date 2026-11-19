/** @jsxImportSource ../core/template */

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Button, ButtonEndIcon, ButtonIcon } from "./button.tsx";
import { InputGroupButton } from "./inputGroupButton.tsx";

const variants = defineVariants(
  { trigger: [true, false], filled: [true, false], invalid: [true, false] },
  { defaults: { filled: false, invalid: false } },
);

export const Combobox = defineElement({
  name: "Combobox",
  as: ComboboxPrimitive.Root,
  generic: true,
  variants,
});

export const ComboboxTrigger = defineElement({
  name: "ComboboxTrigger",
  as: ComboboxPrimitive.Trigger,
});

export const ComboboxTriggerIcon = defineElement({
  name: "ComboboxTriggerIcon",
  icon: ChevronDownIcon,
  render: ButtonEndIcon,
});

export const ComboboxInputGroup = defineElement({
  name: "ComboboxInputGroup",
  as: ComboboxPrimitive.InputGroup,
});

export const ComboboxInput = defineElement({
  name: "ComboboxInput",
  as: ComboboxPrimitive.Input,
});

export const ComboboxInputGroupAddon = defineElement({
  name: "ComboboxInputGroupAddon",
  as: "div",
});

export const ComboboxInputGroupClear = defineElement({
  name: "ComboboxInputGroupClear",
  as: ComboboxPrimitive.Clear,
  render: InputGroupButton,
});

export const ComboboxInputGroupClearIcon = defineElement({
  name: "ComboboxInputGroupClearIcon",
  icon: XIcon,
  render: ButtonIcon,
});

export const ComboboxInputGroupTrigger = defineElement({
  name: "ComboboxInputGroupTrigger",
  as: ComboboxPrimitive.Trigger,
  render: InputGroupButton,
});

export const ComboboxInputGroupTriggerIcon = defineElement({
  name: "ComboboxInputGroupTriggerIcon",
  icon: ChevronDownIcon,
  render: ButtonEndIcon,
});

export const ComboboxChips = defineElement({
  name: "ComboboxChips",
  as: ComboboxPrimitive.Chips,
  render: ComboboxPrimitive.InputGroup,
});

export const ComboboxChip = defineElement({
  name: "ComboboxChip",
  as: ComboboxPrimitive.Chip,
});

export const ComboboxChipRemove = defineElement({
  name: "ComboboxChipRemove",
  as: ComboboxPrimitive.ChipRemove,
  render: Button,
});

export const ComboboxChipRemoveIcon = defineElement({
  name: "ComboboxChipRemoveIcon",
  icon: XIcon,
  render: ButtonIcon,
});

export const ComboboxChipsInput = defineElement({
  name: "ComboboxChipsInput",
  as: ComboboxPrimitive.Input,
});

export const ComboboxClear = defineElement({
  name: "ComboboxClear",
  as: ComboboxPrimitive.Clear,
  render: InputGroupButton,
});

export const ComboboxClearIcon = defineElement({
  name: "ComboboxClearIcon",
  icon: XIcon,
  render: ButtonIcon,
});

export const ComboboxPortal = defineElement({
  name: "ComboboxPortal",
  as: ComboboxPrimitive.Portal,
});

export const ComboboxPositioner = defineElement({
  name: "ComboboxPositioner",
  as: ComboboxPrimitive.Positioner,
});

export const ComboboxContent = defineElement({
  name: "ComboboxContent",
  as: ComboboxPrimitive.Popup,
});

export const ComboboxSearch = defineElement({
  name: "ComboboxSearch",
  as: ComboboxPrimitive.Input,
});

export const ComboboxEmpty = defineElement({
  name: "ComboboxEmpty",
  as: ComboboxPrimitive.Empty,
});

export const ComboboxList = defineElement({
  name: "ComboboxList",
  as: ComboboxPrimitive.List,
});

export const ComboboxItem = defineElement({
  name: "ComboboxItem",
  as: ComboboxPrimitive.Item,
});

export const ComboboxItemIcon = defineElement({ name: "ComboboxItemIcon" });

export const ComboboxItemIndicator = defineElement({
  name: "ComboboxItemIndicator",
  as: ComboboxPrimitive.ItemIndicator,
});

export const ComboboxItemCheckIcon = defineElement({
  name: "ComboboxItemCheckIcon",
  icon: CheckIcon,
});

export const ComboboxGroup = defineElement({
  name: "ComboboxGroup",
  as: ComboboxPrimitive.Group,
});

export const ComboboxLabel = defineElement({
  name: "ComboboxLabel",
  as: ComboboxPrimitive.GroupLabel,
});

export const ComboboxSeparator = defineElement({
  name: "ComboboxSeparator",
  as: ComboboxPrimitive.Separator,
});

export const ComboboxValue = defineElement({
  name: "ComboboxValue",
  as: ComboboxPrimitive.Value,
});

const styles = defineStyles<typeof variants>({
  base: {
    ComboboxTriggerIcon:
      "pointer-events-none text-muted-foreground mr-0 size-4",
    ComboboxInputGroup:
      "transition-colors rounded-lg border border-input outline-none flex relative items-center w-auto h-8 min-w-0 dark:bg-input/30 data-disabled:opacity-50 data-disabled:bg-input/50 dark:data-disabled:bg-input/80",
    ComboboxInput:
      "transition-colors shadow-none rounded-none bg-transparent text-base border-0 outline-none px-2.5 py-1 flex-1 w-full h-8 min-w-0 placeholder:text-muted-foreground disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm",
    ComboboxInputGroupAddon:
      "font-medium select-none cursor-text text-muted-foreground text-sm flex -mr-[0.3rem] -ml-1 py-1.5 pr-2 justify-center items-center order-last gap-2 h-auto",
    ComboboxInputGroupClearIcon: "pointer-events-none size-4",
    ComboboxInputGroupTrigger:
      "hidden first:inline-flex data-pressed:bg-transparent",
    ComboboxInputGroupTriggerIcon:
      "pointer-events-none text-muted-foreground mr-0 size-4",
    ComboboxChips:
      "transition-colors rounded-lg bg-transparent bg-clip-padding text-sm border border-input flex py-1 flex-wrap items-center gap-1 min-h-8 dark:bg-input/30",
    ComboboxChip:
      "font-medium whitespace-nowrap rounded-sm bg-muted text-foreground text-xs flex px-1.5 justify-center items-center gap-1 w-fit h-5.25 data-disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-not-allowed",
    ComboboxChipRemove: "opacity-50 -mr-1.5 -ml-1 hover:opacity-100",
    ComboboxChipRemoveIcon: "pointer-events-none",
    ComboboxChipsInput: "outline-none flex-1 min-w-16",
    ComboboxClearIcon: "pointer-events-none size-4",
    ComboboxPositioner: "z-50 isolate",
    ComboboxContent:
      "origin-(--transform-origin) duration-100 ring ring-foreground/10 shadow-md rounded-lg bg-popover text-popover-foreground relative w-(--anchor-width) min-w-(--anchor-width) max-w-(--available-width) max-h-(--available-height) overflow-hidden group/combobox-content data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
    ComboboxSearch:
      "transition-colors rounded-lg bg-input/30 text-base border border-input/30 outline-none block mx-1 mt-1 mb-0 px-2.5 py-1 w-[calc(100%---spacing(2))] h-8 min-w-0 placeholder:text-muted-foreground md:text-sm",
    ComboboxEmpty:
      "text-center text-muted-foreground text-sm hidden py-2 justify-center w-full group-data-empty/combobox-content:flex",
    ComboboxList:
      "scrollbar-none scroll-py-1 p-1 max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] overflow-y-auto overscroll-contain data-empty:p-0",
    ComboboxItem:
      "select-none cursor-default rounded-md text-sm outline-none flex relative py-1 pr-8 pl-1.5 items-center gap-2 w-full data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-50 data-disabled:pointer-events-none",
    ComboboxItemIcon: "pointer-events-none shrink-0 size-4",
    ComboboxItemIndicator:
      "pointer-events-none flex absolute right-2 justify-center items-center size-4",
    ComboboxItemCheckIcon: "pointer-events-none shrink-0 size-4",
    ComboboxLabel: "text-muted-foreground text-xs px-2 py-1.5",
    ComboboxSeparator: "bg-border -mx-1 my-1 h-px",
  },
  filled: {
    true: { ComboboxChips: "px-1" },
    false: { ComboboxChips: "px-2.5" },
  },
  invalid: {
    true: {
      ComboboxInputGroup:
        "ring-3 ring-destructive/20 border-destructive dark:ring-destructive/40 dark:border-destructive/50",
      ComboboxChips:
        "ring-3 ring-destructive/20 border-destructive dark:ring-destructive/40 dark:border-destructive/50",
    },
    false: {
      ComboboxInputGroup:
        "focus-within:ring-3 focus-within:ring-ring/50 focus-within:border-ring",
      ComboboxChips:
        "focus-within:ring-3 focus-within:ring-ring/50 focus-within:border-ring",
    },
  },
  trigger: {
    true: { ComboboxContent: "min-w-[calc(var(--anchor-width)+--spacing(7))]" },
  },
});

const props = defineProps<typeof variants>({
  base: {
    ComboboxTrigger: { present: false },
    ComboboxInputGroup: { present: false },
    ComboboxInputGroupAddon: { role: "group" },
    ComboboxInputGroupClear: {
      variant: "ghost",
      size: "icon-xs",
      present: false,
    },
    ComboboxInputGroupTrigger: { variant: "ghost", size: "icon-xs" },
    ComboboxChips: { present: false },
    ComboboxChipRemove: { variant: "ghost", size: "icon-xs" },
    ComboboxChipsInput: { present: false },
    ComboboxClear: { variant: "ghost", size: "icon-xs", present: false },
    ComboboxPortal: { present: false },
    ComboboxPositioner: {
      side: "bottom",
      sideOffset: 6,
      align: "start",
      alignOffset: 0,
    },
    ComboboxSearch: { present: false },
    ComboboxEmpty: { present: false },
    ComboboxItemIcon: { present: false },
    ComboboxLabel: { present: false },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Combobox>
      <ComboboxTrigger>
        <Children />
        <ComboboxTriggerIcon />
      </ComboboxTrigger>
      <ComboboxInputGroup>
        <ComboboxInput />
        <ComboboxInputGroupAddon>
          <ComboboxInputGroupClear>
            <ComboboxInputGroupClearIcon />
          </ComboboxInputGroupClear>
          <ComboboxInputGroupTrigger>
            <ComboboxInputGroupTriggerIcon />
          </ComboboxInputGroupTrigger>
        </ComboboxInputGroupAddon>
      </ComboboxInputGroup>
      <ComboboxChips>
        <ComboboxChip repeatable>
          <Children />
          <ComboboxChipRemove>
            <ComboboxChipRemoveIcon />
          </ComboboxChipRemove>
        </ComboboxChip>
        <ComboboxChipsInput />
        <Children />
      </ComboboxChips>
      <Children />
      <ComboboxClear>
        <ComboboxClearIcon />
      </ComboboxClear>
      <ComboboxPortal>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxSearch />
            <ComboboxEmpty />
            <ComboboxList>
              <ComboboxItem repeatable>
                <ComboboxItemIcon />
                <Children />
                <ComboboxItemIndicator>
                  <ComboboxItemCheckIcon />
                </ComboboxItemIndicator>
              </ComboboxItem>
              <ComboboxGroup repeatable>
                <ComboboxLabel />
                <Children />
              </ComboboxGroup>
              <ComboboxSeparator repeatable />
              <Children />
            </ComboboxList>
            <Children />
          </ComboboxContent>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  ),
});
