# Constructor.io Bundle Builder

Build customized, self-contained JavaScript bundles for Constructor.io UI libraries. This tool allows you to customize Constructor.io UI components and generate a single JS file that can be embedded on any website.

## Supported UI Libraries

| Library | Description | Documentation |
|---------|-------------|---------------|
| [PLP (Product Listing Page)](./src/cio-plp/README.md) | `@constructor-io/constructorio-ui-plp` | [View Guide](./src/cio-plp/README.md) |

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Building Bundles

Each UI library has its own build command:

```bash
# Build PLP bundle
npm run build:plp
```

## Project Structure

```
src/
└── cio-plp/                        # PLP UI library
    ├── README.md                   # PLP-specific documentation
    ├── index.jsx                   # Entry point (mount function)
    ├── styles.css                  # Component styles
    └── components/
        └── CustomCioPlp.tsx        # Main customization file
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build:plp` | Build the PLP bundle |
| `npm run lint` | Run ESLint |

## Resources

- [Constructor.io Documentation](https://docs.constructor.io)
- [Constructor.io UI PLP Documentation](https://docs.constructor.io/reference/ui-plp)
- [Constructor.io UI PLP Storybook](https://constructor-io.github.io/constructorio-ui-plp/)
