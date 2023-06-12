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
  return mAxios.post("/articleContent?" + "id=" + id + "&isViewer=true");
}

function thumbArticle(id) {
  return mAxios.post("/thumbArticle?" + "id=" + id);
}

function cancelThumbArticle(id) {
  return mAxios.post("/cancelThumb?" + "id=" + id);
}

function getQQAvatar(qq) {
  return mAxios.get(`/headimg_dl?dst_uin=${qq}&spec=100`,{
    headers: {
      Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
    }
  });
}

function getQQName(qq) {
  return mAxios.get(`https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=${qq}`);
}

function getInfoByQQ(qq) {
  return axios.all([getQQAvatar(qq), getQQName(qq)]);
}

export {
  getArticleCategory,
  getBannerImageUrl,
  getArticleGroup,
  getArticleContent,
  thumbArticle,
  cancelThumbArticle,
  getQQAvatar,
  getQQName,
  getInfoByQQ,
};
