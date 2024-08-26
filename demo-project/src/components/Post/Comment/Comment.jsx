// import React, { useState } from "react";
// import { FaReply } from "react-icons/fa";
// import CreateComment from "./CreateComent";
// // import CreateComment from "./CreateComment";

// function Comment({ comment, postId }) {
//   const [showReplyBox, setShowReplyBox] = useState(false);
//   const [replies, setReplies] = useState(comment.replies || []);

//   const handleReply = (reply) => {
//     setReplies([...replies, reply]);
//     setShowReplyBox(false);
//   };

//   return (
//     <div className="comment">
//       <p>
//         <strong>{comment.author.name}:</strong> {comment.text}
//       </p>
//       <button
//         className="reply-btn"
//         onClick={() => setShowReplyBox(!showReplyBox)}
//       >
//         <FaReply /> Reply
//       </button>
//       {showReplyBox && (
//         <CreateComment
//           postId={postId}
//           parentCommentId={comment._id}
//           onNewComment={handleReply}
//         />
//       )}
//       {replies.map((reply) => (
//         <Comment key={reply._id} comment={reply} postId={postId} />
//       ))}
//     </div>
//   );
// }

// export default Comment;
