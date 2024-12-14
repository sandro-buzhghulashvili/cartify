function calculateStep(
  minPrice: number,
  maxPrice: number,
  numRanges: number
): number {
  if (numRanges <= 0) {
    throw new Error('Number of ranges must be greater than 0');
  }

  const range = maxPrice - minPrice;
  return Math.ceil(range / numRanges);
}

export function createPriceRanges(
  minPrice: number,
  maxPrice: number,
  numRanges: number,
  productQuantity: number
): string[] {
  if (numRanges > 3) {
    numRanges = 4;
  }

  const step = calculateStep(minPrice, maxPrice, numRanges);
  const ranges: string[] = [];

  if (productQuantity === 1) {
    return [`$0-$${maxPrice}`];
  }

  for (let i = 0; i < numRanges; i++) {
    const start = minPrice + i * step;
    const end = Math.min(minPrice + (i + 1) * step - 1, maxPrice);
    ranges.push(`$${start}-$${end}`);
  }

  return ranges;
}
