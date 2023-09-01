
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default  function CreateNewRoom(params) {
const [rooms,setRooms]= useState([])

const router =useRouter()
useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await fetchFunctions.GET(
          "https://c13-13-n-node-react-backend.onrender.com/rooms/all"
        );
        setRooms(dataResponse);
        router.push("/auth/dashboard")
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
