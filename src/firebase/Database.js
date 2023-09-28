import { onValue,ref,set, remove , update,push,get} from "@firebase/database";
import { databases } from "./Configuration";
import { createAccountUser,LogoutSession } from './Authentication'
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

//    Get all the users including pending
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
      // Decrypt the password first
      const decryptPassword = base64.decode(Password);
  
      // Create an account and user data
      // const uid = await createAccountUser(Email, decryptPassword);
      // const newUIide = uid.uid;

      resolve(decryptPassword)
  
  
  
  
   
    } catch (error) {
      reject("Error:", error);
    }
  })

};

export const pendingToGrantedss = async (Email, Password, Oldkey) => {
  try {
    // Decrypt the password first
    const decryptPassword = base64.decode(Password);

    // Create an account and user data
    const uid = await createAccountUser(Email, decryptPassword);
    const newUIide = uid.uid;

    // Old and new uid
    const oldref = ref(databases, `/Users/${Oldkey}`);
    const newRef = ref(databases, `/Users/${newUIide}`);


    // Author email
    try {
      await authorEmail(Email, newUIide);
      alert("gumagana ang author email");
    } catch (error) {
      alert("hindi nagana");
      console.error("Error in authorEmail:", error);
    }


    // For date and time
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

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

      // Replace data
      try {
        await set(newRef, newData); // Assuming you want to completely replace the data
        console.log("Data replaced successfully");
      } catch (error) {
        console.error("Replace new data error:", error);
      }
    } else {
      console.log("Data does not exist at oldref");
    }

    // If success, delete old data
    try {
      await remove(oldref);
      console.log("Delete old data success");
      alert("Approve granted");
      LogoutSession();
      window.location.reload();
    } catch (error) {
      console.error("Delete old data error:", error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  
// create default data on Post
export const authorEmail = (author, userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const adminRef = ref(databases, `POSTS/${userID}`);
      await update(adminRef, {
        Author: author
      });
      resolve("oki na"); // Resolve the promise if update is successful
    } catch (e) {
      alert(e);
      reject(e); // Reject the promise if there's an error
    }
  });
};


const replaceNewData = (newRef,newData) =>{
    return new Promise(async (resolve, reject) => {
       // replace the new data
        await set(newRef,newData).then(res=>{
            console.log("replace Data sucess: ",res)
            resolve(res) 
        })
        .catch(err=>{
            console.log("replace Data error: ",err)
            reject(err)
        })
    })
}

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

// view zoho tickets
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

// pendeing to grants
export const GRANTED_FROM_PENDING = (ID) =>{
  return new Promise(async (resolve, reject) => {
    try{
      const dbRef = ref(databases, `/Tickets/${ID}/`);

      const result = await update(dbRef,  {
        status: "granted",
      });
      resolve(result)

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
     })
     .catch((error) => console.log("delete old data error: ", error));

    }catch(erroir){
      reject(erroir)
    }
  })
}