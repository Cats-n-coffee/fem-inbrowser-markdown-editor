export const loopForLists = (contentArr) => {
  const content = contentArr;
  const listArr = { ol: [], ul: [] };

  for (let i = 0; i < content.length; i++) {
    const line = content[i];

    if (/^\d*\. /.test(line)) {
      // ol
      listArr.ol.push({
        idx: i,
        line,
        charsToRemove: /^\d*\. /g,
      });
    } else if (/^\* /.test(line)) {
      // ul
      listArr.ul.push({
        idx: i,
        line,
        charsToRemove: /^\* /g,
      });
    } else if (!/^\d*\. /.test(line) && !/^\* /.test(line)) {
      continue;
    }
  }

  return buildLists(content, listArr);
};

const buildLists = (content, listArr) => {
  Object.keys(listArr).forEach((listType) => {
    const listLength = listArr[listType].length;
    let list = "";
    if (listArr[listType].length > 0) {
      const startIndex = listArr[listType][0].idx;
      let items = "";

      for (let i = 0; i < listArr[listType].length; i++) {
        const item = listArr[listType][i];
        const { charsToRemove, line } = item;

        const cleanLine = line.replace(charsToRemove, "");
        items += `<li>${cleanLine}</li>`;
      }

      list = `<${listType}>${items}</${listType}>`;
      content.splice(startIndex, listLength, list);
    }
  });

  return content;
};

export const parseLine = (line) => {
  if (!line) return;

  if (/(?<!\*)\*(?![*\s])(?:[^*]*[^*\s])?\*/.test(line)) {
    line = line.replace(
      /((?<!\*)\*(?![*\s]))(.+)(?:[^*]*[^*\s])?\*/g,
      "<em>$2</em>"
    );
  }
  if (/\*{2}(?![*\s])(?:[^*]*[^*\s])?\*\*/.test(line)) {
    line = line.replace(
      /\*{2}(?![*\s])(.+)(?:[^*]*[^*\s])?\*\*/g,
      "<strong>$1</strong>"
    );
  }
  if (/\[.*\]\(.*\)/.test(line)) {
    line = line.replace(
      /\[(.*)\]\((.*)\)/g,
      '<a href="$2" target="blank">$1</a>'
    );
  }
  if (/`{1}.*`{1}/.test(line)) {
    line = line.replace(/`{1}(.*)`{1}/g, "<code>$1</code>");
  }
  if (/^# /.test(line)) {
    line = line.replace(/^# (.+)/g, "<h1>$1</h1>");
  }
  if (/^## /.test(line)) {
    line = line.replace(/^## (.+)/g, "<h2>$1</h2>");
  }
  if (/^### /.test(line)) {
    line = line.replace(/^### (.+)/g, "<h3>$1</h3>");
  }
  if (/^#### /.test(line)) {
    line = line.replace(/^#### (.+)/g, "<h4>$1</h4>");
  }
  if (/^##### /.test(line)) {
    line = line.replace(/^##### (.+)/g, "<h5>$1</h5>");
  }
  if (/^###### /.test(line)) {
    line = line.replace(/^###### (.+)/g, "<h6>$1</h6>");
  }
  if (/^> /.test(line)) {
    line = line.replace(/^> (.+)/g, "<blockquote>$1</blockquote>");
  }
  if (!/^\* /.test(line) && !/^\d*\. /.test(line)) {
    line = `<p>${line}</p>`;
  }

  return line;
};
