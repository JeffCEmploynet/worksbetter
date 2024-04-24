
export function FormatDate(data: any) {
  let fixedDate = data.value ? data.value.split('T')[0] :
    data.data && data.data.customerName !== "Grand Total" ? data.split('T')[0] : 
    data && !data.data ? data.split('T')[0] : '';
    
  return fixedDate
};