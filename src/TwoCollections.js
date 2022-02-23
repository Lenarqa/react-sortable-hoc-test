import React, { useState } from "react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import "./TwoCollections.css";

const SortableItem = sortableElement(({ value }) => <li>{value}</li>);

const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

function TwoCollections() {
  const [state, setState] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);

  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    console.log(collection);
    setState((prev) => {
      const newCollections = [...prev];

      newCollections[collection] = arrayMoveImmutable(
        prev[collection],
        oldIndex,
        newIndex
      );

      return newCollections;
    });
  };

  return (
    <SortableContainer onSortEnd={onSortEnd}>
      {state.map((items, index) => (
        <React.Fragment key={index}>
          <strong>LIST {index}</strong>
          <ul>
            {items.map((item, i) => (
              <SortableItem
                key={item}
                value={`Item ${item}`}
                index={i}
                collection={index}
              />
            ))}
          </ul>
        </React.Fragment>
      ))}
    </SortableContainer>
  );
}

export default TwoCollections;
