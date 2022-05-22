import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import moment from "moment";
import StudentInfo from "./StudentInfo";

function Table(props) {

   const [schedule, setSchedule] = useState([]);

   const [students, setStudents] = useState([]);

   const [scheduleToDel, setScheduleToDel] = useState([]);

   const token = localStorage.getItem("token");
   
   const getData = async () => {
      const config = {
         headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
         }
      }
      let res = await axios.get("http://localhost:3001/api/schedule", config);

      setSchedule(res.data);

      res = await axios.get("http://localhost:3001/api/student", config);

      setStudents(res.data);

      // console.log(schedule);
   }

   const sendData = async (e) => {
      let tmp = scheduleToDel;

      let isChecked = e.target.checked;
      // console.log(e.target.value);

      if (isChecked) {
         tmp.push(e.target.value);
      }
      else {
         tmp.splice(scheduleToDel.indexOf(e.target.value), 1);
      }

      setScheduleToDel(scheduleToDel);
      
      props.parentCallback(scheduleToDel);
   }

   useEffect(() => {
      getData();
   }, []);

   if (!token) {
      return <Navigate to="/" />
   }

   if (schedule.length == 0 || students.length == 0) {
      return <>
            <table className="table ms-lg-5 ms-0">
               <thead>
                  <tr>
                     <th>Thời gian</th>
                     <th>Địa điểm gác</th>
                     <th>Ca gác</th>
                     <th>Họ và tên</th>
                     <th>MSSV</th>
                     <th>SĐT</th>
                     <th>Chọn</th>
                  </tr>
               </thead>
               <tbody>  
                  <tr>
                     <th></th>
                  </tr>
               </tbody>
            </table>
         </>
   } else {
      // console.log(students);
      // let test = 'TEST02';
      // let obj = students.find(student => student.studentID === test);
      // console.log(obj);

      return (  
         <>
            <table className="table ms-lg-5 mt-3 ms-0">
               <thead>
                  <tr>
                     <th>Thời gian</th>
                     <th>Địa điểm gác</th>
                     <th>Ca gác</th>
                     <th>Họ và tên</th>
                     <th>MSSV</th>
                     <th>SĐT</th>
                     <th>Chọn</th>
                  </tr>
               </thead>
               <tbody>  
               {
                  
                  schedule.map((item, index) => {
                     // let studentID = item.students[0];
                     // let guard = students.find(student => student.studentID === studentID);
                     let guardID = item.students[0];
                     let guard = students.find(student => student.studentID === guardID);
                     return (
                        <>
                        <tr key={index}>
                           <td rowSpan={item.students.length}>{ moment(item.date).format("DD/MM/YYYY") }</td>
                           <td rowSpan={item.students.length}>{item.location}</td>
                           <td rowSpan={item.students.length}>{item.startTime + " - " + item.endTime}</td>
                              <StudentInfo guard={guard}/> 
                           <td rowSpan={item.students.length}>
                              <input type="checkbox" value={item._id} onChange={sendData}/>
                           </td>
                        </tr> 
                        {
                           item.students.map((guardID, index) => {
                              let guard = students.find(student => student.studentID === guardID);
                              if (index > 0) 
                                 return (
                                    <tr key={index}>
                                       <StudentInfo guard={guard}/> 
                                    </tr>
                                 )
                           })
                        }
                        </>
                     )

                   

                           
 

                  })
               }
               </tbody>
            </table>
         </>
      );
   }
}

export default Table;