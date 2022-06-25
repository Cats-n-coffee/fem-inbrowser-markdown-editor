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
    // case /(?<!\*)\*(?![*\s])(?:[^*]*[^*\s])?\*/.test(content):
    //   return "em";
    // case /\**(?![*\s])(?:[^*]*[^*\s])?\*\*/.test(content):
    //   return "strong";
    default:
      return;
  }
};

const convertMidlineTags = (content) => {
  switch (true) {
    case /(?<!\*)\*(?![*\s])(?:[^*]*[^*\s])?\*/.test(content):
      return content.replace(
        /((?<!\*)\*(?![*\s]))(.+)(?:[^*]*[^*\s])?\*/g,
        "<em>$2</em>"
      );
    case /\*{2}(?![*\s])(?:[^*]*[^*\s])?\*\*/.test(content):
      return content.replace(
        /\*{2}(?![*\s])(.+)(?:[^*]*[^*\s])?\*\*/g,
        "<strong>$1</strong>"
      );
    default:
      return;
  }
};

export const extractTextContent = (tag, content) => {
  let textContent;
  let mdTag;

  if (tag === "p") {
    mdTag = "p";
  } else {
    mdTag = getKeyWithValue(htmlTagsObj, tag);
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

  if (expectedTag) {
    htmlTag = `<${expectedTag}></${expectedTag}>`;
    text = extractTextContent(expectedTag, line);
  } else {
    htmlTag = "<p></p>";
    text = extractTextContent("p", line);
  }

  const firstBuild = buildHtml(htmlTag, text);
  const secondBuild = convertMidlineTags(firstBuild);
  console.log("RENDERING", secondBuild);
  return secondBuild || firstBuild;
};
