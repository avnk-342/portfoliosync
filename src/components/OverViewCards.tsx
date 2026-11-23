import { useEffect, useState } from "react"
import { fetchSummaryCardData } from "../services/api";

interface SummaryCardItem {
  id: string;
  title: string;
  value: number;
  prefix?: string;
  badge?: string;
  badgePositive?: boolean;
  accentColor?: string;
}

const OverViewCards = () => {
     const initialValue: SummaryCardItem[] = [
          {
               "id":"invested_amount",
               "title": "Invested Amount",
               "value": NaN
          },
          {
               "id":"current_value",
               "title": "Current Value",
               "value": NaN
          }
     ]
     const [responseList, setresponseList] = useState<SummaryCardItem[]>(initialValue);

     useEffect(()=>{
          async function loadData() {
               try{
                    const data = await fetchSummaryCardData();
                    setresponseList(data);
               } catch (err){

               }
          }
          loadData();
     }, []);
     

  return (
    <>
          {responseList.map((item)=>(
               <div key = {item.id} className="border rounded-2xl w-70 h-30 p-3" >
                    <h2>{item.title}</h2>
                    <p className={`${item.accentColor} font-bold text-2xl`} >{"\u20B9 " + item.value}</p>
               </div>
          ))}
    </>
  )
}

export default OverViewCards