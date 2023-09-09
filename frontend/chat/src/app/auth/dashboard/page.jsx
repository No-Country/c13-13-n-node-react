"use client";
import { useState, useEffect } from "react";
import Profile from "@/components/profile";
import NewRoomComponent from "@/components/newroom";
import Rooms from "../rooms/rooms";
import SelectedRoom from "../rooms/selectedRoom";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { transition } from "@cloudinary/url-gen/actions/effect";
import "./page.css";

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
  // console.log(e.target.value); 
      setcurrentRoom(e.target.value);
    }
      // console.log(currentRoom);
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
            alignItems: currentRoom? "normal": "center",
            width:"100%",
            flexDirection: "column",
          }}
        >
          <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
          <div style={{display:"flex", justifyContent:"flex-start",flexDirection:"column",margin:"5%"}}>
          <p class="text-primary" style={{textAlign:"center"}}>SALAS DISPONIBLES</p>
            <div className="dashboard-container" >
                <Rooms user={currentUser} selectedRoomId={selectedRoomId}/>
            </div>
              
            <div style={{display:"flex",flexDirection:"column", alignContent:"center", alignItems:"center", marginTop:"20%"}}>
              <p class="text-info" style={{textAlign:"center"}}>CREAR UNA SALA</p>
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
