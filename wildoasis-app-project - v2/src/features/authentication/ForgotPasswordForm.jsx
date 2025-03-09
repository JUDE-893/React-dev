import { useState } from "react";
import styled from 'styled-components';
import {useTriggerResetPassword} from './useResetPassword';

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";


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


export default function ForgotPasswordForm() {

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const {isPending, triggerSend} = useTriggerResetPassword();

  function handleSubmit(e) {
    e.preventDefault()
    if (email.split('').length !== 0) {
      triggerSend( email,
       {onSuccess: () => {
        setSent(true);
      }});
    }
  }

  if (sent) return <StyledBox><h3>📫 We did sent you a link, Check your email indox in order to confirm resetting your password </h3></StyledBox>

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Your e-mail address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large" variation='primary' disabled={email.split('').length === 0 }>{isPending ? <SpinnerMini /> : 'Send Email'}</Button>
      </FormRowVertical>
    </Form>
  );
}
