import Navbar from "../../Layout/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function AddStudent() {

   let navigate = useNavigate();

   const token = localStorage.getItem("token");

   const [added, setAdded] = useState(false);

   useEffect(() => {
      if (added) {
         navigate("/Student", { name: name });
      }
   }, [added]);

   const [formData, setFormData] = useState({
      name: '',	
      birthdate: '',
      classroom: '',
      position: '',
      room: '',
      phone: ''
   });

   const { name, studentID, birthdate, classroom, position, room, phone } = formData;

   const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

   const onSubmit = async e => { 
      e.preventDefault();

      const newStudent = {
         name, studentID, birthdate, classroom, position, room, phone
      }

      try {
         const config = {
            headers: { 
               'Content-Type': 'application/json',
               'X-Auth-Token': token
            }
         }

         const body = JSON.stringify(newStudent);

         await axios.post('http://localhost:3001/api/student', body, config);

         setAdded(true);
         // setRegister(true);
         // console.log(res.data);

      } catch (err) {
         console.error(err.response.data);
      }
   }
   const userName = localStorage.getItem('username');

   if (!token) {
      navigate('/login');
   } else {
      return ( 
         <> 
            <Navbar name={userName}/>

            <div className="container d-flex flex-column align-items-center justify-content-center">
               <div className="mt-4">
                  <a href="/">Home</a> 
                  <span> &lt; </span> 
                  <a href="/Student">Danh sách học viên</a>
                  <span> &lt; </span> 
                  <a>Thêm học viên</a>
               </div>
               <h3 className="text-center my-4 text-success"> Thêm học viên </h3>

               <form onSubmit={e => onSubmit(e)} className="col-5 d-flex flex-column">
   
                  <div className="form-group">
                     <label htmlFor="name" className='form-label fw-bold'>Tên học viên</label>
                     <input onChange={e => onChange(e)} type="text" name="name" className="form-control"/>
                  </div>

                  <div className="form-group mt-3">
                     <label htmlFor="studentID" className='form-label fw-bold'>Mã số sinh viên</label>
                     <input onChange={e => onChange(e)} type="text" name="studentID" className="form-control"/>
                  </div>

                  <div className="form-group mt-3">
                     <label htmlFor="bday" className='form-label fw-bold'>Ngày sinh</label>
                     <input onChange={e => onChange(e)} type="date" name="birthdate" className="form-control"/>
                  </div>
   
                  <div className="form-group mt-3">
                     <label htmlFor="class" className='form-label fw-bold'>Lớp</label>
                     <input onChange={e => onChange(e)} type="text" name="classroom" className="form-control"/>
                  </div>
   
                  <div className="form-group mt-3">
                     <label htmlFor="position" className='form-label fw-bold'>Chức vụ</label>
                     <input onChange={e => onChange(e)} type="text" name="position" className="form-control"/>
                  </div>
   
                  <div className="form-group mt-3">
                     <label htmlFor="room" className='form-label fw-bold'>Phòng ở</label>
                     <input onChange={e => onChange(e)} type="text" name="room" className="form-control"/>
                  </div>
   
                  <div className="form-group mt-3">
                     <label htmlFor="phone" className='form-label fw-bold'>Số điện thoại</label>
                     <input onChange={e => onChange(e)} type="text" name="phone" className="form-control"/>
                  </div>
   
                  <button type="submit" className="btn btn-success my-4">Thêm</button>
               </form>
            </div>
         </> 
      );
   }

   
}

export default AddStudent;