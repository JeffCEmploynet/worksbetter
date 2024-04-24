
export function FormatDataDate(data: any) {
  let fixedDate = data.value ? data.value.split('T')[0] :
    data.data && data.data.customerName !== "Grand Total" ? data.split('T')[0] : 
    data && !data.data ? data.split('T')[0] : '';
    
  return fixedDate
};

export function FormatDate(data: any) {
  console.log(data);
  let fixedDate = data ? data.split('T')[0] : '';
    
  return fixedDate
};