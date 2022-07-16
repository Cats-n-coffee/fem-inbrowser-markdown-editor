import { htmlTagsObj } from "../constants/htmlTags";
import { getKeyWithValue } from "./common";

export const convertToHtmlTag = (content) => {
  switch (true) {
    case /^# /.test(content):
      return "h1";
    case /^## /.test(content):
      return "h2";
    case /^### /.test(content):
      return "h3";
    case /^#### /.test(content):
      return "h4";
    case /^##### /.test(content):
      return "h5";
    case /^###### /.test(content):
      return "h6";
    case /^\* /.test(content):
      return "ul";
    case /^\d*\. /.test(content):
      return "ol";
    case /^> /.test(content):
      return "blockquote";
    default:
      return;
  }
};

const convertMidlineTags = (firstBuild) => {
  let content = firstBuild;

  if (/(?<!\*)\*(?![*\s])(?:[^*]*[^*\s])?\*/.test(content)) {
    content = content.replace(
      /((?<!\*)\*(?![*\s]))(.+)(?:[^*]*[^*\s])?\*/g,
      "<em>$2</em>"
    );
  }
  if (/\*{2}(?![*\s])(?:[^*]*[^*\s])?\*\*/.test(content)) {
    content = content.replace(
      /\*{2}(?![*\s])(.+)(?:[^*]*[^*\s])?\*\*/g,
      "<strong>$1</strong>"
    );
  }
  // if (
  //   /<(?!p>|li>|h\d*>|blockquote>).*(?<!<\/p|<\/li|<\/h\d*|<\/blockquote)>/.test(
  //     content
  //   )
  // ) {
  //   content = content.replace(
  //     /<(?!p>|li>|h\d*>|blockquote>)(.*)(?<!<\/p|<\/li|<\/h\d*|<\/blockquote)>/g,
  //     '<a href="$1">$1</a>'
  //   );
  // }
  if (/\[.*\]\(.*\)/.test(content)) {
    content = content.replace(
      /\[(.*)\]\((.*)\)/g,
      '<a href="$2" target="blank">$1</a>'
    );
  }
  if (/`{1}.*`{1}/.test(content)) {
    content = content.replace(/`{1}(.*)`{1}/g, "<code>$1</code>");
  }

  return content;
};

export const buildLists = (rawLists, content) => {
  console.log("%cbuild lists", "color: red", rawLists);
  let listType = "ul";

  if (/^\d*\. /.test(content)) {
    listType = "ol";
  } else if (/^\* /.test(content)) {
    listType = "ul";
  } else if (!/^\d*\. /.test(content) && !/^\* /.test(content)) {
    return;
  }

  let startIndex;
  let i = 0;
  let count = 0;
  const listItems = [];

  while (i < rawLists.length) {
    if (
      (rawLists[i].includes("<li>") &&
        rawLists[i - 1] &&
        !rawLists[i - 1].includes("<li>")) ||
      (!rawLists[i - 1] && rawLists[i].includes("<li>"))
    ) {
      startIndex = i;
    }

    if (rawLists[i].includes("<li>")) {
      count++;
      listItems.push(rawLists[i]);
    }
    i++;
  }

  listItems.unshift(`<${listType}>`);
  listItems.push(`</${listType}>`);
  const builtList = listItems.join("");

  rawLists.splice(startIndex, count, builtList);

  return rawLists;
};

export const extractTextContent = (tag, content) => {
  let textContent;
  let mdTag;

  if (tag === "p") {
    mdTag = "p";
  } else {
    mdTag = getKeyWithValue(htmlTagsObj, tag);
    console.log("tag given", tag);
    console.log("md tag is", mdTag);
  }
  const startText = content.indexOf(mdTag);
  const mdTagLength = mdTag.length;
  textContent = content.slice(startText + mdTagLength);

  console.log("text content", textContent);
  return textContent;
};

export const buildHtml = (tag, text) => {
  console.log("build html function", tag, text);
  if (!tag) return;
  const endTagIndex = tag.indexOf("</");
  const result = `${tag.slice(0, endTagIndex)}${text}${tag.slice(endTagIndex)}`;
  console.log("RESULTTT", result);
  return result;
};

export const parseLine = (line) => {
  console.log("%cparsing line", "color: cyan", line);
  if (!line) return; // might need to change later to create a <p>
  // when there is no valid md but there is text content
  const expectedTag = convertToHtmlTag(line);
  let htmlTag;
  let text;
  console.log("EXPECTED TAG", expectedTag);
  if (expectedTag === "ul" || expectedTag === "ol") {
    htmlTag = "<li></li>";
    text = extractTextContent(expectedTag, line);
  } else if (expectedTag && expectedTag !== "ul" && expectedTag !== "ol") {
    htmlTag = `<${expectedTag}></${expectedTag}>`;
    text = extractTextContent(expectedTag, line);
  } else {
    htmlTag = "<p></p>";
    text = extractTextContent("p", line);
  }

  const firstBuild = buildHtml(htmlTag, text);
  const secondBuild = convertMidlineTags(firstBuild);
  console.log("SECOND BUILD", secondBuild);
  return secondBuild || firstBuild;
};
