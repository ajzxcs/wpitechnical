import React, { useState, useEffect } from "react";
import Header from "../componentsPB/Header";
import PostList from "../componentsPB/PostList";
import PostDetail from "../componentsPB/PostDetail";
import SearchBar from "../componentsPB/SearchBar";
import AskQ from "../componentsPB/AskQ";
import PostForm from "../componentsPB/PostForm";
import FAQ from "../componentsPB/FAQ"; // Import the FAQ component
import FAQland from "../componentsPB/FAQland";
import samplePosts from "../data/samplePosts";
import "../App.css";

function Public() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Add this state variable
  const [commentCounts, setCommentCounts] = useState({});
  const [sortingOrder, setSortingOrder] = useState("newest");
  const [faqVisible, setFaqVisible] = useState(false); // Add FAQ visibility state

  let sortedPosts = [...posts];

  useEffect(() => {
    // Use the samplePosts data to initialize your posts state
    const initialPosts = Object.values(samplePosts).flatMap((authorData) =>
      authorData.Posts.map((post) => ({ ...post, Author: authorData.Author }))
    );

    setPosts(initialPosts);
  }, []);

  useEffect(() => {
    // Apply sorting when the sortingOrder changes
    let sortedPosts = [...posts];

    if (sortingOrder === "newest") {
      sortedPosts = sortedPosts.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateB - dateA;
      });
    } else if (sortingOrder === "oldest") {
      sortedPosts = sortedPosts.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
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

  const handleAddComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = [...post.comments, comment];
        return {
          ...post,
          commentCount: updatedComments.length,
          comments: updatedComments
        };
      }
      return post;
    });

    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);

    const updatedCommentCounts = updatedPosts.reduce((acc, post) => {
      acc[post.id] = post.commentCount;
      return acc;
    }, {});

    localStorage.setItem("commentCounts", JSON.stringify(updatedCommentCounts));
    setCommentCounts(updatedCommentCounts);
  };

  const handleSearch = (searchQuery) => {
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setSelectedPost(null);
  };

  const handleAddPost = (newPost) => {
    const updatedPosts = [
      ...posts,
      { ...newPost, commentCount: 0, comments: [] }
    ];

    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);

    const updatedCommentCounts = {
      ...commentCounts,
      [newPost.id]: 0
    };

    localStorage.setItem("commentCounts", JSON.stringify(updatedCommentCounts));
    setCommentCounts(updatedCommentCounts);
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
                    <AskQ onAddPost={handleAddPost} />
                    <PostList
                      posts={sortedPosts}
                      onSelectPost={handleSelectPost}
                    />
                    <PostForm onAddPost={handleAddPost} />
                  </>
                ) : (
                  <PostDetail
                    post={selectedPost} // Pass the selected post
                    onDeletePost={handleDeletePost}
                    onAddComment={handleAddComment}
                    onGoBack={handleGoBack}
                  />
                )}
              </div>
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
      {faqVisible && <FAQ toggleFAQVisibility={toggleFAQVisibility} />}
      <footer className="footer">
        <br />
        <div className="footer-center">WELLNESS PRO INC.</div>
        <br />
        <ul className="footer-links">
          <li className="footer-link">
            <a href="#">Content Policy</a>
          </li>
          <li className="footer-link">
            <a href="#">Privacy Policy</a>
          </li>
          <li className="footer-link">
            <a href="#">User Agreement</a>
          </li>
        </ul>
        <br />
      </footer>
    </div>
  );
}

export default Public;
