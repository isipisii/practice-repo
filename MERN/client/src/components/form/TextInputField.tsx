import { FC } from "react";
import { FieldError, RegisterOptions, UseFormRegister,} from "react-hook-form";
import { Form } from "react-bootstrap";

interface ITextInputFieldProps {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: unknown
}

const TextInputField: FC<ITextInputFieldProps> = ({name, label, error, register, registerOptions, ...props}) => {
  return (
    <Form.Group className="mb-3" controlId={name + "-input"}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            {...props}
            {...register(name, registerOptions)}
            isInvalid={!!error}
        />
        <Form.Control.Feedback type="invalid">
            {error?.message}
        </Form.Control.Feedback>
    </Form.Group>
  )
};
export default TextInputField;
