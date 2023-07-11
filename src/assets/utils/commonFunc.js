import {
  getArticleCategory,
  getBannerImageUrl,
  getArticleGroup,
  getImage,
} from "~/assets/plugins/axios/http";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";

const setArticleCategory = () => {
  const store = useGlobalStore();
  getArticleCategory().then((res) => {
    store.setCategoryList(res.data.data);
  });
};

const setIndexBannerUrl = () => {
  const store = useGlobalStore();
  getBannerImageUrl(1).then((res) => {
    store.setIndexBannerUrl(res.data.data[0].src);
  });
};

const setIndexContactUrls = () => {
  const store = useGlobalStore();
  Promise.all([
    getImage(null, "首页联系-微信"),
    getImage(null, "首页联系-QQ"),
    getImage(null, "首页联系-github"),
    getImage(null, "首页联系-网易云"),
    getImage(null, "首页联系-哔哩哔哩"),
  ]).then(function (res) {
    if(res[0].data && res[0].data.success){
      store.setWechatUrl(res[0].data.data[0].src);
    }
    if(res[1].data && res[1].data.success){
      store.setQqUrl(res[1].data.data[0].src);
    }
    if(res[2].data && res[2].data.success){
      store.setGithubUrl(res[2].data.data[0].src);
    }
    if(res[3].data && res[3].data.success){
      store.setNeteaseUrl(res[3].data.data[0].src);
    }
    if(res[4].data && res[4].data.success){
      store.setBilibiliUrl(res[4].data.data[0].src);
    }
  });
};

const setCategoryBannerUrl = () => {
  const store = useGlobalStore();
  getBannerImageUrl(2).then((res) => {
    store.setCategoryBannerUrl(res.data.data[0].src);
  });
};

const setArticleGroupByDate = () => {
  const store = useGlobalStore();
  getArticleGroup(0).then((res) => {
    store.setArticleGroupByDate(res.data.data);
  });
};

export {
  setArticleCategory,
  setIndexBannerUrl,
  setCategoryBannerUrl,
  setArticleGroupByDate,
  setIndexContactUrls,
};
