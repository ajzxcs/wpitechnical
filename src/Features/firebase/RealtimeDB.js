import { onValue, ref, set, update } from 'firebase/database';
import { database } from '../firebase/Configuration'
import { userCredentials } from '../Authentication/Authentication'

// workflow
// NOTE: When admin creating a user account, it must create a default database strcuture
//  POST
//    |----- Unique ID
            //  | --------- 
            //        author: <email address>
            //        posts
            //          |------- 

// 1: get user credentials : email and Unique ID
// 2: create a function whose return the number of post
// 3: cerate a function post whose unique ID is incremented value of post 
//    with  paremeter of title,content and date and time


// get the number of post
export const returnPost = async () =>{

   const user = await userCredentials();

    const dbRef = ref(database, `POSTS/${user.uniqueID}/Posts`);
    return await new Promise((resolve, reject) => {
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();

            if (data && typeof data === 'object') {
                const numberOfTokens = Object.keys(data).length;
                resolve(numberOfTokens);
            } else {
                // Handle the case when data is null or not an object
                resolve(0); // Return 0 tokens or any default value as per your requirement
            }
        }, (error) => {
            reject(error);
        });
    });

}

// create Post
export const createPost =  (title,content) => {

    // // user get uniqueID
    // const user = await userCredentials();

    // // date and time
    // const date = new Date().toLocaleDateString()
    // const time = new Date().toLocaleTimeString()

    // // unique ID for post
    // const postID = await returnPost()

    const dbRef = ref(database, `POSTS/nl5w0JzrRUXkBj7GF8GAZIURSil1/Posts/`);

    const datastruct = {

        0:{
            
            title : "title",
            content: "content",
            date: "ASDASD"
        }

        
    }

     return set(ref(dbRef),datastruct)

}