import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { arrayMove } from '@dnd-kit/sortable';
import { Timeline } from './components/Timeline';
import timelineItems from './timelineItems';

function App() {
  const [items, setItems] = useState(timelineItems);

  function onDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div>
      <Timeline items={items} onDragEnd={onDragEnd} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);