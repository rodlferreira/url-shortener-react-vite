import axios from "axios";

// Use a variável de ambiente definida no .env
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Acessando a variável de ambiente

});


export default api;
