# CircuitCraftJS

CircuitCraftJS is a sophisticated, extensible framework for building and simulating digital circuits in the browser. This library combines a declarative, component-based approach with a powerful plugin system to provide both simplicity for basic use cases and flexibility for advanced applications.

## Architecture

CircuitCraftJS implements a hybrid architecture combining three major patterns:

### 1. Microkernel Pattern (Core)
- **Kernel**: Serves as the core that coordinates all functionality
- **PluginManager**: Provides extensibility through plugins
- **Registry**: Manages component registration and retrieval

### 2. Component Based Architecture (CBA)
- **BaseComponent**: Provides an abstraction for all circuit components
- **Component Encapsulation**: Components have encapsulated rendering and behavior
- **ComponentFactory**: Creates component instances from definitions

### 3. Model-View-ViewModel Pattern (MVVM)
- **Model**: `CircuitModel`, `ComponentModel`, `ConnectorModel` represent data
- **View**: Canvas rendering through `CanvasRenderer`, `ComponentRenderer`, `ConnectorRenderer`
- **ViewModel**: `CircuitViewModel` connects the model to the view, handling user interactions

## Project Structure

```
circuit-craft-js/
├── src/
    ├── libs/
        ├── circuit-craft-js/
            ├── core/                      // Microkernel implementation
            │   ├── kernel.ts
            │   ├── plugin-manager.ts
            │   └── registry.ts
            │
            ├── components/                // CBA implementation
            │   ├── base-component.ts
            │   ├── component-factory.ts
            │   └── standard/
            │       └── and-gate.ts
            │
            ├── rendering/                 // View layer
            │   ├── canvas-renderer.ts
            │   ├── component-renderer.ts
            │   └── connector-renderer.ts
            │
            ├── models/                    // Model layer
            │   ├── circuit-model.ts
            │   ├── component-model.ts
            │   └── connector-model.ts
            │
            ├── view-models/               // ViewModel layer
            │   ├── circuit-view-model.ts
            │   ├── toolbox-view-model.ts
            │   └── editor-view-model.ts
            │
            ├── types/                     // TypeScript types
            │   ├── component-definition.type.ts
            │   ├── options.type.ts
            │   └── plugin.type.ts
            │
            └── index.ts                   // Main entry point
```

## Key Features

1. **Interactive Canvas Rendering**: Vector-based rendering of circuit components
2. **Component-Based Structure**: Modular components with standardized interfaces
3. **Plugin System**: Extensible architecture for adding custom tools and components
4. **TypeScript Support**: Full type definitions for enhanced development experience
5. **Event-Driven Interaction**: Sophisticated event system for component interactions

## Getting Started

### Basic Usage

```typescript
import * as circuitCraft from 'circuit-craft-js';

// Define a component
const andGateComponent = {
  id: 'and-gate',
  name: 'AND Gate',
  styles: {
    width: '100px',
    height: '50px',
    // more style properties...
  },
  properties: {
    inputs: [
      { id: 'in1', name: 'Input 1' },
      { id: 'in2', name: 'Input 2' },
    ],
    outputs: [{ id: 'out', name: 'Output' }],
    methods: [],
  },
};

// Initialize the circuit editor
const editor = circuitCraft.init(document.getElementById('circuit-canvas'));

// Configure the editor
editor.setOptions({
  toolbox: {
    show: true,
    components: [andGateComponent],
  },
  dataset: [
    {
      id: 'gate1',
      component: andGateComponent,
      position: { x: 100, y: 100 },
    },
  ],
});
```

### Creating Custom Components

CircuitCraftJS allows you to create custom components by extending the `BaseComponent` class:

```typescript
import { BaseComponent } from 'circuit-craft-js/components';

export class CustomComponent extends BaseComponent {
  public render(ctx, x, y, selected) {
    // Custom rendering logic
  }
  
  // Custom methods and behavior
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Building the library

Run `ng build circuit-craft-js` to build the library. The build artifacts will be stored in the `dist/circuit-craft-js` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Extending with Plugins

The plugin system allows for extending CircuitCraftJS with additional functionality:

```typescript
// Custom plugin
const myPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  initialize: (kernel) => {
    // Add custom functionality
  }
};

// Register the plugin
editor.getPluginManager().registerPlugin(myPlugin);
```
