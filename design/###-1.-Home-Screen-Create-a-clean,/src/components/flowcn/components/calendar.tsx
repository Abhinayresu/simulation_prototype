"use client";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type ClassNames,
  type DayButton,
  type DayProps,
  type Locale,
} from "react-day-picker";

import { cn } from "../core/index.ts";

import { Button, ButtonIcon } from "./button.tsx";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  previousIcon = ChevronLeftIcon,
  previousIconClassName,
  nextIcon = ChevronRightIcon,
  nextIconClassName,
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  /** The previous and next buttons' glyphs, and their classes. */
  previousIcon?: React.ComponentProps<typeof ButtonIcon>["icon"];
  previousIconClassName?: string;
  nextIcon?: React.ComponentProps<typeof ButtonIcon>["icon"];
  nextIconClassName?: string;
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("bg-background p-2 w-fit", className)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={withGiven(classNames, {
        months: cn(
          "flex relative flex-col gap-4 md:flex-row",
          defaultClassNames.months,
        ),
        month: cn("flex flex-col gap-4 w-full", defaultClassNames.month),
        nav: cn(
          "flex absolute inset-x-0 top-0 justify-between items-center gap-1 w-full",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          "select-none p-0 size-7 aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          "select-none p-0 size-7 aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex px-7 justify-center items-center w-full h-7",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "font-medium text-sm flex justify-center items-center gap-1.5 w-full h-7",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "rounded-md relative",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "opacity-0 bg-popover absolute inset-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          captionLayout === "label"
            ? "font-medium select-none text-sm"
            : "font-medium select-none rounded-md text-sm flex items-center gap-1",
          defaultClassNames.caption_label,
        ),
        month_grid: cn("w-full", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "font-normal text-center select-none rounded-md text-muted-foreground text-[0.8rem] flex-1",
          defaultClassNames.weekday,
        ),
        week: cn("flex mt-2 w-full", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-7",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "select-none text-muted-foreground text-[0.8rem]",
          defaultClassNames.week_number,
        ),
      })}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={className}
            {...props}
          />
        ),
        Chevron: ({
          className,
          orientation: _orientation,
          size: _size,
          ...props
        }) => (
          <ChevronDownIcon
            className={cn("text-muted-foreground size-3.5", className)}
            {...props}
          />
        ),
        PreviousMonthButton: ({ children: _chevron, ...props }) => (
          <Button variant={buttonVariant} size="icon" {...props}>
            <ButtonIcon
              icon={previousIcon}
              className={cn(
                "pointer-events-none shrink-0 size-4 rtl:rotate-180",
                previousIconClassName,
              )}
            />
          </Button>
        ),
        NextMonthButton: ({ children: _chevron, ...props }) => (
          <Button variant={buttonVariant} size="icon" {...props}>
            <ButtonIcon
              icon={nextIcon}
              className={cn(
                "pointer-events-none shrink-0 size-4 rtl:rotate-180",
                nextIconClassName,
              )}
            />
          </Button>
        ),
        Day: (props) => <CalendarDay {...props} />,
        DayButton: (props) => <CalendarDayButton locale={locale} {...props} />,
        WeekNumber: ({ children, week: _week, ...props }) => (
          <td {...props}>
            <div
              className={"text-center flex justify-center items-center size-7"}
            >
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  );
}

/** The calendar's class names, each followed by the one given for it. */
function withGiven(
  given: Partial<ClassNames> | undefined,
  own: Partial<ClassNames>,
): Partial<ClassNames> {
  const merged = { ...own };
  for (const [key, value] of Object.entries(given ?? {}))
    merged[key as keyof ClassNames] = cn(own[key as keyof ClassNames], value);
  return merged;
}

function CalendarDay({ className, day: _day, modifiers, ...props }: DayProps) {
  return (
    <td
      className={cn(
        "text-center select-none rounded-md relative p-0 size-full aspect-square",
        modifiers.today && "rounded-md bg-muted text-foreground",
        modifiers.outside && "text-muted-foreground",
        modifiers.disabled && "opacity-50 text-muted-foreground",
        modifiers.hidden && "invisible",
        modifiers.range_start &&
          "rounded-l-md bg-muted z-0 isolate after:bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4",
        modifiers.range_middle &&
          "rounded-none bg-muted first:rounded-l-md last:rounded-r-md",
        modifiers.range_end &&
          "rounded-r-md bg-muted z-0 isolate after:bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4",
        modifiers.today && modifiers.selected && "rounded-none",
        className,
      )}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      className={cn(
        "font-normal leading-none border-0 flex relative z-10 flex-col gap-1 w-full h-auto min-w-7 aspect-square isolate focus-visible:z-10 dark:hover:text-foreground",
        modifiers.selected &&
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        modifiers.range_start && "rounded-md",
        modifiers.range_middle &&
          "rounded-none bg-transparent text-foreground hover:bg-muted hover:text-foreground",
        modifiers.range_end && "rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
