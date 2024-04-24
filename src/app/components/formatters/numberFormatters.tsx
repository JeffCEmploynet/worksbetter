export function FormatUSD(data:any) {

  let dollarValue = data.value ? data.value : data ? data : 0;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return `${formatter.format(dollarValue)}`
};