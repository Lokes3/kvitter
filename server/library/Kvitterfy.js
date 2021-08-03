const { BIRDS } = require("./Birds");

const kvitters = ["kvitt", "tuut", "krax", "piip", "kvidder", "bripp", "tweet", "purr"];

const getWordHash = (word) => word.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0);

const isCapitalized = (word) =>
  (word[0] >= "A" && word[0] <= "Z") || word[0] === "Å" || word[0] === "Ä" || word[0] === "Ö";

const isUppercase = (word) => {
  const letters = word.split("");
  return letters.every(isCapitalized);
};

const replaceWord = (word) => {
  const kvitter = kvitters[getWordHash(word) % kvitters.length];
  const [firstLetter, ...rest] = kvitter;
  if (isUppercase(word)) return kvitter.toUpperCase();
  if (isCapitalized(word)) return `${firstLetter.toUpperCase()}${rest.join("")}`;
  return kvitter;
};

const kvitterfy = (kvitt) => {
  const message = kvitt.message.replace(/[\w|Å|Ä|Ö|å|ä|ö]+/g, replaceWord);
  const user = BIRDS[getWordHash(kvitt.user) % BIRDS.length];

  return {
    ...kvitt,
    message,
    user,
  };
};

module.exports = { kvitterfy };
