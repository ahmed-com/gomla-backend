export function getMysqlDate(date: number | Date): string {
  const _date = typeof date === 'number' ? new Date(date) : date;

  const year = _date.getFullYear();
  const _month = _date.getMonth() + 1;
  const month = _month >= 10 ? _month : `0${_month}`;
  const _day = _date.getDate();
  const day = _day >= 10 ? _day : `0${_day}`;

  const mysqlDate = `${year}-${month}-${day}`;

  return mysqlDate;
}
