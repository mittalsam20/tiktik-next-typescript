import React, { useState, useEffect } from "react";

import { getReplies } from "./helperFunctions.js";

import Comment from "./comment";
import CommentForm from "./commentForm";
import styles from "./styles.module.css";

const Comments = (props) => {
  const {
    showAvatar,
    postId,
    userId,
    userName,
    userAvatar,
    authorId,
    comments,
    onAddingComment,
    onEditingComment,
    onDeletingComment,
  } = props;
  const [activeComment, setActiveComment] = useState({
    id: null,
    mode: "VIEW",
  });
  const rootComments = comments;
  // .filter(({ parentId }) => parentId === null);
  console.log("sss", comments, rootComments);
  return (
    <div className={styles.comments}>
      <h3 className={styles.commentsTitle}>comments</h3>
      <div className={styles.commentFormTitle}>Write Comment</div>
      <CommentForm
        parentId={null}
        submitLabel="comment"
        handleSubmit={onAddingComment}
        setActiveComment={setActiveComment}
      />
      <div className={styles.commentsContainer}>
        {rootComments.map((comment) => {
          const { _key } = comment;
          const replies = getReplies({ comments, commentId: _key });
          return (
            <Comment
              key={_key}
              postId={postId}
              userId={userId}
              comment={comment}
              replies={replies}
              comments={comments}
              userName={userName}
              authorId={authorId}
              showAvatar={showAvatar}
              userAvatar={userAvatar}
              activeComment={activeComment}
              onAddingComment={onAddingComment}
              setActiveComment={setActiveComment}
              onEditingComment={onEditingComment}
              onDeletingComment={onDeletingComment}
            />
          ); // TODO: add lazy loading for thousands of replies
        })}
      </div>
    </div>
  );
};

export default Comments;
