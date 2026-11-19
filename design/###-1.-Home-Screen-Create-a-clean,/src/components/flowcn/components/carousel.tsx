"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";

import { cn } from "../core/index.ts";

import { Button, ButtonIcon, ButtonText } from "./button.tsx";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  /** Classes for the viewport, the box that clips the slides. */
  viewportClassName?: string;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  viewportClassName,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      // FlowCn's carousel holds its first slide at the start, looping or not.
      align: "start",
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        viewportClassName,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation, viewportClassName } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className={cn("overflow-hidden", viewportClassName)}
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "transition-transform duration-300 grow-0 shrink-0 min-w-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon-sm",
  icon = ChevronLeftIcon,
  iconClassName,
  label = "Previous slide",
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & {
  /** The glyph, and its classes. */
  icon?: React.ComponentProps<typeof ButtonIcon>["icon"];
  iconClassName?: string;
  /** What a screen reader says the button does. */
  label?: string;
}) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "touch-manipulation rounded-full absolute",
        orientation === "horizontal"
          ? "inset-y-0 -left-12 my-auto"
          : "rotate-90 -translate-x-1/2 -top-12 left-1/2",
        className,
      )}
      disabled={!canScrollPrev}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        scrollPrev();
      }}
    >
      <ButtonIcon
        icon={icon}
        className={cn(
          "pointer-events-none shrink-0 size-4",
          orientation === "horizontal" && "rtl:rotate-180",
          iconClassName,
        )}
      />
      <ButtonText className={"sr-only"}>{label}</ButtonText>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon-sm",
  icon = ChevronRightIcon,
  iconClassName,
  label = "Next slide",
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & {
  /** The glyph, and its classes. */
  icon?: React.ComponentProps<typeof ButtonIcon>["icon"];
  iconClassName?: string;
  /** What a screen reader says the button does. */
  label?: string;
}) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "touch-manipulation rounded-full absolute",
        orientation === "horizontal"
          ? "inset-y-0 -right-12 my-auto"
          : "rotate-90 -translate-x-1/2 -bottom-12 left-1/2",
        className,
      )}
      disabled={!canScrollNext}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        scrollNext();
      }}
    >
      <ButtonIcon
        icon={icon}
        className={cn(
          "pointer-events-none shrink-0 size-4",
          orientation === "horizontal" && "rtl:rotate-180",
          iconClassName,
        )}
      />
      <ButtonText className={"sr-only"}>{label}</ButtonText>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
};
