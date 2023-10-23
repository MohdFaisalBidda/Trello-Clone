
"use client"
import React, { useEffect } from 'react'
import {DragDropContext,Droppable} from "react-beautiful-dnd";

function Board() {

  useEffect(()=>{

  },[])

  return (
    <DragDropContext onDragEnd={Board}>
      <Droppable droppableId='board' direction='horizontal' type='column'>
      {(provide)=><div>{/*Rendering all columns*/}</div>}
      </Droppable>
    </DragDropContext>
  )
}

export default Board