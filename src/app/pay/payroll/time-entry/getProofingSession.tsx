import { CreateProofingSession } from "@/app/api";

export function GetProofingSession(data: any, setSessionId: any){
  CreateProofingSession(data).then(res => setSessionId(res.id));
}