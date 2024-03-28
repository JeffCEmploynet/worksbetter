import { LoadOrder } from "@/app/api";

export default function OrderLoad(id: any, setOrder: any){
  LoadOrder(id).then(results => {
    setOrder(results);
  });
}