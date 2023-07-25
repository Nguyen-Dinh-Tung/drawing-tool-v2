import React, { useEffect, useState } from "react";
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
import { useNotification } from "../../helper/notification";
import { artComments, sendComment } from "../../api/art.api";
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

const CommentSection = ({ art }) => {
  const [comment, setComment] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const classes = useStyles();
  const [commentsData, setCommentsData] = useState([]);
  const [createNotification] = useNotification();
  const [reRender, setReRender] = useState("");
  const handleMenuOpen = (event, commentId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  useEffect(() => {
    const filter = {
      filter: {
        searchField: "",
        code: "",
        name: "",
      },
      orderBy: [
        {
          fieldName: "",
          direction: 0,
        },
      ],
      pageIndex: 0,
      pageSize: -1,
      showTotal: true,
      listFilter: [],
    };
    artComments(filter, art.id)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        setCommentsData(res.data.result.data);
      })
      .catch((e) => {
        if (e) {
          createNotification(true, e.response.data.message, "error");
          return;
        }
      });
  }, [art, reRender]);

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedCommentId(null);
  };

  const handleSendComment = () => {
    if (!comment) return;
    const newComment = {
      artId: art.id,
      text: comment,
    };
    sendComment(newComment)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
          return;
        }
        setReRender(Date.now());
      })
      .catch((e) => {
        if (e) {
          createNotification(true, e.response.data.message, "error");
          return;
        }
      });
    setComment("");
  };

  // const renderChildComments = (childComments) => {
  //   if (!childComments || childComments.length === 0) {
  //     return null;
  //   }

  //   return childComments.map((childComment) => (
  //     <div key={childComment.id} className={classes.comment}>
  //       {/* Render child comment content */}
  //       <div className={classes.commentSubContent}>
  //         <Avatar
  //           src={childComment && childComment.userAvatar}
  //           className={classes.commentAvatar}
  //         />
  //         <div className={classes.commentContent}>
  //           <Typography variant="body1" className={classes.commentUserName}>
  //             {childComment && childComment.userName}
  //           </Typography>
  //           <Typography variant="body2">{childComment.text}</Typography>
  //         </div>
  //       </div>
  //       {/* Render child comment menu */}
  //       <IconButton onClick={(event) => handleMenuOpen(event, childComment.id)}>
  //         <MoreVertIcon />
  //       </IconButton>
  //       <Menu
  //         sx={{ float: "right" }}
  //         anchorEl={menuAnchorEl}
  //         open={selectedCommentId === childComment.id}
  //         onClose={handleMenuClose}
  //         onClick={handleMenuClose}>
  //         <MenuItem>Report</MenuItem>
  //         {/* Add more menu items if needed */}
  //       </Menu>
  //       {/* Render child comments recursively */}
  //       {renderChildComments(childComment.children)}
  //     </div>
  //   ));
  // };

  return (
    <div className={classes.commentSection}>
      <Typography sx={{ marginTop: 4, marginBottom: 2 }} variant="h6">
        Hello bà con nhé
      </Typography>
      <div>
        {commentsData.map((commentData) => (
          <div key={commentData.id} className={classes.comment}>
            {/* Render parent comment content */}
            <div className={classes.commentSubContent}>
              <Avatar
                src={commentData && commentData.userAvatar}
                className={classes.commentAvatar}
              />
              <div className={classes.commentContent}>
                <Typography variant="body1" className={classes.commentUserName}>
                  {commentData && commentData.userName}
                </Typography>
                <Typography variant="body2">{commentData.text}</Typography>
              </div>
            </div>
            {/* Render parent comment menu */}
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
            {/* Render child comments */}
            {/* {renderChildComments(
              commentsData.map((e) =>
                e.commentParrentId ? e.commentParrentId : ""
              )
            )} */}
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
