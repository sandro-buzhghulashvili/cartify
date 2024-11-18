export function generateSKU({
  category,
  brand,
  color,
  size,
  uniqueId,
}: {
  category: string;
  brand: string;
  color: string;
  size: string;
  uniqueId: number;
}): string {
  const formattedCategory = category.slice(0, 3).toUpperCase();
  const formattedBrand = brand.slice(0, 3).toUpperCase();
  const formattedColor = color.slice(0, 3).toUpperCase();
  const formattedSize = size.toUpperCase();

  return `${formattedCategory}-${formattedBrand}-${formattedColor}-${formattedSize}-${uniqueId}`;
}

export function generateProductCode({
  category,
  brand,
  region,
  uniqueId,
}: {
  category: string;
  brand: string;
  region: string;
  uniqueId: number;
}): string {
  const categoryCode = category.slice(0, 2).toUpperCase();
  const brandCode = brand.slice(0, 2).toUpperCase();
  const regionCode = region.slice(0, 2).toUpperCase();

  return `${categoryCode}${brandCode}${regionCode}-${uniqueId
    .toString()
    .padStart(4, '0')}`;
}

export function generateEANCode({
  countryCode,
  manufacturerCode,
  productCode,
}: {
  countryCode: string; // 2-3 digits
  manufacturerCode: string; // 4-5 digits
  productCode: string; // 5 digits
}): string {
  const baseCode = `${countryCode}${manufacturerCode}${productCode}`.padStart(
    12,
    '0'
  );

  const checksum = calculateEANChecksum(baseCode);

  return `${baseCode}${checksum}`;
}

function calculateEANChecksum(baseCode: string): number {
  let sum = 0;

  for (let i = 0; i < baseCode.length; i++) {
    const digit = parseInt(baseCode[i], 10);
    sum += i % 2 === 0 ? digit : digit * 3;
  }

  return (10 - (sum % 10)) % 10;
}
