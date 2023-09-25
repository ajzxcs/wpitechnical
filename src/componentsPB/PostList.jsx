import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
// import samplePosts from "../data/samplePosts"; // Import the data
import { viewList } from "../Features/firebase/Database"


const PostList = ({ onSelectPost }) => {

  const [datas,setDatas] = React.useState()

  React.useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
    
        const datas = await viewList(); // Assuming viewList is an async function that fetches data
        const posts = Object.values(datas)
          .flatMap((author) =>
          Object.values(author.Posts).map((post) => ({
              ...post,
              Author: author.Author, // Add the Author field to each post
            }))
          )
          .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA; // Sort by date in descending order (newest to oldest)
          });


          // console.log(posts)

          setDatas(posts);
        
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (mounted) {
      fetchData();
    }

    return () => (mounted = false);
  }, []);

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

    {datas && datas?.map((post, outerKey) => (

      // Second Iteration (Inner map)
      <div key={outerKey} className="post">
        <div className="tags">
          <h3>Tags:</h3>{" "}

          {String(post?.tags)?.split(",").map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <h2>{post.Title}</h2>
        <p>
          By <strong>{post.Author}</strong> - 
          {post.date && post.date[0]}, {post.date && post.date[1]}
          {/* {post.date && post.date[0]} */}
        </p>
        <p>{post.Content}</p>
        <div className="comment-count" onClick={() => onSelectPost(post)}>
          <FontAwesomeIcon icon={faAngleDoubleDown} /> Read More
        </div>
      </div>
  
    
  ))}

    </div>
  );
};

export default PostList;
