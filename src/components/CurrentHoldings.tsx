import { useEffect, useState } from "react";
import { getCurrentHoldings, type Holding } from "../services/api";

const CurrentHoldings = () =>{
     const [currHoldings, setCurrHoldings] = useState<Holding[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState("");

     useEffect(()=>{
          async function getCurrHoldings(){
               try{
                    const data = await getCurrentHoldings();
                    setCurrHoldings(data);
               }catch{
                    setError("Unable to load holdings.");
               }finally{
                    setIsLoading(false);
               }
          }
          getCurrHoldings();
     },[])

     const formatCurrency = (value: number) => new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
     }).format(value);

     return(
          <section className="mt-10 pb-8" aria-labelledby="holdings-heading">
               <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                         <h2 id="holdings-heading" className="text-xl font-semibold text-custom-text-h">Current Holdings</h2>
                         <p className="mt-1 text-sm">{currHoldings.length} holdings</p>
                    </div>
               </div>

               <div className="overflow-x-auto rounded-lg border border-custom-border bg-custom-bg">
                    <table className="w-full min-w-245 border-collapse text-left text-sm">
                         <thead className="bg-black/3 text-xs uppercase tracking-wide text-custom-text">
                              <tr>
                                   <th scope="col" className="px-4 py-3 font-medium">Symbol</th>
                                   <th scope="col" className="px-4 py-3 text-right font-medium">Quantity</th>
                                   <th scope="col" className="px-4 py-3 text-right font-medium">Average price</th>
                                   <th scope="col" className="px-4 py-3 text-right font-medium">Last price</th>
                                   <th scope="col" className="px-4 py-3 text-right font-medium">Close price</th>
                                   <th scope="col" className="px-4 py-3 text-right font-medium">Profit</th>
                                   <th scope="col" className="px-4 py-3 text-right font-medium">Amount</th>
                                   <th scope="col" className="px-4 py-3 font-medium">Broker</th>
                              </tr>
                         </thead>
                         <tbody className="divide-y divide-custom-border">
                              {isLoading ? (
                                   <tr><td colSpan={8} className="px-4 py-8 text-center">Loading holdings...</td></tr>
                              ) : error ? (
                                   <tr><td colSpan={8} className="px-4 py-8 text-center text-red-600">{error}</td></tr>
                              ) : currHoldings.length === 0 ? (
                                   <tr><td colSpan={8} className="px-4 py-8 text-center">No holdings to display.</td></tr>
                              ) : currHoldings.map((holding, index) => (
                                   <tr key={`${holding.symbol}-${holding.broker}-${index}`} className="hover:bg-black/2">
                                        <th scope="row" className="px-4 py-3 font-semibold text-custom-text-h">{holding.symbol}</th>
                                        <td className="px-4 py-3 text-right tabular-nums">{holding.quantity}</td>
                                        <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(holding.average_price)}</td>
                                        <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(holding.last_price)}</td>
                                        <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(holding.close_price)}</td>
                                        <td className={`px-4 py-3 text-right tabular-nums font-medium ${holding.profit >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                                             {formatCurrency(holding.profit)}
                                        </td>
                                        <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(holding.amount)}</td>
                                        <td className="px-4 py-3">{holding.broker}</td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </section>
     )
}

export default CurrentHoldings