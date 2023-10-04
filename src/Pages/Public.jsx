import React, { useState } from "react";
import "../App.css";

// Components
import Header from "../componentsPB/Header";
import PostList from "../componentsPB/PostList";
import PostDetail from "../componentsPB/PostDetail";
import SearchBar from "../componentsPB/SearchBar";
import AskQ from "../componentsPB/AskQ";
import FAQ from "../componentsPB/FAQ"; // Import the FAQ component
import FAQland from "../componentsPB/FAQland";

// Database
import { viewList } from "../Features/firebase/Database"

function Public() {

  const [faqVisible, setFaqVisible] = useState(false); // Add FAQ visibility state

  // posted data
  const [postData, setPostData] = React.useState([])
  const [backupData, setBackupData] = React.useState([])
  const [selectedPost, setSelectedPost] = useState(null); 

  React.useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        // data to be fetch
        const Data = await viewList(); // Assuming viewList is an async function that fetches data

        // sorted out the data

        const posts = Data
          .filter((author) => author.Posts && Object.keys(author.Posts).length > 0)
          .flatMap((author) => 
             // rewrite the data with author
           Object.values(author?.Posts).map((post) => ({
              ...post,
              Author: author.Author, // Add the Author field to each post
            }))
          )
          .sort((a, b) => {
            // Sort by date in descending order (newest to oldest)
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA; 
          });

          // set the sorted data to PostData

          console.log(posts)
          setPostData(posts);
          setBackupData(posts)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // Clean Up function
    if (mounted) {
      fetchData();
    }

    return () => (mounted = false);
  }, []);


  // ************ For Post List and Show Details

  // Set the selected post when a post is clicked
  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  // Back button function
  const handleGoBack = () => {
    // Clear the selected post when going back
    setSelectedPost(null);
  };

  //   // Apply sorting when the sortingOrder changes
  //   let sortedPosts = [...posts];

  //   if (sortingOrder === "newest") {
  //     sortedPosts = sortedPosts.sort((a, b) => {
  //       const dateA = new Date(a.date).getTime();
  //       const dateB = new Date(b.date).getTime();
  //       return dateB - dateA;
  //     });
  //   } else if (sortingOrder === "oldest") {
  //     sortedPosts = sortedPosts.sort((a, b) => {
  //       const dateA = new Date(a.date).getTime();
  //       const dateB = new Date(b.date).getTime();
  //       return dateA - dateB;
  //     });
  //   }

  //   setPosts(sortedPosts);
  // }, [sortingOrder, posts]);


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

  const toggleFAQVisibility = () => {
    setFaqVisible(!faqVisible);
  };

  // onSearch
  const handleSearch = (searchQuery) => {

    const filteredPosts = postData?.filter(
      (post) => {
        return (
          String(post.Title)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(post.Content)?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }
    )
    
    searchQuery ?
    setPostData(filteredPosts) : setPostData(backupData) 
  };

  return (
    <div className="public">

      <Header toggleFAQVisibility={toggleFAQVisibility} />


      {/* <button onClick={()=>console.log(postData)}>click</button> */}
      <div className="main-content">

      {/* Search Bar */}
        {!faqVisible && (
          <div className="content">
            <div className="search-bar-container">
              <div className="search-bar">

   
                <SearchBar
                  posts={postData}
                  onSearch={handleSearch}
         
                />


              </div>
            </div>
            <br />
            <br />
          
          {/* Post and Post Details */}
            <div className="flex-container">
              <div className="left-component">
                {!selectedPost ? (
                  <>

                    {/* This components to show the List of posted question */}
                  {/*   <AskQ /> */}
                    <PostList
                    posts={postData}
                    onSelectPost={handleSelectPost}
                    />

                  </>
                ) : (

                  // this components show the details of each post
                  <PostDetail
                    post={selectedPost} // Pass the selected post
                    onGoBack={handleGoBack}
                  />
                )}
              </div>

              {/* FAQS */}
              <div className="right-component">
                <div
                  className={`dispFAQ-container ${
                    faqVisible ? "" : "hide-faqland"
                  }`}
                  style={{ width: "400px", marginLeft: "30px" }}
                >
                  <FAQland toggleFAQVisibility={toggleFAQVisibility} />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {faqVisible && <FAQ toggleFAQVisibility={toggleFAQVisibility} />}
      <footer className="footer">
        <br />
        <br />
        <div className="footer-center">WELLNESS PRO INC.</div>
        <br />
        <br />
      </footer>
    </div>
  );
}

export default Public;
