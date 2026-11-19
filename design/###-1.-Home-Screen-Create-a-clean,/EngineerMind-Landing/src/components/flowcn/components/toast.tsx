/** @jsxImportSource ../core/template */

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  XIcon,
} from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Button, ButtonIcon } from "./button.tsx";

const variants = defineVariants({
  status: ["success", "info", "warning", "error", "loading"],
});

export const Toast = defineElement({
  name: "Toast",
  as: ToastPrimitive.Root,
  variants,
});

export const ToastContent = defineElement({
  name: "ToastContent",
  as: ToastPrimitive.Content,
});

export const ToastIcon = defineElement({ name: "ToastIcon" });

export const ToastBody = defineElement({ name: "ToastBody", as: "div" });

export const ToastTitle = defineElement({
  name: "ToastTitle",
  as: ToastPrimitive.Title,
});

export const ToastDescription = defineElement({
  name: "ToastDescription",
  as: ToastPrimitive.Description,
});

export const ToastAction = defineElement({
  name: "ToastAction",
  as: ToastPrimitive.Action,
  render: Button,
});

export const ToastClose = defineElement({
  name: "ToastClose",
  as: ToastPrimitive.Close,
  render: Button,
});

export const ToastCloseIcon = defineElement({
  name: "ToastCloseIcon",
  icon: XIcon,
  render: ButtonIcon,
});

const styles = defineStyles<typeof variants>({
  base: {
    Toast:
      "transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-var(--toast-index)*0.75rem-(1-max(0,calc(1-var(--toast-index)*0.1)))*var(--toast-frontmost-height,var(--toast-height))))_scale(max(0,calc(1-var(--toast-index)*0.1)),max(0,calc(1-var(--toast-index)*0.1)))] origin-bottom will-change-transform [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms] select-none pointer-events-auto shadow-lg rounded-2xl bg-popover text-popover-foreground border outline-none absolute z-[calc(1000-var(--toast-index))] right-0 bottom-0 w-full h-[var(--toast-frontmost-height,var(--toast-height))] after:content-[''] after:absolute after:top-full after:left-0 after:w-full after:h-3.25 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(150%)] data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc((-1*var(--toast-offset-y))-var(--toast-index)*0.75rem+var(--toast-swipe-movement-y)))] data-expanded:h-(--toast-height) data-expanded:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(150%)] data-limited:opacity-0 data-starting-style:transform-[translateY(150%)] data-expanded:data-starting-style:transform-[translateY(150%)] data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))] data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(calc((-1*var(--toast-offset-y))-var(--toast-index)*0.75rem+var(--toast-swipe-movement-y)))] data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(calc((-1*var(--toast-offset-y))-var(--toast-index)*0.75rem+var(--toast-swipe-movement-y)))] data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(calc((-1*var(--toast-offset-y))-var(--toast-index)*0.75rem+var(--toast-swipe-movement-y)))] data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(calc((-1*var(--toast-offset-y))-var(--toast-index)*0.75rem+var(--toast-swipe-movement-y)))] data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))] data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
    ToastContent:
      "transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] flex p-4 items-center gap-3 h-full overflow-hidden data-behind:opacity-0 data-expanded:opacity-100 data-behind:data-expanded:opacity-100",
    ToastIcon: "pointer-events-none shrink-0 size-4",
    ToastBody: "flex flex-col flex-1 gap-1 min-w-0",
    ToastTitle: "font-medium text-sm",
    ToastDescription: "text-muted-foreground text-sm",
    ToastAction: "shrink-0",
    ToastClose:
      "text-muted-foreground relative shrink-0 after:content-[''] after:absolute after:-inset-2 hover:text-foreground",
    ToastCloseIcon: "pointer-events-none shrink-0 size-4",
  },
  status: {
    error: { ToastIcon: "text-destructive" },
    loading: { ToastIcon: "animate-spin" },
  },
});

const props = defineProps<typeof variants>({
  base: {
    ToastIcon: { present: false },
    ToastAction: { variant: "outline", size: "sm" },
    ToastClose: {
      "aria-label": "Close toast",
      variant: "ghost",
      size: "icon-sm",
    },
  },
  status: {
    success: { ToastIcon: { present: true, icon: CheckCircle2Icon } },
    info: { ToastIcon: { present: true, icon: InfoIcon } },
    warning: { ToastIcon: { present: true, icon: AlertTriangleIcon } },
    error: { ToastIcon: { present: true, icon: OctagonXIcon } },
    loading: { ToastIcon: { present: true, icon: Loader2Icon } },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Toast>
      <ToastContent>
        <ToastIcon />
        <ToastBody>
          <ToastTitle />
          <ToastDescription />
          <Children />
        </ToastBody>
        <ToastAction />
        <ToastClose>
          <ToastCloseIcon />
        </ToastClose>
      </ToastContent>
    </Toast>
  ),
});
