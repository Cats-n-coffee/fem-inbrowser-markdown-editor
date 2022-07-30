export default {
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
  toggleModal: (state, payload) => {
    state.isModalOpen = payload;
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
  setTitle: (state, title) => {
    state.documentMdInView.title = title;
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
};
