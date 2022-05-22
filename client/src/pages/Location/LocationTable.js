import axios from "axios";
import { useState, useEffect } from "react";


function LocationTable(props) {

   const [locations, setLocations] = useState([]);

   const [locationToDelete, setLocationToDelete] = useState([]);

   const getLocation = async () => {
      const config = {
         headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('token')
         }
      }
      const res = await axios.get("http://localhost:3001/api/location", config);
      
      setLocations(res.data);
   }

   useEffect(() => {
      getLocation();
   }, [])


   const sendData = async (e) => {
      let tmp = locationToDelete;

      let isChecked = e.target.checked;
      if (isChecked) {
         tmp.push(e.target.value);
      }
      else {
         tmp.splice(locationToDelete.indexOf(e.target.value), 1);
      }

      setLocationToDelete(locationToDelete);
      
      props.parentCallback(locationToDelete);
   }

   return ( <>
      <table className="table mt-4">
         <thead>
            <tr>
               <th scope="col">STT</th>
               <th scope="col">Tên điểm gác</th>
               <th scope="col">Chọn</th>
            </tr>
         </thead>
         <tbody>
            {
               locations.map((item, index) => {
                  return (
                     <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.location}</td>
                        <td>
                           <input type="checkbox" value={item.location} onChange={sendData}/>
                        </td>
                     </tr>
                  )
               })
            }
         </tbody>
      </table>
   </> );
}

export default LocationTable;