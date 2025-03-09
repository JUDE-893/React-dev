import { useState } from "react";
import useLogin from './useLogin';
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login,isPending} = useLogin()

  function handleSubmit(e) {
    e.preventDefault()
    if (email.split('').length !== 0 || password.split('').length !== 0) {
      login({email:email,password:password}
      , {onSetteled: () => {
        setEmail('');
        setPassword('')
      }})
      setEmail('');
      setPassword('')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
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
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" variation='primary' disabled={email.split('').length === 0 || password.split('').length === 0}>{isPending ? <SpinnerMini /> : 'Login'}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
