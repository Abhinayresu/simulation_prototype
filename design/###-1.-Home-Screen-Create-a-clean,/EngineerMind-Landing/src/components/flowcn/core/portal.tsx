/**
 * Where a component's portals render. Base UI portals into the document's
 * body by default — the document the components were loaded in. A screen
 * drawn into an iframe from outside it, as the prototype is, provides the
 * iframe's body, so popups open in the screen and its dismiss layer sees
 * clicks inside it as inside.
 */

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Autocomplete } from "@base-ui/react/autocomplete";
import { Combobox } from "@base-ui/react/combobox";
import { ContextMenu } from "@base-ui/react/context-menu";
import { Dialog } from "@base-ui/react/dialog";
import { Drawer } from "@base-ui/react/drawer";
import { Menu } from "@base-ui/react/menu";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { Popover } from "@base-ui/react/popover";
import { PreviewCard } from "@base-ui/react/preview-card";
import { Select } from "@base-ui/react/select";
import { Toast } from "@base-ui/react/toast";
import { Tooltip } from "@base-ui/react/tooltip";
import {
  createContext,
  createElement,
  useContext,
  type ElementType,
} from "react";

export const PortalContainer = createContext<HTMLElement | null>(null);

/**
 * Base UI's portals, by identity: a part drawn as one renders into the
 * provided container. Known by what it is, never by the element's name, which
 * a designer can change.
 */
export const BASE_UI_PORTALS: ReadonlySet<unknown> = new Set([
  AlertDialog.Portal,
  Autocomplete.Portal,
  Combobox.Portal,
  ContextMenu.Portal,
  Dialog.Portal,
  Drawer.Portal,
  Menu.Portal,
  NavigationMenu.Portal,
  Popover.Portal,
  PreviewCard.Portal,
  Select.Portal,
  Toast.Portal,
  Tooltip.Portal,
]);

const contained = new WeakMap<object, ElementType>();

/** A Base UI `Portal` that renders into the provided container, unless given its own. */
export const containedPortal = (Portal: ElementType): ElementType => {
  const key = Portal as object;
  const known = contained.get(key);
  if (known !== undefined) return known;
  const Contained = (props: { container?: unknown }) => {
    const container = useContext(PortalContainer);
    return createElement(
      Portal,
      container !== null && props.container === undefined
        ? { ...props, container }
        : props,
    );
  };
  contained.set(key, Contained);
  return Contained;
};
