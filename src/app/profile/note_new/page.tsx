import styles from "@/styles/containerPage.module.scss";
import type { Metadata } from "next";
import NewNote from "@/components/NewNote/NewNote";


export const metadata: Metadata = {
  title: "Новая заметка",
  description: "Индивидуальные для каждой страницы SEO-заманухи, например: Удобный блокнот, позволяющий добавлять, редактировать и удалять свои заметки",
};

export default function NewNotePage() {
  return (
    <div className={styles.container}>
      <h1>Мой блокнот</h1>
      <NewNote />
    </div>
  )
}
