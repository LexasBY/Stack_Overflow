import axios from "axios";

export const instance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// • запросы автоматически отправляют токен, если он есть в localStorage.
// •	Если API вернёт 401 Unauthorized, можно сразу разлогинить пользователя или сделать редирект.
// •	Все ошибки логируются, и их можно обработать.
// 🔹 Перехватчик запросов (добавляет токен в заголовки)
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// 🔹 Перехватчик ответов (логирует ошибки)
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error.response?.data || error.message);
//     if (error.response?.status === 401) {
//       // Можно, например, разлогинить пользователя
//       console.log("Unauthorized! Redirecting to login...");
//       // window.location.href = "/login";  // Если нужен редирект
//     }
//     return Promise.reject(error);
//   }
// );
