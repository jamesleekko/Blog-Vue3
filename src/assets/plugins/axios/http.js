import axios from "axios";

//区分开发环境和生产环境
const BASE_URL = import.meta.env.VITE_BASE_URL;
// const BASE_URL = "http://localhost:5173/api";
// const BASE_URL = "http://124.221.75.170:3000";

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

function getArticleList(type, name, page, size) {
  return mAxios.get("/articleList", {
    params: {
      type: type,
      name: name,
      page: page,
      size: size,
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
  return mAxios.post("/articleContent?" + "id=" + id + "&isViewer=true");
}

function thumbArticle(id) {
  return mAxios.post("/thumbArticle?" + "id=" + id);
}

function cancelThumbArticle(id) {
  return mAxios.post("/cancelThumb?" + "id=" + id);
}

function getInfoByQQ(qq) {
  return mAxios.get("/qq", { params: { qq: qq } });
}

function getCommentById(id, page, size, isMessage = false) {
  return mAxios.get("/getComments", {
    params: { id: id, page: page, size: size, isMessage: isMessage },
  });
}

function addComment(comment) {
  return mAxios.post("/addComment", comment);
}

function getImage(id, title) {
  return mAxios.get("/getImage", {
    params: { id: id, title: title },
  });
}

export {
  getArticleCategory,
  getBannerImageUrl,
  getArticleList,
  getArticleGroup,
  getArticleContent,
  thumbArticle,
  cancelThumbArticle,
  getInfoByQQ,
  getCommentById,
  addComment,
  getImage,
};
