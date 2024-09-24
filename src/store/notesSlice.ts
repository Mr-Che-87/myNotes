import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote, INotesState } from "@/types/interfaces";

const initialState: INotesState = {
  notes: [],
  sortBy: "date",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    //Редьюсер добавления заметки:
    addNote: (state, action: PayloadAction<{ 
      id: number; 
      title: string; 
      description: string; 
      important: boolean;
      createdAt: string;
     }>) => {
      const newNote = {
        id: action.payload.id, 
        title: action.payload.title,
        description: action.payload.description,
        important: action.payload.important, 
        createdAt: action.payload.createdAt,
      };
      state.notes.push(newNote);
      //sessionStorage:
      sessionStorage.setItem("notes", JSON.stringify(state.notes));
    },
    //Редьюсер редактирования заметки:
    updateNote: (state, action: PayloadAction<{ 
      id: number; 
      title: string; 
      description: string; 
      important: boolean;  
    }>) => {
      const { id, title, description, important } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.description = description;
        note.important = important; 
        // Сохраняем обновленные заметки в sessionStorage
        sessionStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },
    //Редьюсер удаления заметки по id
    removeNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      //sessionStorage:
      sessionStorage.setItem("notes", JSON.stringify(state.notes));
    },
    //Восстанавливаем заметки из sessionStorage (для перезагрузки):
    setNotes: (state, action: PayloadAction<INote[]>) => {
      state.notes = action.payload;
    },
    //Cортировка заметок
    setSortBy: (state, action: PayloadAction<"date" | "importance">) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addNote, updateNote, removeNote, setNotes, setSortBy } = notesSlice.actions;
export default notesSlice.reducer;
