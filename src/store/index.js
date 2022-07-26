import { createStore } from "vuex";
import { checkForDocId, formatDate } from "../helpers/common";

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
        id: "",
      },
      documents: [],
      tabs: [],
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
    setDocumentId: (state, payload) => {
      state.documentMdInView.id = payload;
    },
    setDate: (state, payload) => {
      state.documentMdInView.date = payload;
    },
    setCollection: (state, payload) => {
      state.documents = payload;
    },
    setDocumentInView: (state, doc) => {
      state.documentMdInView = doc;
    },
    setTabs: (state, tabs) => {
      state.tabs = tabs;
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
    addDocumentToCollection: (context, doc = null) => {
      // Used on first load
      const currentLocalStorage = JSON.parse(localStorage.getItem("mdDocs"));

      if (doc) {
        currentLocalStorage.push(doc);
      }
      // What is present in local storage is the user's documents --> add to state
      context.commit("setCollection", currentLocalStorage);
    },
    saveDocument: (context) => {
      // Can only save the doc in view
      const allDocuments = [...context.state.documents];
      const docInView = context.state.documentMdInView;
      const selectedDoc = checkForDocId(docInView.id, allDocuments);

      if (selectedDoc) {
        context.dispatch("updateDocumentInCollection", {
          item: docInView,
          update: docInView,
        });
      } else {
        const docId = Date.now();

        context.commit("setDocumentId", docId);
        context.commit("setDate", formatDate(docId));
        context.dispatch("addDocumentToCollection", docInView);

        localStorage.setItem(
          "mdDocs",
          JSON.stringify([...context.state.documents])
        );
      }
    },
    updateDocumentInCollection: (context, payload) => {
      const allDocs = [...context.state.documents];
      const { update = {}, item } = payload;
      const docId = item?.id;
      let selectedDocIndex;

      let selectedDoc = allDocs.find((item, index) => {
        if (item.id === docId) {
          selectedDocIndex = index;
          return item;
        }
      });
      if (selectedDoc) {
        selectedDoc = { ...selectedDoc, ...update };
        allDocs[selectedDocIndex] = selectedDoc;
        localStorage.setItem("mdDocs", JSON.stringify(allDocs));
      }
      context.commit("setCollection", allDocs);
    },
    deleteDocumentInCollection: (context, docId) => {
      const allDocs = [...context.state.documents];
      const filteredDocs = allDocs.filter((doc) => doc.id !== docId);

      context.commit("setCollection", filteredDocs);
      context.commit("setDocumentInView", {
        title: "",
        date: "",
        content: "",
        id: "",
      });
      localStorage.setItem("mdDocs", JSON.stringify(filteredDocs));
    },
  },
});
