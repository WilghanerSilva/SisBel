import { useContext, useEffect, useState } from "react"
import ClienteHome from "../../components/cliente-home"
import NavBar from "../../components/navbar"
import SideMenu from "../../components/side-menu"
import "./style.css"
import api from "../../services/api"
import AuthContext from "../../contexts/auth"
import { AdminHome } from "../../components/admin-home"
import { LoadingComponent } from "../../components/loading-component"

export function Home() {

  const context = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    api.get(`/${context.profile}`,{
      headers: {
          Authorization: `Bearer ${context.token}`
        }
    }).then(
      response => {
        const {data} = response.data;
        context.setUser({
          email: data.email,
          id: data.id,
          name: data.name,
          profile: data.profile
        })
        setIsLoading(false);
      }
    ).catch(error => {
      context.setSigned(false);
      localStorage.removeItem('@Sisbel:token');
      localStorage.removeItem('@Sisbel:profile');
    })
  },[])
  return (
    isLoading 
    ? 
    <LoadingComponent/> 
    : 
    <div className="home-container">
      <div id="navbar-wrapper">
        <NavBar/>
      </div>

      <div id="sidemenu-wrapper">
        <SideMenu/>
      </div>

      <div id="content-wrapper-home">
        {context.profile === "cliente" && (<ClienteHome/>)}
        {context.profile === "admin" && (<AdminHome/>)}
      </div>
    </div>
  )
}