import words from 'utils/words';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export const color = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[getRandomIntInclusive(0, 15)];
  }
  return color;
};

export const uuid = () => {
  // v4
  var d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const wordId = () => {
  const number = parseInt(Math.random() * 100);
  const word = words[getRandomIntInclusive(0, words.length - 1)];
  const cleanWord = word
    .split(' ')[0]
    .substring(0, 4)
    .toLowerCase()
    .replace(/[^a-zA-Z]+/g, '');
  return cleanWord + number;
};
