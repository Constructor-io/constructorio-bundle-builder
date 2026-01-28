import React from 'react';
import ReactDOM from 'react-dom/client';
import CustomCioPlp from "./components/CustomCioPlp";
import { utils } from '@constructor-io/constructorio-ui-plp';
import './styles.css';

// Store React roots by container element to prevent memory leaks from creating multiple roots
const rootMap = new Map();

/**
 * Initializes and renders the Constructor.io PLP component into a specified DOM container.
 * @param {Object} options - Configuration options
 * @param {string} [options.selector] - CSS selector for the container element
 * @param {boolean} [options.includeCSS=true] - Whether to include the default stylesheet
 * @param {boolean} [options.useShopifyDefaults] - Whether to use Shopify default configuration
 * @param {Object} [options.rest] - Additional props passed to CustomCioPlp component
 */
const CioPlp = ({ selector, includeCSS = true, useShopifyDefaults, ...rest }) => {
  // Guard against SSR environments where document is not available
  if (typeof document === 'undefined') {
    return;
  }

  const stylesheet = document.getElementById('cio-plp-styles');

  // Use provided selector, fall back to Shopify defaults if enabled, otherwise undefined
  const containerSelector =
    selector || (useShopifyDefaults ? utils.shopifyDefaults.selector : undefined);
  const containerElement = containerSelector ? document.querySelector(containerSelector) : null;

  // Exit early if no valid container element is found
  if (!containerElement) {
    console.error(`CioPlp: There were no elements found for the provided selector`);
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

  root.render(
    <React.StrictMode>
      <CustomCioPlp {...rest} useShopifyDefaults={useShopifyDefaults} />
    </React.StrictMode>,
  );
};

/**
 * Unmounts the CioPlp component from the specified container and cleans up the React root.
 * @param {string} selector - CSS selector for the container element to unmount
 */
CioPlp.unmount = (selector) => {
  // Guard against SSR environments where document is not available
  if (typeof document === 'undefined') {
    return;
  }

  const containerElement = selector ? document.querySelector(selector) : null;

  // Only unmount if the container exists and has an associated root
  if (containerElement && rootMap.has(containerElement)) {
    rootMap.get(containerElement).unmount();
    rootMap.delete(containerElement);
  }
};

// Expose CioPlp globally for non-module usage (e.g., script tags)
if (typeof window !== 'undefined') {
  window.CioPlp = CioPlp;
}

export default CioPlp;
