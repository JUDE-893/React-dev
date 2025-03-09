import {supabase} from './supabase';
import axiosClient from './axiosClient';

//function that logs a user in
export async function apiLogin({email,password}) {
  let { data } = await axiosClient.post('/auth/login', JSON.stringify({email: email,password: password}));

  if (!data?.user?.email_verified_at) {
    console.log("Please confirm your email before logging in.");
  }
  else if (data?.error) {
    throw new Error(data?.error);
    console.log('error while login',data?.error);
  }

  console.log(data);
  return data?.user;
}

// function that get the current loged-in user
export async function getCurrentUser() {
  const {data} = await axiosClient.get('/user');

  if (data?.error) throw new Error(data?.error);

  return data?.user
}

//function that logs a user in
export async function apiLogout() {

  let { data } = await axiosClient.post('/auth/logout');

  if (data?.error) {
    throw new Error(data?.error);
    console.log('error while logout',data?.error);
    return null;
  }

  return true;
}

// function that allow to create a user and SignUp
export async function apiSignUp({email,password,name,password_confirm}) {
  // let { csrf } = await axiosClient('')
  let { data } = await axiosClient.post('/auth/register', JSON.stringify({
    email: email,
    password: password,
    password_confirmation: password_confirm,
    name: name,
    avatar: null
  }))

  if (data?.error) {
    throw new Error(data?.error?.message);
    return null;
  }
  console.log(data);
  return data;
}

// function that allow to update a user data
export async function apiUpdateUser({password, avatar, name,userAvatar,toDelete}) {

  //1 get the data obj
  //2 upload the data
  let payload,data;

  if (name){
    payload = {full_name: name};
    const resp = await axiosClient.put('/update-profile', payload);
    data = resp.data;
  }
  //fails
  if (data?.error) {
    throw new Error(data?.error);
    console.log('error while logout',data?.error);
    return null;
  }

  //3 determin the image url
  if (!Boolean(userAvatar)) {
    console.log(data);
     let imageName = avatar ? `avatar-${data.user.id}${Math.random()}.${avatar.name.replace('/','').split('.').reverse()[0]}` : null;
     payload= {imageName:imageName};
   }else {
     console.log(typeof avatar,avatar);
     let imageName = userAvatar;
     payload= {imageName:imageName};
   }

   //4 upload image
   console.log(avatar , payload.imageName, Boolean(avatar && payload.imageName));
    if (Boolean(avatar && payload.imageName)) {
      const {error: storageError} = await (Boolean(userAvatar) ? updateStoredAvatar(payload.imageName, avatar) : uploadAvatar(payload.imageName, avatar));

      if (storageError) {
        throw new Error(storageError.message);
        return null;
      }
      //5 upload the avatar url
      if (!Boolean(userAvatar)) {
        let imageName = payload.imageName;
        payload = {avatar: payload.imageName};
        let resp = await axiosClient.put('/update-profile', payload);
        data = resp.data;

        if (!data?.success) {
          await deleteStoredImage(imageName);
          throw new Error(data?.error);
          return null;
        }
        return data;
    } //end5
  }else if (toDelete){ // to delete a user profile
    const {error: deletetionError} = await deleteStoredImage(userAvatar);

    // fails
    if (deletetionError) {
      throw new Error(deletetionError);
      return null;
    }

    payload = {avatar: null};
    const resp = await axiosClient.put('/update-profile', payload);
    data = resp.data;
  }//end4

    console.log('not uploaded image', data);
    return data?.user
}

// function that trigger a password reset email verification sending
export async function apiTriggerPasswordReset(email) {
  const { data } = await axiosClient.post('/auth/forgot-password',JSON.stringify({email:email}));

  if (data?.error) throw new Error("can't reset password");
  return {error: data?.error}
}

export async function apiPasswordReset(payload) {
  const { data } = await axiosClient.post('/auth/reset-password',JSON.stringify({...payload}));

  if (data?.error) throw new Error("can't reset password");
  return {error: data?.error}
}


// update a stored image
async function updateStoredAvatar(imageName, image) {
  console.log('update');
  let formData = new FormData();
  formData.append('image',image);
  formData.append('imageName',imageName);

  const { data } = await axiosClient.post('bucket/avatar/update', formData)
  console.log('update avatar..');
  if (data?.error) throw new Error("can't replace avatar image");
  return {error: data?.error}
}

async function uploadAvatar(imageName, image) {
  console.log('upload');
  let formData = new FormData();
  formData.append('image',image);
  formData.append('imageName',imageName);

  const { data } = await axiosClient.post('bucket/avatar', formData)
  console.log('upload avatar..');
  if (data?.error) throw new Error("can't upload avatar image");
  return {error: data?.error}
}

// DELETE  STORED FILE
async function deleteStoredImage(imageName) {
  const { data } = await axiosClient.delete('/bucket/avatar/'+imageName);
  return {error: data?.error}
}
