"use client";
import { useState, useEffect } from "react";
import Profile from "@/components/profile";
import NewRoomComponent from "@/components/newroom";
import Rooms from "../rooms/rooms";
import SelectedRoom from "../rooms/selectedRoom";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { transition } from "@cloudinary/url-gen/actions/effect";

export default function Dashboard() {

const [newRoom, setnewRoom] = useState("");
const [currentUser, setCurrentUser] = useState({});
const [currentRoom, setcurrentRoom] = useState(null);

const router = useRouter();

    const userData = Cookies.get("userData")
    // console.log(userData);
    const initialUserData = userData? JSON.parse(userData) : null
    // console.log(initialUserData);

    useEffect(() => {
      if (initialUserData) {
        setCurrentUser(initialUserData)
      }else{
        router.push(`/`)
      }
    }, []);



async function handleSubmit() {}

async function handleNewRoom() {
  setnewRoom(!newRoom);
  setcurrentRoom(null)
}
async function getDataUser() {
  console.log("funcion entrar a sala");
}
async function   selectedRoomId(e){
      e.preventDefault(); 
  console.log(e.target.value); 
      setcurrentRoom(e.target.value);
      console.log(currentRoom);
    }

    console.log(currentRoom);
return (
  <>
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems:"flex-end",
        
      }}
    >
      <Profile />

    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "row",
        // alignItems: "center",
        // minHeight:"400px",
        justifyContent: currentRoom? "flex-start": "center",
        boxShadow: "0px 0px 20px 8px #bce1d6" ,
        margin: "2%",
        padding: "2%"
      }}
    >
      {newRoom ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <NewRoomComponent user={currentUser} />
          <hr></hr>
          <button
            type="button"
            onClick={handleNewRoom}
            className="btn btn-outline-info"
          >
            Atrás
          </button>{" "}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{display:"flex", flexDirection:"row"}}>
          <div>
          <h5 className="title"><p class="text-primary">SALAS DISPONIBLES</p></h5>
            <div className="containerSec">
              
                <Rooms user={currentUser} selectedRoomId={selectedRoomId}/>
            </div>
              
            <div style={{display:"flex",flexDirection:"column", alignContent:"center", alignItems:"center"}}>
              <h6><p class="text-info">CREAR UNA SALA</p></h6>
                <button
                  type="button"
                  onClick={handleNewRoom}
                  className="btn btn-outline-info"
                >
                  Crear Sala
                </button>
            </div>

            </div>
            {currentRoom && (
            <SelectedRoom user={currentUser} currentRoom={currentRoom}/> 
             )}
             </div>
        </div>    
      )}
    </div>
  </>
);
}
