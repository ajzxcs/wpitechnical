import { onValue,ref,set, remove } from "@firebase/database";
import { databases } from "./Configuration";
import { createAccount,LogoutSession } from './Authentication'

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
export const pendingToGranted = async (Email,Password,Oldkey) =>{

    // create and account and user data
   const uid = await createAccount(Email, Password).then(e=>console.log("Create account: ",e))

    // old and new uid
    const oldref = ref(databases, `/Users/${Oldkey}`);
    const newRef = ref(databases, `/Users/${uid}`);

    // for date and time
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    onValue(oldref,(snapshot)=>{

        // Old data
        const data = snapshot.val();

        // the updated data
        const newData = {
            "Device": data.Device,
            "Email": data.Email,
            "Fullname": data.Fullname,
            "Number": data.Number,
            "Organization": data.Organization,
            "Status": "Granted",
            "date": [date,time],
            "id": uid
        }

        // replace the new data
        set(newRef,newData).then(res=>{
            console.log("replace Data: ",res)

            // if sucess delete old data
            remove(oldref)
            .then(res=>{
                console.log("delete old data: ",res)
                LogoutSession();
            })
            .catch(Error=>console.log("delete old data: ",Error))

        }).catch(err=>console.log("replace Data: ",err))


    })
}
