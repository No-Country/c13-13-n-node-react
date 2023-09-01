
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useEffect, useState } from "react";



export default  function Rooms(params) {
const [rooms,setRooms]= useState([])


useEffect(() => {
    // Define una función asincrónica para cargar los datos
    const fetchData = async () => {
      try {
        const dataResponse = await fetchFunctions.GET(
          "https://c13-13-n-node-react-backend.onrender.com/rooms/all"
        );
        setRooms(dataResponse);
      } catch (error) {
        console.error("Error al cargar las salas:", error);
      }
    };

    // Llama a la función fetchData
    fetchData();
  }, []);



return (
    <>
      {rooms.map((room, index) => (
        <button 
        key={index} 
        type="button" 
        className="btn btn-primary"
        style={{margin:"5px", minWidth:"100px"}}
        >
          {room.title}
        </button>
      ))}
    </>
  );



}
