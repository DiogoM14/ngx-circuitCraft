import { CircuitCraftOptions } from '../types/options.type';
import { PluginManager } from './plugin-manager';
import { Registry } from './registry';
import { CircuitViewModel } from '../view-models/circuit-view-model';
import { CanvasRenderer } from '../rendering/canvas-renderer';
import { CircuitModel } from '../models/circuit-model';

export class Kernel {
  private pluginManager: PluginManager;
  private registry: Registry;
  private circuitModel: CircuitModel;
  private circuitViewModel: CircuitViewModel;
  private canvasRenderer: CanvasRenderer;

  constructor(
    private domElement: HTMLElement,
    private options: CircuitCraftOptions = {}
  ) {
    this.registry = new Registry();
    this.pluginManager = new PluginManager(this);

    // Initialize canvas
    this.canvasRenderer = new CanvasRenderer(domElement);

    // Initialize model
    this.circuitModel = new CircuitModel();

    // Initialize view model
    this.circuitViewModel = new CircuitViewModel(this.circuitModel, this.canvasRenderer, this.registry);

    // Apply options
    if (options) {
      this.setOptions(options);
    }
  }

  public getRegistry(): Registry {
    return this.registry;
  }

  public getPluginManager(): PluginManager {
    return this.pluginManager;
  }

  public getViewModel(): CircuitViewModel {
    return this.circuitViewModel;
  }

  public getRenderer(): CanvasRenderer {
    return this.canvasRenderer;
  }

  public setOptions(options: CircuitCraftOptions): void {
    // Load plugins
    if (options.plugins) {
      options.plugins.forEach(pluginName => {
        this.pluginManager.loadPlugin(pluginName);
      });
    }

    // Register components
    if (options.toolbox?.components) {
      options.toolbox.components.forEach(componentDef => {
        this.registry.registerComponent(componentDef);
      });
    }

    // Update model with dataset
    if (options.dataset) {
      this.circuitModel.setComponents(options.dataset);
    }

    // Update view
    this.circuitViewModel.update();
  }
}
