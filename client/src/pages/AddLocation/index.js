import Navbar from "../../Layout/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom';

function AddLocation() {

   const navigate = useNavigate();

   const token = localStorage.getItem("token");

   const [location, setLocation] = useState();
   const [added, setAdded] = useState(false);

   useEffect(() => {
      if (added) {
         navigate("/Location");
      }
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const body = {
            location: location
         }
         const config = {
            headers: {
               'Content-Type': 'application/json',
               'X-Auth-Token': token
            }
         }
         const res = await axios.post('http://localhost:3001/api/location', body, config);
         console.log(res.data);
         setAdded(true);
         navigate("/Location");
      } catch (err) {
         console.error(err.response.data);
      }
   }
   
   const onChange = (e) => {
      setLocation(e.target.value);
   }
      
   if (!token) {
      return <Navigate to="/" />
   } else {
      return ( <>
         <Navbar />

         

         <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
            <div className="mb-3">
                  <a href="/">Home</a> 
                  <span> &lt; </span> 
                  <a href="/Location">Danh sách điểm gác</a>
                  <span> &lt; </span> 
                  <a>Thêm điểm gác</a>
            </div>

            <h3>Thêm điểm gác</h3>
            <form onSubmit={handleSubmit} className='d-flex flex-column col-lg-4 col-8'>

               <div className="form-group">

                  <input onChange={e => onChange(e)} type="text" className='form-control' name="location" placeholder="Tên điểm gác"/>

               </div>
               <button type="submit" className="btn btn-primary mt-3"> Thêm </button>
            </form>
         </div>
         </>
      );
   }
}

export default AddLocation;