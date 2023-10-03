export const countExpireDate = (date: Date, days: number): Date => {
  const expireDate: Date = new Date(date);
  expireDate.setDate(date.getDate() + days);

  return expireDate;
};
