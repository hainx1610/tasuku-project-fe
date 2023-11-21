// @ts-nocheck
import { format, getTime, formatDistanceToNow, addHours } from "date-fns";

export function fDate(date) {
  return format(new Date(date), "dd MMM yyyy");
}

export function fDateMD(date) {
  return format(new Date(date), "MMM-dd");
}

export function fAddHours(date, hours) {
  return addHours(new Date(date), hours);
}

export function getWeekDayList(startDate, endDate) {
  const days = [];
  const end = new Date(endDate);
  for (
    let start = new Date(startDate);
    start <= end;
    start.setDate(start.getDate() + 1)
  ) {
    const day = start.getDay();
    if (day != 6 && day != 0) {
      days.push(new Date(start));
    }
  }
  return days;
}

export function fDateTime(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
