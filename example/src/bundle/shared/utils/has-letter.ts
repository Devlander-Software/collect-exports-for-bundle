export const hasLetter = (
  letter: string,
  array: any[],
  keyToCheck: string = 'name',
  index: number = 0,
  filterText?: string
) =>
  array.find((item) => {
    if (item[keyToCheck] && !filterText) {
      item[keyToCheck].toLowerCase().charAt(index) === letter;
    } else if (filterText) {
      item[keyToCheck].toLowerCase().charAt(index) === letter &&
        item[keyToCheck].toLowerCase().includes(filterText.toLowerCase());
    }
  });


