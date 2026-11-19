/** @jsxImportSource ../core/template */

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
} from "../core/index.ts";

export const Progress = defineElement({
  name: "Progress",
  as: ProgressPrimitive.Root,
});

export const ProgressLabel = defineElement({
  name: "ProgressLabel",
  as: ProgressPrimitive.Label,
});

export const ProgressValue = defineElement({
  name: "ProgressValue",
  as: ProgressPrimitive.Value,
});

export const ProgressTrack = defineElement({
  name: "ProgressTrack",
  as: ProgressPrimitive.Track,
});

export const ProgressIndicator = defineElement({
  name: "ProgressIndicator",
  as: ProgressPrimitive.Indicator,
});

const styles = defineStyles({
  base: {
    Progress: "flex flex-wrap gap-3",
    ProgressLabel: "font-medium text-sm",
    ProgressValue: "tabular-nums text-muted-foreground text-sm ml-auto",
    ProgressTrack:
      "rounded-full bg-muted flex relative items-center w-full h-1 overflow-x-hidden",
    ProgressIndicator: "transition-all bg-primary h-full",
  },
});

const props = defineProps({ base: { ProgressLabel: { present: false } } });

defineComponent({
  styles,
  props,
  structure: (
    <Progress>
      <ProgressLabel />
      <ProgressValue repeatable />
      <Children />
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  ),
});
