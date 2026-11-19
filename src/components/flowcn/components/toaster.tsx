/** @jsxImportSource ../core/template */

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { createElement, type ComponentProps } from "react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
} from "../core/index.ts";

import { Toast } from "./toast.tsx";

export const ToastList = () => {
  const { toasts } = ToastPrimitive.useToastManager();
  return toasts.map((item) =>
    createElement(Toast, {
      key: item.id,
      toast: item,
      status: item.type as ComponentProps<typeof Toast>["status"],
    }),
  );
};

export const toast = ToastPrimitive.createToastManager();

export const createToastManager = ToastPrimitive.createToastManager;
export const useToastManager = ToastPrimitive.useToastManager;

export const ToastProvider = defineElement({
  name: "ToastProvider",
  as: ToastPrimitive.Provider,
});

export const Toaster = defineElement({
  name: "Toaster",
  as: ToastPrimitive.Provider,
});

export const ToastPortal = defineElement({
  name: "ToastPortal",
  as: ToastPrimitive.Portal,
});

export const ToastViewport = defineElement({
  name: "ToastViewport",
  as: ToastPrimitive.Viewport,
});

const styles = defineStyles({
  base: {
    ToastViewport:
      "pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full",
  },
});

const props = defineProps({
  base: {
    Toaster: { toastManager: toast },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Toaster>
      <Children />
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </Toaster>
  ),
});
