import {FC} from "react"
import { Button} from "react-bootstrap"

interface INavBarLoggedOutViewProps {
    onSignUpClicked: () => void
    onLoginClicked: () => void
}

const NavBarLoggedInView: FC<INavBarLoggedOutViewProps>  = ({onLoginClicked, onSignUpClicked}) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign in</Button>
      <Button onClick={onLoginClicked}>Log in</Button>
    </>
  )
}

export default NavBarLoggedInView