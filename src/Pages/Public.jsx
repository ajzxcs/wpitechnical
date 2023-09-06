import React, { useState, useEffect } from "react";
import Header from "../components/componentsPB/Header";
import Sidebar from "../components/componentsPB/Sidebar";
import PostList from "../components/componentsPB/PostList";
import PostDetail from "../components/componentsPB/PostDetail";
import SearchBar from "../components/componentsPB/SearchBar";
import AskQ from "../components/componentsPB/AskQ";
import PostForm from "../components/componentsPB/PostForm";
import samplePosts from "../data/samplePosts";
import "../App.css";

function Public() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentCounts, setCommentCounts] = useState({});
  const [sortingOrder, setSortingOrder] = useState("newest");

  let sortedPosts = [...posts];

  const handleSelectPost = (postId) => {
    const selected = posts.find((post) => post.id === postId);
    setSelectedPost(selected);
  };

  const handleGoBack = () => {
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

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts([...samplePosts, ...storedPosts]);

    const storedCommentCounts = JSON.parse(
      localStorage.getItem("commentCounts") || "{}"
    );
    setCommentCounts(storedCommentCounts);
  }, []);

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

  const handlePopularClick = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => b.commentCount - a.commentCount
    );
    setPosts(sortedPosts);
  };

  const handleNewestClick = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setPosts(sortedPosts);
  };

  const handleOldestClick = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setPosts(sortedPosts);
  };

  return (
    <div className="public">
      <Header />
      <ImageBanner />
      
      <h1>PUBLIC FORUM</h1>

      <a href="/Login">
        <button>Login</button>
      </a>
      <div className="cover-image"></div>
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
      </div>
    </div>
  );
}

function ImageBanner() {
  return (
    <div className="image-container">
      <img
        className="cover-image"
        src="/Healthcare-1.jpg"
        alt="Healthcare Image"
      />
    </div>
  );
}

export default Public;
