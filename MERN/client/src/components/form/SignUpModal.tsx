import { FC } from "react"
import { ISignUpCredentials, IUser } from "../../types"
import { useForm } from "react-hook-form"
import * as NotesApi from "../../network/note_api"
import { Modal, Form, Button } from "react-bootstrap"
import TextInputField from "./TextInputField"
import styleUtils from "../../styles/utils.module.css";

interface ISignUpModalProps {
    onDismiss: () => void
    onSignUpSuccessful: (user: IUser) =>  void
}

const SignUpModal: FC<ISignUpModalProps> = ({ onDismiss, onSignUpSuccessful}) => {

  const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm<ISignUpCredentials>()

  async function onSubmit(credentials: ISignUpCredentials): Promise<void> {
    try {
        const newUser = await NotesApi.signUp(credentials)
        onSignUpSuccessful(newUser)
    } catch (error) {
        console.error(error)
        alert(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                Sign up
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.username}
                />
                <TextInputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.email}
                />
                <TextInputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.password}
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={styleUtils.width100}>
                    Sign Up
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default SignUpModal