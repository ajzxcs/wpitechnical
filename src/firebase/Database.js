import { onValue,ref } from "@firebase/database";
import { databases } from "./Configuration";



// get the number of post
export const returnPost = async () =>{


 

  const dbRef = ref(databases, `POSTS/`);
  return await new Promise((resolve, reject) => {
      onValue(dbRef, (snapshot) => {
          const data = snapshot.val();

     

          console.log(data)
          
      }, (error) => {
          reject(error);
      });
  });
 }