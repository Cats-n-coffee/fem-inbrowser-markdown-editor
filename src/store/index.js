import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      theme: "light",
      isSidebarToggled: false,
      isOnlyPreview: false,
      documentMdInView: {
        title: "",
        date: "",
        content: "",
      },
      documents: [],
    };
  },
  mutations: {
    switchTheme: (state) => {
      const currentTheme = document.body.dataset.theme || state.theme;
      let userChoice;

      if (currentTheme === "light") {
        userChoice = "dark";
      } else {
        userChoice = "light";
      }

      state.theme = userChoice;
      document.body.dataset.theme = userChoice;
    },
    toggleSidebar: (state) => {
      state.isSidebarToggled = !state.isSidebarToggled;
    },
    changeView: (state) => {
      state.isOnlyPreview = !state.isOnlyPreview;
    },
    appendText: (state, payload) => {
      state.documentMdInView.content = payload;
    },
  },
  actions: {
    toToggleSidebar: (context) => {
      context.commit("toggleSidebar");
    },
    toChangeView: (context) => {
      context.commit("changeView");
    },
    toAppendText: (context, payload) => {
      context.commit("appendText", payload);
    },
  },
});
