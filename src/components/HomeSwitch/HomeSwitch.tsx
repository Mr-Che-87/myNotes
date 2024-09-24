"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HomeSwitch = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Проверяем, есть ли данные пользователя в sessionStorage
    const userData = sessionStorage.getItem("user");
  
    // Если данные есть, устанавливаем состояние и перенаправляем
    if (userData) {
      setIsRegistered(true);
      router.push("/profile");
    } else {
      router.push("/register");
    }
  }, [router]);
  
  return null; // Компонент ничего не рендерит сам по себе
};

export default HomeSwitch;
