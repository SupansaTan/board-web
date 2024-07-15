import pluralize from 'pluralize';

export const getPluralizedWord = (count: number, word: string) => {
  return pluralize(word, count);
};