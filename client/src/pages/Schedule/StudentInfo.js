function StudentInfo(props) {
   return ( 
      <>
         <td>{props.guard.name}</td>
         <td>{props.guard.studentID}</td>
         <td>{props.guard.phone}</td>
      </>   
   );
}

export default StudentInfo;