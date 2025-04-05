import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as circuitCraft from '../circuit-craft-js';
import { CircuitCraftOptions } from '../circuit-craft-js/types/options.type';
import { CircuitCraftInstance } from '../circuit-craft-js/types/circuit-craft-instance.type';
import { datasetConf } from './config/dataset.config';
import { andGateComponent, orGateComponent } from './config/components.config';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('circuitCraft') circuitCraftElement?: ElementRef<HTMLDivElement>;

  private circuitCraftInstance: CircuitCraftInstance | null = null;

  private options: CircuitCraftOptions = {
    toolbox: {
      show: false,
      components: [andGateComponent, orGateComponent],
    },
    dataset: datasetConf,
  };

  ngAfterViewInit(): void {
    if (this.circuitCraftElement) {
      this.circuitCraftInstance = circuitCraft.init(this.circuitCraftElement.nativeElement);

      if (this.circuitCraftInstance) {
        this.circuitCraftInstance.setOptions(this.options);
        this.setupButtonHandlers();
      }
    }
  }

  private setupButtonHandlers(): void {
    document.getElementById('addComponent')?.addEventListener('click', () => {
      const x = Math.floor(Math.random() * 500) + 50;
      const y = Math.floor(Math.random() * 400) + 50;
      this.circuitCraftInstance?.addComponent('and-gate', x, y);
    });

    document.getElementById('removeSelected')?.addEventListener('click', () => {
      this.circuitCraftInstance?.removeSelectedComponent();
    });
  }
}
