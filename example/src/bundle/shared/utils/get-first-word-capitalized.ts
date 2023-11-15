export function getFirstWordCapitalized(str: string): string {
  // Trim leading and trailing white spaces, and then split the string by spaces
  const words = str.trim().split(' ');

  // Check if the array has a valid first word
  if (words.length === 0 || words[0] === '') {
    return '';
  } else if (words && words.length > 1 && words[0]) {
    const firstWord = words[0];

    // Capitalize the first letter and convert the rest to lowercase
    const capitalizedFirstWord =
      firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
    return capitalizedFirstWord;
  } else {
    return '';
  }
  // Extract the first word from the array (assured to be defined and non-empty at this point)
}


