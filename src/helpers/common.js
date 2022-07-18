export const getKeyWithValue = (obj, value) => {
  return Object.keys(obj).find((key) => obj[key] === value);
};

export const checkForIdInLocalStorage = (docId, allDocs) => {
  if (!allDocs.length) return;
  for (let i = 0; i < allDocs.length; i++) {
    if (allDocs[i].id === docId) {
      return allDocs[i];
    }
  }

  return false;
};

export const updateDocInLocalStorage = (doc, allDocs) => {
  let existingDocIndex;

  const existingDoc = allDocs.find((document, index) => {
    if (document.id === doc.id) {
      existingDocIndex = index;
      return document;
    }
  });

  if (existingDoc && existingDocIndex) {
    allDocs[existingDocIndex] = doc;
  } else {
    allDocs.push(doc);
  }
  localStorage.setItem("mdDocs", JSON.stringify(allDocs));
};
