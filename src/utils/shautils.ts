import CryptoJs from "crypto-js"

export function loadFileHash(file: File): string {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file)
  const wordArray = CryptoJs.lib.WordArray.create(reader.result);
  return CryptoJs.SHA384(wordArray)
}
