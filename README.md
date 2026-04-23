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

1. Fork this repository to your own GitHub account
2. Clone your fork and install dependencies:

```bash
npm install
```

### Development

Start a dev server with hot module replacement for live preview:

```bash
# Start PLP dev server
npm run dev:plp
```

Open `http://localhost:5173` in your browser. You'll be prompted to enter your Constructor.io API key (required) and an optional search query. Your API key is saved in `sessionStorage` so it persists across page reloads.

Start developing in `./Components/CustomCio<Component>.tsx` and see your changes reflected live via HMR.

### Building Bundles

Each UI library has its own build command:

```bash
# Build PLP bundle
npm run build:plp
```

### Example Usage

See [`src/cio-plp/example.html`](./src/cio-plp/example.html) for a complete reference showing how to embed the built `custom-cio-plp.js` bundle on a page.

## Project Structure

```
src/
├── vite-env.d.ts                   # Vite client type declarations
└── cio-plp/                        # PLP UI library
    ├── README.md                   # PLP-specific documentation
    ├── index.tsx                   # Entry point (mount function)
    ├── components/
    │   └── CustomCioPlp.tsx        # Main customization file
    └── dev/                        # Dev server app
        ├── index.tsx               # Dev entry point
        ├── Dev.tsx                 # Dev app component
        └── DevStyles.css           # Dev app styles
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev:plp` | Start PLP dev server with HMR |
| `npm run build:plp` | Build the PLP bundle |
| `npm run lint` | Run ESLint |

## Resources

- [Constructor.io Documentation](https://docs.constructor.io)
- [Constructor.io UI PLP Documentation](https://docs.constructor.io/reference/ui-plp)
- [Constructor.io UI PLP Storybook](https://constructor-io.github.io/constructorio-ui-plp/)
