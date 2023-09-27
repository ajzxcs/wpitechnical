import React, { useState, useEffect } from "react";
import Header from "../componentsPV/Headerpv";
import PostList from "../componentsPV/PostListpv";
import PostDetail from "../componentsPV/PostDetailpv";
import SearchBar from "../componentsPV/SearchBarpv";
import AskQ from "../componentsPV/AskQpv";
import PostForm from "../componentsPV/PostFormpv";
import FAQ from "../componentsPV/FAQpv"; // Import the FAQ component
import FAQland from "../componentsPV/FAQlandpv";

import "../App.css";

// Database
import { viewList, createPost, update_ForumVisitToday } from "../Features/firebase/Database"

function Private() {
  const [posts, setPosts] = useState([]);
  // backup data
  const [postData, setPostData] = React.useState([])

  const [selectedPost, setSelectedPost] = useState(null); // Add this state variable
  const [sortingOrder, setSortingOrder] = useState("newest");
  const [faqVisible, setFaqVisible] = useState(false); // Add FAQ visibility state

  let sortedPosts = [...posts];

  useEffect(() => {
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
            Object.values(author.Posts).map((post) => ({
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
          setPostData(posts);
          setPosts(posts)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // Clean Up function
    if (mounted) {
      // Ftech Data
      fetchData();
      
      // Forum visit today
      update_ForumVisitToday();
    }

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    // Apply sorting when the sortingOrder changes
    let sortedPosts = posts;

    if (sortingOrder === "newest") {
      sortedPosts = sortedPosts.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
    } else if (sortingOrder === "oldest") {
      sortedPosts = sortedPosts.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
    }

    setPosts(sortedPosts);
  }, [sortingOrder, posts]);

  const handleSelectPost = (post) => {
    // Set the selected post when a post is clicked
    setSelectedPost(post);
  };

  const handleGoBack = () => {
    // Clear the selected post when going back
    setSelectedPost(null);
  };


  const handleSearch = (searchQuery) => {
    const filteredPosts = posts.filter(
      (post) =>
        String(post.Title)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(post.Content)?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    searchQuery ?
    setPosts(filteredPosts) : setPosts(postData) 
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setSelectedPost(null);
  };

  const handleAddPost = (newPost) => {

    createPost(newPost.title, newPost.content, newPost.newTags)
    .then(e=>{
      alert(e)
      window.location.reload();
    })
    .catch(e=>alert(e))
  };

  const handleSort = (newSortingOrder) => {
    setSortingOrder(newSortingOrder);
  };

  const toggleFAQVisibility = () => {
    setFaqVisible(!faqVisible);
  };

  return (
    <div className="public">
      <Header toggleFAQVisibility={toggleFAQVisibility} />

      {/* Search bar */}
      <div className="main-content">
        {!faqVisible && (
          <div className="content">
            <div className="search-bar-container">
              <div className="search-bar">

                <SearchBar
                  posts={posts}
                  onSearch={handleSearch}
                  onSort={handleSort}
                />

              </div>
            </div>
            <br />
            <br />

            <div className="flex-container">
              <div className="left-component">
                {!selectedPost ? (
                  <>
                  {/* Post List */}
                    <AskQ onAddPost={handleAddPost} />
                    <PostList
                      posts={sortedPosts}
                      onSelectPost={handleSelectPost}
                    />
                    <PostForm onAddPost={handleAddPost} />
                  </>
                ) : (

                  /* Post Details */      
                  <PostDetail
                    post={selectedPost} // Pass the selected post
                    onDeletePost={handleDeletePost}
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

      {/* fOOTER */}
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

export default Private;