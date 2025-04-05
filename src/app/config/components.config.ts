import { ComponentDefinition } from '../../circuit-craft-js/types/component-definition.type';

export const andGateComponent: ComponentDefinition = {
  id: '2',
  name: 'AND Gate',
  styles: {
    width: '200px',
    height: '50px',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
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

export const orGateComponent: ComponentDefinition = {
  id: '1',
  name: 'OR Gate',
  styles: {
    width: '200px',
    height: '50px',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
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
