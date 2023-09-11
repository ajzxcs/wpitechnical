import { onValue, push, ref, set, update } from 'firebase/database';
import { databases } from './Configuration'
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

    const dbRef = ref(databases, `POSTS/${user.uniqueID}/Posts`);
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
export const createPost = (title, content) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Get the user's unique ID
        const user = await userCredentials();
  
        const userPostsRef = ref(databases, `POSTS/${user.uniqueID}/Posts`);
  
        // for date and time
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
  
        // Create a new post
        const newPost = {
          Title: title,
          Content: content,
          date: [date, time]
        };
  
        // Push the new post to the user's "Posts" node and get the unique key
        const newPostRef = push(userPostsRef);
  
        // Prepare updates for the user's "Posts" node
        const updates = {
          [`${newPostRef.key}`]: newPost
        };
  
        // Update the user's "Posts" node with the new post data
        await update(userPostsRef, updates);
  
        resolve("Post created successfully"); // Resolve the promise with a success message
      } catch (error) {
        console.error("Error creating post:", error);
        reject(error); // Reject the promise with an error
      }
    });
  };


