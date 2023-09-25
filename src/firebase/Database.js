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
  
    const updates = {
      [`${newPostRef.key}`]: tickets
    };

    await update(adminRef, updates)
    .then(()=>console.log("sumbit ticketet"))
    .catch(error=>console.log(error));


  
  }