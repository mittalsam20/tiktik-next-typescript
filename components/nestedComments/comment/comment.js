import React, { Fragment } from "react";

import CommentForm from "../commentForm";
import styles from "../styles.module.css";
import { getReplies } from "../helperFunctions";

const getActionButton = ({
  mode,
  userId,
  authorId,
  activeUserId,
  commentId,
  setActiveComment,
  onDeletingComment,
}) => {
  const isUser = activeUserId === userId;
  const isAuthor = activeUserId === authorId;
  // const fiveMinutes = 300000
  // const timePassed = new Date() - new Date(createdAt) > fiveMinutes
  console.log(authorId, activeUserId, userId);
  const onClickEdit = () => {
    setActiveComment({ id: commentId, mode: "EDITING" });
  };

  return [
    {
      id: "REPLY",
      label: "Reply",
      show: Boolean(activeUserId),
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
    userId: activeUserId,
    userName: activeUserName,
    userAvatar: activeUserAvatar,
    activeComment,
    onAddingComment,
    onEditingComment,
    setActiveComment,
    onDeletingComment,
  } = props;

  const { id: activeCommentId, mode } = activeComment;
  const {
    _key: id,
    comment: body,
    // userName,
    postedBy: { _ref: userId },
    parentId,
  } = comment;

  const submitLabel = mode === "EDITING" ? "Save" : "Comment";
  // const formattedDate = new Date(createdAt).toLocaleDateString();
  const actionButtons = getActionButton({
    mode,
    userId,
    authorId,
    activeUserId,
    commentId: id,
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
          <img src={activeUserAvatar || `/user-icon.png`} alt="us" />
        </div>
      )}
      <div className={styles.commentRightPart}>
        {activeCommentId === id && mode === "EDITING" ? (
          <CommentForm
            parentId={parentId}
            previousComment={body}
            submitLabel={submitLabel}
            handleSubmit={onEditingComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
          />
        ) : (
          <>
            <div className={styles.commentContent}>
              <div className={styles.commentAuthor}>{userId}</div>
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

        {activeCommentId === id && mode === "REPLYING" && (
          <div className={styles.replyTextAreaContainer}>
            <div className={styles.commentImageContainer}>
              <img src="/user-icon.png" alt="ava" />
            </div>
            <CommentForm
              parentId={parentId}
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
              const { _key } = reply;
              const nestedReplies = getReplies({ comments, commentId: _key });
              return (
                <Comment
                  key={_key}
                  comment={reply}
                  postId={postId}
                  replies={nestedReplies}
                  comments={comments}
                  authorId={authorId}
                  showAvatar={showAvatar}
                  userId={activeUserId}
                  userName={activeUserName}
                  userAvatar={activeUserAvatar}
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
