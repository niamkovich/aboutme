/** Belarusian (and Russian/Ukrainian-family) plural selection: 1/21/31 → one,
 *  2-4/22-24 → few, everything else (including 11-14) → many. */
export function pluralBe(n: number, [one, few, many]: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
}
