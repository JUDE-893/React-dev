import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
// Email regex: /\S+@\S+\.\S+/

const StyledForm = styled(Form)`
  width : 60rem;
  margin-left: -5rem;
`
const StyledInput = styled(Input)`
  width : 25rem;

`


function SignupForm() {

  //form hook
  const {handleSubmit, register,getValues, formState:{errors:formValidationError}} = useForm();


  //function th t handles submitting the form
  const onSubmitForm = (data) => {
    

  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitForm)}>
      <FormRow label="Full name" message={formValidationError?.full_name?.message}>
        <StyledInput type="text" id="fullName" {...register("full_name",{
          pattern: {value: /^[a-zA-Z_ ]{3,25}$/,
                    message: "Username must be 3-25 characters and can only contain letters, numbers, and underscores.",}
        })} required />
      </FormRow>

      <FormRow label="Email address" message={formValidationError?.email?.message}>
        <StyledInput type="email" id="email" {...register('email')} required  />
      </FormRow>

      <FormRow label="Password (min 8 characters)" message={formValidationError?.password?.message}>
        <StyledInput type="password" id="password" {...register('password', {
          pattern : { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Password must be at least 8 characters, with uppercase, lowercase, number, and special character"}
        })} required />
      </FormRow>

      <FormRow label="Repeat password" message={formValidationError?.password_confirm?.message}>
        <StyledInput type="password" id="password_confirm" {...register("password_confirm", {
          validate: (val) => val === getValues().password || "the password confirmation must be identical to the password value"
        })} required />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <ButtonGroup>
          <Button variation='primary' size='medium'>Create new user</Button>
          <Button variation="secondary" size='medium' type="reset">
            Cancel
          </Button>
        </ButtonGroup>
      </FormRow>
    </StyledForm>
  );
}

export default SignupForm;
