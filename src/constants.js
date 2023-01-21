import { v4 as uuidv4 } from 'uuid';

// The initial layout presented to a user that hasn't used the app before.
// This sets up a cyan and purple square in the `Stage` for them to experiment with.
export const initialLayouts = [{
    name: 'Layout 1',
    rectangles: [
      {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: '#06b6d4',
        id: uuidv4(),
      },
      {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: '#8b5cf6',
        id: uuidv4(),
      },
    ]
  }];