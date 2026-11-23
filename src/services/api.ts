const BASE_URL = 'http://127.0.0.1:8000';

export interface Holding {
     symbol: string;
     quantity: number;
     average_price: number;
     last_price: number;
     close_price: number;
     profit: number;
     amount: number;
     broker: string;
}

export async function fetchSummaryCardData():Promise<[]> {
     try{
          const response = await fetch(`${BASE_URL}/summarycards`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json'
               }
          });

          if(!response){
               throw new Error("Http response error");
          }

          const data: [] = await response.json();
          return data;
          
     }catch (err){
          console.error("Failed to fetch summary card data");
          throw err;
     }
}

export async function getDailyHistory(): Promise<[]>{
     try{
          const res = await fetch(`${BASE_URL}/portfoliochart`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json'
               },
          });
          if(!res){
               throw new Error("Chart response error");
          }
          const data: [] = await res.json();
          return data
     }catch (err){
          throw err;
     }
}

export async function getCurrentHoldings(): Promise<Holding[]> {
     try{
          const res = await fetch(`${BASE_URL}/holdings`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json'
               }
          })
          if(!res){
               throw new Error("Chart response error");
          }
          const data: Holding[] = await res.json();
          return data
     }catch(err){
          throw err
     }
}