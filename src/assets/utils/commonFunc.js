import {
  getArticleCategory,
  getBannerImageUrl,
  getArticleGroup,
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

const setCategoryBannerUrl = () => {
  const store = useGlobalStore();
  getBannerImageUrl(2).then((res) => {
    store.setCategoryBannerUrl(res.data.data[0].src);
  });
};

const setArticleGroupByDate = () => {
  const store = useGlobalStore();
  getArticleGroup(0).then((res) => {
    console.log("article group res", res);
    store.setArticleGroupByDate(res.data.data);
  });
};

export {
  setArticleCategory,
  setIndexBannerUrl,
  setCategoryBannerUrl,
  setArticleGroupByDate,
};
