export function timestampToDateTimeString(timestamp: number): string {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(timestamp));
}