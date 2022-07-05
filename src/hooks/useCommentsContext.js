import { CommentsContext } from "../context/CommentContext";
import { useContext } from "react";

export function useCommentsContext() {
  const context = useContext(CommentsContext);

  if (!context) {
    throw Error("useCommentsContext must use in ....");
  }

  return context;
}
