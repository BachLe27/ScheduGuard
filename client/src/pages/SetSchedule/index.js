import Navbar from "../../Layout/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom';

function SetSchedule() {

   const token = localStorage.getItem('token');

   const navigate = useNavigate();

   const [locations, setLocations] = useState([]);
   const [students, setStudents] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   const [numberGuard, setNumberGuard] = useState([]);
   const [guard, setGuard] = useState([]);

   const [formData, setFormData] = useState({
      location: '',
      date: '',
      startTime: '',
      endTime: '',
      students: []
   });

   const getData = async () => {
      const config = {
         headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
         }
      }
      let res = await axios.get("http://localhost:3001/api/location", config);
      setLocations(res.data);

      res = await axios.get("http://localhost:3001/api/student", config);
      setStudents(res.data);
      setIsLoading(false);
   }

   useEffect(() => {
      getData();
   }, []);

   const handleSubmit = async e => {
      e.preventDefault();

      try {
         const config = {
            headers: {
               'Content-Type': 'application/json',
               'X-Auth-Token': token
            }
         }

         let res = await axios.get('http://localhost:3001/api/auth', config);
         let user = res.data._id;

         formData.students = guard;

         res = await axios.post("http://localhost:3001/api/schedule", {
            user: user,
            location: formData.location,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            students: guard,
         }, config);

         console.log(res.data);
         // alert("Schedule added");
         navigate("/Schedule");
      }
      catch (err) {
         console.error(err.response.data);
      }

   }

   const changeNumber = e => {
      const tmp = [];
      for (let i = 0; i < e.target.value; i++) {
         tmp.push(i);
      }

      if (e.target.value < numberGuard.length) {
         var tmp2 = [];
         for(let i = 0; i < e.target.value; i++) {
            tmp2.push(guard[i]);
         }
         setGuard(tmp2);
      }

      setNumberGuard(tmp);
   }

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      // console.log(formData);
   }

   const changeGuard = e => {
      const tmp = guard;
      if (tmp.includes(e.target.value)) {
         tmp.splice(tmp.indexOf(e.target.value), 1);
      } else {
         tmp.push(e.target.value);
      }
      setGuard(tmp);
      // console.log(tmp);
   }


   if (!token) {
      return <Navigate to='/login' />
   }

   if (isLoading) {
      return <>
         <Navbar/>
         <h1 className="text-center">Loading...</h1>
      </>
   } 
   else {
      return(
      <>
         <Navbar/>
         <div className="container col-md-3">

            <form onSubmit={handleSubmit}>
               <div className="form-group mt-5">
                  <label className="form-label fw-bold">Điểm gác</label>
                  {
                     (locations.length === 0) ? 
                        <>
                           <select name="location" className="form-select" onChange={(e) => onChange(e)}> 
                              <option value="" selected>Chọn điểm gác</option>
                           </select> 
                           <p>Chưa có điểm gác nào. <a href="/addLocation">Thêm điểm gác</a></p>
                        </> : 
                        <select name="location" className="form-select" onChange={(e) => onChange(e)}> 
                        <option value="" selected disabled>Chọn điểm gác</option>
                        {
                           locations.map((location, index) => {
                              return (
                                 <option key={index} value={location.location}>{location.location}</option>
                              )
                           })
                        }
                        </select>
                  }
               </div>

               <div className="form-group mt-3">
                  <label for="date" className="form-label fw-bold">Ngày gác</label>
                  <input type="date" className="form-control" name="date" required onChange={(e) => onChange(e)}/>
               </div>

               <div className="mt-3 w-100">
                  <label className="form-label fw-bold">Thời gian gác</label> <br/>

                  <div className="d-flex w-100 flex-md-row flex-column">
                     <div className="form-group col-md-6 me-1">
                        <label htmlFor="startTime">Từ</label>
                        <input type="time" className="form-control" name="startTime" required onChange={(e) => onChange(e)}/>
                     </div> 

                     <div className="form-group col-md-6 mt-2 mt-md-0">
                        <label htmlFor="endTime">Đến</label>
                        <input type="time" className="form-control" name="endTime" required onChange={(e) => onChange(e)} />
                     </div>
                  </div>
               </div>
               
               <div className="form-group mt-3">
                  <label className="form-label fw-bold">Số người gác</label>

                  <div className="d-flex col-12 align-items-center">
                     <input type="number" min="0" max={students.length} className="form-control" name="number" onChange={(e) => changeNumber(e)} required/> 
                  </div>
                  
               </div>

               <div className="form-group mt-3">
                  <label className="form-label fw-bold">Người gác </label>
                  {
                     students.length === 0 ? 
                     <>
                        <select name="student" className="form-select">
                           <option value="" selected>Chọn học sinh</option>
                        </select>
                        <p>Chưa có học sinh nào. <a href="/addStudent">Thêm học viên</a></p>
                     </> : 
                     <> 
                     {
                        numberGuard.length === 0?
                        <>
                           <select name="student" className="form-select">
                              <option value="" selected>Chọn học sinh</option>
                           </select>
                           <p className="text-danger">Hãy thêm số lượng người gác</p>
                        </> : 
                        numberGuard.map((number, index) => {
                           return (
                              <select 
                                 key={index} 
                                 name={`guard-${index}`} 
                                 className="form-select mt-1" 
                                 onChange={(e) => changeGuard(e)}
                              >
                                 <option value="" selected disabled>Chọn học viên</option>
                                 {
                                    students.map((student, index) => {
                                       if (guard.includes(student.studentID)) {
                                          return (
                                             <option 
                                                key={index} 
                                                value={student.studentID}
                                                disabled
                                             >
                                                {student.studentID + " - " +student.name}
                                             </option>
                                          )
                                       }
                                       else
                                       return (
                                          <option 
                                             key={index} 
                                             value={student.studentID}
                                          >
                                             {student.studentID + " - " +student.name}
                                          </option>
                                       )
                                    })
                                 }
                              </select>
                           )
                        })
                     }
                     </>
                  }
               </div>


               <button type="submit" className="btn btn-success w-100 my-3">Thêm lịch gác</button>
            </form>
         </div>
         
      </>
      );
   }
}

export default SetSchedule;