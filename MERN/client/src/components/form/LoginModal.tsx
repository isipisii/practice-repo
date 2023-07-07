import { FC } from "react";
import { ILoginCredentials, IUser } from "../../types";
import { useForm } from "react-hook-form";
import * as NotesApi from "../../network/note_api"
import { Modal, Form, Button } from "react-bootstrap";
import TextInputField from "./TextInputField";
import styleUtils from "../../styles/utils.module.css";

interface ILoginModalProps {
    onDismiss: () => void
    onLoginSuccessful: (user: IUser) =>  void
}

const LoginModal: FC<ILoginModalProps> = ({onDismiss, onLoginSuccessful}) => {
    const  { register, handleSubmit, formState: { errors, isSubmitting} }  = useForm<ILoginCredentials>()

    async function onSubmit(credentials: ILoginCredentials): Promise<void> {
        try {
            const user = await NotesApi.logIn(credentials)
            onLoginSuccessful(user)
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log in
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
                        Log in
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default LoginModal;
