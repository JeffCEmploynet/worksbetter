import Select from "react-select";

export default function FilterTypeDropdown({selectedFilter, setSeletctedFilter}:
  {selectedFilter: any, setSeletctedFilter: any}  
){
  const searchOptions = [
    {value: "firstName", label: "First Name"},
    {value: "lastName", label: "Last Name"},
    {value: "employeeId", label: "Employee Id"},
    {value: "assignmentId", label: "Assignment Id"},
    {value: "customerName", label: "Customer Name"},
    {value: "customerId", label: "Customer Id"},
    {value: "branch", label: "Branch"}
  ];

  return <Select
      options={searchOptions}
      value={selectedFilter}
      placeholder='Filter Type'
      onChange={(e)=>setSeletctedFilter(e)}
    />
}