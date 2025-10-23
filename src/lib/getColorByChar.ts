const alphabetLatin = "abcdefghijklmnopqrstuvwxyz";
const alphabetPersian = "آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی";

const tailwindColors100 = [
  "bg-slate-200",
  "bg-gray-200",
  "bg-zinc-200",
  "bg-neutral-200",
  "bg-stone-200",
  "bg-red-200",
  "bg-orange-200",
  "bg-amber-200",
  "bg-yellow-200",
  "bg-lime-200",
  "bg-green-200",
  "bg-emerald-200",
  "bg-teal-200",
  "bg-cyan-200",
  "bg-sky-200",
  "bg-blue-200",
  "bg-indigo-200",
  "bg-violet-200",
  "bg-purple-200",
  "bg-fuchsia-200",
  "bg-pink-200",
  "bg-rose-200",
];

export function getColorByChar(char: string, path: "bg" | "text") {
  const lowerChar = char?.toLowerCase();
  let index: number;

  if (alphabetLatin.includes(lowerChar)) {
    index = alphabetLatin.indexOf(lowerChar);
    const color =
      tailwindColors100[
        Math.floor((index / alphabetLatin.length) * tailwindColors100.length)
      ];
    return color;
  }

  if (alphabetPersian.includes(lowerChar)) {
    index = alphabetPersian.indexOf(lowerChar);
    const color =
      tailwindColors100[
        Math.floor((index / alphabetPersian.length) * tailwindColors100.length)
      ];
    return color;
  }

  return `${path}-${tailwindColors100[0]}`;
}
