import React, { useState, useEffect } from "react";

import { getReplies } from "./helperFunctions.js";

import Comment from "./comment";
import CommentForm from "./commentForm";
import styles from "./styles.module.css";

const Comments = (props) => {
  const {
    showAvatar,
    postId,
    currentUserId,
    currentUserName,
    currentUserAvatar,
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
  const rootComments = comments.filter(
    ({ parentId }) => parentId === null || parentId === undefined
  );
  console.log(comments);

  return (
    <div className={styles.comments}>
      <h3 className={styles.commentsTitle}>comments</h3>
      <div className={styles.commentFormTitle}>Write Comment</div>
      <CommentForm
        parentId={null}
        submitLabel="comment"
        activeComment={activeComment}
        handleSubmit={onAddingComment}
        setActiveComment={setActiveComment}
      />
      <div className={styles.commentsContainer}>
        {rootComments.map((comment) => {
          const { commentId } = comment;
          const replies = getReplies({ comments, commentId });
          console.log("repleple", replies);
          console.log(comment.userDetails.userId);
          if (!comment.userDetails.userId) console.log("this is it", comment);
          return (
            <Comment
              key={commentId}
              postId={postId}
              comment={comment}
              replies={replies}
              comments={comments}
              authorId={authorId}
              showAvatar={showAvatar}
              currentUserId={currentUserId}
              currentUserName={currentUserName}
              currentUserAvatar={currentUserAvatar}
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
