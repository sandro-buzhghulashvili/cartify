export function paginateArray<T>(
  arr: T[],
  itemsOnPage: number,
  page: number
): T[] {
  const startIndex = (page - 1) * itemsOnPage;
  const endIndex = startIndex + itemsOnPage;
  return arr.slice(startIndex, endIndex);
}
