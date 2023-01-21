import './App.css';
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Rect, Stage, Layer } from 'react-konva';
import { Rectangle } from './components/Rectangle';
import { Header } from './components/Header';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './hooks/useLocalStorage';
import { EditSection } from './components/EditSection';
import { LayoutList } from './components/LayoutList';
import { initialLayouts } from './constants'

const App = () => {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const annotationsToDraw = useMemo(() => [...annotations, ...newAnnotation], [annotations, newAnnotation]);

  const [layouts, setLayouts] = useLocalStorage('rm-savedLayouts', initialLayouts)
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState(0) // Always start with the first saved layout.
  const [selectedRectId, setSelectedRectId] = useState(null);
  const [draggingId, setDraggingId] = useState(null)
  const [newColor, setNewColor] = useState(null)
  const [newLayoutName, setNewLayoutName] = useState(null)

  const rectangles = layouts[selectedLayoutIndex].rectangles
  const setRectangles = useCallback((newRectangles) => {
    const newLayouts = layouts
    newLayouts[selectedLayoutIndex].rectangles = newRectangles
    setLayouts(newLayouts)
    
    if (newRectangles.length === 0) {
      setSelectedRectId(null)
      setAnnotations([])
    }
  }, [layouts, selectedLayoutIndex, setLayouts])

  const handleMouseDown = e => {
    const clickedOnEmpty = e.target === e.target.getStage();

    if (selectedRectId) {
      if (clickedOnEmpty) {
        setSelectedRectId(null);
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

  // The width and height of a `Stage` only accepts pixels as dimentions, so we need to calulcate
  // them here to allow it to only be 2/3 of the width of the screen.
  const stageContainerRef = useRef(null)
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    height: 0
  })
  useEffect(() => {
    if (stageContainerRef.current?.offsetHeight && stageContainerRef.current?.offsetWidth) {
      setStageDimensions({
        width: stageContainerRef.current.offsetWidth,
        height: stageContainerRef.current.offsetHeight
      })
    }
  }, [])

  return (
    <div data-testid='AppContainer' className="bg-stone-50 w-screen h-screen">
      <Header />
      <div className="m-10 h-full">
        <div data-testid='TopContainer' className='h-2/4 flex'>
          <div ref={stageContainerRef} data-testid='StageContainer' className='bg-slate-200 h-full w-2/3'>
            <Stage
              width={stageDimensions.width}
              height={stageDimensions.height}
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
                        setSelectedRectId(rect.id);
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
          </div>
          <div data-testid='LayoutContainer' className='w-1/3'>
            <LayoutList layouts={layouts} selectedLayoutIndex={selectedLayoutIndex} setSelectedLayoutIndex={setSelectedLayoutIndex} newLayoutName={newLayoutName} setNewLayoutName={setNewLayoutName} setLayouts={setLayouts} />
          </div>
        </div>
        <EditSection selectedId={selectedRectId} setSelectedId={setSelectedRectId} rectangles={rectangles} setRectangles={setRectangles} newColor={newColor} setNewColor={setNewColor} />
      </div>
    </div>
  );
};

export default App;
