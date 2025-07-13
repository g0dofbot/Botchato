
/**
 * NOTE: This is NOT real encryption. It's a simple substitution cipher for visual effect only.
 * DO NOT use this for any sensitive data.
 */

const SHIFT = 5; // How many characters to shift by

// Create a map of characters to their shifted counterparts and back
const createCharMaps = () => {
  const printableChars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
  const encryptMap = new Map<string, string>();
  const decryptMap = new Map<string, string>();

  for (let i = 0; i < printableChars.length; i++) {
    const char = printableChars[i];
    const shiftedIndex = (i + SHIFT) % printableChars.length;
    const shiftedChar = printableChars[shiftedIndex];
    
    encryptMap.set(char, shiftedChar);
    decryptMap.set(shiftedChar, char);
  }
  return { encryptMap, decryptMap };
};

const { encryptMap, decryptMap } = createCharMaps();

const transform = (input: string, map: Map<string, string>): string => {
  let output = '';
  for (const char of input) {
    output += map.get(char) || char; // If char not in map, use it as-is
  }
  return output;
};


export const encrypt = (text: string): string => {
  return transform(text, encryptMap);
};

export const decrypt = (text: string): string => {
  return transform(text, decryptMap);
};
