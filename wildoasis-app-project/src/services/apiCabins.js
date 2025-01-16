import {supabase} from './supabase';

// function that fetches all cabins records from the the supabaseDB
export async function getCabins() {
  let { data, error } = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.log(error);
    throw new Error("Oops! Something went wrong, can't fetch cabins");
  }
  return data;
}

// function that deleting a cabin row that is referenced by id
export async function deleteCabin(id) {

  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

    if (error) {
      console.log(error);
      throw new Error("Oops! Something went wrong, can't fetch cabins");
    }
  }

// function that creating a cabin with the passed object data
export async function createCabin(newCabin) {

  let imageName = newCabin.image ? `${Math.random()}-${newCabin.image.name.replace('/','')}` : null;



    //submit the cabin data to the bd
    let imageUrl = imageName ? 'https://axudhzlpgiteizotiimm.supabase.co/storage/v1/object/public/cabin-images/'+imageName : null;
    const { data: newdata, error } = await supabase
      .from('cabins')
      .insert([
        {...newCabin, image:imageUrl}
      ])
      .select();
      console.log("newdata",newdata[0].id);
    if (error) {
      throw new Error("can't create new cabin record data");
      return null;
    };

    console.log("a new cabin record created Successfully");

    if (imageName) {
    // upload the cabin image
    const { data: newImage, error:storageError } = await supabase
      .storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    //Rollback the cabin data insertion if any error occures in the storing proccess
    if (storageError) {
      console.log("rolling back...", storageError);
      const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', newdata[0].id)

        if (error) {
          console.log(error);
          throw new Error("Oops! Something went wrong, can't fetch cabins");
          return null
        }
    }
  } // finIf ImageName
}
