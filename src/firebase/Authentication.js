import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./Configuration"


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

    }).catch((err)=>console.log(err))
  
}