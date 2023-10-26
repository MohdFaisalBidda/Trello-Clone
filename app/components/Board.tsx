
"use client"

import { useBearStore } from '@/store/BoardStore';
import React, { useEffect, useState } from 'react'
import {DragDropContext,Droppable} from "react-beautiful-dnd";

function Board() {
  const getBoard =useBearStore((state)=>state.getBoard);
  
  useEffect(()=>{    
    getBoard()
  },[])

  return (
    <button>hello </button>
    // <DragDropContext onDragEnd>
    //   <Droppable droppableId='board' direction='horizontal' type='column'>
    //   {(provide)=><div>{/*Rendering all columns*/}</div>}
    //   </Droppable>
    // </DragDropContext>
  )
}

export default Board