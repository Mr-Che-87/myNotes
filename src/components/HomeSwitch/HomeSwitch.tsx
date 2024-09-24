"use client"; 

import { useEffect, useRef  } from "react";
import { useRouter } from "next/navigation";

const HomeSwitch = () => {
  const isRegisteredRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    //проверка данных в sessionStorage
    const userData = sessionStorage.getItem("user");
  
    //Если данные есть - перенаправляем в profile:
    if (userData) {
      isRegisteredRef.current = true;
      router.push("/profile");
    } else {
      router.push("/register");
    }
  }, [router]);

  return null; //компонент ничего не рендерит сам по себе
};

export default HomeSwitch;
