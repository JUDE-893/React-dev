import {useState} from 'react';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import useSignup from './useSignup';
import SpinnerMini from "../../ui/SpinnerMini";
import ButtonGroup from "../../ui/ButtonGroup";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

// Email regex: /\S+@\S+\.\S+/

const StyledForm = styled(Form)`
  width : 60rem;
  margin-left: -5rem;
`
const StyledInput = styled(Input)`
  width : 25rem;

`
const StyledBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 4rem;
  width: 150%;
  margin-left:-100px;
  text-align:center;
  overflow: hidden;
`;

function SignupForm() {

  //form hook
  const [signed,setSigned] = useState(false);
  const {handleSubmit, register,getValues, formState:{errors:formValidationError}} = useForm();
  const {signup,isPending:isSigning} = useSignup();

  //function th t handles submitting the form
  const onSubmitForm = (data) => {
    data = {test:10111, ...data};
    signup(data,{
      onSuccess : (data) => {
          console.log(data);
          setSigned(true)
    },})
  }

  if (signed) return <StyledBox><h3>Congras!🎉You did signed Successfully. We did sent you a link, Check your email indox in order to confirm your account </h3></StyledBox>


  return (
    <StyledForm onSubmit={handleSubmit(onSubmitForm)}>
      <FormRow label="Full name" message={formValidationError?.full_name?.message}>
        <StyledInput type="text" id="fullName" {...register("name",{
          pattern: {value: /^[a-zA-Z_ ]{3,25}$/,
                    message: "Username must be 3-25 characters and can only contain letters, numbers, and underscores.",}
        })} required disabled={isSigning} />
      </FormRow>

      <FormRow label="Email address" message={formValidationError?.email?.message}>
        <StyledInput type="email" id="email" {...register('email')} required  disabled={isSigning} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" message={formValidationError?.password?.message}>
        <StyledInput type="password" id="password" {...register('password', {
          pattern : { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Password must be at least 8 characters, with uppercase, lowercase, number, and special character"}
        })} required disabled={isSigning} />
      </FormRow>

      <FormRow label="Repeat password" message={formValidationError?.password_confirm?.message}>
        <StyledInput value="NoPassword&123" type="password" id="password_confirm" {...register("password_confirm", {
          validate: (val) => val === getValues().password || "the password confirmation must be identical to the password value"
        })} required disabled={isSigning} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <ButtonGroup>
          <Button variation='primary' size='medium' disabled={isSigning}>{!isSigning ? "Create new user" : <SpinnerMini />}</Button>
          <Button variation="secondary" size='medium' type="reset" disabled={isSigning}>
            Cancel
          </Button>
        </ButtonGroup>
      </FormRow>
    </StyledForm>
  );
}

export default SignupForm;
