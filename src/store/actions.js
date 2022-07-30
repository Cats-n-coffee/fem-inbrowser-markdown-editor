import { checkForDocId, formatDate } from "../helpers/common";

export default {
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
      context.commit("setTitle", "untitled-document");
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
};
