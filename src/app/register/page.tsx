import type { Metadata } from "next";
import styles from "@/styles/containerPage.module.scss";
import Register from "@/components/Register/Register"

export const metadata: Metadata = {
  title: "Регистрация. Мой блокнот",
  description: "Индивидуальные для каждой страницы SEO-заманухи, например: Удобный блокнот, позволяющий добавлять, редактировать и удалять свои заметки",
};

export default function RegisterPage() {
  return (
    <div className={`${styles.container} ${styles.containerStart}`}>
      <h1>Мой блокнот</h1>
      <Register />
    </div>
  )
}
