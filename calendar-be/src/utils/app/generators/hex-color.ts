export const generateRandomHexadecimalColor = (): string => {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomHex}`;
};
