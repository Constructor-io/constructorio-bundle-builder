# Constructor.io PLP Bundle

This guide covers customization and usage of the Constructor.io Product Listing Page (PLP) bundle.

## Building the Bundle

```bash
npm run build:plp
```

This generates `dist/cio-plp/custom-cio-plp.iife.js` - a single JavaScript file containing:
- Your customized PLP components
- All dependencies (React, Constructor.io UI library)
- All CSS styles (injected via JS)

## Using the Bundle

### Basic Usage

Add a container element, include the script, and call `CioPlp()`:

```html
<div id="cio-plp-container"></div>
<script src="custom-cio-plp.iife.js"></script>
<script>
  CioPlp({
    selector: '#cio-plp-container',
    apiKey: 'YOUR_CONSTRUCTOR_API_KEY',
  });
</script>
```

### With Shopify Defaults

For Shopify integrations, use the built-in Shopify defaults which automatically configure the selector and other settings:

```html
<script src="custom-cio-plp.iife.js"></script>
<script>
  CioPlp({
    useShopifyDefaults: true,
    apiKey: 'YOUR_CONSTRUCTOR_API_KEY',
  });
</script>
```

### Configuration Options

```javascript
CioPlp({
  selector: '#cio-plp-container',  // CSS selector for the container element
  apiKey: 'YOUR_CONSTRUCTOR_API_KEY',
  includeCSS: true,                // Include default styles (default: true)
  useShopifyDefaults: false,       // Use Shopify default configuration
  // ...additional CustomCioPlp props
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `selector` | `string` | `undefined` | CSS selector for the container element |
| `apiKey` | `string` | - | Your Constructor.io API key |
| `includeCSS` | `boolean` | `true` | Whether to include the default stylesheet |
| `useShopifyDefaults` | `boolean` | `false` | Use predefined Shopify selector and configuration |

### Unmounting

To remove the PLP component and clean up resources:

```javascript
CioPlp.unmount('#cio-plp-container');
```

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

Edit `src/cio-plp/styles.css` to customize appearance. All CSS is automatically bundled and injected via JavaScript.

### Step 3: Build and Deploy

```bash
npm run build:plp
```

Copy `dist/cio-plp/custom-cio-plp.iife.js` to your website.

## Build Output

After running `npm run build:plp`:

```
dist/
└── cio-plp/
    ├── custom-cio-plp.iife.js      # The bundle (~350KB, ~100KB gzipped)
    └── custom-cio-plp.iife.js.map  # Source map for debugging
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
      productCard={(props) => <CustomProductCard {...props} />}
    />
  );
}
```

## Resources

- [Constructor.io PLP Documentation](https://docs.constructor.io/reference/ui-plp)
- [Constructor.io UI PLP Storybook](https://constructor-io.github.io/constructorio-ui-plp/)
