import ClienteHome from "../../components/cliente-home"
import NavBar from "../../components/navbar"
import SideMenu from "../../components/side-menu"
import "./style.css"

export function Home() {
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