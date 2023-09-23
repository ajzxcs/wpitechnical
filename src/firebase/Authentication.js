import { 
  browserSessionPersistence, 
  createUserWithEmailAndPassword, 
  setPersistence, 
  signInWithEmailAndPassword, 
  signOut } from "firebase/auth";
import { auth } from "./Configuration"

import { verifyAdmin } from "./Database"

 // create account
 export const createAccount = (email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          resolve({
            uid: res.user.uid,
            result: true
        }); // Resolve the promise with the response from createUserWithEmailAndPassword
        })
        .catch((error) => {
          console.log(error);

          console.log(error);
          const errorMessage = error.message.match(/\((.*?)\)/)[1];
          const errorMessages = errorMessage.replace('auth/', '').replace(/-/g, ' ');

          console.log(errorMessages)

          reject(
            {
                uid: errorMessages,
                result: false
            }
        ); // Reject the promise with the error from createUserWithEmailAndPassword
        });
    });
  };

  // Logout
  export const LogoutSession = async () => {
    await signOut(auth).then(()=>{
        console.log("Succesfull signout")
        sessionStorage.clear();
        window.location.reload();

    }).catch((err)=>console.log(err))
  
}

// Login 
export const LoginSession = (user) => {
  
  return new Promise((resolve, reject) => {

    setPersistence(auth, browserSessionPersistence)

      .then(() => {
        signInWithEmailAndPassword(auth, user.Email, user.Password)

          .then((userCredential) => {
            
            verifyAdmin(Object.values(userCredential)[0].uid)
            .then(result =>{
                if (result) {
                  sessionStorage.setItem('TOKEN',"Login")   
                  resolve(result);
                }else{
                  sessionStorage.clear()
                  resolve(result);
                }
              }
            )
    
              // window.location.reload();

          //     



          })
          .catch((error) => {
            console.log(error);
            const errorMessage = error.message.match(/\((.*?)\)/)[1];
            const errorMessages = errorMessage.replace('auth/', '').replace(/-/g, ' ');

            reject(errorMessages);
          });
      })
      .catch((error) => {
        console.log(error);
        reject("An error occurred during login.");
      });
  });
};