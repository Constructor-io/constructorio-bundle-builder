import React from "react";
import ReactDOM from "react-dom/client";
import CustomCioPlp from "./components/CustomCioPlp";
import { utils, CioPlpProps } from "@constructor-io/constructorio-ui-plp";

// Store React roots by container element to prevent memory leaks from creating multiple roots
const rootMap = new Map<Element, ReactDOM.Root>();

interface CioPlpOptions extends CioPlpProps {
  selector?: string;
  includeCSS?: boolean;
  useShopifyDefaults?: boolean;
}

/**
 * Initializes and renders the Constructor.io PLP component into a specified DOM container.
 */
const CioPlp = ({
  selector,
  includeCSS = true,
  useShopifyDefaults,
  apiKey,
  cioClientOptions,
  ...rest
}: CioPlpOptions) => {
  // Guard against SSR environments where document is not available
  if (typeof document === "undefined") {
    return;
  }

  // Warn if apiKey is missing
  if (!apiKey) {
    console.error("CioPlp: apiKey is required");
    window.alert("CioPlp: apiKey is required");
    return;
  }

  const stylesheet = document.getElementById(
    "cio-plp-styles",
  ) as HTMLStyleElement | null;

  // Use provided selector, fall back to Shopify defaults if enabled, otherwise undefined
  const containerSelector =
    selector ||
    (useShopifyDefaults ? utils.shopifyDefaults.selector : undefined);
  const containerElement = containerSelector
    ? document.querySelector(containerSelector)
    : null;

  // Exit early if no valid container element is found
  if (!containerElement) {
    console.error(
      `CioPlp: There were no elements found for the provided selector`,
    );
    return;
  }

  // Toggle stylesheet based on includeCSS option
  if (stylesheet) {
    stylesheet.disabled = !includeCSS;
  }

  // Reuse existing root if available, otherwise create a new one
  // This prevents React warnings and memory leaks from creating multiple roots
  let root = rootMap.get(containerElement);
  if (!root) {
    root = ReactDOM.createRoot(containerElement);
    rootMap.set(containerElement, root);
  }

  // Disable tracking events by default; consumers can opt in by passing
  // `cioClientOptions: { sendTrackingEvents: true }`.
  const mergedCioClientOptions = {
    sendTrackingEvents: false,
    ...cioClientOptions,
  };

  root.render(
    <React.StrictMode>
      <CustomCioPlp
        {...rest}
        apiKey={apiKey}
        useShopifyDefaults={useShopifyDefaults}
        cioClientOptions={mergedCioClientOptions}
      />
    </React.StrictMode>,
  );
};

export default CioPlp;
