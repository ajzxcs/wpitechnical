import { 
    setPersistence, 
    signInWithEmailAndPassword, 
    browserSessionPersistence,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import { auth } from './Configuration'


// Login 
export const LoginSession = (user) => {

    return new Promise((resolve, reject) => {

      setPersistence(auth, browserSessionPersistence)

        .then(() => {
          signInWithEmailAndPassword(auth, user.email, user.password)

            .then(() => {
                // window.location.reload();

              sessionStorage.setItem('TOKEN',"Login")   


         
              resolve("Login Successful");
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

// Logout
export const LogoutSession = async () => {
    await signOut(auth).then(()=>{
        console.log("Succesfull signout")
        sessionStorage.clear()
        window.location.reload()

    }).catch((err)=>console.log(err))
  
}

// get user credentials
export const userCredentials = () => {

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        resolve(user.uid);
      } else {
        resolve(null);
      }
    }, reject);
  });
};