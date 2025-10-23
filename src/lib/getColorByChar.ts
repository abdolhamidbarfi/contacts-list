const alphabetLatin = "abcdefghijklmnopqrstuvwxyz";
const alphabetPersian = "آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی";

const tailwindColors100 = [
  "slate-100",
  "gray-100",
  "zinc-100",
  "neutral-100",
  "stone-100",
  "red-100",
  "orange-100",
  "amber-100",
  "yellow-100",
  "lime-100",
  "green-100",
  "emerald-100",
  "teal-100",
  "cyan-100",
  "sky-100",
  "blue-100",
  "indigo-100",
  "violet-100",
  "purple-100",
  "fuchsia-100",
  "pink-100",
  "rose-100",
];

export function getColorByChar(char: string, path: "bg" | "text") {
  const lowerChar = char.toLowerCase();
  let index: number;

  if (alphabetLatin.includes(lowerChar)) {
    index = alphabetLatin.indexOf(lowerChar);
    const color =
      tailwindColors100[
        Math.floor((index / alphabetLatin.length) * tailwindColors100.length)
      ];
    return `${path}-${color}`;
  }

  if (alphabetPersian.includes(lowerChar)) {
    index = alphabetPersian.indexOf(lowerChar);
    const color =
      tailwindColors100[
        Math.floor((index / alphabetPersian.length) * tailwindColors100.length)
      ];
    return `${path}-${color}`;
  }

  return `${path}-${tailwindColors100[0]}`;
}
