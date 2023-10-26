import { getTodosGroupedByColumn } from '@/utils/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardStore {
  board:any;
  getBoard:()=>any
}

export const useBearStore = create<BoardStore>((set) => ({
  board: {
    columns:new Map<string,string>()
  },
  getBoard:async()=>{
    const board = await getTodosGroupedByColumn();  
    console.log(board);
      
    set({board});
  }
}))