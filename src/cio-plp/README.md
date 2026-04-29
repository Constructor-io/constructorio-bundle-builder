# Constructor.io PLP Bundle

This guide covers customization and usage of the Constructor.io Product Listing Page (PLP) bundle.

## Development

Start a dev server with hot module replacement for live preview:

```bash
npm run dev:plp
```

This starts a Vite dev server with HMR. Open `http://localhost:5173` in your browser. You'll be prompted to enter your Constructor.io API key (required) and an optional search query. Your API key is saved in `sessionStorage` so it persists across page reloads. Changes to any source file will hot-reload automatically.

Start developing in `./Components/CustomCioPlp.tsx` and see your changes reflected live via HMR.

## Building the Bundle

```bash
npm run build:plp
```

This generates `dist/cio-plp/custom-cio-plp.js` - a single JavaScript file containing:
- Your customized PLP components
- All dependencies (React, Constructor.io UI library)
- All CSS styles (injected via JS)

## Using the Bundle

### Basic Usage

Add a container element, include the bundled script in `<head>` with `defer` so it downloads in parallel with HTML parsing, and call `CioPlp()` from an inline script wrapped in a `DOMContentLoaded` listener so it runs after the deferred bundle has executed:

```html
<head>
  <script defer src="custom-cio-plp.js"></script>
</head>
<body>
  <div id="cio-plp-container"></div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      CioPlp({
        selector: '#cio-plp-container',
        apiKey: 'YOUR_CONSTRUCTOR_API_KEY',
      });
    });
  </script>
</body>
```

See [`src/cio-plp/example.html`](./example.html) for a complete, working reference.

### With Shopify Defaults

For Shopify integrations, use the built-in Shopify defaults which automatically configure the selector and other settings:

```html
<head>
  <script defer src="custom-cio-plp.js"></script>
</head>
<body>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      CioPlp({
        useShopifyDefaults: true,
        apiKey: 'YOUR_CONSTRUCTOR_API_KEY',
      });
    });
  </script>
</body>
```

### Configuration Options

```javascript
CioPlp({
  selector: '#cio-plp-container',  // CSS selector for the container element
  apiKey: 'YOUR_CONSTRUCTOR_API_KEY', // Add your API Key
  includeCSS: true,                // Include default styles (default: true)
  useShopifyDefaults: false,       // Use Shopify default configuration
  // ...additional CioPlp props
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `selector` | `string` | `undefined` | CSS selector for the container element |
| `apiKey` | `string` | - | Your Constructor.io API key |
| `includeCSS` | `boolean` | `true` | Whether to include the default stylesheet |
| `useShopifyDefaults` | `boolean` | `false` | Use predefined Shopify selector and configuration |
| `cioClientOptions` | `object` | `{ sendTrackingEvents: false }` | Options forwarded to the underlying `ConstructorIOClient`. Tracking events are disabled by default; pass `{ sendTrackingEvents: true }` to opt in. |

## Customization Guide

### Step 1: Choose Your Customization Level

#### Option A: Simple Customization (Props Only)

For basic configuration, use the `CioPlp` component with props:

```tsx
import CioPlp from "@constructor-io/constructorio-ui-plp";

function CustomCioPlp({ apiKey }) {
  return (
    <CioPlp
      apiKey={apiKey}
      // Add your props here
    />
  );
}
```

#### Option B: Advanced Customization (Custom Components)

For full control, use render props to inject custom components:

```tsx
import CioPlp, { CioPlpGrid } from "@constructor-io/constructorio-ui-plp";

function CustomCioPlp({ apiKey }) {
  return (
    <CioPlp apiKey={apiKey}>
      <CioPlpGrid>
        {(props) => <CustomCioPlpGrid {...props} />}
      </CioPlpGrid>
    </CioPlp>
  );
}
```

#### Available Component Overrides

You can override these components via render props:

- `ProductCard` - Product card display
- `Pagination` - Page navigation
- `Sort` - Sort dropdown
- `Filters` - Filter sidebar
- `ZeroResults` - No results message
- `Spinner` - Loading indicator
- `Groups` - Category groups
- `Breadcrumbs` - Navigation breadcrumbs

### Step 2: Add Custom Styles

Add custom styles to customize appearance. All CSS is automatically bundled and injected via JavaScript.

### Step 3: Build and Deploy

```bash
npm run build:plp
```

Copy `dist/cio-plp/custom-cio-plp.js` to your website.

## Build Output

After running `npm run build:plp`:

```
dist/
└── cio-plp/   
    └── custom-cio-plp.js     # The bundle
```

## Customization Examples

### Custom Product Card with Sale Badge

```tsx
// In src/cio-plp/components/CustomCioPlp.tsx
import CioPlp from "@constructor-io/constructorio-ui-plp";

function CustomProductCard(props) {
  const { item, formatPrice } = props;
  const price = item.data?.price;
  const originalPrice = item.data?.original_price;
  const isOnSale = originalPrice && originalPrice > price;

  return (
    <div className="product-card">
      {isOnSale && <span className="sale-badge">SALE</span>}
      <img src={item.imageUrl} alt={item.itemName} />
      <h3>{item.itemName}</h3>
      <div className="price">
        {isOnSale && <span className="original">{formatPrice(originalPrice)}</span>}
        <span className="current">{formatPrice(price)}</span>
      </div>
    </div>
  );
}

function CustomCioPlp({ apiKey }) {
  return (
    <CioPlp
      apiKey={apiKey}
      renderOverrides={{
        productCard: {
          renderHtml: (props) => <CustomProductCard {...props} />,
        },
      }}
    />
  );
}
```

## Resources

- [Constructor.io PLP Documentation](https://docs.constructor.io/reference/ui-plp)
- [Constructor.io UI PLP Storybook](https://constructor-io.github.io/constructorio-ui-plp/)
