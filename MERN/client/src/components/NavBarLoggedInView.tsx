import {FC} from "react"
import { IUser } from '../types'
import { Navbar, Button} from "react-bootstrap"
import * as NotesApi from "../network/note_api"

interface INavBarLoggedInViewProps {
    user: IUser
    onLogoutSuccessful: () => void
}

const NavBarLoggedInView: FC<INavBarLoggedInViewProps>  = ({user, onLogoutSuccessful}) => {

    async function logOut() {
        try {
            await NotesApi.logOut()
            onLogoutSuccessful()
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }

  return (
    <>
        <Navbar.Text className="me-2">
            Signed in as: {user.username}
        </Navbar.Text>
        <Button onClick={logOut}>Log out</Button>
    </>
  )
}

export default NavBarLoggedInView