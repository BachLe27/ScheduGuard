import React, {Fragment, useEffect, useState} from 'react'
import axios from 'axios';

function Register(props) {

   const [register, setRegister] = useState(false);

   useEffect(() => {
   }, [register]);

   const [formData, setFormData] = useState({
      username: '',
      password: '',
      name: '',	
      birthdate: '',
      classroom: '',
      position: '',
      phone: ''
   });

   const { username, password, name, birthdate, classroom, position, phone } = formData;

   const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

   const onSubmit = async e => { 
      e.preventDefault();

      const newUser = {
         username, password, name, birthdate, classroom, position, phone
      }

      try {
         const config = {
            headers: { 
               'Content-Type': 'application/json'
            }
         }

         const body = JSON.stringify(newUser);

         const res = await axios.post('http://localhost:3001/api/user', body, config);

         setRegister(true);
         // console.log(res.data);

      } catch (err) {
         console.error(err.response.data);
      }
   }

   return <Fragment>   
      <div className="login-container container d-flex flex-column justify-content-center align-items-center mt-5">
         <h3 className='pt-4 text-info'>Đăng ký tài khoản</h3>
         <h2 className='pb-4 text-warning'>Scheduguard</h2>

         {
            register ? 
            <h2>Đăng ký thành công! <a href="/login">Đăng nhập</a></h2>
            
            
            
            :
            <form onSubmit={e => onSubmit(e)} className='d-flex flex-column col-lg-4 col-8'>

            <div className="form-group">
               <label htmlFor="username" className="form-label fw-bold">Tài khoản</label>
               <input 
                  type="text" 
                  className="form-control" 
                  name="username"
                  value={username}
                  onChange={e => onChange(e)}
                  required
               />
            </div>

            <div className="form-group mt-3">
               <label htmlFor="password" className="form-label fw-bold">Mật khẩu</label>
               <input 
                  type="password" 
                  className="form-control" 
                  name="password" 
                  value={password}
                  onChange={e => onChange(e)} 
                  required
               />
            </div>

            <div className="form-group mt-3">
               <label htmlFor="name" className="form-label fw-bold">Họ và tên</label>
               <input 
                  type="text" 
                  className="form-control" 
                  name="name"
                  value={name}
                  onChange={e => onChange(e)} 
                  required
               />
            </div>

            <div className="form-group mt-3">
               <label htmlFor="bday" className="form-label fw-bold">Ngày sinh</label>
               <input 
                  type="date" 
                  className="form-control" 
                  name="birthdate"
                  value={birthdate}
                  onChange={e => onChange(e)} 
                  required
               />
            </div>

            <div className="form-group mt-3">
               <label htmlFor="class" className="form-label fw-bold">Lớp</label>
               <input 
                  type="text" 
                  className="form-control" 
                  name="classroom"
                  value={classroom}
                  onChange={e => onChange(e)} 
                  required
               />
            </div>

            <div className="form-group mt-3">
               <label htmlFor="position" className="form-label fw-bold">Chức vụ</label>
               <input 
                  type="text" 
                  className="form-control" 
                  name="position"
                  value={position}
                  onChange={e => onChange(e)} 
                  required
               />
            </div>

            <div className="form-group mt-3">
               <label htmlFor="phone" className="form-label fw-bold">Số điện thoại</label>
               <input 
                  type="text" 
                  className="form-control" 
                  name="phone"
                  value={phone}
                  onChange={e => onChange(e)} 
                  required
               />
            </div>

            <button type="submit" className="btn btn-primary mt-4 mb-3"> Đăng Ký </button>
            <p className="text-center">Đã có tài khoản? <a href="/login">Đăng nhập</a> </p>
         </form>
         }
         

      </div>
   </Fragment>;
}

export default Register;