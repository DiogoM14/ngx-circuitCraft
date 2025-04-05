import { ComponentInstance } from '../../circuit-craft-js/types/options.type';
import { andGateComponent, orGateComponent } from './components.config';

export const datasetConf: ComponentInstance[] = [
  {
    id: '1',
    component: andGateComponent,
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    component: orGateComponent,
    position: { x: 300, y: 300 },
  },
];
