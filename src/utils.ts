export function formatDate(d: Date): string {
  const str = d.toLocaleDateString();
  const day = new Date();
  if (str == day.toLocaleDateString()) return "today";
  day.setDate(day.getDate() - 1);
  if (str == day.toLocaleDateString()) return "yesterday";
  return str;
}
