import { 
    ref, 
    update,
    push
} from "@firebase/database";
import { databases } from './Configuration'

// create tickets
export const createTickets = async(tickets) =>{
    const adminRef = ref(databases, `Tickets/`);
  
      // Push the new post to the user's "Posts" node and get the unique key
      const newPostRef = push(adminRef);

      const newRef = ref(databases, `Tickets/${String(newPostRef.key)}`);

    const updates = {
        id: String(newPostRef.key),
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
        status: "pending"
    };

    await update(newRef, updates)
    .then(()=>console.log("sumbit ticketet"))
    .catch(error=>console.log(error));


  
  }