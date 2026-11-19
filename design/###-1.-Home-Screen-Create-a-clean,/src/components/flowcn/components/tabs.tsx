/** @jsxImportSource ../core/template */

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants(
  { orientation: ["horizontal", "vertical"] },
  { defaults: { orientation: "horizontal" } },
);

export const Tabs = defineElement({
  name: "Tabs",
  as: TabsPrimitive.Root,
  variants,
});

const listVariants = defineVariants(
  { variant: ["default", "line"] },
  { defaults: { variant: "default" } },
);

export const TabsList = defineElement({
  name: "TabsList",
  as: TabsPrimitive.List,
  variants: listVariants,
});

export const TabsTrigger = defineElement({
  name: "TabsTrigger",
  as: TabsPrimitive.Tab,
});

export const TabsTriggerIcon = defineElement({ name: "TabsTriggerIcon" });

export const TabsTriggerText = defineElement({
  name: "TabsTriggerText",
  as: "span",
});

export const TabsContent = defineElement({
  name: "TabsContent",
  as: TabsPrimitive.Panel,
});

const styles = defineStyles<typeof variants & typeof listVariants>({
  base: {
    Tabs: "flex gap-2 data-[orientation=horizontal]:flex-col",
    TabsList:
      "rounded-lg text-muted-foreground inline-flex p-[3px] justify-center items-center w-fit",
    TabsTrigger:
      "font-medium whitespace-nowrap transition-all rounded-md text-foreground/60 text-sm border border-transparent inline-flex relative px-1.5 py-0.5 justify-center items-center flex-1 gap-1.5 h-[calc(100%-1px)] after:transition-opacity after:opacity-0 after:bg-foreground after:absolute hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:outline focus-visible:outline-ring disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none dark:text-muted-foreground dark:hover:text-foreground data-active:bg-background data-active:text-foreground dark:data-active:bg-input/30 dark:data-active:text-foreground dark:data-active:border-input focus-visible:dark:data-active:border-transparent",
    TabsTriggerIcon: "pointer-events-none -ml-0.5 shrink-0 size-4 last:ml-0",
    TabsContent: "text-sm outline-none flex-1",
  },
  orientation: {
    horizontal: {
      TabsList: "h-8",
      TabsTrigger: "after:inset-x-0 after:-bottom-[5px] after:h-0.5",
    },
    vertical: {
      TabsList: "flex-col h-fit",
      TabsTrigger:
        "justify-start w-full after:inset-y-0 after:-right-1 after:w-0.5",
    },
  },
  variant: {
    default: { TabsList: "bg-muted", TabsTrigger: "data-active:shadow-sm" },
    line: {
      TabsList: "rounded-none bg-transparent gap-1",
      TabsTrigger:
        "bg-transparent data-active:shadow-none data-active:bg-transparent data-active:after:opacity-100 dark:data-active:bg-transparent dark:data-active:border-transparent",
    },
  },
});

const props = defineProps<typeof variants>({
  base: { TabsList: { present: false }, TabsTriggerIcon: { present: false } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Tabs>
      <TabsList>
        <TabsTrigger repeatable>
          <TabsTriggerIcon />
          <TabsTriggerText>
            <Children />
          </TabsTriggerText>
        </TabsTrigger>
        <Children />
      </TabsList>
      <TabsContent repeatable />
      <Children />
    </Tabs>
  ),
});
