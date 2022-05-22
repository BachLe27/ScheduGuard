import axios from "axios";
import { useState, useEffect } from "react";

function StudentTable(props) {

   const [student, setStudent] = useState([]);

   const [IDs, setIDs] = useState([]);

   const sendData = async (e) => {
      let tmp = IDs;

      let isChecked = e.target.checked;
      if (isChecked) {
         tmp.push(e.target.value);
      }
      else {
         tmp.splice(IDs.indexOf(e.target.value), 1);
      }

      setIDs(tmp);
      
      props.parentCallback(IDs);
   }

   const getStudent = async () => {
      const config = {
         headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
         }
      }
      const res = await axios.get("http://localhost:3001/api/student", config);

      setStudent(res.data);
   }

   useEffect(() => {
      getStudent();
   }, []);


   if (student.length === 0) {
      return <>
         <table className="table table-bordered mt-5">
            <thead>
               <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">MSSV</th>
                  <th scope="col">Lớp</th>
                  <th scope="col">Chức vụ</th>
                  <th scope="col">Phòng ở</th>
                  <th scope="col">SĐT</th>
                  <th scope="col">Chọn</th>
               </tr>
            </thead>
            <tbody>  
               <tr></tr>
            </tbody>
         </table>
      </> 
   } else {
      return ( 
         <>
            <table className="table table-bordered mt-5">
               <thead>
                  <tr>
                     <th scope="col">STT</th>
                     <th scope="col">Họ và tên</th>
                     <th scope="col">MSSV</th>
                     <th scope="col">Lớp</th>
                     <th scope="col">Chức vụ</th>
                     <th scope="col">Phòng ở</th>
                     <th scope="col">SĐT</th>
                     <th scope="col">Chọn</th>
                  </tr>
               </thead>
               <tbody>  
                  {
                     student.map((item, index) => {
                        return (
                           <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{item.name}</td>
                              <td>{item.studentID}</td>
                              <td>{item.classroom}</td>
                              <td>{item.position}</td>
                              <td>{item.room}</td>
                              <td>{item.phone}</td>
                              <td>
                                 <input type="checkbox" value={item.studentID} onChange={sendData}/>
                              </td>
                           </tr>
                        )
                     })
                  }
               </tbody>
            </table>
         </> 
      );
   }
}

export default StudentTable;