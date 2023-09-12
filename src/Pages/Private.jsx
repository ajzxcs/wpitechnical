/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Header from '../components/componentsPV/Headerpv';
// import Sidebar from "../components/componentsPV/Sidebarpv";
// import PostList from "../components/componentsPV/PostListpv";
// import PostDetail from "../components/componentsPV/PostDetailpv";
// import SearchBar from "../components/componentsPV/SearchBarpv";
// import AskQ from "../components/componentsPV/AskQpv";
// import PostForm from "../components/componentsPV/PostFormpv";
// import samplePosts from "../data/Sample.json";

import { LogoutSession,userCredentials } from '../Features/Authentication/Authentication'
import { viewList,createPost,addComments } from '../Features/firebase/Database'

import "../App.css";



function Public() {
  // const [posts, setPosts] = useState([]);
  // const [selectedPost, setSelectedPost] = useState(null);
  // const [commentCounts, setCommentCounts] = useState({});
  // const [sortingOrder, setSortingOrder] = useState("newest");



  // let sortedPosts = [...posts];

  // const handleSelectPost = (postId) => {
  //   const selected = posts.find((post) => post.id === postId);
  //   setSelectedPost(selected);
  //   console.log(sortingOrder)
  // };

  // const handleGoBack = () => {
  //   setSelectedPost(null);
  // };

  // const handleAddComment = (postId, comment) => {
  //   const updatedPosts = posts.map((post) => {
  //     if (post.id === postId) {
  //       const updatedComments = [...post.comments, comment];
  //       return {
  //         ...post,
  //         commentCount: updatedComments.length,
  //         comments: updatedComments
  //       };
  //     }
  //     return post;
  //   });

  //   localStorage.setItem("posts", JSON.stringify(updatedPosts));
  //   setPosts(updatedPosts);

  //   const updatedCommentCounts = updatedPosts.reduce((acc, post) => {
  //     acc[post.id] = post.commentCount;
  //     return acc;
  //   }, {});

  //   localStorage.setItem("commentCounts", JSON.stringify(updatedCommentCounts));
  //   setCommentCounts(updatedCommentCounts);
  // };

  // useEffect(() => {
  //   const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
  //   setPosts([...samplePosts, ...storedPosts]);

  //   const storedCommentCounts = JSON.parse(
  //     localStorage.getItem("commentCounts") || "{}"
  //   );
  //   setCommentCounts(storedCommentCounts);

  //   dataFetch();
  // }, []);

  useEffect(() => {

    let isMounted = true; // Flag to track whether the component is mounted


    async function fetchData() {
      try {
        const postsData = await viewList();

        setShowDats(postsData);
      } catch (error) {
        // Handle the error
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



  // const handleSearch = (searchQuery) => {
  //   const filteredPosts = posts.filter(
  //     (post) =>
  //       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       post.content.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setPosts(filteredPosts);
  // };

  // const handleDeletePost = (postId) => {
  //   const updatedPosts = posts.filter((post) => post.id !== postId);
  //   localStorage.setItem("posts", JSON.stringify(updatedPosts));
  //   setPosts(updatedPosts);
  //   setSelectedPost(null);
  // };

  // const handleAddPost = (newPost) => {
  //   const updatedPosts = [
  //     ...posts,
  //     { ...newPost, commentCount: 0, comments: [] }
  //   ];

  //   localStorage.setItem("posts", JSON.stringify(updatedPosts));
  //   setPosts(updatedPosts);

  //   const updatedCommentCounts = {
  //     ...commentCounts,
  //     [newPost.id]: 0
  //   };

  //   localStorage.setItem("commentCounts", JSON.stringify(updatedCommentCounts));
  //   setCommentCounts(updatedCommentCounts);
  // };


  const [showDats,setShowDats] = useState([])

  // const dataFetch = async () => {
  //   try {
  //     const postsData = await viewList();
  //     setShowDats(postsData);
  //   } catch (error) {
  //     // Handle the error
  //   }
  // }
  
    // // Convert the data object into an array
    // const dataArray = Object.values(data);

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

{/* <div style={{ padding: '5px' }}>
      <button onClick={event=>
     { 
      event.preventDefault();

      console.log(showDats.map(data=>data))

      }
      }>
        show datas
      </button>
      </div> */}

      <div style={{ padding: '5px' }}> 
      <button onClick={
      event=>{
        event.preventDefault();
      createPost("no changes", "this is my second post", "A,B,C")
      .then(e=>alert(e))
      .catch(e=>alert(e))}
      }>
       add post
      </button>
</div>
</div>


   
      {showDats?.map((item, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
         
         
          {/* Iterate through the Posts array */}
          {Object.values(item.Posts)?.map((post, postIndex) => (
            <div key={postIndex}>
              <h3>Title: {post.Title}</h3>

              {/* its not showing the author post */}
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
                console.log(item.Posts.id)
              }}>add comments</button>
            </div>
          ))}


        </div>
      ))}

      {/* <div className="cover-image"></div>
      <div className="main-content">
        <div className="content">
          <SearchBar posts={posts} onSearch={handleSearch} />
          <AskQ onAddPost={handleAddPost} />
          <Sidebar
            onSelectPost={handleSelectPost}
            onNewestClick={() => setSortingOrder("newest")}
            onOldestClick={() => setSortingOrder("oldest")}
          />
          {!selectedPost ? (
            <>
              <PostForm onAddPost={handleAddPost} />
              <PostList posts={sortedPosts} onSelectPost={handleSelectPost} />
            </>
          ) : (
            <PostDetail
              post={selectedPost}
              onDeletePost={handleDeletePost}
              onAddComment={handleAddComment}
              onGoBack={handleGoBack}
            />
          )}
        </div>
      </div> */}
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


// const data = {
//   "1": {
//     "Author": "email@gmail.com",
//     "Posts": [
//       {
//         "comments": [
//           {
//             "author": "haha@gmail.com",
//             "id": 1,
//             "text": "Great guide! It helped me quickly diagnose an issue with our defibrillator."
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 2,
//             "text": "I am enchanted to meet you"
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 3,
//             "text": "Thanks for sharing! I had no idea how to troubleshoot a defibrillator before."
//           }
//         ],
//         "content": "A defibrillator is crucial in emergencies. Learn how to troubleshoot common issues and ensure its proper functioning.",
//         "date": "2023-08-27",
//         "dislikes": 0,
//         "likes": 2,
//         "title": "How to Troubleshoot a Defibrillator"
//       },
//       {
//         "comments": [
//           {
//             "author": "haha@gmail.com",
//             "id": 1,
//             "text": "Great guide! It helped me quickly diagnose an issue with our defibrillator."
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 2,
//             "text": "I am enchanted to meet you"
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 3,
//             "text": "musika"
//           }
//         ],
//         "content": "A defibrillator is crucial in emergencies. Learn how to troubleshoot common issues and ensure its proper functioning.",
//         "date": "2023-08-27",
//         "dislikes": 0,
//         "likes": 5,
//         "title": "How to Troubleshoot a Defibrillator"
//       }
//     ]
//   },
//   "2": {
//     "Author": "authornumber2@gmail.com",
//     "Posts": [
//       {
//         "comments": [
//           {
//             "author": "haha@gmail.com",
//             "id": 1,
//             "text": "Great guide! It helped me quickly diagnose an issue with our defibrillator."
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 2,
//             "text": "I am enchanted to meet you"
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 3,
//             "text": "Thanks for sharing! I had no idea how to troubleshoot a defibrillator before."
//           }
//         ],
//         "content": "A defibrillator is crucial in emergencies. Learn how to troubleshoot common issues and ensure its proper functioning.",
//         "date": "2023-08-27",
//         "dislikes": 0,
//         "likes": 2,
//         "title": "How to Troubleshoot a Defibrillator"
//       },
//       {
//         "comments": [
//           {
//             "author": "haha@gmail.com",
//             "id": 1,
//             "text": "Great guide! It helped me quickly diagnose an issue with our defibrillator."
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 2,
//             "text": "I am enchanted to meet you"
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 3,
//             "text": "musika"
//           }
//         ],
//         "content": "A defibrillator is crucial in emergencies. Learn how to troubleshoot common issues and ensure its proper functioning.",
//         "date": "2023-08-27",
//         "dislikes": 0,
//         "likes": 5,
//         "title": "How to Troubleshoot a Defibrillator"
//       }
//     ]
//   },
//   "3": {
//     "Author": "AnesthesiaPro@gmail.com",
//     "Posts": [
//       {
//         "comments": [
//           {
//             "author": "haha@gmail.com",
//             "id": 1,
//             "text": "Your guide on maintaining anesthesia machines is comprehensive and informative. Thanks for sharing!"
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 2,
//             "text": "I had some doubts about maintenance, but your guide cleared them up. Great work!"
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 3,
//             "text": "Thanks for sharing! I had no idea how to troubleshoot a defibrillator before."
//           }
//         ],
//         "content": "Anesthesia machines are critical in surgeries. Discover how to clean and maintain these machines for patient safety.",
//         "date": "2023-10-07",
//         "dislikes": 0,
//         "likes": 2,
//         "title": "Guide to Maintaining Anesthesia Machines"
//       },
//       {
//         "comments": [
//           {
//             "author": "haha@gmail.com",
//             "id": 1,
//             "text": "Great guide! It helped me quickly diagnose an issue with our defibrillator."
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 2,
//             "text": "I am enchanted to meet you"
//           },
//           {
//             "author": "haha@gmail.com",
//             "id": 3,
//             "text": "musika"
//           }
//         ],
//         "content": "A defibrillator is crucial in emergencies. Learn how to troubleshoot common issues and ensure its proper functioning.",
//         "date": "2023-08-27",
//         "dislikes": 0,
//         "likes": 5,
//         "title": "How to Troubleshoot a Defibrillator"
//       }
//     ]
//   },
//   "nl5w0JzrRUXkBj7GF8GAZIURSil1": {
//     "Posts": {
//       "-Ne2VI5vHnKcAY-FCUQw": {
//         "Content": "this is my first post",
//         "Title": "Hello Friend",
//         "date": [
//           "9/11/2023",
//           "5:09:56 PM"
//         ]
//       },
//       "-Ne2W6s3Z9S3DkozxtYe": {
//         "Content": "this is my first post",
//         "Title": "Hello Friend",
//         "date": [
//           "9/11/2023",
//           "5:13:32 PM"
//         ]
//       }
//     },
//     "author": "wellnesspro_admin@gmail.com"
//   }
// };


