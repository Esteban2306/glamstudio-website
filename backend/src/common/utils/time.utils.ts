export function hhmmToMinutes(hhmm: string): number {
  const [hhStr, mmStr] = hhmm.split(':');
  const hh = Number(hhStr);
  const mm = Number(mmStr);
  return hh * 60 + mm;
}

export function minutesToHhmm(minutes: number): string {
  const hh = Math.floor(minutes / 60).toString().padStart(2, '0');
  const mm = (minutes % 60).toString().padStart(2, '0');
  return `${hh}:${mm}`;
}