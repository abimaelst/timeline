import React, { useMemo, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTimeline } from '../hooks/useTimeline';

const LANE_HEIGHT = 40;
const ITEM_H_PADDING = 10;
const ZOOM_LEVELS = [0.5, 1, 2];

function getDaysBetween(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;
}

function SortableItem({ item, zoom, startDate }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const days = getDaysBetween(item.start, item.end);
  const offset = getDaysBetween(startDate, item.start) - 1;
  const width = days * 20 * zoom - ITEM_H_PADDING;
  const left = offset * 20 * zoom;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width,
    left,
    height: LANE_HEIGHT - 10,
    lineHeight: `${LANE_HEIGHT - 10}px`,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="timeline-item">
      {item.name}
    </div>
  );
}

function DateIndicator({ totalDays, zoom }) {
  const dates = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date.toLocaleDateString());
  }

  return (
    <div className="date-indicator" style={{ width: totalDays * 20 * zoom }}>
      {dates.map((date, i) => (
        <div key={i} className="date-item" style={{ width: 20 * zoom }}>
          <div className="date-text">{date}</div>
        </div>
      ))}
    </div>
  );
}

function LaneIndicator({ lanes }) {
  return (
    <div className="lane-indicator">
      {lanes.map((lane, i) => (
        <div key={i} className="lane-item">
          {`Lane ${i + 1}`}
        </div>
      ))}
    </div>
  );
}

export function Timeline({ items, onDragEnd }) {
  const [zoomIndex, setZoomIndex] = useState(1);
  const { lanes, startDate, endDate } = useTimeline(items);

  const totalDays = useMemo(
    () => getDaysBetween(startDate, endDate),
    [startDate, endDate]
  );

  const zoom = ZOOM_LEVELS[zoomIndex];
  const totalWidth = totalDays * 20 * zoom;

  function handleWheel(e) {
    if (e.deltaY > 0) {
      setZoomIndex((prev) => Math.max(0, prev - 1));
    } else {
      setZoomIndex((prev) => Math.min(ZOOM_LEVELS.length - 1, prev + 1));
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="timeline-wrapper">
        <LaneIndicator lanes={lanes} />
        <div className="timeline-container" onWheel={handleWheel}>
          <DateIndicator totalDays={totalDays} zoom={zoom} />
          <div className="timeline" style={{ width: totalWidth }}>
            {lanes.map((lane, i) => (
              <SortableContext key={i} items={lane.map(item => item.id)}>
                <div className="lane" style={{ height: LANE_HEIGHT }}>
                  {lane.map((item) => (
                    <SortableItem key={item.id} item={item} zoom={zoom} startDate={startDate} />
                  ))}
                </div>
              </SortableContext>
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
}