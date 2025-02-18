export function formatNumber(num: number): string {
  if (typeof num !== 'number') {
    return 'Invalid';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}
