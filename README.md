# Airtable Timeline Assignment

This project is a timeline visualization component built with React.

## Implementation

I enjoyed building this timeline component. The most satisfying part was implementing the zooming functionality, which allows for a more dynamic and user-friendly experience. The use of React hooks like `useMemo` and `useState` made the state management clean and efficient.

## Future Improvements

If I were to build this again, I would consider using a more robust state management library like Redux or Zustand, especially if the application were to grow in complexity. I would also explore using a virtualized list to render the timeline items, which would improve performance for very large datasets.

## Design Decisions

I took inspiration from popular timeline components and project management tools. The goal was to create a clean and intuitive interface. The color scheme and layout are simple and easy to read. The zooming functionality is implemented with the mouse wheel, which is a common and intuitive interaction.

## Testing

If I had more time, I would add unit tests for the `assignLanes` function to ensure it correctly assigns items to lanes. I would also add integration tests for the `Timeline` component to verify that it renders correctly and that the zooming functionality works as expected. I would use a library like Jest and React Testing Library for this.
