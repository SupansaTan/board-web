export const formatTime = (date: Date) => {
  const now = new Date();
  const inputDate = new Date(date);
  const elapsed = (now.getTime() - inputDate.getTime()) / 1000; // elapsed time in seconds

  if (elapsed < 60) {
    return `${Math.floor(elapsed)}s ago`;
  }

  const minutes = elapsed / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)}m ago`;
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}h ago`;
  }

  const days = hours / 24;
  if (days < 30) {
    return `${Math.floor(days)}d ago`;
  }

  const months = days / 30;
  if (months < 12) {
    return `${Math.floor(months)}mo ago`;
  }

  const years = months / 12;
  return `${Math.floor(years)}y ago`;
};