import { database, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/utils/getTodosGroupedByColumn';
import uploadImage from '@/utils/uploadImage';
import { ID, Storage } from 'appwrite';
import { todo } from 'node:test';
import { create } from 'zustand'

interface BoardStore {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoOfDB: (todo: Todo, columnId: TypedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;

  newTaskInput: string;
  setNewTaskInput: (input: string) => void;

  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;

  image: File | null;
  setImage: (image: File | null) => void

  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
}

export const useBearStore = create<BoardStore>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  newTaskInput: "",
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),

  newTaskType: "todo",
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),

  image: null,
  setImage: (image: File | null) => set({ image }),


  setBoardState: (board) => set({ board }),

  deleteTask: async (taskIndex, todo, id) => {
    const newColumns = new Map(get().board.columns);

    newColumns.get(id)?.todos.splice(taskIndex, 1);

    set({ board: { columns: newColumns } })

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
    }

    await database.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      todo.$id
    )
  },

  updateTodoOfDB: async (todo, columnId) => {
    await database.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!, todo.$id,
      {
        title: todo.title,
        status: columnId
      }
    );
  },

  addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
    let file: Image | undefined;

    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id
        }
      }
    }

    const { $id } = await database.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!, ID.unique(), {
      title: todo,
      status: columnId,
      ...(file && { image: JSON.stringify(file) })
    })

    set({ newTaskInput: "" })

    set((state) => {
      const newColumns = new Map(state.board.columns)
      const newTodo: Todo = {
        $id,
        status: columnId,
        $createdAt: new Date().toISOString(),
        title: todo,
        ...(file && { image: file }),
      }

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        })
      } else {
        newColumns.get(columnId)?.todos.push(newTodo)
      }

      return {
        board: {
          columns: newColumns
        }
      }
    })
  }
}))