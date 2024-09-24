import styles from "@/styles/containerPage.module.scss";
import type { Metadata } from "next";
import EditNote from "@/components/Profile/EditNote/EditNote";

export const metadata: Metadata = {
  title: "Редактор заметки",
  description: "Индивидуальные для каждой страницы SEO-заманухи, например: Удобный блокнот, позволяющий добавлять, редактировать и удалять свои заметки",
};

export default function EditNotePage() {
  return (
    <div className={styles.container}>
      <h1>Мой блокнот</h1>
      <EditNote />
    </div>
    )
}
