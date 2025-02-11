import {supabase} from './supabase';

//function that logs a user in
export async function apiLogin({email,password}) {
  let { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password
})
  if (error) {
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
