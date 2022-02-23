import React, { useState } from "react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import "./App.css";

function App() {
  const [state, setState] = useState([
    { id: 1, content: 1, position: 1 },
    { id: 2, content: 2, position: 2 },
    { id: 3, content: 3, position: 3 },
    { id: 4, content: 4, position: 4 },
    { id: 5, content: 5, position: 5 },
    { id: 6, content: 6, position: 6 },
    { id: 7, content: 7, position: 7 },
    { id: 8, content: 8, position: 8 },
    { id: 9, content: 9, position: 9 },
  ]);

  const SortableItem = sortableElement(({ value, index }) => (
    <div className="SortableItem" key={value.id} index={index}>
      {value.content}
    </div>
  ));

  const SortableList = sortableContainer(({ items }) => (
    <div className="SortableList">
      {items
        .sort((a, b) => a.index - b.index)
        .map((value, index) => (
          <SortableItem key={value.id} index={index} value={value} />
        ))}
    </div>
  ));

  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    console.log(collection);
    let array = arrayMoveImmutable(state, oldIndex, newIndex);
    for (let i = 0; i < array.length; i++) {
      array[i].position = i;
    }
    setState(array);
  };

  return (
    <div className="wrapper">
      <SortableList items={state} onSortEnd={onSortEnd} axis="xy" />
    </div>
  );
}

export default App;
