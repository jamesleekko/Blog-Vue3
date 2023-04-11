import axios from "axios";

const BASE_URL = "http://localhost:5173/api";

const mAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  
});

function getArticleCategory() {
  return mAxios.get("/getArticleCategory");
}

export { getArticleCategory };
