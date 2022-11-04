import React from 'react';
import MatchingDashboard from '../Matching/MatchingDashboard'
import Navbar from '../Navbar';

function Dashboard (){
    return (
        <div className='dashboard'>
            <Navbar 
                isLogin={false}
            />
            <MatchingDashboard />
        </div>
        
    );
}

export default Dashboard;