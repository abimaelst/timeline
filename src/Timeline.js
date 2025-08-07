
import React, { useMemo, useState } from "react";
import assignLanes from "./assignLanes.js";
import timelineItems from "./timelineItems.js";

const LANE_HEIGHT = 40;
const ITEM_H_PADDING = 10;
const ZOOM_LEVELS = [0.5, 1, 2];

function getDaysBetween(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;
}

function Timeline() {
  const [zoomIndex, setZoomIndex] = useState(1);

  const lanes = useMemo(() => assignLanes(timelineItems), [timelineItems]);

  const { startDate, endDate } = useMemo(() => {
    let start = timelineItems[0].start;
    let end = timelineItems[0].end;
    for (const item of timelineItems) {
      if (new Date(item.start) < new Date(start)) {
        start = item.start;
      }
      if (new Date(item.end) > new Date(end)) {
        end = item.end;
      }
    }
    return { startDate: start, endDate: end };
  }, [timelineItems]);

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
    <div className="timeline-container" onWheel={handleWheel}>
      <div className="timeline" style={{ width: totalWidth }}>
        {lanes.map((lane, i) => (
          <div key={i} className="lane" style={{ height: LANE_HEIGHT }}>
            {lane.map((item) => {
              const days = getDaysBetween(item.start, item.end);
              const offset = getDaysBetween(startDate, item.start) - 1;
              const width = days * 20 * zoom - ITEM_H_PADDING;
              const left = offset * 20 * zoom;

              return (
                <div
                  key={item.id}
                  className="timeline-item"
                  style={{
                    width,
                    left,
                    height: LANE_HEIGHT - 10,
                    lineHeight: `${LANE_HEIGHT - 10}px`,
                  }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
