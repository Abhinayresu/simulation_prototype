/** @jsxImportSource ../core/template */

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants({ inButtonGroup: ["horizontal", "vertical"] });

export const Popover = defineElement({
  name: "Popover",
  as: PopoverPrimitive.Root,
  variants,
});

export const PopoverTrigger = defineElement({
  name: "PopoverTrigger",
  as: PopoverPrimitive.Trigger,
});

export const PopoverPortal = defineElement({
  name: "PopoverPortal",
  as: PopoverPrimitive.Portal,
});

export const PopoverPositioner = defineElement({
  name: "PopoverPositioner",
  as: PopoverPrimitive.Positioner,
});

export const PopoverContent = defineElement({
  name: "PopoverContent",
  as: PopoverPrimitive.Popup,
});

export const PopoverHeader = defineElement({
  name: "PopoverHeader",
  as: "div",
});

export const PopoverTitle = defineElement({
  name: "PopoverTitle",
  as: PopoverPrimitive.Title,
});

export const PopoverDescription = defineElement({
  name: "PopoverDescription",
  as: PopoverPrimitive.Description,
});

const styles = defineStyles<typeof variants>({
  base: {
    PopoverPositioner: "z-50 isolate",
    PopoverContent:
      "origin-(--transform-origin) duration-100 ring ring-foreground/10 shadow-md rounded-lg bg-popover text-popover-foreground text-sm outline-none flex z-50 p-2.5 flex-col gap-2.5 w-72 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
    PopoverHeader: "text-sm flex flex-col gap-0.5",
    PopoverTitle: "font-medium",
    PopoverDescription: "text-muted-foreground",
  },
  inButtonGroup: {
    horizontal: {
      PopoverTrigger:
        "rounded-none border-l-0 first:rounded-l-lg first:border-l last:rounded-r-lg focus-visible:relative focus-visible:z-10",
    },
    vertical: {
      PopoverTrigger:
        "rounded-none border-t-0 first:rounded-t-lg first:border-t last:rounded-b-lg focus-visible:relative focus-visible:z-10",
    },
  },
});

const props = defineProps<typeof variants>({
  base: {
    PopoverTrigger: { present: false },
    PopoverPortal: { present: false },
    PopoverPositioner: {
      side: "bottom",
      sideOffset: 4,
      align: "center",
      alignOffset: 0,
    },
    PopoverHeader: { present: false },
    PopoverDescription: { present: false },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Popover>
      <PopoverTrigger />
      <PopoverPortal>
        <PopoverPositioner>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>
                <Children />
              </PopoverTitle>
              <PopoverDescription />
            </PopoverHeader>
            <Children />
          </PopoverContent>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  ),
});
