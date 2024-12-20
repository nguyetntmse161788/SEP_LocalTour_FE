
export const formatCurrency = (number: number) => {
    return number.toLocaleString('en-US').replace(/,/g, ' ') + ' VND';
  };
  