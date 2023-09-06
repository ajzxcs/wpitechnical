import { getDownloadURL, getStorage, listAll, ref, uploadBytes, deleteObject } from "@firebase/storage";
import { app } from './Configuration'

const storage = getStorage(app);

// Upload image
export async function imageUpload(file, Name){

    const imag = ref(storage,`Images/${Name}`)
    return await uploadBytes(imag,file)
    .then(()=> 
    {
       return getDownloadURL(imag)
        // console.log()
        
    })
  
}

// get all images
export const getAllImages = async () => {
  try {
    const imagesRef = ref(storage, 'Images');
    const imageList = await listAll(imagesRef);

    const imagesWithNames = await Promise.all(
      imageList.items.map(async (imageRef) => {
        const url = await getDownloadURL(imageRef);
        const name = imageRef.name;
        return { url, name };
      })
    );

    return imagesWithNames;
  } catch (error) {
    console.error('Error fetching image URLs with names:', error);
    return [];
  }
  };

  // delete specific images
export const deleteFileByName = async (fileNameToDelete) => {

  // List all files in the storage bucket
  const listRef = ref(storage, 'Images'); // Assuming your files are located in 'images' folder
  try {
    const result = await listAll(listRef);

    // Iterate through the list of files
    await Promise.all(
      result.items.map(async (itemRef) => {
        // Check if the file's name matches the one you want to delete
        if (itemRef.name.startsWith(fileNameToDelete)) {
          // Delete the file
          try {
            await deleteObject(itemRef);
            alert(`File ${itemRef.name} deleted successfully.`)
            console.log(`File ${itemRef.name} deleted successfully.`);
            window.location.reload();
          } catch (error) {
            console.error(`Error deleting file ${itemRef.name}:`, error);
            alert(`Error deleting file ${itemRef.name}:`, error);
            window.location.reload();
          }
        }
      })
    );
  } catch (error) {
    console.error('Error listing files:', error);
  }
};


// set to archives
export const archiveImage = (fileName) => {
  const oldRef = storage.ref().child('images/' + fileName);
  const newRef = storage.ref().child('archive/' + fileName);

  oldRef.move(newRef).then(() => {
    console.log('Image archived!');
  });
};
