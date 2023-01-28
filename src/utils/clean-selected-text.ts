export const cleanSelectedText = (text: string) => {
  return text
    .trim()
    .split(/\s+/)[0]
    .replace(/[^a-zA-Z]/g, '');
};