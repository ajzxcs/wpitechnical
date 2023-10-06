import { 
  EmailAuthProvider,
  reauthenticateWithCredential, 
  browserSessionPersistence,
  createUserWithEmailAndPassword, 
  setPersistence, 
  signInWithEmailAndPassword, 
  signOut, 
  updateEmail, 
  updatePassword, 
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./Configuration"
import { verifyAdmin,adminCreate, authorEmail } from "./Database"



 // create account
 export const createAccount = (Name, email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {

          updateProfile(auth.currentUser, { displayName: Name })
          .then(() => { 

            // authorEmail(email,res.user.uid)
            alert("account created! please login again") 
            
            adminCreate(res.user.uid).then(
              ()=>{
                LogoutSession()
                window.location.reload()
              }
            )

          resolve({
            uid: res.user.uid,
            result: true
        }); // Resolve the promise with the response from createUserWithEmailAndPassword

          })
          .catch((error) => 
          { alert(error)
            reject(error)
          });



        })
        .catch((error) => {
          console.log(error);

          console.log(error);
          const errorMessage = error.message.match(/\((.*?)\)/)[1];
          const errorMessages = errorMessage.replace('auth/', '').replace(/-/g, ' ');

          console.log(errorMessages)

          alert(errorMessages)

          reject(
            {
                uid: errorMessages,
                result: false
            }
        ); // Reject the promise with the error from createUserWithEmailAndPassword
        });
    });
  };

   // create account
 export const createAccountUser = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {


        authorEmail(email,res.user.uid).then(()=>resolve(res.user.uid))





      })
      .catch((error) => {
        console.log(error);

        console.log(error);
        const errorMessage = error.message.match(/\((.*?)\)/)[1];
        const errorMessages = errorMessage.replace('auth/', '').replace(/-/g, ' ');

        console.log(errorMessages)

        alert(errorMessages)

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

    alert("Please login again")
    LogoutSession()

  }).catch((error) => {
    alert(error)
  });


}


// update passwords
// 1. reauthenticate first
// 2. update password

export const updatePasswords = async (oldPassword,newPassword) => {


  return new Promise((resolve, reject) => {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);

    reauthenticateWithCredential(auth.currentUser, credential)
      .then((e) => {

        updatePassword(auth.currentUser, newPassword).then(() => {
          // Update successful.\

          alert("Password updated please login again!")
          LogoutSession()


          resolve("password updated!")
        }).catch((error) => {
          // An error ocurred
          // ...

          reject(error)
        });
  
      })
      .catch((error) => {
        alert(error)

        reject({
          oldPassword: true,
          oldPasswordMessage: "Invalid password",
          newPassword: true,
          newPasswordMessage: ""
        });
      });
  });
}

// get user credentials
export const userCredentials = () => {

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        resolve({
          uniqueID: user.uid,
          email: user.email
        });
      } else {
        resolve(null);
      }
    }, reject);
  });
};