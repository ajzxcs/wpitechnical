import { onValue,ref,set, remove } from "@firebase/database";
import { databases } from "./Configuration";
import { createAccount,LogoutSession } from './Authentication'
import base64 from 'base-64';

// get the number of post
export const totalForumPost = async () =>{
  const dbRef = ref(databases, `POSTS/`);
  return await new Promise((resolve, reject) => {
      onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            
            let number = 0;
            // eslint-disable-next-line array-callback-return
            Object.values(data).map((data,key) => {
                number += Object.values(data.Posts).length       
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

                //   All user/author data
              // eslint-disable-next-line array-callback-return
              Object.values(data)?.map((author,key) => {

                // return the number of post today
                const todayPost = Object.values(author.Posts)?.filter((post,key)=>{
                    return post.date[0] === date
                }).length


                resolve(todayPost)
              })
  
              resolve(0)
            
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
export const pendingToGranted = async (Email, Password, Oldkey) => {
    try {
      // decrypt the password first
      const decryptPassword = base64.decode(Password);
  
      // create an account and user data
      const uid = await createAccount(Email, decryptPassword);
  
      // old and new uid
      const oldref = ref(databases, `/Users/${Oldkey}`);
      const newRef = ref(databases, `/Users/${uid.uid}`);
  
      // for date and time
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
  
      onValue(oldref, (snapshot) => {
        if (snapshot.exists()) { // Check if data exists
          // Old data
          const data = snapshot.val();
  
          // the updated data
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
          
        //   replace data
          replaceNewData(newRef, newData)
            .then(() => {

            console.log("data repalce")

            })
            .catch((error) => {
                console.log("replace new data error: ", error);
                return 
            });
        } else {
          console.log("Data does not exist at oldref");
        }
      });

        // if success, delete old data
        remove(oldref)
        .then(() => {
            console.log("delete old data success");
            LogoutSession();
            alert("Approve granted");
            window.location.reload()
        })
        .catch((error) => console.log("delete old data error: ", error));
      
    } catch (error) {
      console.log(error);
      return 
    }
  };
  
const replaceNewData = (newRef,newData) =>{
    return new Promise((resolve, reject) => {
       // replace the new data
        set(newRef,newData).then(res=>{
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