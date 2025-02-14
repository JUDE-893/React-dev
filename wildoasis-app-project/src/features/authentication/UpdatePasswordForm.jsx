import { useForm } from "react-hook-form";
import useUpdateUser from './useUpdateUser';
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

  const { updateUser, isPending: isUpdating } = useUpdateUser();
  const {logout,loggingOut} = useLogout();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: logout });
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
          disabled={isUpdating}
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
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
      <ButtonGroup>
        <Button variation='primary' size="medium">{isUpdating ? <SpinnerMini /> : "Update Password"}</Button>
        <Button type="reset" variation="secondary" size="medium">
          Cancel
        </Button>
      </ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
