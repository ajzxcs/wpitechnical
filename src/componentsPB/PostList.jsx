import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
// import samplePosts from "../data/samplePosts"; // Import the data


const PostList = ({ onSelectPost,posts }) => {

  // React.useEffect(() => {
  //   let mounted = true;

  //   const fetchData = async () => {
  //     try {
    
  //       const datas = await viewList(); // Assuming viewList is an async function that fetches data
  //       const posts = Object.values(datas)
  //         .flatMap((author) =>
  //         Object.values(author.Posts).map((post) => ({
  //             ...post,
  //             Author: author.Author, // Add the Author field to each post
  //           }))
  //         )
  //         .sort((a, b) => {
  //           const dateA = new Date(a.date).getTime();
  //           const dateB = new Date(b.date).getTime();
  //           return dateB - dateA; // Sort by date in descending order (newest to oldest)
  //         });


  //         // console.log(posts)

  //         setDatas(posts);
        
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   if (mounted) {
  //     fetchData();
  //   }

  //   return () => (mounted = false);
  // }, []);

  // // Access the samplePosts data directly
  // const posts = Object.values(samplePosts)
  //   .flatMap((author) =>  Object.values(author.Posts))
  //   .sort((a, b) => {
  //     const dateA = new Date(a.date).getTime();
  //     const dateB = new Date(b.date).getTime();
  //     return dateB - dateA; // Sort by date in descending order (newest to oldest)
  //   });

  return (
    <div className="post-list">

    {posts && posts?.map((postedData, outerKey) => (

      // Second Iteration (Inner map)
      <div key={outerKey} className="post">
        <div className="tags">
          <h3>Tags:</h3>{" "}

          {String(postedData?.tags)?.split(",").map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <h2>{postedData.Title}</h2>
        <p>
          By <strong>{postedData.Author}</strong> - {postedData.date && postedData.date[0]}, {postedData.date && postedData.date[1]}
          {/* {post.date && post.date[0]} */}
        </p>
        <p>{postedData.Content}</p>
        <div className="comment-count" onClick={() => onSelectPost(postedData)}>
          <FontAwesomeIcon icon={faAngleDoubleDown} /> Read More
        </div>
      </div>
  
    
  ))}

    </div>
  );
};

export default PostList;
