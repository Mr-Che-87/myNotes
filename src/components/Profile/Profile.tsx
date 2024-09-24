/*
"use client";
import styles from "./Profile.module.scss";
import NewNoteMenu from "./NewNoteMenu/NewNoteMenu";
import NoteList from "./NoteList/NoteList";
import { useEffect, useState } from "react";
import { IUser, INote } from "@/types/interfaces";

const Profile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedNotes = sessionStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleNotesChange = (updatedNotes: INote[]) => {
    setNotes(updatedNotes);
    sessionStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className={styles.container}>
      {user ? <NewNoteMenu user={user} /> : <p>Загрузка...</p>}
      <NoteList notes={notes} onNotesChange={handleNotesChange} />
    </div>
  );
};

export default Profile;
*/


"use client";
import styles from "./Profile.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

import { RootState } from "@/store/store"; 
import { setUser } from "@/store/userSlice";
import { removeNote, setNotes, setSortBy } from "@/store/notesSlice"; 
import { IUser, INote } from "@/types/interfaces";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user) as IUser;  // данные юзера из store
  const notes = useSelector((state: RootState) => state.notes.notes); // заметки из store
  const sortBy = useSelector((state: RootState) => state.notes.sortBy); // сортировка из store
  const router = useRouter();
  const [loading, setLoading] = useState(true); // прелоадер

  // Восстановление юзера и заметок из sessionStorage:
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      dispatch(setUser(userData));
    }

    const savedNotes = sessionStorage.getItem("notes");
    if (savedNotes) {
      const notesData: INote[] = JSON.parse(savedNotes); // Указываем тип
      dispatch(setNotes(notesData));
    }
    setLoading(false);
  }, [dispatch]);

  // Переключатель типа сортировки:
  const toggleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(event.target.value as "date" | "importance"));
  };

  // Сортировка заметок + мемоизация вместо селектора (предотвратить лишние рендеры):
  const sortedNotes = useMemo(() => {
    const updatedNotes = [...notes];

    // по важности или дате (поздние - выше)
    if (sortBy === "importance") {
      updatedNotes.sort((a, b) =>
        a.important === b.important
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : a.important ? -1 : 1 
      );
    } else {
      // только по дате
      updatedNotes.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    // Проверки и форматирование даты для UI:
    return updatedNotes.map((note) => {
      const createdAtDate = new Date(note.createdAt);
      const isValidDate = !isNaN(createdAtDate.getTime());
      return {
        ...note,
        formattedDate: isValidDate ? format(createdAtDate, "HH:mm, dd.MM.yyyy") : "Неверная дата",
      };
    });
  }, [notes, sortBy]); 

  // Функция удаления заметки
  const handleDeleteNote = (id: number) => {
    dispatch(removeNote(id)); // Удаляем заметку
  };

  // Сокращение длинных описаний заметок на общей странице (30 символов для демо-версии):
  const truncateDescription = (description: string) => {
    if (description.length > 30) {
      return description.slice(0, 30) + "...";
    }
    return description;
  };

  // Прелоадер
  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Привет, {user.username}!</h2>
      <p className={styles.email}>Email: {user.email}</p>

      <button className={styles.newNoteButton} onClick={() => router.push("/profile/note_new")}>
        Новая запись
      </button>

      <h2 className={styles.notesHeader}>Мои записи</h2>
      <div className={styles.sortContainer}>
        <label className={styles.sortLabel} htmlFor="sortBy">Сортировать по:</label>
        <select className={styles.sortSelect} id="sortBy" onChange={toggleSortChange} value={sortBy}>
          <option value="date">Времени создания</option>
          <option value="importance">Важности</option>
        </select>
      </div>

      {sortedNotes.length > 0 ? (
        <ul className={styles.notesList}>
          {sortedNotes.map((note: INote) => (
            <li key={note.id} className={styles.noteItem}>
              <div>
                <h3 className={styles.noteTitle}>
                  {note.important && <span style={{ color: "red" }}>❗</span>} {note.title} 
                </h3>
              </div>
              <div>
                <p className={styles.noteDate}>{note.formattedDate}</p>
              </div>
              <div>
                <p className={styles.noteDescription}>{truncateDescription(note.description)}</p>
              </div>
              <div className={styles.noteActions}>
                <button className={styles.editButton} onClick={() => router.push(`/profile/${note.id}`)}>
                  Редактировать
                </button>
                <button className={styles.deleteButton} onClick={() => handleDeleteNote(note.id)}>
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>У вас пока нет записей</p>
      )}
    </div>
  );
};

export default Profile;
