export interface FontSizeCap {
  (fontSize: string | number, maxFontSize: number): number;
}

export const capFontSize: FontSizeCap = (
  fontSize: string | number,
  maxFontSize: number
): number => {
  // Parse fontSize to a number if it's a string
  const parsedFontSize =
    typeof fontSize === 'string' ? parseInt(fontSize, 10) : fontSize;

  // Check if parsedFontSize is NaN, which could occur if fontSize is a string that doesn't contain a number
  if (isNaN(parsedFontSize)) {
    throw new Error(
      'Invalid fontSize provided, it must be a number or a numeric string'
    );
  }

  // Return the smaller of the two values
  return Math.min(parsedFontSize, maxFontSize);
};

