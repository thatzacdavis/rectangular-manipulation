import './App.css';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Rect, Stage, Layer } from 'react-konva';
import { Rectangle } from './components/Rectangle';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './hooks/useLocalStorage';
import { EditSection } from './components/EditSection';

// The initial layout presented to a user that hasn't used the app before.
// This sets up a green and red square in the `Stage` for them to experiment with.
const initialLayouts = [{
  name: 'Layout 1',
  rectangles: [
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: 'red',
      id: uuidv4(),
    },
    {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      fill: 'green',
      id: uuidv4(),
    },
  ]
}];

const App = () => {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const annotationsToDraw = useMemo(() => [...annotations, ...newAnnotation], [annotations, newAnnotation]);

  const [layouts, setLayouts] = useLocalStorage('rm-savedLayouts', initialLayouts)
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState(0) // Always start with the first saved layout.
  const [selectedRectId, setselectedRectId] = useState(null);
  const [draggingId, setDraggingId] = useState(null)
  const [newColor, setNewColor] = useState(null)

  const rectangles = useMemo(() => layouts[selectedLayoutIndex].rectangles, [layouts, selectedLayoutIndex])
  const setRectangles = useCallback((rectangles) => {
    const newLayouts = layouts
    newLayouts[selectedLayoutIndex].rectangles = rectangles
    setLayouts(newLayouts)
  }, [layouts, selectedLayoutIndex, setLayouts])

  const handleMouseDown = e => {
    const clickedOnEmpty = e.target === e.target.getStage();

    if (selectedRectId) {
      if (clickedOnEmpty) {
        setselectedRectId(null);
        return
      }
    }

    if (!selectedRectId && !draggingId && clickedOnEmpty && newAnnotation.length === 0) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = event => {
    if (!selectedRectId && !draggingId && newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }

    if (draggingId) {
      setDraggingId(null)
    }
  };

  const handleMouseMove = event => {
    if (!selectedRectId && !draggingId && newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0"
        }
      ]);
    }
  };

  // Once a rectangle is drawn as an "annotation", it is preserved to the layout by making it part
  // of the stored rectangles array.
  useEffect(() => {
    if (annotations.length > 0) {
      const rectToAdd = {
        x: annotations[0].x,
        y: annotations[0].y,
        width: annotations[0].width,
        height: annotations[0].height,
        fill: 'black',
        id: uuidv4(),
      }

      setRectangles([...rectangles, { ...rectToAdd }])
      setAnnotations([])
    }
  }, [annotations, rectangles, setRectangles])

  return (
    <div style={{ margin: '30px' }}>
      <Stage
        width={500}
        height={500}
        onTouchStart={handleMouseDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        stroke='black'
      >
        <Layer>
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                shapeProps={rect}
                isSelected={rect.id === selectedRectId}
                onSelect={() => {
                  setselectedRectId(rect.id);
                }}
                onChange={(newAttrs) => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
                }}
                onDragStart={() => setDraggingId(rect.id)}
              />
            );
          })}
          {annotationsToDraw.map(value => {
            return (
              <Rect
                x={value.x}
                y={value.y}
                width={value.width}
                height={value.height}
                fill="transparent"
                stroke="black"
              />
            );
          })}
        </Layer>
      </Stage>
      <EditSection selectedId={selectedRectId} setselectedRectId={setselectedRectId} rectangles={rectangles} setRectangles={setRectangles} newColor={newColor} setNewColor={setNewColor} />
    </div>
  );
};

export default App;
