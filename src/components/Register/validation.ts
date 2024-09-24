import * as yup from "yup";

export const registrationSchema = yup.object({
  username: yup
    .string()
    .max(15, "Имя пользователя не должно превышать 15 символов")
    .required("Имя пользователя обязательно"),
  email: yup
    .string()
    .email("Неверный формат email")
    .required("Email обязателен"),
  password: yup
    .string()
    .max(15, "Пароль не должен превышать 15 символов")
    .min(6, "Пароль должен быть минимум 6 символов")
    .required("Пароль обязателен"),
});
