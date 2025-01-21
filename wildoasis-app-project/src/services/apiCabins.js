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
export async function deleteCabin(toDelete) {
  const {id,imageName,cabinName} = toDelete;
  console.log(id,imageName);
  // delete the record
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

    if (error) {
      console.log(error);
      throw new Error("Oops! Something went wrong, can't fetch cabins");
      return null;
    };

    if (imageName !== null){
      //delete the image
       if (!(/^\w+\s*\(copy\)$/).test(cabinName)){
         let ar = imageName.split('/');
         deleteStoredImage(ar[ar.length-1])}
       }
    }

// function that creating a cabin with the passed object data
export async function createCabin({editting,data:newCabin,oldImage,hasImage}) {
    console.log(newCabin);
  // determin the image name and url
  let imageUrl,imageName;
  if (!hasImage) {
    if (typeof newCabin.image === 'object') {
       imageName = newCabin.image ? `${Math.random()}-${newCabin.image.name.replace('/','')}` : null;
       imageUrl = imageName ? 'https://axudhzlpgiteizotiimm.supabase.co/storage/v1/object/public/cabin-images/'+imageName : null;
     }else {
       imageUrl = newCabin.image;
       let ar = newCabin.image.split('/');
       imageName = ar[ar.length-1]
     }
  }else{imageUrl = newCabin.image}

    //submit the cabin data to the bd
    const {data:newdata, error: newdataError} = editting ? updateCabinRecord(newCabin.id, {...newCabin, image: newCabin.image && oldImage ? oldImage : imageUrl}) : createCabinRecord({...newCabin, image:imageUrl})
    if (newdataError) {
      throw new Error("can't create new cabin record data");
      return null;
    };
    console.log(newCabin.image,imageName , oldImage);
    // FORMAT THE OLD IMAGE Name
    let ar = oldImage ? oldImage.split('/') : null;
    let oldImageName = ar ? ar[ar.length-1] : imageName;

    if (imageName && imageUrl !== oldImage) {
      // upload the cabin image
      const {error: storageError} = oldImage !== null && editting ? updateStoredImage(oldImageName, newCabin.image) : uploadImage(imageName, newCabin.image);

      //Rollback the cabin data insertion if any error occures in the storing proccess
      if (storageError) {
        rollBackOperation(newdata[0].id);
        throw new Error(storageError.message);
        console.log(storageError.message);
    }
  }else if (editting && !imageName && oldImageName) {
    console.log('delryr old');
    const {error: storageError} = deleteStoredImage(oldImageName);
  } // finIf ImageName

}

//Rollback the any DB operation if any error occures in the storing proccess
async function rollBackOperation(id) {

  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

    if (error) {
      console.log(error);
      throw new Error("RollBack :: Oops! Something went wrong, can't fetch cabins");
      return null
    }
}

// create a new cabin record
async function createCabinRecord(cabin) {
  const { data, error } = await supabase
    .from('cabins')
    .insert([cabin])
    .select();

  if (error) throw new Error("can't create new cabin record");
  return {data,error}
}

// update a cabin record
async function updateCabinRecord(id,cabin) {
  const { data, error } = await supabase
    .from('cabins')
    .update(cabin)
    .eq('id', id)
    .select();

  if (error) throw new Error("can't update cabin record");
  return {data,error}
}

// upload images
async function uploadImage(imageName, image) {
  console.log('upload image');
  const { data, error } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, image);

  if (error) throw new Error("can't upload cabin image");
  return error
}

// update a stored image
async function updateStoredImage(imageName, image) {
  console.log('update image');
  const { data, error} = await supabase
    .storage
    .from('cabin-images')
    .update(imageName, image);

  if (error) throw new Error("can't replace cabin image");
  return console.error();
}

// DELETE  STORED FILE
async function deleteStoredImage(imageName) {
  const { data, error } = await supabase
  .storage
  .from('cabin-images')
  .remove([imageName])
}
