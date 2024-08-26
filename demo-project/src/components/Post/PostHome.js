import React, { useState, useRef } from "react";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { BsFillCheckCircleFill, BsPlusCircleDotted } from "react-icons/bs";
import { BiDotsVerticalRounded, BiComment } from "react-icons/bi";
import { MdOutlineThumbUp, MdShare } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import TimeAgo from "react-timeago";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./PostHome.css";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegPaperPlane,
} from "react-icons/fa";
import {
  likePost,
  restLikePost,
  unlikePost,
} from "../../actions/postAction.js";
import CreateComent from "./Comment/CreateComent.jsx";
import ColonCard from "./ColonCard";
import { useOutsideClick } from "../../utlis/useOutsideClick.js";
import { toast } from "react-toastify";
// import Comment from "./Comment";

function PostHome({ posts }) {
  const [colon, setColon] = useState(false);
  const [expands, setExpands] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  // const [replies, setReplies] = useState([]);

  const colonRef = useRef(null);
  const textCount = 100;
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const userId = user?._id;

  const isLiked = posts?.likes?.includes(userId);

  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikePost(posts._id));
      toast.info("Post unliked!");
    } else {
      dispatch(likePost(posts._id));
      toast.success("Post liked!");
    }
    dispatch(restLikePost());
  };

  const handleColon = () => {
    setColon(!colon);
  };

  useOutsideClick(colonRef, () => setColon(false));

  const handleShare = () => {
    const url = `${window.location.origin}/post/${posts._id}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this post!",
          url: url,
        })
        .then(() => {
          toast.success("Post shared successfully!");
        })
        .catch((err) => {
          toast.error("Failed to share post");
        });
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => toast.success("Post URL copied to clipboard!"))
        .catch((err) => toast.error("Failed to copy URL"));
    }
  };
  // const handleComment = (comment, parentId) => {
  //   //...
  //   if (parentId) {
  //     // Add reply to the replies state
  //     setReplies((prevReplies) => [...prevReplies, { comment, parentId }]);
  //   } else {
  //     // Add comment to the post comments
  //     dispatch(newComment({ comment, postId: posts._id }));
  //   }
  // };
  const shouldShowToggle = posts?.content?.length > textCount;

  return (
    <div
      className="card w-100 h p-2 bg-white mb-2"
      style={{ border: "1px solid #ececec" }}
    >
      <div className="profile-contents mt-4">
        <div className="profile-headings">
          <div className="imgBox">
            <img src={posts?.author?.avatar} alt="Profile" />
          </div>
          <div className="titles">
            <div className="subtitles">
              <div className="d-flex">
                <h4>{posts?.author?.name}</h4>
              </div>
              <div className="d-flex">
                <BsFillCheckCircleFill className="circle-icons" />
                <span className="badge text-bg-light text-small">
                  <BsPlusCircleDotted /> : <TimeAgo date={posts?.createdAt} />
                </span>
              </div>
            </div>
            <div className="small-titles">
              <span>{posts?.author?.email}</span>
              <span>{posts?.author?.username}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="position-relative" ref={colonRef}>
            <BiDotsVerticalRounded className="icons" onClick={handleColon} />
            {colon && (
              <div
                className="position-absolute"
                style={{
                  marginLeft: "-13rem",
                  zIndex: "1000",
                  marginTop: "-3.6rem",
                }}
              >
                <ColonCard
                  handleShare={handleShare}
                  postId={posts._id}
                  post={posts}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="profile-sub-content" style={{ marginLeft: "18px" }}>
        <p
          className="mt-2 text-muted"
          style={{
            fontSize: "0.9rem",
            fontFamily: "cursive",
          }}
        >
          {expands ? posts?.content : posts?.content?.slice(0, textCount)}
        </p>

        {shouldShowToggle && (
          <a
            href="#"
            className="text-decoration-none ms-2 mb-2"
            onClick={(e) => {
              e.preventDefault();
              setExpands(!expands);
            }}
          >
            {expands ? "See less" : "See more"}
          </a>
        )}
      </div>
      <div className="d-flex justify-content-center flex-column">
        {posts?.images && posts.images.length > 0 && (
          <div
            style={{
              width: "100%",
              paddingTop: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={posts.images[0].url}
              alt="Content"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "95%",
                height: "100%",
                objectFit: "cover",
                marginLeft: "18px",
              }}
            />
          </div>
        )}
        {/* ------------------------------- */}
        {/* <div className="d-flex justify-content-between align-items-center mt-1 p-1">
          <div className="d-flex gap-1 align-items-center">
            {isLiked ? (
              <GoHeartFill style={{ color: "red" }} onClick={handleLike} />
            ) : (
              <GoHeart onClick={handleLike} />
            )}
            <span>
              <MdOutlineThumbUp className="fs-5" />{" "}
              <span>{posts?.likes.length}</span>
            </span>
          </div>
          <div className="d-flex gap-1 align-items-center">
            <NavLink
              to={`comment/${posts?._id}`}
              className="text-decoration-none fs-6"
            >
              <span className="text-muted text-small">
                {posts?.comments?.length} comments
              </span>
            </NavLink>
            <span className="text-muted text-small">1 share</span>
          </div>
        </div>
        <hr /> */}
        {/* ------------------------ */}
        <div className="d-flex justify-content-between align-items-center p-2">
          {/* <div>
            {isLiked ? (
              <BiSolidLike onClick={handleLike} className="fs-5" />
            ) : (
              <MdOutlineThumbUp onClick={handleLike} className="fs-5" />
            )}
          </div>
          <div
            onClick={() => setCommentBox(!commentBox)}
            className="d-flex align-items-center"
          >
            <BiComment className="fs-5" />
            <span className="text-muted fs-6">comments</span>
          </div>
          <div className="d-flex align-items-center">
            <MdShare onClick={handleShare} className="fs-5" />
            <span className="text-muted fs-6">Share</span>
          </div>
        </div> */}
          {/* ----------------------------- */}
          <div className="post-actions">
            <button
              className={`action-btn like-btn ${isLiked ? "liked" : ""}`}
              onClick={handleLike}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              <span className="action-count">{posts?.likes.length}</span>
            </button>

            <button
              className="action-btn comment-btn"
              onClick={() => setCommentBox(!commentBox)}
            >
              <FaRegComment />
              <span className="action-count">{posts?.comments?.length}</span>
            </button>

            <button
              className="action-btn share-btn"
              style={{ marginLeft: "520px" }}
              onClick={handleShare}
            >
              <FaRegPaperPlane />
            </button>
          </div>
          {/* ------------------------------------ */}
          {/* {commentBox && <CreateComent postId={posts?._id} />} */}
        </div>
      </div>
      {/* <div className="comments">
        {posts.comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            replies={replies.filter((reply) => reply.parentId === comment._id)}
            onReply={(parentId) => handleComment("", parentId)}
          />
        ))}
      </div> */}
      {commentBox && <CreateComent postId={posts?._id} />}
      {/* <button onClick={() => setCommentBox(!commentBox)}>Comment</button> */}
    </div>
  );
}

export default PostHome;
// ------------------------------------

// import React, { useState, useRef } from "react";
// import {
//   FaHeart,
//   FaRegHeart,
//   FaRegComment,
//   FaRegPaperPlane,
// } from "react-icons/fa";
// import TimeAgo from "react-timeago";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import "./PostHome.css";
// import {
//   likePost,
//   restLikePost,
//   unlikePost,
// } from "../../actions/postAction.js";
// // import CreateComment from "./Comment/CreateComment";
// // import Comment from "./Comment/Comment";
// import ColonCard from "./ColonCard";
// // import { useOutsideClick } from "../../utils/useOutsideClick.js";
// // import { useOutsideClick } from "../../utlis/useOutsideClick";
// import { useOutsideClick } from "../../utlis/useOutsideClick.js";
// import { toast } from "react-toastify";
// import CreateComment from "./Comment/CreateComent.jsx";
// import Comment from "./Comment/Comment.jsx";

// function PostHome({ posts }) {
//   const [colon, setColon] = useState(false);
//   const [expands, setExpands] = useState(false);
//   const [commentBox, setCommentBox] = useState(false);
//   const [comments, setComments] = useState(posts?.comments || []); // Initialize comments from the post

//   const colonRef = useRef(null);
//   const textCount = 100;
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.user);
//   const userId = user?._id;

//   const isLiked = posts?.likes?.includes(userId);

//   const handleLike = () => {
//     if (isLiked) {
//       dispatch(unlikePost(posts._id));
//       toast.info("Post unliked!");
//     } else {
//       dispatch(likePost(posts._id));
//       toast.success("Post liked!");
//     }
//     dispatch(restLikePost());
//   };

//   const handleColon = () => {
//     setColon(!colon);
//   };

//   useOutsideClick(colonRef, () => setColon(false));

//   const handleShare = () => {
//     const url = `${window.location.origin}/post/${posts._id}`;

//     if (navigator.share) {
//       navigator
//         .share({
//           title: "Check out this post!",
//           url: url,
//         })
//         .then(() => {
//           toast.success("Post shared successfully!");
//         })
//         .catch((err) => {
//           toast.error("Failed to share post");
//         });
//     } else {
//       navigator.clipboard
//         .writeText(url)
//         .then(() => toast.success("Post URL copied to clipboard!"))
//         .catch((err) => toast.error("Failed to copy URL"));
//     }
//   };

//   const handleNewComment = (newComment) => {
//     setComments((prevComments) => [...prevComments, newComment]);
//     setCommentBox(false); // Close comment box after posting
//   };

//   return (
//     <div
//       className="card w-100 h p-2 bg-white mb-2"
//       style={{ border: "1px solid #ececec" }}
//     >
//       <div className="profile-contents mt-4">
//         <div className="profile-headings">
//           <div className="imgBox">
//             <img src={posts?.author?.avatar} alt="Profile" />
//           </div>
//           <div className="titles">
//             <div className="subtitles">
//               <div className="d-flex">
//                 {/* <h4>{posts?.author?.name || "Unknown Author"}</h4> */}
//               </div>
//               <div className="d-flex">
//                 <span className="badge text-bg-light text-small">
//                   <TimeAgo date={posts?.createdAt} />
//                 </span>
//               </div>
//             </div>
//             <div className="small-titles">
//               <span>{posts?.author?.email}</span>
//               <span>{posts?.author?.username}</span>
//             </div>
//           </div>
//         </div>
//         <div>
//           <div className="position-relative" ref={colonRef}>
//             <FaRegPaperPlane className="icons" onClick={handleColon} />
//             {colon && (
//               <div
//                 className="position-absolute"
//                 style={{
//                   marginLeft: "-13rem",
//                   zIndex: "1000",
//                   marginTop: "-3.6rem",
//                 }}
//               >
//                 <ColonCard
//                   handleShare={handleShare}
//                   postId={posts._id}
//                   post={posts}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="profile-sub-content" style={{ marginLeft: "18px" }}>
//         <p
//           className="mt-2 text-muted"
//           style={{ fontSize: "0.9rem", fontFamily: "cursive" }}
//         >
//           {expands ? posts?.content : posts?.content?.slice(0, textCount)}
//         </p>
//         <a
//           href="#"
//           className="text-decoration-none ms-2 mb-2"
//           onClick={(e) => {
//             e.preventDefault();
//             setExpands(!expands);
//           }}
//         >
//           {expands ? "See less" : "See more"}
//         </a>
//       </div>
//       <div className="d-flex justify-content-center flex-column">
//         {posts?.images && posts.images.length > 0 && (
//           <div
//             style={{
//               width: "100%",
//               paddingTop: "100%",
//               position: "relative",
//               overflow: "hidden",
//             }}
//           >
//             <img
//               src={posts.images[0].url}
//               alt="Content"
//               style={{
//                 position: "absolute",
//                 top: "0",
//                 left: "0",
//                 width: "95%",
//                 height: "100%",
//                 objectFit: "cover",
//                 marginLeft: "18px",
//               }}
//             />
//           </div>
//         )}
//         <div className="post-actions">
//           <button
//             className={`action-btn like-btn ${isLiked ? "liked" : ""}`}
//             onClick={handleLike}
//           >
//             {isLiked ? <FaHeart /> : <FaRegHeart />}
//             <span className="action-count">{posts?.likes.length}</span>
//           </button>

//           <button
//             className="action-btn comment-btn"
//             onClick={() => setCommentBox(!commentBox)}
//           >
//             <FaRegComment />
//             <span className="action-count">{comments.length}</span>
//           </button>

//           <button
//             className="action-btn share-btn"
//             style={{ marginLeft: "520px" }}
//             onClick={handleShare}
//           >
//             <FaRegPaperPlane />
//           </button>
//         </div>
//         {commentBox && (
//           <CreateComment postId={posts?._id} onNewComment={handleNewComment} />
//         )}
//       </div>
//       <div className="comments">
//         {comments.map((comment) => (
//           <Comment key={comment._id} comment={comment} postId={posts?._id} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PostHome;
