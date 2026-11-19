/** @jsxImportSource ../core/template */

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Button, ButtonIcon, ButtonText } from "./button.tsx";

const variants = defineVariants(
  { side: ["right", "left", "top", "bottom"] },
  { defaults: { side: "right" } },
);

export const Sheet = defineElement({
  name: "Sheet",
  as: DialogPrimitive.Root,
  variants,
});

export const SheetTrigger = defineElement({
  name: "SheetTrigger",
  as: DialogPrimitive.Trigger,
});

export const SheetPortal = defineElement({
  name: "SheetPortal",
  as: DialogPrimitive.Portal,
});

export const SheetOverlay = defineElement({
  name: "SheetOverlay",
  as: DialogPrimitive.Backdrop,
});

export const SheetContent = defineElement({
  name: "SheetContent",
  as: DialogPrimitive.Popup,
});

export const SheetHeader = defineElement({ name: "SheetHeader", as: "div" });

export const SheetTitle = defineElement({
  name: "SheetTitle",
  as: DialogPrimitive.Title,
});

export const SheetDescription = defineElement({
  name: "SheetDescription",
  as: DialogPrimitive.Description,
});

export const SheetFooter = defineElement({ name: "SheetFooter", as: "div" });

export const SheetCloseButton = defineElement({
  name: "SheetCloseButton",
  as: DialogPrimitive.Close,
  render: Button,
});

export const SheetCloseIcon = defineElement({
  name: "SheetCloseIcon",
  icon: XIcon,
  render: ButtonIcon,
});

export const SheetCloseLabel = defineElement({
  name: "SheetCloseLabel",
  render: ButtonText,
});

export const SheetClose = defineElement({
  name: "SheetClose",
  as: DialogPrimitive.Close,
});

const styles = defineStyles<typeof variants>({
  base: {
    SheetOverlay:
      "transition-opacity duration-150 bg-black/10 fixed z-50 inset-0 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
    SheetContent:
      "transition duration-200 ease-in-out shadow-lg bg-popover bg-clip-padding text-popover-foreground text-sm flex fixed z-50 flex-col gap-4 data-ending-style:opacity-0 data-starting-style:opacity-0",
    SheetHeader: "flex p-4 flex-col gap-0.5",
    SheetTitle: "font-medium text-foreground text-base",
    SheetDescription: "text-muted-foreground text-sm",
    SheetFooter: "flex mt-auto p-4 flex-col gap-2",
    SheetCloseButton: "absolute top-3 right-3",
    SheetCloseIcon: "pointer-events-none shrink-0 size-4",
    SheetCloseLabel: "sr-only",
  },
  side: {
    right: {
      SheetContent:
        "border-l inset-y-0 right-0 w-3/4 h-full data-ending-style:translate-x-[2.5rem] data-starting-style:translate-x-[2.5rem] sm:max-w-sm",
    },
    left: {
      SheetContent:
        "border-r inset-y-0 left-0 w-3/4 h-full data-ending-style:-translate-x-[2.5rem] data-starting-style:-translate-x-[2.5rem] sm:max-w-sm",
    },
    top: {
      SheetContent:
        "border-b inset-x-0 top-0 h-auto data-ending-style:-translate-y-[2.5rem] data-starting-style:-translate-y-[2.5rem]",
    },
    bottom: {
      SheetContent:
        "border-t inset-x-0 bottom-0 h-auto data-ending-style:translate-y-[2.5rem] data-starting-style:translate-y-[2.5rem]",
    },
  },
});

const props = defineProps<typeof variants>({
  base: {
    SheetTrigger: { present: false },
    SheetPortal: { present: false },
    SheetHeader: { present: false },
    SheetDescription: { present: false },
    SheetFooter: { present: false },
    SheetCloseButton: { variant: "ghost", size: "icon-sm" },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Sheet>
      <SheetTrigger />
      <SheetPortal>
        <SheetOverlay />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Children />
            </SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <Children />
          <SheetFooter />
          <SheetCloseButton>
            <SheetCloseIcon />
            <SheetCloseLabel>Close</SheetCloseLabel>
          </SheetCloseButton>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  ),
});
