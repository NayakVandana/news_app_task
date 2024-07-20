import create from 'zustand';
import axios from 'axios';

const useArticleStore = create((set) => ({
  articles: [],
  totalRecords: 0,
  perPage: 10,
  isLoading: false,
  error: null,

  getData: async (data, callback) => {
    set({ isLoading: true });

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/get-article-list`, data);

      const responseData = response.data; // Adjust this according to your API response

      if (responseData.status) {
        set({
          articles: responseData.data.data,
          totalRecords: responseData.data.total,
          isLoading: false,
        });
        callback?.success();
      } else {
        set({ isLoading: false });
        callback?.error(responseData);
      }
    } catch (error) {
      set({ isLoading: false, error: error.message });
      callback?.error(error);
    }
  },
}));

export default useArticleStore;
