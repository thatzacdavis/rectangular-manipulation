import React from 'react';
import { Rect, Transformer } from 'react-konva';

/**
 * A Rectangle shape that is rendered on a `canvas` using `konva`.
 */
export const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragStart,
  onDragEnd,
}) => {
  const shapeRef = React.useRef();
  const transformerRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragStart={(e) => {
          onDragStart && onDragStart();
        }}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });

          onDragEnd && onDragEnd();
        }}
        onTransformEnd={(e) => {
          const newAttributes = e.currentTarget.attrs;
          onChange({
            ...shapeProps,
            x: newAttributes.x,
            y: newAttributes.y,
            rotation: newAttributes.rotation,
            skewX: newAttributes.skewX,
            skewY: newAttributes.skewY,
            scaleX: newAttributes.scaleX,
            scaleY: newAttributes.scaleY,
          });
        }}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};
