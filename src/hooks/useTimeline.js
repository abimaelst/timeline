import { useMemo } from 'react';
import assignLanes from '../assignLanes';

export function useTimeline(items) {
  const lanes = useMemo(() => assignLanes(items), [items]);

  const { startDate, endDate } = useMemo(() => {
    let start = items[0].start;
    let end = items[0].end;
    for (const item of items) {
      if (new Date(item.start) < new Date(start)) {
        start = item.start;
      }
      if (new Date(item.end) > new Date(end)) {
        end = item.end;
      }
    }
    return { startDate: start, endDate: end };
  }, [items]);

  return { lanes, startDate, endDate };
}
