/** @jsxImportSource ../core/template */

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ChevronRightIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants({ error: [true, false] });

export const TraceCollapsible = defineElement({
  name: "TraceCollapsible",
  as: CollapsiblePrimitive.Root,
  variants,
});

export const TraceCollapsibleTrigger = defineElement({
  name: "TraceCollapsibleTrigger",
  as: CollapsiblePrimitive.Trigger,
});

export const TraceCollapsibleIcon = defineElement({
  name: "TraceCollapsibleIcon",
  icon: ChevronRightIcon,
});

export const TraceCollapsibleContent = defineElement({
  name: "TraceCollapsibleContent",
  as: CollapsiblePrimitive.Panel,
});

export const TraceCollapsibleBody = defineElement({
  name: "TraceCollapsibleBody",
  as: "div",
});

const styles = defineStyles<typeof variants>({
  base: {
    TraceCollapsible: "flex flex-col w-full min-w-0",
    TraceCollapsibleTrigger:
      "text-left transition-colors cursor-pointer rounded-md text-muted-foreground outline-none flex items-center gap-1 w-fit min-w-0 max-w-full group/trace-collapsible-trigger hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
    TraceCollapsibleIcon:
      "transition-transform pointer-events-none shrink-0 size-4 group-aria-expanded/trace-collapsible-trigger:rotate-90",
    TraceCollapsibleContent:
      "transition-[height] duration-200 h-(--collapsible-panel-height) min-w-0 overflow-hidden data-ending-style:h-0 data-starting-style:h-0",
    TraceCollapsibleBody:
      "wrap-break-word text-muted-foreground leading-relaxed border-l mt-2 mb-1 ml-[calc(--spacing(2)-1px)] pr-1 pl-4 min-w-0",
  },
  error: { true: { TraceCollapsibleTrigger: "text-destructive" } },
});

defineComponent({
  styles,
  structure: (
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <Children />
        <TraceCollapsibleIcon />
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <TraceCollapsibleBody>
          <Children />
        </TraceCollapsibleBody>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  ),
});
