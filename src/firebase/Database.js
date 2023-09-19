import { get, onValue } from "@firebase/database";
import { databases } from "./Configuration";
import { ref } from "@firebase/storage";


// get the number of post
export const returnPost = async () =>{



    const dbRef = ref(databases, 'POSTS/nl5w0JzrRUXkBj7GF8GAZIURSil1');

    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
      });
 
 }