"use client"; 
import styles from "./Register.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "./validation";  
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "@/store/userSlice";
import { IUserFormData } from "@/types/interfaces";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<IUserFormData>({
    resolver: yupResolver(registrationSchema),  //использует валидацию yup
  });

  const [showPassword, setShowPassword] = useState(false); //видимость пароля

  const onSubmit = (data: IUserFormData) => {
    dispatch(setUser({ username: data.username, email: data.email })); //сохраняем в редакс

    sessionStorage.setItem("user", JSON.stringify(data));  //сохраняем в sessionStorage

    router.push("/profile"); //роутинг в профиль
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Имя пользователя:</label>
          <input 
            type="text" 
            {...register("username")} 
            onBlur={() => trigger("username")} 
            className={styles.input}
          />
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input 
            type="email" 
            {...register("email")} 
            onBlur={() => trigger("email")}  
            className={styles.input}
            autoComplete="off"
           />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Пароль:</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")} 
              onBlur={() => trigger("password")} 
              className={styles.input}
              autoComplete="current-password"
            />
            <span
              onClick={togglePasswordVisibility}
              className={styles.togglePassword}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;