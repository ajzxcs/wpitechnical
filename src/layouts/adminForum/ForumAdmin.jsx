import React, { useState, useEffect } from "react";
import Header from "./componentsAdmin/HeaderAdmin";
import PostList from "./componentsAdmin/PostListAdmin";
import PostDetail from "./componentsAdmin/PostDetailAdmin";
import SearchBar from "./componentsAdmin/SearchBarAdmin";
import AskQ from "./componentsAdmin/AskQAdmin";
import PostForm from "./componentsAdmin/PostFormAdmin";
import FAQ from "./componentsAdmin/FAQAdmin"; // Import the FAQ component
import FAQland from "./componentsAdmin/FAQlandAdmin";
import Modal from "react-modal";

import "./assets/App.css";

// Database
import { viewList, createPost, update_ForumVisitToday } from "../../firebase/Database"

function Private() {
  const [posts, setPosts] = useState([]);
  // backup data
  const [postData, setPostData] = React.useState([])

  const [selectedPost, setSelectedPost] = useState(null); // Add this state variable
  const [sortingOrder, setSortingOrder] = useState("newest");
  const [faqVisible, setFaqVisible] = useState(false); // Add FAQ visibility state
  const [isContentPolicyModalOpen, setIsContentPolicyModalOpen] = useState(
    false)
    const [isprivacyPolicyModalOpen, setIsprivacyPolicyModalOpen] = useState(
      false)
    


  let sortedPosts = [...posts];

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

  useEffect(() => {

    let mounted = true;

    // Clean Up function
    const fetchDataInterval = setInterval(() => {
      // Ftech Data
      fetchData();
    }, 2000); 


    if (mounted) {
       // Forum visit today
      update_ForumVisitToday();
    }
     
    // Cleanup function
    return () => {
      mounted = false;
      clearInterval(fetchDataInterval); // Clear the interval when the component unmounts
    };
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
    })
    .catch(e=>alert(e))
  };

  const handleSort = (newSortingOrder) => {
    setSortingOrder(newSortingOrder);
  };

  const openContentPolicyModal = () => {
    setIsContentPolicyModalOpen(true);
  };

  const closeContentPolicyModal = () => {
    setIsContentPolicyModalOpen(false);
  };

  const openprivacyPolicyModal = () => {
    setIsprivacyPolicyModalOpen(true);
  };

  const closeprivacyPolicyModal = () => {
    setIsprivacyPolicyModalOpen(false);
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
                    onSelectedPost={setSelectedPost}
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
         <ul className="footer-links">
         <li className="footer-link">
            <a onClick={openContentPolicyModal}>
              Content Policy
            </a>
          </li>
          <li className="footer-link">
            <a onClick={openprivacyPolicyModal}>Privacy Policy</a>
          </li>
      
        </ul>
        <br />
      </footer>

         {/* Content Policy Modal */}
         <Modal
  isOpen={isContentPolicyModalOpen}
  onRequestClose={closeContentPolicyModal}
  contentLabel="Content Policy Modal"
  style={{
    content: {
      width: "60%", // Adjust the width as needed
      height: "auto", // Height set to "auto" to fit content
      margin: "0 auto", // Center horizontally
      // You can add more custom styles here as needed
    },
  }}
>
  <h2>Content Policy</h2>
  <p>Welcome to the Wellness Pro Inc. Forum! We are delighted to have you as part of our community of health and wellness enthusiasts. To maintain a positive and informative environment for everyone, we have established the following Content Policy. Please take a moment to familiarize yourself with these guidelines.</p>

<p><strong>1. Respect and Support:</strong></p>
<p>Treat fellow forum members with kindness and respect. Avoid derogatory, offensive, or disrespectful language or behavior.</p>

<p><strong>2. Relevant Discussions:</strong></p>
<p>Keep your posts and discussions related to health, wellness, and topics aligned with the purpose of this forum. Off-topic discussions should be avoided.</p>

<p><strong>3. No Medical Advice:</strong></p>
<p>Do not provide or seek medical advice on the forum. Consult with healthcare professionals for personal medical concerns.</p>

<p><strong>4. Evidence-Based Information:</strong></p>
<p>When sharing health-related information, strive to provide evidence-based content, and cite sources where applicable.</p>

<p><strong>5. Personal Experience:</strong></p>
<p>While sharing personal experiences is encouraged, do not present them as universal solutions. What works for one person may not work for another.</p>

<p><strong>6. Privacy and Confidentiality:</strong></p>
<p>Respect the privacy of others. Do not share personal or confidential information about yourself or others without consent.</p>

<p><strong>7. No Promotions or Advertisements:</strong></p>
<p>Avoid unsolicited self-promotion, advertising, or spam. Promotional content should be shared in designated areas, if allowed by forum rules.</p>

<p><strong>8. No Plagiarism:</strong></p>
<p>When sharing content from external sources, always provide proper attribution and avoid plagiarism.</p>

<p><strong>9. Reporting Violations:</strong></p>
<p>If you encounter content or users violating this policy, please report it to the forum moderators/administrators.</p>

<p><strong>10. Multiple Accounts:</strong></p>
<p>- Users are encouraged to have a single account. Creating multiple accounts to evade bans or engage in deceptive behavior is not allowed.</p>

<p><strong>11. Respect for Moderators/Administrators:</strong></p>
<p>- Follow the instructions and decisions of forum moderators/administrators. They are here to ensure a positive and safe environment for all users.</p>

<p><strong>12. Consequences for Violations:</strong></p>
<p>- Violations of this policy may result in warnings, temporary suspensions, or permanent bans, depending on the severity of the offense and the user's history.</p>

<p><strong>13. Appeals:</strong></p>
<p>- Users who believe they have been unfairly moderated may appeal the decision through the designated channels provided by the forum.</p>

<p><strong>14. Changes to the Policy:</strong></p>
<p>- This content policy may be updated or modified as needed. Users will be notified of any changes, and it is the user's responsibility to stay informed about the current policy.</p>

<p>By participating in the Wellness Pro Inc. Forum, you agree to adhere to this Content Policy. Your contributions are valued, and we appreciate your commitment to fostering a supportive and informative community.</p>

<p>Thank you for being a part of the Wellness Pro Inc. Forum!</p>

<p>Wellness Pro Inc. Forum Moderation Team</p>

  <button onClick={closeContentPolicyModal}>Close</button>
</Modal>


{/* privacy policy */}


<Modal
  isOpen={isprivacyPolicyModalOpen}
  onRequestClose={closeprivacyPolicyModal}
  contentLabel="Privacy Policy Modal"
  style={{
    content: {
      width: "60%", // Adjust the width as needed
      height: "auto", // Height set to "auto" to fit content
      margin: "0 auto", // Center horizontally
      // You can add more custom styles here as needed
    },
  }}
>
<h2>Privacy Policy</h2>
<p>At Wellness Pro Inc., we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, share, and safeguard your data when you interact with our website, services, and forum. By accessing or using our services, you agree to the terms outlined in this policy.</p>

<p><strong>1. Information We Collect:</strong></p>

<p><strong>Personal Information:</strong> We may collect personal information, including but not limited to your name, email address, and other contact details when you register for our forum or subscribe to our services.</p>

<p><strong>Usage Data:</strong> We collect information about how you use our website and forum, including your browsing history, interactions with our content, and the devices and browsers you use.</p>

<p><strong>2. How We Use Your Information:</strong></p>

<p><strong>To Provide Services:</strong> We use your personal information to provide and improve our services, including facilitating your participation in our forum and delivering relevant content.</p>

<p><strong>Communication:</strong> We may use your contact information to send you updates, newsletters, and notifications related to Wellness Pro Inc. You can opt out of these communications at any time.</p>

<p><strong>Analytics:</strong> We use data analytics to understand how users interact with our website and forum, allowing us to improve user experience and content quality.</p>

<p><strong>3. Data Sharing:</strong></p>

<p>We do not sell your personal information to third parties. However, we may share your data with trusted service providers who assist us in delivering our services.</p>

<p>We may disclose your information when required by law or to protect our rights, privacy, safety, or property.</p>

<p><strong>4. Cookies and Tracking:</strong></p>

<p>We use cookies and similar technologies to collect information about your browsing behavior. You can manage cookie preferences through your browser settings.</p>

<p><strong>5. Security:</strong></p>

<p>We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.</p>

<p><strong>6. Changes to this Policy:</strong></p>

<p>We may update this Privacy Policy to reflect changes in our practices or for legal and regulatory reasons. Please review this policy periodically.</p>

<p><strong>7. Consent:</strong></p>

<p>By using our website, forum, or services, you consent to the terms outlined in this Privacy Policy.</p>

<p><strong>8. Contact Us:</strong></p>

<p>If you have any questions, concerns, or requests regarding your personal information or this Privacy Policy, please contact us at</p>

<p>through the designated channels provided by the forum or website.</p>


  <button onClick={closeprivacyPolicyModal}>Close</button>
</Modal>
    </div>
  );
}

export default Private;
