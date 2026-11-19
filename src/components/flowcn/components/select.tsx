/** @jsxImportSource ../core/template */

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants({
  inButtonGroup: ["horizontal", "vertical"],
  inResponsiveField: [true, false],
});

export const Select = defineElement({
  name: "Select",
  as: SelectPrimitive.Root,
  generic: true,
  variants,
});

const triggerVariants = defineVariants(
  { size: ["default", "sm"] },
  { defaults: { size: "default" } },
);

export const SelectTrigger = defineElement({
  name: "SelectTrigger",
  as: SelectPrimitive.Trigger,
  variants: triggerVariants,
});

export const SelectValue = defineElement({
  name: "SelectValue",
  as: SelectPrimitive.Value,
});

export const SelectTriggerIcon = defineElement({
  name: "SelectTriggerIcon",
  icon: ChevronDownIcon,
});

export const SelectPortal = defineElement({
  name: "SelectPortal",
  as: SelectPrimitive.Portal,
});

export const SelectPositioner = defineElement({
  name: "SelectPositioner",
  as: SelectPrimitive.Positioner,
});

export const SelectContent = defineElement({
  name: "SelectContent",
  as: SelectPrimitive.Popup,
});

export const SelectScrollUpButton = defineElement({
  name: "SelectScrollUpButton",
  as: SelectPrimitive.ScrollUpArrow,
});

export const SelectScrollUpIcon = defineElement({
  name: "SelectScrollUpIcon",
  icon: ChevronUpIcon,
});

export const SelectList = defineElement({
  name: "SelectList",
  as: SelectPrimitive.List,
});

export const SelectItem = defineElement({
  name: "SelectItem",
  as: SelectPrimitive.Item,
});

export const SelectItemIcon = defineElement({ name: "SelectItemIcon" });

export const SelectItemText = defineElement({
  name: "SelectItemText",
  as: SelectPrimitive.ItemText,
});

export const SelectItemIndicator = defineElement({
  name: "SelectItemIndicator",
  as: SelectPrimitive.ItemIndicator,
});

export const SelectItemCheckIcon = defineElement({
  name: "SelectItemCheckIcon",
  icon: CheckIcon,
});

export const SelectGroup = defineElement({
  name: "SelectGroup",
  as: SelectPrimitive.Group,
});

export const SelectLabel = defineElement({
  name: "SelectLabel",
  as: SelectPrimitive.GroupLabel,
});

export const SelectSeparator = defineElement({
  name: "SelectSeparator",
  as: SelectPrimitive.Separator,
});

export const SelectScrollDownButton = defineElement({
  name: "SelectScrollDownButton",
  as: SelectPrimitive.ScrollDownArrow,
});

export const SelectScrollDownIcon = defineElement({
  name: "SelectScrollDownIcon",
  icon: ChevronDownIcon,
});

const styles = defineStyles<typeof variants & typeof triggerVariants>({
  base: {
    SelectTrigger:
      "whitespace-nowrap transition-colors select-none rounded-lg bg-transparent text-sm border border-input outline-none flex py-2 pr-2 pl-2.5 justify-between items-center gap-1.5 w-fit focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring disabled:opacity-50 disabled:cursor-not-allowed aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 focus-visible:dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:border-destructive/50",
    SelectValue: "text-left line-clamp-1 flex items-center flex-1 gap-1.5",
    SelectTriggerIcon:
      "pointer-events-none text-muted-foreground shrink-0 size-4",
    SelectPositioner: "z-50 isolate",
    SelectContent:
      "origin-(--transform-origin) duration-100 ring ring-foreground/10 shadow-md rounded-lg bg-popover text-popover-foreground relative z-50 w-(--anchor-width) min-w-36 max-h-(--available-height) overflow-x-hidden overflow-y-auto isolate data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=none]:animate-none data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
    SelectScrollUpButton:
      "cursor-default bg-popover flex z-10 top-0 py-1 justify-center items-center w-full",
    SelectScrollUpIcon: "size-4",
    SelectItem:
      "select-none cursor-default rounded-md text-sm outline-none flex relative py-1 pr-8 pl-1.5 items-center gap-1.5 w-full focus:bg-accent focus:text-accent-foreground data-disabled:opacity-50 data-disabled:pointer-events-none",
    SelectItemIcon: "pointer-events-none shrink-0 size-4",
    SelectItemText:
      "whitespace-nowrap flex items-center grow shrink-0 gap-2 basis-[0%]",
    SelectItemIndicator:
      "pointer-events-none flex absolute right-2 justify-center items-center size-4",
    SelectItemCheckIcon: "pointer-events-none shrink-0 size-4",
    SelectGroup: "scroll-my-1 p-1",
    SelectLabel: "text-muted-foreground text-xs px-1.5 py-1",
    SelectSeparator: "pointer-events-none bg-border -mx-1 my-1 h-px",
    SelectScrollDownButton:
      "cursor-default bg-popover flex z-10 bottom-0 py-1 justify-center items-center w-full",
    SelectScrollDownIcon: "size-4",
  },
  size: {
    default: { SelectTrigger: "h-8" },
    sm: { SelectTrigger: "rounded-[min(var(--radius-md),10px)] h-7" },
  },
  inButtonGroup: {
    horizontal: {
      SelectTrigger:
        "rounded-none border-l-0 first:rounded-l-lg first:border-l last:rounded-r-lg focus-visible:relative focus-visible:z-10",
    },
    vertical: {
      SelectTrigger:
        "rounded-none border-t-0 first:rounded-t-lg first:border-t last:rounded-b-lg focus-visible:relative focus-visible:z-10",
    },
  },
  inResponsiveField: {
    true: { SelectTrigger: "w-full @md/field-group:w-auto" },
  },
});

const props = defineProps<typeof variants>({
  base: {
    SelectTrigger: { present: false },
    SelectValue: { present: true },
    SelectPortal: { present: false },
    SelectPositioner: {
      side: "bottom",
      sideOffset: 4,
      align: "center",
      alignOffset: 0,
      alignItemWithTrigger: true,
    },
    SelectList: { present: true },
    SelectItemIcon: { present: false },
    SelectItemText: { present: true },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Select>
      <SelectTrigger>
        <SelectValue>
          <Children />
        </SelectValue>
        <SelectTriggerIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner>
          <SelectContent>
            <SelectScrollUpButton>
              <SelectScrollUpIcon />
            </SelectScrollUpButton>
            <SelectList>
              <SelectItem repeatable>
                <SelectItemIcon />
                <SelectItemText>
                  <Children />
                </SelectItemText>
                <SelectItemIndicator>
                  <SelectItemCheckIcon />
                </SelectItemIndicator>
              </SelectItem>
              <SelectGroup repeatable>
                <Children />
              </SelectGroup>
              <SelectLabel repeatable />
              <SelectSeparator repeatable />
              <Children />
            </SelectList>
            <SelectScrollDownButton>
              <SelectScrollDownIcon />
            </SelectScrollDownButton>
          </SelectContent>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  ),
});
