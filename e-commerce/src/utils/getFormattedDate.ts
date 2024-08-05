export function getFormattedDate(): string {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
