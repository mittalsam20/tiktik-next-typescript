import React, { Fragment } from "react";

import CommentForm from "../commentForm";
import { uuid } from "uuidv4";

import styles from "../styles.module.css";
import { getReplies } from "../helperFunctions";

const getActionButton = ({
  mode,
  userId,
  authorId,
  commentId,
  currentUserId,
  setActiveComment,
  onDeletingComment,
}) => {
  const isUser = currentUserId === userId;
  const isAuthor = currentUserId === authorId;
  // const fiveMinutes = 300000
  // const timePassed = new Date() - new Date(createdAt) > fiveMinutes
  const onClickEdit = () => {
    setActiveComment({ id: commentId, mode: "EDITING" });
  };

  return [
    {
      id: "REPLY",
      label: "Reply",
      show: Boolean(currentUserId),
      disabled: mode !== "VIEW",
      onClick: () => setActiveComment({ id: commentId, mode: "REPLYING" }),
    },
    {
      id: "EDIT",
      label: "Edit",
      show: isUser,
      disabled: mode !== "VIEW",
      onClick: onClickEdit,
    },
    {
      id: "DELETE",
      label: "Delete",
      show: isUser || isAuthor,
      disabled: mode !== "VIEW",
      onClick: () => onDeletingComment({ commentId }),
    },
  ];
};

const Comment = (props) => {
  const {
    comment,
    postId,
    replies,
    comments,
    authorId,
    showAvatar,
    currentUserId,
    currentUserName,
    currentUserAvatar,
    activeComment,
    onAddingComment,
    onEditingComment,
    setActiveComment,
    onDeletingComment,
  } = props;

  const { id: activeCommentId, mode } = activeComment;
  const {
    body,
    parentId,
    commentId,
    userDetails: { userId, userName, userImage },
  } = comment;
  console.log(userId, userName, userImage);
  const submitLabel = mode === "EDITING" ? "Save" : "Comment";
  // const formattedDate = new Date(createdAt).toLocaleDateString();
  const actionButtons = getActionButton({
    mode,
    userId,
    authorId,
    commentId,
    currentUserId,
    setActiveComment,
    onDeletingComment,
  });

  return (
    <div
      className={styles.comment}
      style={
        parentId !== null && replies.length > 0 ? { marginBottom: "0" } : {}
      }
    >
      {showAvatar && (
        <div className={styles.commentImageContainer}>
          <img src={userImage} alt="us" />
        </div>
      )}
      <div className={styles.commentRightPart}>
        {activeCommentId === commentId && mode === "EDITING" ? (
          <CommentForm
            previousComment={body}
            submitLabel={submitLabel}
            activeComment={activeComment}
            handleSubmit={onEditingComment}
            setActiveComment={setActiveComment}
          />
        ) : (
          <>
            <div className={styles.commentContent}>
              <div className={styles.commentAuthor}>{userName}</div>
              {/* <>{formattedDate}</> */}
            </div>
            <div className={styles.commentText}>{body}</div>
            <div className={styles.commentActions}>
              {actionButtons.map(({ id, label, show, onClick }) => {
                return (
                  show && (
                    <div
                      key={id}
                      onClick={onClick}
                      className={styles.commentAction}
                    >
                      {label}
                    </div>
                  )
                );
              })}
            </div>
          </>
        )}

        {activeCommentId === commentId && mode === "REPLYING" && (
          <div className={styles.replyTextAreaContainer}>
            <div className={styles.commentImageContainer}>
              <img src={currentUserAvatar} alt="ava" />
            </div>
            <CommentForm
              parentId={commentId}
              submitLabel={submitLabel}
              activeComment={activeComment}
              handleSubmit={onAddingComment}
              setActiveComment={setActiveComment}
            />
          </div>
        )}

        {replies.length && (
          <div className={styles.replies}>
            {replies.map((reply) => {
              const { commentId } = reply;
              const nestedReplies = getReplies({ comments, commentId });
              return (
                <Comment
                  key={commentId}
                  comment={reply}
                  postId={postId}
                  replies={nestedReplies}
                  comments={comments}
                  authorId={authorId}
                  showAvatar={showAvatar}
                  currentUserId={currentUserId}
                  currentUserName={currentUserName}
                  currentUserAvatar={currentUserAvatar}
                  activeComment={activeComment}
                  onAddingComment={onAddingComment}
                  onEditingComment={onEditingComment}
                  setActiveComment={setActiveComment}
                  onDeletingComment={onDeletingComment}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
