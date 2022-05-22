import Navbar from "../../Layout/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import LocationTable from "./LocationTable";

function Location() {

   const token = localStorage.getItem("token");

   const [locations, setLocations] = useState([]);

   const callbackFunction = (locations) => {
      // console.log(locations);
      setLocations(locations);
   }

   const [deleted, setDeleted] = useState(false);

   useEffect(() => {
      if (deleted) {
         window.location.reload(false);
      }
   }, [deleted]);

   const deleteLocation = async () => {
      // console.log("oke");
      try {

         const body = {
            locations: locations
         }

         const res = axios.delete('http://localhost:3001/api/location', {
            headers: {
               'Content-Type': 'application/json',
               'X-Auth-Token': token
            },
            data: body
         });

         // console.log(res.data);
         setDeleted(true);

      } catch (err) {
         console.error(err.response.data);
      }
   }

   if (!token) {
      return <Navigate to="/login" />
   }

   return ( 
      <>
         <Navbar/> 
         <div className="container d-flex mt-5 flex-column flex-lg-row" style={{minHeight: '70vh' }}>

            <div className="col-lg-3 col-12 d-flex flex-column align-items-center justify-content-center">
               <a href='/addLocation' className='btn btn-info w-75'>Thêm điểm gác</a>
               <a href='/addLocationFromExcel' className='btn btn-success w-75 mt-3'>Nhập điểm gác từ Excel</a>
               <button className='btn btn-danger w-75 mt-3' onClick={deleteLocation} >Xoá điểm gác đã chọn</button>
            </div>
            <div className="col-lg-8 col-12">
               <h2 className='fw-bold text-center mt-5 mt-lg-0'>Danh sách điểm gác</h2>
               <LocationTable parentCallback={callbackFunction}/>
            </div>
         </div>
      </>
   );
}

export default Location;