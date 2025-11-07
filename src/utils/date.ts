import {
  differenceInDays,
  format,
  formatDistanceToNow,
  isPast,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";

export const dateUtils = {
  formatDueDate: (dateString: string): string => {
    const date = new Date(dateString);
    const daysDiff = differenceInDays(date, new Date());

    if (isPast(date) && !isToday(date)) return "Overdue";
    if (isToday(date)) return "Due today";
    if (isTomorrow(date)) return "Due tomorrow";
    if (isYesterday(date)) return "Was due yesterday";
    if (daysDiff <= 7 && daysDiff > 0) return `Due in ${daysDiff} days`;

    return format(date, "MMM dd, yyyy");
  },

  formatTimeAgo: (dateString: string): string => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  },

  isOverdue: (dueDate: string): boolean => {
    const date = new Date(dueDate);
    return isPast(date) && !isToday(date);
  },
};
