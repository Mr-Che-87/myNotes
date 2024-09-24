"use client";
import styles from "./NewNoteMenu.module.scss";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/interfaces";

interface NewNoteMenuProps {
  user: IUser; 
}

const NewNoteMenu: React.FC<NewNoteMenuProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Привет, {user.username}!</h2>
      <p className={styles.email}>Email: {user.email}</p>

      <button
        className={styles.newNoteButton}
        onClick={() => router.push("/profile/note_new")}
      >
        Новая запись
      </button>
    </div>
  );
};

export default NewNoteMenu;
