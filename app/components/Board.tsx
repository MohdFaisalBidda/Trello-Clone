"use client";

import { useBearStore } from "@/store/BoardStore";
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Columns from "./Columns";

function Board() {
  const [board, getBoard] = useBearStore((state) => [
    state.board,
    state.getBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);
  console.log(board);
  

  const handleOnDragEnd = (result:DropResult) =>{

  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
          className={`grid grid-cols-1 md:grid-cols-${Array.from(board.columns.entries()).length} gap-5 max-w-7xl mx-auto mt-10`}
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
