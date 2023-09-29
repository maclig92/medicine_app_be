export const countExpireDate = (date: Date, days: number): Date => {
  const newDate: Date = new Date(date);
  newDate.setDate(date.getDate() + days);

  return newDate;
};
