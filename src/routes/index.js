import React, {useContext} from "react";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { AuthContext } from "../context/auth";


export default function Routes(){
   
    const {signed, user} = useContext(AuthContext);
   
    return(
        signed ? <AuthRoutes/> : <AppRoutes/>
    )
}
