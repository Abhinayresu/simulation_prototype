/** @jsxImportSource ../core/template */

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Button } from "./button.tsx";

const variants = defineVariants(
  { size: ["default", "sm"] },
  { defaults: { size: "default" } },
);

export const AlertDialog = defineElement({
  name: "AlertDialog",
  as: AlertDialogPrimitive.Root,
  variants,
});

export const AlertDialogTrigger = defineElement({
  name: "AlertDialogTrigger",
  as: AlertDialogPrimitive.Trigger,
});

export const AlertDialogPortal = defineElement({
  name: "AlertDialogPortal",
  as: AlertDialogPrimitive.Portal,
});

export const AlertDialogOverlay = defineElement({
  name: "AlertDialogOverlay",
  as: AlertDialogPrimitive.Backdrop,
});

export const AlertDialogContent = defineElement({
  name: "AlertDialogContent",
  as: AlertDialogPrimitive.Popup,
});

export const AlertDialogHeader = defineElement({
  name: "AlertDialogHeader",
  as: "div",
});

export const AlertDialogMedia = defineElement({
  name: "AlertDialogMedia",
  as: "div",
});

export const AlertDialogMediaIcon = defineElement({
  name: "AlertDialogMediaIcon",
});

export const AlertDialogTitle = defineElement({
  name: "AlertDialogTitle",
  as: AlertDialogPrimitive.Title,
});

export const AlertDialogDescription = defineElement({
  name: "AlertDialogDescription",
  as: AlertDialogPrimitive.Description,
});

export const AlertDialogFooter = defineElement({
  name: "AlertDialogFooter",
  as: "div",
});

export const AlertDialogCancel = defineElement({
  name: "AlertDialogCancel",
  as: AlertDialogPrimitive.Close,
  render: Button,
});

export const AlertDialogAction = defineElement({
  name: "AlertDialogAction",
  as: Button,
});

const styles = defineStyles<typeof variants>({
  base: {
    AlertDialogOverlay:
      "duration-100 bg-black/10 fixed z-50 inset-0 isolate supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
    AlertDialogContent:
      "-translate-1/2 duration-100 ring ring-foreground/10 rounded-xl bg-popover text-popover-foreground outline-none grid fixed z-50 top-1/2 left-1/2 p-4 gap-4 w-full data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
    AlertDialogHeader:
      "text-center grid justify-items-center items-center gap-x-4 gap-y-1.5 grid-rows-[auto_1fr]",
    AlertDialogMedia:
      "rounded-md bg-muted inline-flex mb-2 justify-center items-center size-10",
    AlertDialogMediaIcon: "size-6",
    AlertDialogTitle: "font-medium text-base",
    AlertDialogDescription:
      "text-balance text-muted-foreground text-sm md:text-pretty",
    AlertDialogFooter:
      "rounded-b-xl bg-muted/50 border-t flex -mx-4 -mb-4 p-4 flex-col-reverse gap-2 sm:flex-row sm:justify-end",
  },
  size: {
    default: {
      AlertDialogContent: "max-w-xs sm:max-w-sm",
      AlertDialogHeader: "sm:text-left sm:justify-items-start sm:items-start",
      AlertDialogMedia: "sm:row-span-2",
      AlertDialogTitle: "sm:col-start-2 sm:first:col-start-auto",
    },
    sm: {
      AlertDialogContent: "max-w-xs",
      AlertDialogFooter: "grid grid-cols-2",
    },
  },
});

const props = defineProps<typeof variants>({
  base: {
    AlertDialogTrigger: { present: false },
    AlertDialogPortal: { present: false },
    AlertDialogHeader: { present: false },
    AlertDialogMedia: { present: false },
    AlertDialogDescription: { present: false },
    AlertDialogFooter: { present: false },
    AlertDialogCancel: { variant: "outline", size: "default" },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <AlertDialog>
      <AlertDialogTrigger />
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <AlertDialogMediaIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>
              <Children />
            </AlertDialogTitle>
            <AlertDialogDescription />
          </AlertDialogHeader>
          <Children />
          <AlertDialogFooter>
            <Children />
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  ),
});
