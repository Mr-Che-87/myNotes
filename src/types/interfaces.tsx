//ЮЗЕР:
export interface IUser { //для store
    username: string;
    email: string;
  }

  export interface IUserFormData {  //для hook-form
    username: string;
    email: string;
    password: string;
  }


//ЗАМЕТКИ:
export interface INote {  //для store
    id: number;
    title: string;
    description: string;
    important: boolean; //доп-поле
    createdAt: string;  //доп-поле
    formattedDate?: string;
  }
  export interface INotesState {
    notes: INote[];
    sortBy: "date" | "importance"; //сортировка по дате/важности
  }
  export interface IFormDataNote {  //для hook-form
    title: string;
    description: string;
    important: boolean; //доп-поле
    createdAt: string; //доп-поле
  }

