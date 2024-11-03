export const colorValidation = (color: string) => {
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
};
