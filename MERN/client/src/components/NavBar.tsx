import {FC} from "react"
import { IUser } from '../types'
import { Navbar, Container, Nav } from "react-bootstrap"
import NavBarLoggedInView from "./NavBarLoggedInView"
import NavBarLoggedOutView from "./NavBarLoggedOutView"

interface INavBarProps {
    loggedinUser: IUser | null
    onSignUpClicked: () => void
    onLoginClicked: () => void
    onLogoutSuccessful: () => void
}

const NavBar: FC<INavBarProps>  = ({loggedinUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful}) => {

    console.log(loggedinUser)
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
        <Container>
            <Navbar.Brand>
                Notes
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
                <Nav className="ms-auto">
                    {loggedinUser ? 
                    <NavBarLoggedInView user={loggedinUser} onLogoutSuccessful={onLogoutSuccessful} /> 
                        : 
                    <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} /> }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar