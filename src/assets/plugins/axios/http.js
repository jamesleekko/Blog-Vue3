import axios from "axios";

const BASE_URL = "http://localhost:5173/api";

const mAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
});

function getArticleCategory() {
  return mAxios.get("/getArticleCategory");
}

//带type参数获取bannerimageurl
function getBannerImageUrl(type) {
  return mAxios.get("/getBannerImage", {
    params: {
      type: type,
    },
  });
}

function getArticleGroup(type) {
  return mAxios.get("/getArticleGroup", {
    params: {
      type: type,
    },
  });
}

function getArticleContent(id) {
  return mAxios.post("/articleContent?" + "id=" + id);
}

export {
  getArticleCategory,
  getBannerImageUrl,
  getArticleGroup,
  getArticleContent,
};
