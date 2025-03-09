import { useForm } from "react-hook-form";
import {useSearchParams, useParams} from 'react-router-dom';
import {useReset} from './useResetPassword';
import useLogout from './useLogout';

import ButtonGroup from "../../ui/ButtonGroup";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";



function UpdatePasswordForm() {

  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const {token} = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');


  const {isResetting, resetPassword} = useReset();
  const {logout,loggingOut} = useLogout();

  function onSubmit({ password, passwordConfirm }) {
    resetPassword({ password, password_confirmation: passwordConfirm, email, token }, { onSuccess: logout });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        message={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isResetting}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        message={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isResetting}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
      <ButtonGroup>
        <Button variation='primary' size="medium">{isResetting ? <SpinnerMini /> : "Create Password"}</Button>
        <Button type="reset" variation="secondary" size="medium">
          Clear
        </Button>
      </ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
