import { useRef, useState } from 'react';

import useStyles from './style';

// document.getBoundingClientRect() - returns the absolute position of the component x - from left  y- from top

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const drawRectangle = (
    CanvasRef,
    info = { x1: 0, y1: 0, x2: 0, y2: 0 },
    style = { color: '#000000' }
  ) => {
    const { x1, y1, x2, y2 } = info;
    const canvas = CanvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = canvas.getBoundingClientRect();
    ctx.fillStyle = style.color;
    ctx.rect(x1 - x, y1 - y, x2 - x1, y2 - y1);
    ctx.stroke();
  };

  const clickHandler = (e) => {
    const { clientX, clientY } = e;
    if (!isDrawing) {
      setCoordinates({ x: clientX, y: clientY });
    } else {
      drawRectangle(canvasRef, {
        x1: coordinates.x,
        y1: coordinates.y,
        x2: clientX,
        y2: clientY,
      });
    }
    setIsDrawing(!isDrawing);
  };

  const styles = useStyles();

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      onClick={clickHandler}
      height={700}
      width={1400}
    ></canvas>
  );
};

export default Canvas;
