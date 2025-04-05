import { Plugin } from '../types/plugin.type';
import { Kernel } from './kernel';

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();

  constructor(private kernel: Kernel) {}

  public loadPlugin(pluginName: string): void {
    try {
      // In a real implementation, this would dynamically load the plugin
      // For this example, we'll just log that we would load it
      console.log(`Would load plugin: ${pluginName}`);
    } catch (error) {
      console.error(`Failed to load plugin ${pluginName}:`, error);
    }
  }

  public registerPlugin(plugin: Plugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin ${plugin.name} is already registered.`);
      return;
    }

    this.plugins.set(plugin.name, plugin);
    plugin.initialize(this.kernel);
  }

  public getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }
}
