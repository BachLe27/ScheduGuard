
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Login(props) {
   
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [token, setToken] = useState('');   
   
   let navigate = useNavigate();

   useEffect(() => {
      if (token != '') {
         localStorage.setItem('token', token);
         return navigate('/', {state: {token}});
      }
   }, [token]);
   

   const handleUsername = (e) => { 
      setUsername(e.target.value);
   }

   const handlePassword = (e) => { 
      setPassword(e.target.value);
   }
   
   const handleSubmit = async (e) => { 
      e.preventDefault();

      const user = {
         username: username,
         password: password
      }


      try {
         const config = {
            headers: {
               'Content-Type': 'application/json'	
            }
         }
         const body = JSON.stringify(user);

         const res = await axios.post('http://localhost:3001/api/auth', body, config);

         setToken(res.data.token);
      } catch(err) {
         console.error(err.response.data);
      }
   }

      return <>   
         <div className="login-container container d-flex flex-column justify-content-center align-items-center mt-5">
            <h1 className='py-4 text-warning'>Scheduguard</h1>

            <form onSubmit={handleSubmit} className='d-flex flex-column col-lg-4 col-8'>
               <input onChange={handleUsername} value={username} type="text" className='form-control' name="username" placeholder="Tài khoản"/>
               <input onChange={handlePassword} value={password} type="password" className="form-control mt-2" name="password" placeholder="Mật khẩu"/>
               <button type="submit" className="btn btn-primary mt-2"> Đăng nhập </button>
               <p className='mt-2 text-center'>Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
            </form>

         </div>
      </>;
}

export default Login;