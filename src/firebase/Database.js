import { onValue,ref } from "@firebase/database";
import { databases } from "./Configuration";

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

            //   let number = 0;
       
            //   All user/author data
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
