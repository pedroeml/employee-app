export function formatDate(date: Date): string {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options as any);
}

export function formatTimeDiff(date: Date): string {
  const diff = Date.now() - date.getTime();
  const resultInMinutes = Math.round(diff / 60000);
  const years = Math.floor(resultInMinutes / 525600);
  const months = Math.floor((resultInMinutes % 525600) / 43800);
  const days = Math.floor(((resultInMinutes % 525600) % 43800) / 1440);
  return `${years}y - ${months}m - ${days}d`;
}
