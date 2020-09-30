export function last<T>(arr: T[]): T {
  return arr.slice(-1)[0];
}

export function formatDate(d: Date): string {
  const str = d.toLocaleDateString();
  const day = new Date();
  if (str == day.toLocaleDateString()) return "today";
  day.setDate(day.getDate() - 1);
  if (str == day.toLocaleDateString()) return "yesterday";
  return str;
}

export function trimUserEmojis<P extends { emojis: Emoji[] }>(
  all: P[],
  userWidth: number,
  maxHeight: number
): P[] {
  const listWidth = userWidth - 44 - 8; // -{icon-w} -{.list padding}
  const xCount = Math.floor(listWidth / 36); // 36: li.emoji width including margin

  let allHeight = -16; // margin-top of .day:first-of-type
  const emojis = [] as P[];
  for (const pair of all) {
    const yCount = Math.ceil(pair.emojis.length / xCount);
    const biasTop =
      16 + // .day margin-top
      29 + // user-message.info height
      -8; // .list margin-top
    const height = biasTop + 40 * yCount; // 40: li.emoji height including margin

    if (allHeight + height <= maxHeight) {
      // 全部入る場合
      allHeight += height;
      emojis.push(pair);
    } else if (allHeight + (biasTop + 40) <= maxHeight) {
      // 全部は入らないけど少なくとも1行は入る場合
      const yc = Math.floor((maxHeight - allHeight - biasTop) / 40);
      emojis.push({
        ...pair,
        emojis: pair.emojis.slice(0, yc * xCount),
      });
      break;
    } else {
      // 全く入らない
      break;
    }
  }
  return emojis;
}
