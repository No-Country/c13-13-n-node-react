
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useEffect, useState } from "react";



export default  function CreateNewRoom(params) {
const [rooms,setRooms]= useState([])


useEffect(() => {
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

    fetchData();
  }, []);


return (
    <>

    </>
  );



}
