
import React, { useState, useEffect } from "react";
import Header from '../components/componentsPV/Headerpv';


import { LogoutSession,userCredentials } from '../Features/Authentication/Authentication'
import { viewList,createPost,addComments } from '../Features/firebase/Database'

import "../App.css";



function Public() {

  // data from firebase
  const [showDats,setShowDats] = useState([])

  useEffect(() => {

    let isMounted = true; // Flag to track whether the component is mounted


    // update the data from firebase
    const fetchData = async () => {
      try {
        const postsData = await viewList();
   
        setShowDats(postsData);
      } catch (error) {
        // Handle the error
        console.log(error)
      }
    }

    // Check if the component is still mounted before updating the state
    if (isMounted) {
      fetchData();
    }


    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  });



  return (

    <div className="public"style={{ display: 'flex', flexDirection: 'column', marginTop: "20px", justifyContent: 'center', alignItems: 'center' }} >
      <Header />
      <ImageBanner />

    
        <h1>PRIVATE FORUM</h1> 

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>


        <div style={{ padding: '5px' }}> 
        <button onClick={(event)=>
        {
          event.preventDefault();
          LogoutSession();
        }
        }>LOG OUT</button>
        </div>

<div style={{ padding: '5px' }}> 
      <button onClick={(event)=>
      {
        event.preventDefault();
        userCredentials()
        .then(e=>alert("User uniqueID: " + String(e.uniqueID) ))
        .catch(e=>console.log(e))           
        // console.log(userCredentials())                                                                            
      }
      }>Click me</button>
      </div>

{/* add post button */}
      <div style={{ padding: '5px' }}> 
        <button onClick={
        event=>{
          event.preventDefault();
          // parameters data: Title, Content, Tags
          createPost("no changes", "this is my second post", "A,B,C")
            .then(e=>alert(e))
            .catch(e=>alert(e))}
        }>
        add post
        </button>
      </div>
    </div>


   {/* Iterate of user posts */}
      {showDats?.map((item, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
         
          {/* Iterate through the each Posts of user */}
          {item.Posts && Object.values(item.Posts)?.map((post, postIndex) => (

            <div key={postIndex}>

              <h3>Title: {post.Title}</h3>

              <p>Author: {item.author}</p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>   

                <div style={{padding: "5px"}}> 
                  <p>Date: {post.date[0]} </p>
                </div>

              <div style={{padding: "5px"}}> 
                <p>Time: {post.date[1]}</p> 

                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                <p><strong>TAGS: </strong></p>
                <p>{post.tags}</p>
              </div>

              <p><strong>Content:</strong> {post.Content}</p>

              <p>Likes: {post.likes}</p>
              <p>Dislikes: {post.dislikes}</p>

              {/* Render other properties as needed */}
              <h4>Comments:</h4>

           
              <button key={postIndex} onClick={e=>{
                e.preventDefault();
                // const post = item.Posts[postId]; // Get the post data
                addComments(post.id,item.author, "WOW THAT IS AWESOME")
                console.log(String(post.id),String(item.author),"WOW that is awwesome")
              }}>add comments</button>

              {/* Iterate of all Post List */}
              {post.Comments && Object.values(post.Comments)?.map((comment,index)=>(
                <div key={index}>
                  <h3>{comment.Text}</h3>
                  <p><strong>{comment.Author}</strong></p>
                  <p>Date: {comment.date[0]} </p>
                  <p>Time: {comment.date[1]} </p>

                </div>
          
              ))}
              <hr/>
             
            </div>

         

          ))}


        </div>
      ))}

    </div>
  );
}

function ImageBanner() {
  return (
    <div className="image-container">
      <image
        className="cover-image"
        src="/Healthcare-1.jpg"
        // alt="Healthcare Image"
      />
    </div>
  );
}

export default Public;

