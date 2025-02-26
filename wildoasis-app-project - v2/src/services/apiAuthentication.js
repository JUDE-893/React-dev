import {supabase} from './supabase';

//function that logs a user in
export async function apiLogin({email,password}) {
  let { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password
})
  if (!data?.user?.email_confirmed_at) {
    console.log("Please confirm your email before logging in.");
  }
  else if (error) {
    throw new Error(error);
    console.log('error while login',error);
  }

  console.log(data);
  return data;
}

// function that get the current loged-in user
export async function getCurrentUser() {
  const {data:session} = await supabase.auth.getSession();

  if (!session.session) {
    return null
  }

  const {data,error} = await supabase.auth.getUser();

  if (error) throw new Error(error);

  return data?.user
}

//function that logs a user in
export async function apiLogout() {

  let { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error);
    console.log('error while logout',error);
    return null;
  }

  return true;
}

// function that allow to create a user and SignUp
export async function apiSignUp({email,password,full_name}) {

  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data:{
        full_name: full_name,
        avatar: ""
      }
    }
  })

  if (error) {
    throw new Error(error.message);
    return null;
  }

  return data;
}

// function that allow to update a user data
export async function apiUpdateUser({password, avatar, full_name,userAvatar}) {

  //1 get the data obj
  let payload;
  if (password) payload = {password}
  else if (full_name) payload = {data: {full_name:full_name}};

  //2 upload the data
  const {data,error} = await supabase.auth.updateUser(payload);
  console.log('data0', data);
  if (error) {
    throw new Error(error.message);
    return null;
  }
  if(password) return data;

  //3 determin the image url
  if (!Boolean(userAvatar)) {
     let imageName = avatar ? `avatar-${data.user.id}${Math.random()}` : null;
     let imageUrl = imageName ? 'https://axudhzlpgiteizotiimm.supabase.co/storage/v1/object/public/avatars/'+imageName : null;
     payload= {imageName:imageName,imageUrl:imageUrl}
   }else {
     console.log(typeof avatar,avatar);
     let imageUrl = avatar;
     let ar = userAvatar.split('/');
     let imageName = ar[ar.length-1]
     payload= {imageName:imageName,imageUrl:imageUrl}
   }

   //4 upload image
    if (avatar && payload.imageName) {
      console.log(Boolean(userAvatar));
      const {error: storageError} = await (Boolean(userAvatar) ? updateStoredAvatar(payload.imageName, avatar) : uploadAvatar(payload.imageName, avatar));

      if (storageError) {
        throw new Error(storageError.message);
        return null;
      }
      //5 upload the avatar url
      if (!Boolean(userAvatar)) {
        let imageName = payload.imageName;
        payload = {data: {avatar: payload.imageUrl}};
        const {data:finalData,error:updateAvatarError} = await supabase.auth.updateUser(payload);

        if (updateAvatarError) {
          await deleteStoredImage(imageName);
          throw new Error(updateAvatarError.message);
          return null;
        }
        return finalData;
    } //end5
  }//end4

    console.log('not uploaded image', data);
    return data
}


// update a stored image
async function updateStoredAvatar(imageName, image) {
  const { data, error} = await supabase
    .storage
    .from('avatars')
    .update(imageName, image);
      console.log('update img..');
  if (error) throw new Error("can't replace avatar image");
  return {error}
}

async function uploadAvatar(imageName, image) {
  const { data, error } = await supabase
    .storage
    .from('avatars')
    .upload(imageName, image);
    console.log('upload new img..');

  if (error) throw new Error("can't upload avatar image");
  return {error};
}

// DELETE  STORED FILE
async function deleteStoredImage(imageName) {
  const { data, error } = await supabase
  .storage
  .from('cabin-images')
  .remove([imageName])
}
