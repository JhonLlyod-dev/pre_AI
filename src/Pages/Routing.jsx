import { Outlet } from "react-router-dom";
import Header from "../assets/Components/Header";
export default function Routing(){

  return(
    <>
      <Header/>
      <main >
        <Outlet/>
      </main>
    </>
  );

}