/** @jsxImportSource ../core/template */

import { AlertCircleIcon, InfoIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants(
  { variant: ["default", "destructive"], withIcon: [true, false] },
  { defaults: { variant: "default" } },
);

export const Alert = defineElement({ name: "Alert", as: "div", variants });

export const AlertIcon = defineElement({ name: "AlertIcon" });

export const AlertTitle = defineElement({ name: "AlertTitle", as: "div" });

export const AlertDescription = defineElement({
  name: "AlertDescription",
  as: "div",
});

export const AlertAction = defineElement({ name: "AlertAction", as: "div" });

const styles = defineStyles<typeof variants>({
  base: {
    Alert:
      "text-left rounded-lg bg-card text-sm border grid relative px-2.5 py-2 gap-y-0.5 grid-cols-[auto_1fr_auto] w-full",
    AlertIcon:
      "translate-y-0.5 text-current mr-2 col-start-1 row-span-2 size-4",
    AlertTitle: "font-medium col-start-2",
    AlertDescription:
      "text-balance text-muted-foreground text-sm col-start-2 md:text-pretty",
    AlertAction: "-mr-0.5 ml-2 self-start col-start-3 row-span-2 row-start-1",
  },
  variant: {
    default: { Alert: "text-card-foreground" },
    destructive: {
      Alert: "text-destructive",
      AlertDescription: "text-destructive/90",
    },
  },
});

const props = defineProps<typeof variants>({
  base: {
    Alert: { role: "alert" },
    AlertIcon: { present: false },
    AlertDescription: { present: false },
    AlertAction: { present: false },
  },
  withIcon: { true: { AlertIcon: { present: true } } },
  variant: {
    default: { AlertIcon: { icon: InfoIcon } },
    destructive: { AlertIcon: { icon: AlertCircleIcon } },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Alert>
      <AlertIcon />
      <AlertTitle>
        <Children />
      </AlertTitle>
      <AlertDescription />
      <AlertAction />
    </Alert>
  ),
});
