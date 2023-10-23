import { getTodosGroupedByColumn } from '@/utils/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardStore {
  board:any;
  getBoard:()=>void
}

const useBearStore = create<BoardStore>((set) => ({
  board: {
    columns:new Map<string,string>()
  },
  getBoard:async()=>{
    const board =await getTodosGroupedByColumn();
    set({board});
  }
}))