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
export async function apiLogout({email,password}) {

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
