// formats an isodate to MM/DD/YYYY HH:MM
export default function dateFormat(isoString) {
  const date = isoString.substring(0, 10);
  const splittedDate = date.split('-');
  const year = splittedDate[0];
  const month = splittedDate[1];
  const day = splittedDate[2];
  const time = isoString.substring(11, 16);
  return `${month}/${day}/${year} ${time}`;
}
