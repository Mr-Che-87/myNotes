"use client";
import styles from "./NoteList.module.scss";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { INote } from "@/types/interfaces";

interface NoteListProps {
  notes: INote[]; 
  onNotesChange: (updatedNotes: INote[]) => void; 
}

const NoteList: React.FC<NoteListProps> = ({ notes, onNotesChange }) => {
  const [sortBy, setSortBy] = useState<"date" | "importance">("date");
  const router = useRouter();

  const toggleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as "date" | "importance");
  };

  const sortedNotes = useMemo(() => {
    const updatedNotes = [...notes];
    if (sortBy === "importance") {
      updatedNotes.sort((a, b) =>
        a.important === b.important
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : a.important ? -1 : 1
      );
    } else {
      updatedNotes.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return updatedNotes;
  }, [notes, sortBy]);

  const handleDeleteNote = (id: number) => {
    const updatedNotes: INote[] = notes.filter(note => note.id !== id);
    onNotesChange(updatedNotes);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.notesHeader}>Мои записи</h2>
      <div className={styles.sortContainer}>
        <label className={styles.sortLabel} htmlFor="sortBy">
          Сортировать по:
        </label>
        <select
          className={styles.sortSelect}
          id="sortBy"
          onChange={toggleSortChange}
          value={sortBy}
        >
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
                  {note.important && <span style={{ color: "red" }}>❗</span>}{" "}
                  {note.title}
                </h3>
              </div>
              <div>
                <p className={styles.noteDate}>{note.formattedDate}</p>
              </div>
              <div>
                <p className={styles.noteDescription}>
                  {note.description.length > 30
                    ? note.description.slice(0, 30) + "..."
                    : note.description}
                </p>
              </div>
              <div className={styles.noteActions}>
                <button
                  className={styles.editButton}
                  onClick={() => router.push(`/profile/${note.id}`)}
                >
                  Редактировать
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteNote(note.id)}
                >
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

export default NoteList;
