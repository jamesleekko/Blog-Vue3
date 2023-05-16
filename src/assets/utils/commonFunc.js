import {
  getArticleCategory,
  getBannerImageUrl,
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
    console.log(res.data.data[0].src);
    store.setIndexBannerUrl(res.data.data[0].src);
  });
};

export { setArticleCategory, setIndexBannerUrl };
