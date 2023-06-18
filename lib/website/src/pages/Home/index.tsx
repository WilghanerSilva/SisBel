import { useContext, useEffect } from "react"
import ClienteHome from "../../components/cliente-home"
import NavBar from "../../components/navbar"
import SideMenu from "../../components/side-menu"
import "./style.css"
import api from "../../services/api"
import AuthContext from "../../contexts/auth"

export function Home() {

  const context = useContext(AuthContext);

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
      }
    ).catch(error => {
      context.setSigned(false);
      localStorage.removeItem('@Sisbel:token');
      localStorage.removeItem('@Sisbel:profile');
    })
  },[])
  return (
    <div className="home-container">
      <div id="navbar-wrapper">
        <NavBar/>
      </div>

      <div id="sidemenu-wrapper">
        <SideMenu/>
      </div>

      <div id="content-wrapper">
        <ClienteHome/>
      </div>
    </div>
  )
}