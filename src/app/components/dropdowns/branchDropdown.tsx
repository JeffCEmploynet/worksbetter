import Select from 'react-select';

export default function BranchDropdown({selectedBranch, setSelectedBranch, branchList}:
  {selectedBranch: any, setSelectedBranch: any, branchList: any}  
){
  return(
    <>
      <div className='text-sky-950 mb-1'>
        {branchList&&<Select
          options={branchList}
          value={selectedBranch}
          placeholder='Please Select a Branch'
          onChange={(e)=>setSelectedBranch(e)}
        />}
      </div>
    </>
  )
}