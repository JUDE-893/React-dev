import {supabase} from "./supabase";
import axiosClient from './axiosClient';

export async function getSettings() {

  const { data } = await axiosClient.get('/settings');

  if (!data?.success) {
    throw new Error("Settings could not be loaded");
  }
  return data?.settings[0];
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data } = await axiosClient.put('/settings/1',newSetting)

  if (!data?.success) {
    console.log("error::",data?.error);
    throw new Error("Settings could not be updated");
  }
   return data;
}
