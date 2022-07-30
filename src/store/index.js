import { createStore } from "vuex";
import mutations from "./mutations";
import actions from "./actions";

export const store = createStore({
  state() {
    return {
      theme: "light",
      isSidebarToggled: false,
      isModalOpen: false,
      isOnlyPreview: false,
      documentMdInView: {
        title: "",
        date: "",
        content: "",
        id: "",
      },
      documents: [],
    };
  },
  mutations,
  actions,
});
