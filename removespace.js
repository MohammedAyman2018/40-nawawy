const reg = /(\n)/g;
const res = /(")/g;
const str = ``;

const newStr = str.replace(reg, "");
const newStd = newStr.replace(res, "'");

console.log(newStd);
