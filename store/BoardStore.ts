import { database } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/utils/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardStore {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoOfDB: (todo: Todo, columnId: TypedColumn) => void;
}

export const useBearStore = create<BoardStore>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  updateTodoOfDB: async (todo, columnId) => {
    await database.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!, todo.$id,
      {
        title: todo.title,
        status: columnId
      }
    );
  }
}))