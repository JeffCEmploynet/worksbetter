import Select from "react-select";
import { FormatDate } from "@/app/components/formatters/dateFormatters";

export default function WeekEndingFilter({timecards} : {timecards: any}){
  const weekEndingDateDropdown: Array<any> = [];

  timecards.forEach((timecard: any)=>{
    const inDropdownList = weekEndingDateDropdown.some(weDate => weDate.value = timecard.processingWeek);
    if (!inDropdownList){
      weekEndingDateDropdown.push(
        {value: timecard.processingWeek, label: FormatDate(timecard.processingWeek)?.toString()}
      );
    };
  });

  return weekEndingDateDropdown;
}