"use client";

import { useBearStore } from "@/store/BoardStore";
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Columns from "./Columns";

function Board() {
  const [board, getBoard, setBoardState] = useBearStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);
  console.log(board);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log(destination, source, type);

    if (!destination) return;

    // handle columns dnd
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [remove] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, remove);
      const modifiedEntries = new Map(entries);
      setBoardState({ ...board, columns: modifiedEntries });
    }

    //
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishedColIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const finishedCol: Column = {
      id: finishedColIndex[0],
      todos: finishedColIndex[1].todos,
    };

    if (!startCol || !finishedCol) return;

    if (source.index === destination.index && startCol === finishedCol) return;

    const newTodos = startCol.todos;
    const [movedTodo] = newTodos.splice(source.index, 1);

    if (startCol.id === finishedCol.id) {
      //same column todo moved
      newTodos.splice(destination.index, 0, movedTodo);
      const newCol: Column = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      //different column todo moved
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className={`grid grid-cols-1 md:grid-cols-${
              Array.from(board.columns).length
            } gap-5 max-w-7xl mx-auto mt-10`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Columns id={id} key={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
