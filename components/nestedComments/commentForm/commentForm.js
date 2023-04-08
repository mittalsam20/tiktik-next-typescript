import React, { useState } from "react";
import styles from "../styles.module.css";

const CommentForm = (props) => {
  const {
    parentId,
    submitLabel,
    handleSubmit,
    activeComment,
    setActiveComment,
    previousComment = "",
  } = props;
  const [text, setText] = useState(previousComment);
  const isTextAreaDisabled = text.length === 0 || text === previousComment;

  const onClickCancel = (event) => {
    event.preventDefault();
    setActiveComment({ id: null, mode: "VIEW" });
    setText("");
  };

  const onClickSubmit = (event) => {
    event.preventDefault();
    if (activeComment?.mode == "EDITING") {
      handleSubmit({ event, text, commentId: activeComment?.id });
      return;
    }
    handleSubmit({ event, text, parentId });
  };

  return (
    <form onSubmit={onClickSubmit}>
      <textarea
        className={styles.commentFormTextarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className={`${styles.button} ${styles.buttonSecondary}`}
        onClick={onClickCancel}
      >
        Cancel
      </button>
      <button
        className={`${styles.button} ${styles.buttonPrimary}`}
        disabled={isTextAreaDisabled}
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default CommentForm;
