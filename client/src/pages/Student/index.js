import Navbar from '../../Layout/Navbar'
import StudentTable from './StudentTable'
import { useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState,  } from 'react';

import axios from 'axios';


function Student() {

   const { studentName } = useLocation();

   const token = localStorage.getItem('token');

   const [IDs, setIDs] = useState([]);

   const callbackFunction = (IDsFromTable) => {
      setIDs(IDsFromTable);
   }

   const [deleted, setDeleted] = useState(false);

   useEffect(() => {
      if (deleted) {
         window.location.reload(false);
      }
   }, [deleted]);

   const deleteStudent = async () => {
      // console.log("oke");
      try {

         const body = {
            studentIDs: IDs
         }

         const res = axios.delete('http://localhost:3001/api/student', {
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
      return <Navigate to="/" />
   } else 

   return ( <>
      <Navbar/>

      {studentName? <p>Thêm học viên thành công</p>: null}

      <div className="container d-flex mt-5 flex-column flex-lg-row" style={{minHeight: '70vh' }}>

         <div className="col-lg-3 col-12 d-flex flex-column align-items-center justify-content-center">
            <a href='/addStudent' className='btn btn-info w-75'>Thêm học viên</a>
            <a href='/addFromExcel' className='btn btn-success w-75 mt-3'>Nhập sinh viên từ Excel</a>
            <button className='btn btn-danger w-75 mt-3' onClick={deleteStudent}>Xoá sinh viên đã chọn</button>
         </div>
         <div className="col-lg-8 col-12">
            <h2 className='fw-bold text-center mt-5 mt-lg-0'>Danh sách học viên</h2>
            <StudentTable parentCallback={callbackFunction}/>
         </div>
      </div>
   </> );
}

export default Student;