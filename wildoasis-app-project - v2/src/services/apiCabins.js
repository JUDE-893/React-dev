import axiosClient from './axiosClient';
import {supabase} from './supabase';

// function that fetches all cabins records from the the supabaseDB
export async function getCabins() {
  let { data } = await axiosClient.get('/cabins');
  console.log(data);
  if (!data.success) {
    console.log(data?.error);
    throw new Error("Oops! Something went wrong, can't fetch cabins");
  }
  return data.cabins;
}

// function that deleting a cabin row that is referenced by id
export async function deleteCabin(toDelete) {
  const {id,imageName,cabinName} = toDelete;
  // delete the record
  const  error  = await rollBackOperation(id);


    if (error) {
      console.log(error);
      throw new Error("Oops! Something went wrong, can't delete cabins");
      return null;
    };

    if (imageName !== null){
      //delete the image
       if (!(/^\w+\s*\(copy\)$/).test(cabinName)){
         deleteStoredImage(imageName);}
       }
    }

// function that creating a cabin with the passed object data
export async function createCabin({editting,data:newCabin,oldImage,hasImage}) {
  // determin the image name and url
  let imageName;

  if (typeof newCabin.image === 'object') {
     imageName = newCabin.image ? `${Math.random()}-${newCabin.image.name.replace('/','')}` : null;
   }else {
     imageName = newCabin.image;
   }


    //submit the cabin data to the bd
    const {data:newdata, error: newdataError} = editting ? await updateCabinRecord(newCabin.id, {...newCabin, image: newCabin.image && oldImage ? oldImage : imageName}) : await createCabinRecord({...newCabin, image:imageName})
    if (newdataError) {
      throw new Error("can't create new cabin record data");
      return null;
    };

    // FORMAT THE OLD IMAGE Name
    // ..was here

    // IMAGE STORAGE
    if (imageName && imageName !== oldImage && typeof newCabin.image === 'object') {
      // upload the cabin image
      console.log(newCabin.image,imageName);
      const storageError = oldImage !== null && editting ? await updateStoredImage(oldImage, newCabin.image) : await uploadImage(imageName, newCabin.image);

      //Rollback the cabin data insertion if any error occures in the storing proccess
      if (storageError) {
        // rollBackOperation(newdata[0].id);
        console.log(storageError);
        throw new Error(storageError.message);
        console.log(storageError.message);
    }
  }else if (editting && !imageName && oldImage) {
    const {error: storageError} = await deleteStoredImage(oldImage);
  } // finIf ImageName

}

//Rollback the any DB operation if any error occures in the storing proccess
async function rollBackOperation(id) {

  const { data } = await axiosClient.delete('/cabins/'+id);

    if (!data?.success) {
      console.log('errrrrrrrrrrr',data?.error);
      throw new Error("RollBack :: Oops! Something went wrong, can't fetch cabins");
      return data?.error;
    };
    return null;
}

// create a new cabin record
async function createCabinRecord(cabin) {
  const { data } = await axiosClient.post('/cabins', cabin)
  console.log(data);
  if (!data?.success) throw new Error("can't create new cabin record");
  return {data:data?.cabin,error:data?.error};

}

// update a cabin record
async function updateCabinRecord(id,cabin) {
  const { data } = await new axiosClient.put('/cabins/'+id, cabin)

  if (!data?.success) throw new Error("can't update cabin record");
  return {data:data?.cabin,error:data?.error};
}

// upload images
async function uploadImage(imageName, image) {

  let formData = new FormData();
  formData.append('image',image);
  formData.append('imageName',imageName);

  const { data } = await axiosClient.post('/bucket/cabins', formData);

  if (!data?.success) throw new Error("can't upload cabin image");
  return data?.error;
}

// update a stored image
async function updateStoredImage(imageName, image) {

  let formData = new FormData();
  formData.append('imageName',imageName);
  formData.append('image',image);
  const { data } = await axiosClient.post('/bucket/cabins/update', formData);

  if (!data?.success) throw new Error("can't replace cabin image");
  return data?.error;
}

// DELETE  STORED FILE
async function deleteStoredImage(imageName) {
  const { data } = await axiosClient.delete('/bucket/cabins/'+imageName);
  console.log("after delete image",data);
  return data?.success;
}
