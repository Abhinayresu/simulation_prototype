/** @jsxImportSource ../core/template */

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineStyles,
} from "../core/index.ts";

export const Accordion = defineElement({
  name: "Accordion",
  as: AccordionPrimitive.Root,
});

export const AccordionItem = defineElement({
  name: "AccordionItem",
  as: AccordionPrimitive.Item,
});

export const AccordionHeader = defineElement({
  name: "AccordionHeader",
  as: AccordionPrimitive.Header,
});

export const AccordionTrigger = defineElement({
  name: "AccordionTrigger",
  as: AccordionPrimitive.Trigger,
});

export const AccordionTriggerText = defineElement({
  name: "AccordionTriggerText",
  as: "span",
});

export const AccordionTriggerIcon = defineElement({
  name: "AccordionTriggerIcon",
  icon: ChevronDownIcon,
});

export const AccordionPanel = defineElement({
  name: "AccordionPanel",
  as: AccordionPrimitive.Panel,
});

export const AccordionContent = defineElement({
  name: "AccordionContent",
  as: "div",
});

const styles = defineStyles({
  base: {
    Accordion: "flex flex-col w-full",
    AccordionItem: "border-b last:border-b-0",
    AccordionHeader: "flex",
    AccordionTrigger:
      "font-medium text-left transition-all rounded-lg text-sm border border-transparent outline-none flex relative py-2.5 justify-between items-start flex-1 group/accordion-trigger hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring data-disabled:opacity-50 data-disabled:pointer-events-none",
    AccordionTriggerIcon:
      "pointer-events-none text-muted-foreground ml-auto shrink-0 size-4 group-aria-expanded/accordion-trigger:rotate-180",
    AccordionPanel:
      "[transition:height_200ms_var(--ease-out)] text-sm h-(--accordion-panel-height) overflow-hidden data-ending-style:h-0 data-starting-style:h-0",
    AccordionContent:
      "pt-0 pb-2.5 h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0",
  },
});

defineComponent({
  styles,
  structure: (
    <Accordion>
      <AccordionItem repeatable>
        <AccordionHeader>
          <AccordionTrigger>
            <AccordionTriggerText>
              <Children />
            </AccordionTriggerText>
            <AccordionTriggerIcon />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          <AccordionContent>
            <Children />
          </AccordionContent>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
});
