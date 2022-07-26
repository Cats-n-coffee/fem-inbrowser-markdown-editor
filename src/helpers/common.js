export const getKeyWithValue = (obj, value) => {
  return Object.keys(obj).find((key) => obj[key] === value);
};

export const checkForDocId = (docId, allDocs) => {
  if (!allDocs.length) return;
  for (let i = 0; i < allDocs.length; i++) {
    if (allDocs[i].id === docId) {
      return allDocs[i];
    }
  }

  return false;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
  return formattedDate;
};
