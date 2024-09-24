"use client";
import styles from "./EditNote.module.scss";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/store/store";
import { updateNote } from "@/store/notesSlice"; 
import { IFormDataNote } from "@/types/interfaces";


const EditNote = () => {
  const { id } = useParams(); //получаем id из параметров роута
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormDataNote>();
 
  const note = notes.find((note) => note.id === Number(id));  //находим заметку по id:
  
  //Устанавливаем начальные значения для формы
  useEffect(() => {
    if (note) {
      setValue("title", note.title);
      setValue("description", note.description);
      setValue("important", note.important);
    }
  }, [note, setValue]);

  //Хендлер обновления заметки:
  const handleUpdateNote = (data: IFormDataNote) => {
    if (!note) {
      console.error("Заметка не найдена");
      return; 
    }
    if (data.title && data.description) {
      dispatch(updateNote({  //редьюсер обновления заметки
        id: Number(id), 
        title: data.title, 
        description: data.description, 
        important: data.important,
      })); 
      router.push("/profile"); //возврат в профиль после сохранения
    }
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Редактировать заметку</h2>
      <form onSubmit={handleSubmit(handleUpdateNote)}>
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
          />
          {errors.description && <p className={styles.error}>{errors.description.message}</p>}
        </div>
        <div className={styles.importantGroup}>
          <label>
            <input
              className={styles.importantCheckbox}
              type="checkbox"
              {...register("important")}
            /> Важная заметка
          </label>
        </div>
        <button type="submit" className={styles.updateButton}>Сохранить изменения</button>
      </form>
    </div>
  );
};

export default EditNote;
