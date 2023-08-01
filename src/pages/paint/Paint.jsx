import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading } from "../../redux/slice/loading.slice";

function Paint(props) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(hideLoading());
  }, [loading]);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [shape, setShape] = useState("line");
  const [drawings, setDrawings] = useState([]);
  const currentShape = useRef(null);
  const [brushSize, setBrushSize] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineWidth = 2;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    drawShape();
  }, [drawings]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    currentShape.current = {
      shape,
      color: drawingColor,
      startX: offsetX,
      startY: offsetY,
      brushSize,
      points: [],
    };
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    if (offsetX || offsetY)
      if (shape === "line" || shape === "erase") {
        currentShape.current.points.push({ x: offsetX, y: offsetY });
      } else if (shape === "rectangle" || shape === "circle") {
        currentShape.current.points[0] = { x: offsetX, y: offsetY };
      }
    drawShape();
  };

  const stopDrawing = () => {
    if (isDrawing && currentShape.current) {
      setIsDrawing(false);
      setDrawings([...drawings, currentShape.current]);
      currentShape.current = null;
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setDrawings([]);
  };

  const undoDrawing = () => {
    setDrawings((prevDrawings) => prevDrawings.slice(0, -1));
  };

  const drawShape = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawings.forEach((drawing) => {
      const { shape, color, points, brushSize } = drawing;
      context.strokeStyle = color;
      context.lineWidth = brushSize;
      if (shape === "line" || shape === "erase") {
        if (shape === "erase") {
          context.strokeStyle = "#fff";
        }
        context.beginPath();
        context.moveTo(points?.[0]?.x, points?.[0]?.y);
        points?.forEach((point) => {
          context.lineTo(point?.x, point?.y);
        });
        context.stroke();
      } else if (shape === "rectangle") {
        const { startX, startY } = drawing;
        if (points?.[0]?.x && points?.[0]?.y) {
          const { x, y } = points?.[0];
          const width = x - startX;
          const height = y - startY;
          context.strokeRect(startX, startY, width, height);
        }
      } else if (shape === "circle") {
        const { startX, startY } = drawing;
        if (points?.[0]?.x && points?.[0]?.y) {
          const { x, y } = points?.[0];
          const radius = Math.sqrt(
            Math.pow(x - startX, 2) + Math.pow(y - startY, 2)
          );
          context.beginPath();
          context.arc(startX, startY, radius, 0, 2 * Math.PI);
          context.stroke();
        }
      }
    });

    if (currentShape.current) {
      const { shape, color, points, brushSize } = currentShape.current;
      context.strokeStyle = color;
      context.lineWidth = brushSize;
      if (shape === "line" || shape === "erase") {
        if (shape === "erase") {
          context.strokeStyle = "#fff";
        }
        context.beginPath();
        context.moveTo(points?.[0]?.x, points?.[0]?.y);
        points.forEach((point) => {
          context.lineTo(point?.x, point?.y);
        });
        context.stroke();
      } else if (shape === "rectangle") {
        const { startX, startY } = currentShape.current;
        if (points?.[0]?.x && points?.[0]?.y) {
          const { x, y } = points?.[0];
          const width = x - startX;
          const height = y - startY;
          context.strokeRect(startX, startY, width, height);
        }
      } else if (shape === "circle") {
        const { startX, startY } = currentShape.current;
        if (points?.[0]?.x && points?.[0]?.y) {
          const { x, y } = points?.[0];
          const radius = Math.sqrt(
            Math.pow(x - startX, 2) + Math.pow(y - startY, 2)
          );
          context.beginPath();
          context.arc(startX, startY, radius, 0, 2 * Math.PI);
          context.stroke();
        }
      }
    }
  };

  return (
    <div>
      <div
        className="flex gap-5 justify-center py-10"
        style={{ marginBottom: "10px" }}>
        <input
          type="color"
          value={drawingColor}
          onChange={(e) => setDrawingColor(e.target.value)}
        />
        <button onClick={() => setShape("line")}>Draw Line</button>
        <button onClick={() => setShape("rectangle")}>Draw Rectangle</button>
        <button onClick={() => setShape("circle")}>Draw circle</button>
        <button
          onClick={() => {
            setShape("erase");
          }}>
          Erase
        </button>
        <div className="flex gap-2">
          Size:
          <input
            type="range"
            min="1"
            max="10"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
          <span>{brushSize}</span>
        </div>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={undoDrawing}>Undo</button>
      </div>
      <canvas
        className="mx-auto"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={1000}
        height={500}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
}

export default Paint;
