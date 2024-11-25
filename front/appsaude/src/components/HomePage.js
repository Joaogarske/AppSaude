import React from "react";
import { Navegacao } from "./Navegacao";
import Logo from "../picture/logo.png"
export function HomePage() {
  return (
    
    <div>
       <Navegacao/>
       <div className="image-container">
        <img 
          src={Logo}
          alt="Logo"
          className="centered-image"
          style={{width:"250px",marginTop:"150px",marginLeft:"60px"}} 
        />
      </div>
    </div>
  );
}


