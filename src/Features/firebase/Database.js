import { get, onValue, push, ref, remove, update } from 'firebase/database';
import { databases } from './Configuration'
import { userCredentials } from '../Authentication/Authentication'
import base64 from 'base-64';

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

// View the list of Posted question in propered array format

// delete data
export const deletePost = (ID) =>{
  return new Promise(async (resolve, reject) => {
    try{
        // Get the user's unique ID
      const user = await userCredentials();
  
      const dbRef = ref(databases, `POSTS/${user.uniqueID}/Posts/${ID}`);

          // Attempt to delete data
        try {

          onValue(dbRef,async (snapshot) => {

            if(snapshot.val()){
              
              await remove(dbRef);
              alert("Data has been deleted")
              window.location.reload()
              resolve("Data has been deleted")
            }
            else{
              alert("this is not your post you cant delete this")
              reject("this is not your post you cant delete this")
            }
          });

          // resolve("Data has been deleted");
        } catch (error) {
          console.log("Delete old data error: " + error.message);
          reject("Delete old data error: " + error.message)
        }




    }catch(erroir){
      console.log(erroir)
      reject(erroir)
    }
  })
}

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
export const createPost = (title, content, tags) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Get the user's unique ID
        const user = await userCredentials();
  
        const userPostsRef = ref(databases, `POSTS/${user.uniqueID}/Posts`);
  
        // for date and time
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        // Push the new post to the user's "Posts" node and get the unique key
        const newPostRef = push(userPostsRef);
  
        // Create a new post
        const newPost = {
          id: newPostRef.key,
          Title: title,
          Content: content,
          date: [date, time],
          tags: tags
        };
  
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

// List of posted Question 
export const viewList = async () => {
  const dbRef = ref(databases, 'POSTS/');

  try {
    const snapshot = await get(dbRef);


    // the fetch data should convert into array function
    const data = snapshot.val();

    return Object.values(data);
  } catch (error) {
    throw error;
  }
};

// get user email
const getuserID = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a reference to the location where you want to search for the user's email
      const postsRef = ref(databases, `POSTS/`);

      const snapshot = await get(postsRef);

      // The fetched data should be converted into an array or object
      const data = snapshot.val();

      if (data) {
        // Iterate through the data to find a matching email
        const userId = Object.keys(data).find((key) => data[key].Author === email);

        if (userId) {
          resolve(userId); // Resolve with the user's unique ID
        } else {
          reject("Email not found");
        }
      } else {
        reject("Data not found");
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      reject(error); // Reject the promise with an error
    }
  });
};

// add comments
export const addComment = async (postID, author, text) => {
  return new Promise(async (resolve, reject) => {

    try {
      // Get the user's unique ID
      const user = await getuserID(author);

      // Create a reference to the existing location where you want to add comments
      const postCommentsRef = ref(databases, `POSTS/${user}/Posts/${postID}/Comments`);

      // for date and time
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();

      // Create a new comment
      const newComment = {
        Author: author,
        Text: text,
        date: [date, time]
      };

      // // Push the new comment to a unique key under "Comments"
      const newCommentRef = push(postCommentsRef);

      // Set the new comment data at the generated key
      await update(newCommentRef, newComment);

      resolve("Comment created successfully"); // Resolve the promise with a success message

    } catch (error) {
      console.error("Error creating comment:", error);
      reject(error); // Reject the promise with an error
    }
  });
}

// workflow for signup user
// * verify if the user is aleady sign up
// * add validation before enterinfg
// * encrypt the password in base64

// verify emails first before signup
export const verifyWEmails = (emails) =>{
  return new Promise(async (resolve, reject) => {
    const dbRef = ref(databases, 'Users/');

    try {
      const snapshot = await get(dbRef);
  
      // the fetch data should convert into array function
      const data = snapshot.val();

      console.log(data)
      if (data) {

      Object.entries(data)?.forEach(([key, value]) => {

        if (value.Email === emails){

          resolve(true)
        }

        resolve(false)

      })

              
    }

    resolve(false)
    } catch (error) {
      // throw error;
      console.log(error)
      reject(false);
    }
  })  
}

// Pending Sign Up
export const addpendingSignup = async (Fullname,Org,Email,Number,Password,os,browser) =>{
  return new Promise(async (resolve, reject) => {
    try {

      const userCommentsRef = ref(databases, `Users`);

      // for date and time
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
      
      // Push the new comment to the user's "Posts" node and get the unique key
      const newSignup = push(userCommentsRef);  

      // convert into base64
      const passwordEncrypted = base64.encode(Password);

      // new sign up
      const signup = {
        id: newSignup.key,
        date: [date,time],
        Fullname: Fullname,
        Organization: Org,
        Number: Number,
        Email: Email,
        Password: passwordEncrypted,
        Device: os + ","+ browser,
        Status: "Pending"
      };
      
      // Prepare updates for the user's "Pending" node
      const updates = {
        [`${newSignup.key}`]: signup
      };
      
      // verify emails first
      verifyWEmails(Email).then(
        async result=>{
          if (!result){
            
          // Update the user's "Posts" node with the new post data
            await update(userCommentsRef, updates);

            resolve("Sign up success , and now pending for approval ");
          }

          resolve("email is exists");
        }
      )



    }catch(error){
      console.error("Error requesting for an account:", error);
      reject(error); // Reject the promise with an error
    }
  })
}

// get forum visit 
export const forumVisitToday = () =>{
  return new Promise(async (resolve, reject) => {
    try{  

      // for date and time
      const date = new Date().toLocaleDateString();
      const dateFormated = date.replaceAll("/","-")

      const dbRef = ref(databases, `/ForumVisit/${dateFormated}`);
      const snapshot = await get(dbRef);

      const data = snapshot.val();

      data ?  resolve(data) :  resolve(0)

    }catch(error){
      reject(error)
    }
  })
}

// UPDATE FORUM TODAY
export const update_ForumVisitToday = () => {
  return new Promise(async (resolve, reject) => {
    try{

      // for date and time
      const date = new Date().toLocaleDateString();
      const dateFormated = date.replaceAll("/","-")

      const dbRef = ref(databases, `/ForumVisit/`);

      const todayVisit = await forumVisitToday()
      const data = 1 + parseInt(todayVisit)

        // Prepare updates for the user's "Posts" node
      const updates = {
        [`${dateFormated}`]: data
      };

      await update(dbRef, updates);


      console.log("Today Visit", todayVisit)

    }catch(error){

    }
  })
}

// UPDATE services TODAY
export const viewSERVICES = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a reference to the location where you want to search for the user's email
      const postsRef = ref(databases, `SERVICES/`);

      const snapshot = await get(postsRef);

      const data = snapshot.val()
  
      resolve(data)

    } catch (error) {
      console.error("Error fetching user ID:", error);
      reject(error); // Reject the promise with an error
    }
  });
};


export const viewForum= () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a reference to the location where you want to search for the user's email
      const postsRef = ref(databases, `FORUM/`);

      const snapshot = await get(postsRef);

      const data = snapshot.val()
  
      resolve(data)

    } catch (error) {
      console.error("Error fetching user ID:", error);
      reject(error); // Reject the promise with an error
    }
  });
};

export const viewTeams= () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a reference to the location where you want to search for the user's email
      const postsRef = ref(databases, `TEAMS/`);

      const snapshot = await get(postsRef);

      const data = snapshot.val()
  
      resolve(data)

    } catch (error) {
      console.error("Error fetching user ID:", error);
      reject(error); // Reject the promise with an error
    }
  });
};