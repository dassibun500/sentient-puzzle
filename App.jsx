import React, { useEffect, useMemo, useState } from "react";

const GRID_SIZE = 3; 
const IMAGE_SRC = "/sentient.jpg"; 

function getShuffledIndices(n) {
  const total = n * n;
  const arr = Array.from({ length: total }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [size, setSize] = useState(GRID_SIZE);
  const [order, setOrder] = useState(() => getShuffledIndices(GRID_SIZE));
  const [dragIndex, setDragIndex] = useState(null);

  function handleDragStart(e, index) {
    setDragIndex(index);
  }

  function handleDrop(e, index) {
    e.preventDefault();
    const newOrder = [...order];
    [newOrder[dragIndex], newOrder[index]] = [newOrder[index], newOrder[dragIndex]];
    setOrder(newOrder);
    setDragIndex(null);
  }

  const cols = size;
  const rows = size;
  const containerSize = 480;
  const tileWidth = containerSize / cols;
  const tileHeight = containerSize / rows;

  function isSolved() {
    return order.every((v, i) => v === i);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Sentient Logo Puzzle</h1>
      <button onClick={() => setOrder(getShuffledIndices(size))}>Shuffle</button>
      {isSolved() && <p style={{ color: "green" }}>✅ Solved!</p>}
      <div
        style={{
          width: containerSize,
          height: containerSize,
          border: "2px solid #ccc",
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${tileWidth}px)`,
          gridTemplateRows: `repeat(${rows}, ${tileHeight}px)`
        }}
      >
        {order.map((tileIndex, i) => {
          const x = (tileIndex % cols) * -tileWidth;
          const y = Math.floor(tileIndex / cols) * -tileHeight;
          return (
            <div
              key={i}
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, i)}
              style={{
                width: tileWidth,
                height: tileHeight,
                backgroundImage: `url(${IMAGE_SRC})`,
                backgroundSize: `${cols * tileWidth}px ${rows * tileHeight}px`,
                backgroundPosition: `${x}px ${y}px`,
                border: "1px solid #999",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
