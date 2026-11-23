import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import OverViewCards from '../components/OverViewCards'
import PerformanceChart from '../components/PerformanceChart';
import CurrentHoldings from '../components/CurrentHoldings';
import Sidebar from '../components/Sidebar'
import { getDailyHistory } from '../services/api';

const Dashboard = ()=> {
    const [dailyHistory, setDailyHistory] = useState([])

    useEffect(()=>{
        async function loadDailyHistory() {
            try{
                const data = await getDailyHistory();
                setDailyHistory(data);
            }catch(err){

            }
        }
        loadDailyHistory();
    }, [])

    return (
        <>
            <div className='flex app-layout pr-10'>
                <Sidebar />
                <Navbar />
                <div className='app-main'>
                    <h1 className='text-3xl'>Portfolio Overview</h1>
                    <div className='flex gap-10 mt-10'>
                        <OverViewCards />
                    </div>
                    <div className='mt-10'><PerformanceChart initialData={dailyHistory} /></div>
                    <CurrentHoldings />
                </div>
            </div>
        </>
    )
}

export default Dashboard
