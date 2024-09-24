import type { Metadata } from "next";
import styles from "@/styles/containerPage.module.scss";
import Profile from "@/components/Profile/Profile"

export const metadata: Metadata = {
  title: "Мой блокнот",
  description: "Индивидуальные для каждой страницы SEO-заманухи, например: Удобный блокнот, позволяющий добавлять, редактировать и удалять свои заметки",
};

export default function ProfilePage() {
  return (
    <div className={`${styles.container} ${styles.containerStart}`}>
      <h1>Мой блокнот</h1>
      <Profile />
    </div>
  )
}

