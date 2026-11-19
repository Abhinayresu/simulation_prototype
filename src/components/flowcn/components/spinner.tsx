/** @jsxImportSource ../core/template */

import { Loader2Icon } from "lucide-react";

import {
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
} from "../core/index.ts";

export const Spinner = defineElement({ name: "Spinner", icon: Loader2Icon });

const styles = defineStyles({ base: { Spinner: "animate-spin size-4" } });

const props = defineProps({
  base: {
    Spinner: {
      role: "status",
      "aria-label": "Loading",
      "aria-hidden": undefined,
    },
  },
});

defineComponent({ styles, props, structure: <Spinner /> });
