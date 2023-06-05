import { format, isPast, isSameWeek } from 'date-fns';
import { pl } from 'date-fns/locale';

export const handleDateFormat = (timestamp: number) => {
  if (isPast(timestamp) || !isSameWeek(timestamp, Date.now())) {
    return format(timestamp, 'EEEE, HH:mm', { locale: pl });
  }
    return format(timestamp, 'd MMMM yyyy, HH:mm', { locale: pl });
}