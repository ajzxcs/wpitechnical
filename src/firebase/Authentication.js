import { 
  browserSessionPersistence,
  createUserWithEmailAndPassword, 
  setPersistence, 
  signInWithEmailAndPassword, 
  signOut, 
  updateEmail, 
  updateProfile
} from "firebase/auth";
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

// get user details
export const getUserDetails = () => {
  const user = auth.currentUser;
  return new Promise((resolve, reject) => {
  
    const userDetails = {
      email : user.email,
      name : user.displayName
    } 

    resolve(userDetails)
 


  });
};

// update user details
export const updateUserDetails = (Name,Email) =>{
  updateProfile(auth.currentUser, { displayName: Name })
  .then(() => { console.log("updated") })
  .catch((error) => 
  { console.log(error)
    alert("We cooul not update name")
  });

  updateEmail(auth.currentUser, Email).then(() => {
    alert("User details is updated!")
  }).catch((error) => {
    alert(error)
  });
}


// update passwords
// 1. reauthenticate first
// 2. update password

export const updatePassword = (oldPassword,newPassword) => {

  LoginSession({
    Email: auth.currentUser.email,
    Password: oldPassword
  }).then(e=>{
    if(e){
      updatePassword(auth.currentUser, newPassword).then(() => {
        alert("Password Updated please login again")
        LogoutSession()
      }).catch((error) => {
        // An error ocurred
        // ...

        alert(error)
      });
    }else{
      alert("Please enter your old password correctly")
    }
  }

  )



}