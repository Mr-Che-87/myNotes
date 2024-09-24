"use client";
import styles from "./NewNote.module.scss";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { addNote } from "@/store/notesSlice";
import { IFormDataNote } from "@/types/interfaces";


const NewNote = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormDataNote>();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data: IFormDataNote) => {
    const newNote = {
      id: Date.now(),   //генерация id
      title: data.title,
      description: data.description,
      important: data.important,
      createdAt: new Date().toISOString(),
    };
    dispatch(addNote(newNote)); //редьюсер добавления заметки
    router.push("/profile"); //возврат в профиль после добавления
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <h2 className={styles.title}>Новая заметка</h2>
      
      <div className={styles.inputGroup}>
        <label>Название:</label>
        <input
          type="text"
          className={styles.input}
          {...register("title", { 
            required: "Введите название", 
            maxLength: { value: 20, message: "Название не должно превышать 20 символов" }
          })}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label>Описание:</label>
        <textarea
          className={styles.input}
          {...register("description", { required: "Введите описание" })}
          rows={5}
          style={{ width: "100%", resize: "vertical" }}
        />
        {errors.description && <p className={styles.error}>{errors.description.message}</p>}
      </div>

      <div className={styles.importantGroup}>
        <label>
          <input  className={styles.importantCheckbox} 
                  type="checkbox" 
                  {...register("important")} 
          />&nbsp;&nbsp;Важная заметка
        </label>
      </div>

      <button type="submit" className={styles.newNoteButton}>Добавить в блокнот</button>
    </form>
  );
};

export default NewNote;