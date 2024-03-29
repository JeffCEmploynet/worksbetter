import { LoadAssignment } from "@/app/api";

export default function AssignmentLoad(id: any, setAssignment: any){
  LoadAssignment(id).then(results => {
    setAssignment(results);
  });
}