/* eslint-disable @typescript-eslint/no-empty-function */
import { Container } from "react-bootstrap";
import { useEffect, useState, FC } from "react";
import { IUser } from "./types";
import "./styles/index.css";
import SignUpModal from "./components/form/SignUpModal";
import LoginModal from "./components/form/LoginModal";
import NavBar from "./components/NavBar";
import * as NotesApi from "./network/note_api";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

const App: FC = () => {
  const [loggedinUser, setLoggedInUser] = useState<IUser | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const userRes = await NotesApi.getLoggedInUser();
        const user: IUser = {
          username: userRes.username,
          email: userRes.email
        }
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedinUser={loggedinUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
        onSignUpClicked={() => setShowSignUpModal(true)}
      />

      <Container>
        <>
          {loggedinUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
      </Container>

      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(newUser) => {
            const user: IUser = {
              username: newUser.username,
              email: newUser.email
            }
            setLoggedInUser(user)
            setShowSignUpModal(false)
          }}
        />
      )}

      {showLoginModal && (
        <LoginModal onDismiss={() => setShowLoginModal(false)} onLoginSuccessful={(newUser) => {
          const user: IUser = {
            username: newUser.username,
            email: newUser.email
          }
          setLoggedInUser(user)
          setShowLoginModal(false)
        }}
        />
      )}
    </div>
  );
};

export default App;
