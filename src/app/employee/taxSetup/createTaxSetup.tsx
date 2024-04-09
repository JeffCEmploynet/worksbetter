

export default function CreateTaxSetup(event: any, assignmentId: Number){
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const zip = formData.get("zip");
  const localTax = formData.get("local");
  const state = formData.get("state");
  const stateTax = formData.get("stateTax");
  const federalTax = formData.get("federalTax");
  const addedWithholding = formData.get("withholding");
}