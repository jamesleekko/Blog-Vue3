import { getArticleCategory } from "~/assets/plugins/axios/http";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";

const setArticleCategory = () => {
  const store = useGlobalStore();
  getArticleCategory().then((res) => {
    store.setCategoryList(res.data.data);
  });
};

export { setArticleCategory };
