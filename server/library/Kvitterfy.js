const kvitters = ["kvitt", "tuut", "krax", "piip", "kvidder", "bripp"];

const birds = ["Blåmesen", "Måsen", "Kråkan"];

const getWordHash = (word) => word.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0);

const kvitterfy = (kvitt) => {
  const message = kvitt.message.replace(/[A-Za-z]\w*/g, (word) => kvitters[getWordHash(word) % kvitters.length]);
  const user = birds[getWordHash(kvitt.user) % birds.length];

  return {
    ...kvitt,
    message,
    user,
  };
};

module.exports = { kvitterfy };
