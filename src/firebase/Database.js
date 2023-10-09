import { onValue,ref,set, remove , update,push,get} from "@firebase/database";
import { databases } from "./Configuration";
import { createAccountUser,LogoutSession,userCredentials } from './Authentication'
import base64 from 'base-64';


// get the number of post
export const totalForumPost = async () =>{
  const dbRef = ref(databases, `POSTS/`);
  return await new Promise((resolve, reject) => {
      onValue(dbRef, (snapshot) => {
            const data = snapshot.val();

            
            let number = 0;
            // eslint-disable-next-line array-callback-return
            data && Object.values(data)?.map((data,key) => {
                if (data?.Posts){
                  number += Object.values(data?.Posts)?.length  
                }
     
            })

            resolve(String(number))
          
      }, (error) => {
          reject(error);
      });
  });
 }

//  get the total post today
export const totalForumPost_Today = async () =>{
    const dbRef = ref(databases, `POSTS/`);

     // for date and time
     const date = new Date().toLocaleDateString();

    return await new Promise((resolve, reject) => {
        onValue(dbRef, (snapshot) => {
              const data = snapshot.val();

              let number = 0;

                //   All user/author data
              Object.values(data)?.map((author,key) => 

                // return the number of post today
                author.Posts && Object.values(author.Posts)?.filter((post,key)=>
 
                  number += post?.date[0] === date
                )


    
              )
  
              resolve(String(number))
            
        }, (error) => {
            reject(error);
        });
    });
   }

//  Get all the users including pending
export const getUsers = async () =>{
    const dbRef = ref(databases, `Users/`);


    return await new Promise((resolve, reject) => {
        onValue(dbRef, (snapshot) => {

              const data = snapshot.val();
  
              resolve(Object.values(data))
            
        }, (error) => {
            reject(error);
        });
    });
   }


// convert pending to granted workthrough
// 1. get the old key and old data
// 2. create new data with new key and and put the old data with updated 
// 3. delete old key
// NOTE: the new key can get with new created account
// NOTE: decode the password

// convert pending to granted
export const pendingToGranted = (Email, Password, Oldkey) => {

  return new Promise(async (resolve, reject) => {
    try {

      // For date and time
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();

      // Decrypt the password first
      const decryptPassword = base64.decode(Password);
  
      // Create an account and user data
      // const uid = await createAccountUser(Email, decryptPassword);
      // const newUIide = uid.uid;

      // Old and new uid
      const oldref = ref(databases, `/Users/${Oldkey}`);


      // Check if data exists at oldref
      const snapshot = await get(oldref);

      if (snapshot.exists()) {
        // Old data
        const data = snapshot.val();

        // The updated data
        const newData = {
          "Device": data.Device || "", // Use a default value or handle this case appropriately
          "Email": data.Email || "",
          "Fullname": data.Fullname || "",
          "Number": data.Number || "",
          "Organization": data.Organization || "",
          "Status": "Granted",
          "date": [date, time],
          "id": Oldkey,
        };

        // Create an account and user data
        const uid = await createAccountUser(Email, decryptPassword).then(uid=>uid);
        const newUIide = uid;

        console.log(newUIide)
        // new ref
        const newRef = ref(databases, `/Users/${newUIide}`);

        // Replace data
        try {
          await set(newRef, newData); // Assuming you want to completely replace the data

            await remove(oldref);

            alert("Approve granted");

            LogoutSession();
            window.location.reload();


        } catch (error) {
          alert("Replace new data error:", error);
        }

      }else{
        alert("walang laman")
      }

      resolve(decryptPassword)

   
    } catch (error) {
      alert(error)
      reject("Error:", error);
    }
  })

};

// create default data on Post
export const authorEmail = (author, userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const adminRef = ref(databases, `POSTS/${userID}`);
      await update(adminRef, {
        Author: author
      });
      alert("author createad")
      resolve("oki na"); // Resolve the promise if update is successful
    } catch (e) {
      alert(e);
      reject(e); // Reject the promise if there's an error
    }
  });
};

// reject user 
export const rejectUser = (pendingKey) =>{
  const pendingRef = ref(databases, `/Users/${pendingKey}`);

        // if success, delete old data
    remove(pendingRef)
    .then(() => {
        console.log("delete old data success");
   
            alert("Reject User");
            window.location.reload()
        })
        .catch((error) => alert("delete old data error: ", error));
      
}

// create admin
export const adminCreate = async(uid) =>{
  const adminRef = ref(databases, `Admin/`);

    // Push the new post to the user's "Posts" node and get the unique key
    const newPostRef = push(adminRef);

  const updates = {
    [`${newPostRef.key}`]: uid
  };
  console.log(adminRef.key)
  await update(adminRef, updates);

}

// verify admin
export const verifyAdmin = async (uid) => {
  const dbRef = ref(databases, 'Admin/');

  try {
    const snapshot = await get(dbRef);
    const data = snapshot.val();

    // Use the some function to check if any item matches the condition
    const hasMatch = Object.values(data)?.some(item => Boolean(item === uid));

    return hasMatch;


  } catch (error) {
    throw error;
  }
}

// create Tickets from ZOHO
export const importZoho = (Data,Column) =>{

  return new Promise((resolve, reject) => {
    const dbRef = ref(databases, 'TicketZOHO/');

    // for date and time
    const date = new Date().toLocaleDateString();
  
    set(dbRef, { column:Column, date: date,  data: Data })
    .then(e=>{
      alert("uploaded the ticket ")
      window.location.reload()
      resolve("uploaded the ticket")
    })
    .catch(error=>{
      alert(error)
      reject(error)
    });
  })

}

// view zoho tickets
export const viewZOHO = () =>{
  return new Promise(async (resolve, reject) => {
    try{  
      const dbRef = ref(databases, 'TicketZOHO/');
      const snapshot = await get(dbRef);

      const data = snapshot.val();

      resolve(data)
  
    }catch(error){
      reject(error)
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

// view total forum visit
export const totalForumVisit = () =>{
  return new Promise(async (resolve, reject) => {
    try{  

      const dbRef = ref(databases, `ForumVisit`);
      const snapshot = await get(dbRef);

      const data = snapshot.val();

      let val = 0;
      // eslint-disable-next-line array-callback-return
      Object.values(data)?.map((key,data)=>{
        val += key;
        console.log(key)
      } 
      )

      resolve(val)
  
    }catch(error){
      reject(error)
    }
  })
}

// view zoho from ticketing form
export const viewTickets = () =>{
  return new Promise(async (resolve, reject) => {
    try{  
      const dbRef = ref(databases, 'Tickets/');
      const snapshot = await get(dbRef);

      const data = snapshot.val();
      
      resolve(data && Object.values(data))
     
  
    }catch(error){
      reject(error)
    }
  })
}

// view tikcet total
export const pendingTickestTotal = () =>{
  return new Promise(async (resolve, reject) => {
    try{  
      const dbRef = ref(databases, 'Tickets/');
      const snapshot = await get(dbRef);

      const data = snapshot.val();
      
      const total = data && Object.values(data).filter(e=>e.status === "pending").length
      resolve(total)
     
  
    }catch(error){
      reject(error)
    }
  })
}


// pendeing to grants
export const GRANTED_FROM_PENDING = (ID,STATUS) =>{
  return new Promise(async (resolve, reject) => {
    try{
      const dbRef = ref(databases, `Tickets/${ID}/`);



      const result = await update(dbRef,  {
        status: STATUS,
      });
      resolve(result)

    }catch(erroir){
      reject(erroir)
    }
  })
}

// UPDATE DATA
export const UPDATE_DATA = (userData) =>{
  return new Promise(async (resolve, reject) => {
    try{
      const dbRef = ref(databases, `Tickets/${userData.id}/`);

      await update(dbRef,userData);

      resolve("data has updated!")

    }catch(erroir){
      reject(erroir)
    }
  })
}

// delete data
export const DELETE_TICKET_SUBMIT = (ID) =>{
  return new Promise(async (resolve, reject) => {
    try{
      const dbRef = ref(databases, `/Tickets/${ID}/`);

     // if success, delete old data
     await remove(dbRef)
     .then(() => {
        alert("data has been deleted")
        resolve("data has been deleted")
     })
     .catch((error) => console.log("delete old data error: ", error));

    }catch(erroir){
      reject(erroir)
    }
  })
}

// UPDATE SERVICES
export const updateServices = async(data) =>{
  const adminRef = ref(databases, `SERVICES/`);

  await set(adminRef, data)
  .then(()=>{
    alert("SERVICES updated!")
    window.location.reload()
  })
  .catch(error=>alert(error));

}

// VIEW SERVICES
export const viewServices = () =>{
  return new Promise(async (resolve, reject) => {
    try{  
      const dbRef = ref(databases, 'SERVICES/');
      const snapshot = await get(dbRef);

      const data = snapshot.val();
      
      resolve(data)
     
  
    }catch(error){
      reject(error)
    }
  })
}

// Update Teams
export const updateTeams = (person, data) => {
  return new Promise(async (resolve, reject) => {
    try{
      const dbRef = ref(databases, `TEAMS/${person}/`);

      await update(dbRef,data);

      resolve("data has updated!")

    }catch(erroir){
      reject(erroir)
    }
  }) 
}

// view Teams
export const viewTeams = () => {
  return new Promise(async (resolve, reject) => {
    try{  
      const dbRef = ref(databases, 'TEAMS/');
      const snapshot = await get(dbRef);

      const data = snapshot.val();

      resolve(data)
  
    }catch(error){
      reject(error)
    }
  }) 
}

// Update Forums
export const updateForums = (person, data) => {
  return new Promise(async (resolve, reject) => {
    try{
      const dbRef = ref(databases, `/FORUM/${person}/`);

      await update(dbRef,data);

      resolve("data has updated!")

    }catch(erroir){
      reject(erroir)
    }
  }) 
}

// view Forums
export const viewForums = () => {
  return new Promise(async (resolve, reject) => {
    try{  
      const dbRef = ref(databases, 'FORUM/');
      const snapshot = await get(dbRef);

      const data = snapshot.val();

      resolve(data)
  
    }catch(error){
      reject(error)
    }
  }) 
}

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

// get user email
export const getuserID = (email) => {
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

//       addComment(post.id, post.Author, commentText)

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

      const newCommentRef = push(postCommentsRef);

      // Create a new comment
      const newComment = {
        id: newCommentRef.key,
        Author: author,
        Text: text,
        date: [date, time]
      };

      // Prepare updates for the user's "Posts" node
      const updates = {
        [`${newCommentRef.key}`]: newComment
        };

      // Set the new comment data at the generated key
      await update(postCommentsRef, updates);

      resolve("Comment created successfully"); // Resolve the promise with a success message

    } catch (error) {
      console.error("Error creating comment:", error);
      reject(error); // Reject the promise with an error
    }
  });
}

// delete data
export const deletePost = (Author,ID) =>{
  return new Promise(async (resolve, reject) => {
    try{

      const AuthorID = await getuserID(Author)
  
      const dbRef = ref(databases, `POSTS/${AuthorID}/Posts/${ID}`);

          // Attempt to delete data
        try {

          onValue(dbRef,async (snapshot) => {

            if(snapshot.val()){
              
              await remove(dbRef);
              alert("Data has been deleted")
              resolve("Data has been deleted")
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

export const viewComments = (postID,Author) =>{
  return new Promise(async (resolve, reject) => {

    try {
      // Get the user's unique ID
      const user = await getuserID(Author);

      // Create a reference to the existing location where you want to add comments
      const postCommentsRef = ref(databases, `POSTS/${user}/Posts/${postID}/Comments`);

      const snapshot = await get(postCommentsRef);


      // the fetch data should convert into array function
      const data = snapshot.val();

      resolve(data); // Resolve the promise with a success message

    } catch (error) {
      console.error("Error creating comment:", error);
      reject(error); // Reject the promise with an error
    }
  })
}

// get user email
export const getCommentID = (Author,postID,email) => {
  return new Promise(async (resolve, reject) => {
    try {

      // Get the user's unique ID
      const user = await getuserID(Author);

      // Create a reference to the location where you want to search for the user's email
      const postsRef = ref(databases, `POSTS/${user}/Posts/${postID}/Comments`);

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

// delete data
export const deleteComments = (Author,ID,CommentID) =>{
  return new Promise(async (resolve, reject) => {
    try{

      const AuthorID = await getuserID(Author)

      const dbRef = ref(databases, `POSTS/${AuthorID}/Posts/${ID}/Comments/${CommentID}`);
      // const dbRef = ref(databases, `/POSTS/hUaF4KDUllTCmDbr8eeWzC5DIEv2/Posts/-NfFRD-FwknZT32lLaGE/Comments/-NfFjqVFj-e2-8X4J1Il`);

          // Attempt to delete data
        try {

                   // Attempt to delete data
        try {

          onValue(dbRef,async (snapshot) => {

            if(snapshot.val()){
              
              await remove(dbRef);
              alert("Data has been deleted")
              resolve("Data has been deleted")
            }
   
          });

        // resolve("Data has been deleted");
        } catch (error) {
          console.log("Delete old data error: " + error.message);
          reject("Delete old data error: " + error.message)
        }
     
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