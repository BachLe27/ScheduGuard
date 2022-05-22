import Navbar from '../../Layout/Navbar';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Home(props) {

   const [user, setUser] = useState();

   const { data } = useLocation();
   const token = data || localStorage.getItem('token');
   
   const getUser = async () => { 
      try {
         const config = {
            headers: {
               'Content-Type': 'application/json',
               'X-Auth-Token': token
            }
         }
         const res = await axios.get('http://localhost:3001/api/auth', config);

         setUser(res.data);

         // console.log(user);
      } catch(err) {
         console.error(err.response.data);
      }
   }

   useEffect(() => {
      getUser();
   });

   if (!token) {
      return <Navigate to='/login' />
   } else {
      if (!user) { 
         return <h1>Loading...</h1>
      } else {
         localStorage.setItem('username', user.name);
         return <>
            <Navbar/>;
               <div className="container d-flex flex-column col-lg-5 col-8 justify-content-center mt-5">
                  <Link className='btn btn-warning mb-3' to="/schedule">Xem lịch gác</Link>
                  <Link className='btn btn-danger mb-3' to="/Location">Xem điểm gác</Link>
                  <Link className='btn btn-info mb-3' to="/Student">Danh sách học viên</Link>
                  <Link className='btn btn-success' to="/Free">Danh sách miễn gác</Link>
               </div>
            </>
      }
   }

   
}

export default Home;