import { useNavigate } from 'react-router-dom';

function Navbar(props) {
   
   const anchorStyle = {
      textDecoration: 'none',
      fontSize: '2rem'
   }
   
   const username = localStorage.getItem('username');

   const navigate = useNavigate();

   const logout = async() => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/login');
   }

   return <>
      <nav className="navbar-light bg-light border-bottom py-2">
         <div className="container d-flex justify-content-between align-items-center">
            <a style={anchorStyle} href="/" className="text-warning">Scheduguard</a>
            {  
               username? 
               <p className="mt-3">Xin chào <span className="badge bg-success"> {username} </span> <a href="" onClick={logout} className="badge bg-danger text-white">Đăng xuất</a></p>
               : null
            }
         </div> 
      </nav>
   </>;
}

export default Navbar;