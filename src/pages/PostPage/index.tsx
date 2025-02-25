import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useSnippetDetail } from "../../hooks/useSnippetDetail";
import CommentList from "../../widgets/CommentList/CommentList";
import { useCreateComment } from "../../hooks/useCreateComment";
import SnippetCard from "../../widgets/SnippetCard";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: snippet, isLoading, isError } = useSnippetDetail(id);
  const [commentText, setCommentText] = useState("");
  const createCommentMutation = useCreateComment();

  if (isLoading) return <CircularProgress />;
  if (isError || !snippet)
    return <Typography color="error">Error loading snippet</Typography>;

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    createCommentMutation.mutate(
      { snippetId: snippet.id, content: commentText },
      {
        onSuccess: () => setCommentText(""),
      }
    );
  };

  return (
    <Box
      sx={{
        padding: 2,
        maxWidth: "1300px",
        margin: "0 auto",
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
      }}
    >
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "#666" }}
      >
        &larr; Back
      </Button>

      {/* Выводим сниппет полностью (SnippetCard включает редактор кода, лайки, комментарии) */}
      <SnippetCard snippet={snippet} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1, color: "#000" }}>
          Comments:
        </Typography>
        <CommentList comments={snippet.comments} />

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            color: "#000",
          }}
        >
          <TextField
            label="Add a comment"
            multiline
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined" onClick={() => setCommentText("")}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddComment}
              disabled={createCommentMutation.isPending || !commentText.trim()}
            >
              {createCommentMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostPage;

//   SOCKET VERSION !!!
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router"; // используем react-router-dom
// import {
//   Box,
//   CircularProgress,
//   Typography,
//   TextField,
//   Button,
// } from "@mui/material";
// import { useSnippetDetail } from "../../hooks/useSnippetDetail";
// import CommentList, { Comment } from "../../widgets/CommentList/CommentList";
// import { useCreateComment } from "../../hooks/useCreateComment";
// import SnippetCard from "../../widgets/SnippetCard";
// import { io } from "socket.io-client";

// const PostPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { data: snippet, isLoading, isError } = useSnippetDetail(id);
//   const [commentText, setCommentText] = useState("");
//   const [comments, setComments] = useState<Comment[]>([]);
//   const createCommentMutation = useCreateComment();

//   useEffect(() => {
//     if (snippet) {
//       setComments(snippet.comments);
//     }
//   }, [snippet]);

//   useEffect(() => {
//     if (!id) return;
//     const socket = io("https://codelang.vercel.app", {
//       withCredentials: true,
//     });

//     socket.on("connect", () => {
//       console.log("Socket connected, id:", socket.id);
//     });

//     socket.on("disconnect", () => {
//       console.log("Socket disconnected");
//     });

//     socket.emit("joinSnippetRoom", id);

//     socket.on("commentAdded", (newComment: Comment) => {
//       console.log("Received commentAdded event:", newComment);
//       setComments((prev) => [...prev, newComment]);
//     });

//     socket.on("connect_error", (err) => {
//       console.error("Socket connection error:", err.message);
//     });

//     return () => {
//       socket.emit("leaveSnippetRoom", id);
//       socket.disconnect();
//     };
//   }, [id]);

//   if (isLoading) return <CircularProgress />;
//   if (isError || !snippet)
//     return <Typography color="error">Error loading snippet</Typography>;

//   const handleAddComment = () => {
//     if (!commentText.trim()) return;
//     createCommentMutation.mutate(
//       { snippetId: snippet.id, content: commentText },
//       {
//         onSuccess: () => setCommentText(""),
//       }
//     );
//   };

//   return (
//     <Box
//       sx={{
//         padding: 2,
//         maxWidth: "1200px",
//         margin: "0 auto",
//         backgroundColor: "#fff",
//         border: "1px solid #e0e0e0",
//         borderRadius: "8px",
//       }}
//     >
//       <Button
//         variant="text"
//         onClick={() => navigate(-1)}
//         sx={{ mb: 2, color: "#666" }}
//       >
//         &larr; Back
//       </Button>

//       <SnippetCard snippet={snippet} />

//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h6" sx={{ mb: 1, color: "#000" }}>
//           Comments:
//         </Typography>
//         <CommentList comments={comments} />

//         <Box
//           sx={{
//             mt: 2,
//             display: "flex",
//             flexDirection: "column",
//             gap: 1,
//             color: "#000",
//           }}
//         >
//           <TextField
//             label="Add a comment"
//             multiline
//             rows={3}
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             fullWidth
//             variant="outlined"
//           />
//           <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
//             <Button variant="outlined" onClick={() => setCommentText("")}>
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleAddComment}
//               disabled={createCommentMutation.isPending || !commentText.trim()}
//             >
//               {createCommentMutation.isPending ? "Saving..." : "Save"}
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default PostPage;
