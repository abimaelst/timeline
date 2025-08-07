import assignLanes from './assignLanes';

describe('assignLanes', () => {
  it('should return an empty array when given an empty array', () => {
    expect(assignLanes([])).toEqual([]);
  });

  it('should place a single item in the first lane', () => {
    const items = [{ start: '2025-01-01', end: '2025-01-02' }];
    expect(assignLanes(items)).toEqual([items]);
  });

  it('should place non-overlapping items in the same lane', () => {
    const items = [
      { start: '2025-01-01', end: '2025-01-02' },
      { start: '2025-01-03', end: '2025-01-04' },
    ];
    expect(assignLanes(items)).toEqual([items]);
  });

  it('should place overlapping items in different lanes', () => {
    const items = [
      { start: '2025-01-01', end: '2025-01-03' },
      { start: '2025-01-02', end: '2025-01-04' },
    ];
    const expectedLanes = [
      [{ start: '2025-01-01', end: '2025-01-03' }],
      [{ start: '2025-01-02', end: '2025-01-04' }],
    ];
    expect(assignLanes(items)).toEqual(expectedLanes);
  });

  it('should place items in the first available lane', () => {
    const items = [
      { start: '2025-01-01', end: '2025-01-05' },
      { start: '2025-01-02', end: '2025-01-03' },
      { start: '2025-01-04', end: '2025-01-06' },
      { start: '2025-01-06', end: '2025-01-07' },
    ];
    const expectedLanes = [
      [
        { start: '2025-01-01', end: '2025-01-05' },
        { start: '2025-01-06', end: '2025-01-07' },
      ],
      [
        { start: '2025-01-02', end: '2025-01-03' },
        { start: '2025-01-04', end: '2025-01-06' },
      ],
    ];
    expect(assignLanes(items)).toEqual(expectedLanes);
  });
});