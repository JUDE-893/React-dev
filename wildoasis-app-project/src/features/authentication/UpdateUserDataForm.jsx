import { useState } from "react";
import useUpdateUser from './useUpdateUser';

import ButtonGroup from "../../ui/ButtonGroup";
import SpinnerMini from "../../ui/SpinnerMini";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";


import useUser  from "./useUser";

function UpdateUserDataForm() {

  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { full_name: currentFullName, avatar:userAvatar },
    },
  } = useUser();
  const {updateUser,isPending} = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(fullName,avatar);
    updateUser({full_name:fullName,avatar:avatar,userAvatar:userAvatar});
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          type='file'
          id="avatar"
          accept="image/*"
          disabled={isPending}
          onChange={(e) =>{setAvatar(e.target.files[0])}}
        />
      </FormRow>
      <FormRow>
        <ButtonGroup>
          <Button variation='primary' size="medium" disabled={isPending}>{isPending ? <SpinnerMini /> : "Update account"}</Button>
          <Button type="reset" variation="secondary" size="medium" disabled={isPending}>
            Cancel
          </Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
