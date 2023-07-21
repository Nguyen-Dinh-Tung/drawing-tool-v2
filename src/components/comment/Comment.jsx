import React, { useState } from "react";
import {
  Typography,
  TextField,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  commentSection: {
    // Các thuộc tính CSS tùy chỉnh cho comment section
  },
  comment: {
    display: "flex",
    margin: "20px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentAuthor: {},
  commentContent: {
    // Các thuộc tính CSS tùy chỉnh cho comment content
  },
  commentTextField: {
    // Các thuộc tính CSS tùy chỉnh cho comment text field
  },
  commentSubContent: {
    display: "flex",
    alignItems: "center",
  },
  commentAvatar: {
    marginRight: "20px",
  },
  commentUserName: {
    marginRight: "20px",
  },
}));

const CommentSection = () => {
  const [comment, setComment] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const classes = useStyles();
  const [commentsData, setCommentsData] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "This is a beautiful photo! I love the colors and composition.",
    },
    { id: 2, author: "Jane Smith", content: "Wow! Amazing shot!" },
  ]);

  const handleMenuOpen = (event, commentId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedCommentId(null);
  };

  const handleSendComment = () => {
    const newComment = {
      id: commentsData[commentsData.length - 1].id + 1,
      author: "ramdon",
      content: comment,
    };
    commentsData.push(newComment);
    setCommentsData(commentsData);
    setComment("");
  };

  return (
    <div className={classes.commentSection}>
      <Typography sx={{ marginTop: 4, marginBottom: 2 }} variant="h6">
        Hello bà con nhé
      </Typography>
      <div>
        {commentsData.map((commentData) => (
          <div key={commentData.id} className={classes.comment}>
            <div className={classes.commentSubContent}>
              <Avatar className={classes.commentAvatar}>
                {commentData.author.charAt(0)}
              </Avatar>
              <div className={classes.commentContent}>
                <Typography variant="body1" className={classes.commentUserName}>
                  {commentData.author}
                </Typography>
                <Typography variant="body2">{commentData.content}</Typography>
              </div>
            </div>
            <IconButton
              onClick={(event) => handleMenuOpen(event, commentData.id)}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              sx={{ float: "right" }}
              anchorEl={menuAnchorEl}
              open={selectedCommentId === commentData.id}
              onClose={handleMenuClose}
              onClick={handleMenuClose}>
              <MenuItem>Report</MenuItem>
              {/* Add more menu items if needed */}
            </Menu>
          </div>
        ))}
      </div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          label="Write a comment"
          fullWidth
          margin="normal"
          value={comment}
          className={classes.commentTextField}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendComment();
            }
          }}
        />
        <IconButton color="primary" onClick={handleSendComment}>
          <SendIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default CommentSection;
