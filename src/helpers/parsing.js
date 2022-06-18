import { htmlTagsObj } from "../constants/htmlTags";
import { getKeyWithValue } from "./common";

export const convertToHtmlTag = (content) => {
  switch (true) {
    case /^# /.test(content):
      return "h1";
    case /## /.test(content):
      return "h2";
    default:
      return;
  }
};

export const extractTextContent = (tag, content) => {
  const mdTag = getKeyWithValue(htmlTagsObj, tag);
  console.log("md tag is", mdTag);
  const startText = content.indexOf(mdTag);
  const mdTagLength = mdTag.length;
  const textContent = content.slice(startText + mdTagLength);
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
  }

  const rendering = buildHtml(htmlTag, text);
  console.log("RENDERING", rendering);
  return rendering;
};

export const parseAsOldLine = (line) => {
  console.log("%cparsing as old line", "color: green", line);
};
