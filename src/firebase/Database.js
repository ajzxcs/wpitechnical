import { 
    ref, 
    update,
    push,
    get
} from "@firebase/database";
import { databases } from './Configuration'

// create tickets
export const createTickets = async(tickets,requestID) =>{
    const adminRef = ref(databases, `Tickets/`);
  
      // Push the new post to the user's "Posts" node and get the unique key
      const newPostRef = push(adminRef);

      const newRef = ref(databases, `Tickets/${String(newPostRef.key)}`);

      // For date and time
      const date = String(new Date().toLocaleDateString()) + " at " + String(new Date().toLocaleTimeString());

    const updates = {
        id: String(newPostRef.key),
        tickeid: requestID,
        name: tickets.name,
        address: tickets.address,
        institution: tickets.institution,
        contactNumber: tickets.contactNumber,
        brand: tickets.brand,
        model: tickets.model,
        email: tickets.email,
        serialNumber: tickets.serialNumber,
        issue: tickets.issue,
        schedule: tickets.schedule,
        status: "pending",
        designation: tickets.designation,
        typeOfRequest: tickets.typeOfRequest,
        warrantyStatus: tickets.warrantyStatus,
        dateRequested: date
    };
    // Designation,    Type of Request, Warranty Status

    await update(newRef, updates)
    .then(()=>console.log("sumbit ticketet"))
    .catch(error=>console.log(error));


  
  }

  // generateTicketNumber
export const requestTicketNumber = () => {
  return new Promise(async (resolve, reject) => {
    try{  
      const dbRef = ref(databases, 'Tickets/');
      const snapshot = await get(dbRef);

      const data = snapshot.val();
      
      // Total number of request
      const total = data && Object.values(data).length

      // get year today
      const currentYear = new Date().getFullYear();

      // last 4 digits of ID
      const tsgNumber = String(20000+total)
      const tsgIDnumber = tsgNumber.substring(tsgNumber.length - 4);

      const TSG_UNIQUE_ID = "TSG" + currentYear + tsgIDnumber

      resolve(TSG_UNIQUE_ID)
     
  
    }catch(error){
      reject(error)
    }
  })
}


  // Track ticket number
  export const TRACK_TICKET = (SerialNumber) => {
    return new Promise(async (resolve, reject) => {
      try{  
        const dbRef = ref(databases, 'Tickets/');
        const snapshot = await get(dbRef);
  
        const data = snapshot.val();
        
        const total = data && Object.values(data)
          .filter(e=>e.tickeid === SerialNumber)
          .map((result)=>{
            return {
              status: result.status,
              schedule: result.schedule,
              name: result.name
            }
          })
        resolve(total)
       
    
      }catch(error){
        reject(error)
      }
    })
  }