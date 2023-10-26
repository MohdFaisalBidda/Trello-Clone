import { getTodosGroupedByColumn } from '@/utils/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardStore {
  board:Board;
  getBoard:()=>void
}

export const useBearStore = create<BoardStore>((set) => ({
  board: {
    columns:new Map<TypedColumn,Column>()
  },
  getBoard:async()=>{
    const board = await getTodosGroupedByColumn();        
    set({board});
  }
}))