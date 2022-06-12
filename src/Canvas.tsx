import { useRef, useState, useEffect, useCallback } from 'react'
import delay from './delay';

const Canvas = () => {
  const [shouldDraw, setShouldDraw] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clearCanvas = useCallback(() => {
      const context = canvasRef.current?.getContext('2d');
      if (context) {
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      }
  }, [])
  
  const drawRightLine = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = '#d0463b';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(130, 210);
        ctx.quadraticCurveTo(160, 160, 190, 180);
        ctx.lineWidth = 10;
        ctx.stroke();
  }, [])

  const drawCenterLine = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = '#d0463b';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(100, 210);
        ctx.quadraticCurveTo(120, 60, 160, 120);
        ctx.stroke();
  }, [])

  const drawLeftLine = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = '#d0463b';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(70, 210);
        ctx.quadraticCurveTo(70, 70, 10, 140);
        ctx.stroke();
  }, [])

  useEffect(() => {
    setShouldDraw(true);
  }, [])

  useEffect(() => {
    const drawLines = async () => {
        const context = canvasRef.current?.getContext('2d');
        
        if (context) {
            clearCanvas();
            await delay(400);
            drawLeftLine(context);
            await delay(400);
            drawCenterLine(context);
            await delay(400);
            drawRightLine(context);
            await delay(400);
            clearCanvas();
            await delay(400);
            drawLeftLine(context);
            await delay(400);
            drawCenterLine(context);
            await delay(400);
            drawRightLine(context);
        } else {
            console.log('no context')
        }
    }

    if (shouldDraw === true) {
        drawLines();
    }
  }, [shouldDraw, drawLeftLine, drawCenterLine, drawRightLine, clearCanvas])
    
  return <canvas height="200" width="200" ref={canvasRef} />
}

export default Canvas