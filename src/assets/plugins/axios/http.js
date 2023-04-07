import axios from "axios";

const mAxios = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 2000,
  
});

function getArticleCategory() {
  return mAxios.get("/getArticleCategory");
}

export { getArticleCategory };
