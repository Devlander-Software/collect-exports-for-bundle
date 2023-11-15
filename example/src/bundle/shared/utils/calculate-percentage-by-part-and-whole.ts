export function calculatePercentageByPartAndWhole(
  partial: number,
  whole: number
) {
  if (typeof partial !== 'number' || typeof whole !== 'number' || whole === 0) {
    throw new Error("Both inputs must be numbers and 'whole' cannot be zero.");
  }

  const percentage = (partial / whole) * 100;
  return percentage;
}

