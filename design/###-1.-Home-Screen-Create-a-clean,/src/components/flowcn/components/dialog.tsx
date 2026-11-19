/** @jsxImportSource ../core/template */

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
} from "../core/index.ts";

import { Button, ButtonIcon, ButtonText } from "./button.tsx";

export const Dialog = defineElement({
  name: "Dialog",
  as: DialogPrimitive.Root,
});

export const DialogTrigger = defineElement({
  name: "DialogTrigger",
  as: DialogPrimitive.Trigger,
});

export const DialogPortal = defineElement({
  name: "DialogPortal",
  as: DialogPrimitive.Portal,
});

export const DialogOverlay = defineElement({
  name: "DialogOverlay",
  as: DialogPrimitive.Backdrop,
});

export const DialogContent = defineElement({
  name: "DialogContent",
  as: DialogPrimitive.Popup,
});

export const DialogHeader = defineElement({ name: "DialogHeader", as: "div" });

export const DialogTitle = defineElement({
  name: "DialogTitle",
  as: DialogPrimitive.Title,
});

export const DialogDescription = defineElement({
  name: "DialogDescription",
  as: DialogPrimitive.Description,
});

export const DialogFooter = defineElement({ name: "DialogFooter", as: "div" });

export const DialogFooterClose = defineElement({
  name: "DialogFooterClose",
  as: DialogPrimitive.Close,
  render: Button,
});

export const DialogCloseButton = defineElement({
  name: "DialogCloseButton",
  as: DialogPrimitive.Close,
  render: Button,
});

export const DialogCloseIcon = defineElement({
  name: "DialogCloseIcon",
  icon: XIcon,
  render: ButtonIcon,
});

export const DialogCloseLabel = defineElement({
  name: "DialogCloseLabel",
  render: ButtonText,
});

export const DialogClose = defineElement({
  name: "DialogClose",
  as: DialogPrimitive.Close,
});

const styles = defineStyles({
  base: {
    DialogOverlay:
      "duration-100 bg-black/10 fixed z-50 inset-0 isolate supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
    DialogContent:
      "-translate-1/2 duration-100 ring ring-foreground/10 rounded-xl bg-popover text-popover-foreground text-sm outline-none grid fixed z-50 top-1/2 left-1/2 p-4 gap-4 w-full max-w-[calc(100%-2rem)] sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
    DialogHeader: "flex flex-col gap-2",
    DialogTitle: "font-medium text-base leading-none",
    DialogDescription: "text-muted-foreground text-sm",
    DialogFooter:
      "rounded-b-xl bg-muted/50 border-t flex -mx-4 -mb-4 p-4 flex-col-reverse gap-2 sm:flex-row sm:justify-end",
    DialogCloseButton: "absolute top-2 right-2",
    DialogCloseIcon: "pointer-events-none shrink-0 size-4",
    DialogCloseLabel: "sr-only",
  },
});

const props = defineProps({
  base: {
    DialogTrigger: { present: false },
    DialogPortal: { present: false },
    DialogHeader: { present: false },
    DialogDescription: { present: false },
    DialogFooter: { present: false },
    DialogFooterClose: { variant: "outline", present: false },
    DialogCloseButton: { variant: "ghost", size: "icon-sm" },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Dialog>
      <DialogTrigger />
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Children />
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <Children />
          <DialogFooter>
            <Children />
            <DialogFooterClose>Close</DialogFooterClose>
          </DialogFooter>
          <DialogCloseButton>
            <DialogCloseIcon />
            <DialogCloseLabel>Close</DialogCloseLabel>
          </DialogCloseButton>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
});
