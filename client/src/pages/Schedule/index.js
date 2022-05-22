import Navbar from '../../Layout/Navbar'
import Table from './Table'
import axios from "axios";
import { useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { set } from 'mongoose';

function Schedule(props) {

   // const [schedule, setSchedule] = useState();
   const [schedules, setSchedules] = useState([]);
   const [deleted, setDeleted] = useState(false);

   let navigate = useNavigate();

   useEffect(() => {
      if (deleted) {
         window.location.reload(false);
      }
   }, [deleted]);

   const token = localStorage.getItem('token');

   const callbackFunction = (scheduleToDel) => {
      // console.log(scheduleToDel);
      setSchedules(scheduleToDel);
   }
   
   const deleteSchedule = async () => {
      
      try {

         const body = {
            schedules: schedules
         }

         const res = axios.delete('http://localhost:3001/api/schedule', {
            headers: {
               'Content-Type': 'application/json',
               'X-Auth-Token': token
            },
            data: body
         });

         console.log(res.data);

         setDeleted(true);
      } catch (err) {
         console.error(err.response.data);
      }

   }

   if (!token) {
      return <Navigate to='/login' />
   } else {
      return ( 
         <>
            <Navbar/>
            <div className="container d-flex flex-lg-row flex-column mt-5" style={{minHeight: '70vh' }}>

               <div className="col-lg-3 col-12 d-flex flex-column align-items-center justify-content-center">
                  <a href='/setSchedule' className='btn btn-info w-75'>Thêm lịch gác</a>
                  <button className='btn btn-danger w-75 mt-3' onClick={deleteSchedule}>Xoá lịch gác đã chọn</button>
               </div>
               
               <div className="col-lg-9">
                  <h2 className='fw-bold text-center mt-5 mt-lg-0'>Lịch gác</h2>
                  <Table parentCallback={callbackFunction}/>
               </div>
            </div>
         </>   
      );
   }

   
}

export default Schedule;