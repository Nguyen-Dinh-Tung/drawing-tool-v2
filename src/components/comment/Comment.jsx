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
import { setModal } from "../../redux/slice/modal.slice";
import { setUserTarget } from "../../redux/slice/target.slice";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  commentSection: {},
  comment: {
    display: "flex",
    margin: "20px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentAuthor: {},
  commentContent: {},
  commentTextField: {},
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
  boxHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "20px 0",
  },
}));

const CommentSection = ({ art, handleCloseDialog }) => {
  const [comment, setComment] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const classes = useStyles();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [commentsData, setCommentsData] = useState([]);
  const [createNotification] = useNotification();
  const [reRender, setReRender] = useState("");

  const dispatch = useDispatch();

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
      pageSize: 10,
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

  const showReport = (art) => {
    dispatch(setModal({ open: true, content: "report" }));
    dispatch(setUserTarget(art));
    handleCloseDialog();
  };
  return (
    <div className={classes.commentSection}>
      <Box className={classes.boxHeader}>
        <Typography variant="h6">Hello bà con nhé</Typography>
        {isLogin ? (
          <IconButton
            color="error"
            onClick={() => {
              showReport(art);
            }}>
            <ReportGmailerrorredIcon />
          </IconButton>
        ) : (
          ""
        )}
      </Box>
      <div>
        {commentsData.map((commentData) => (
          <div key={commentData.id} className={classes.comment}>
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
            <IconButton
              onClick={(event) => handleMenuOpen(event, commentData.id)}>
              <MoreVertIcon />
            </IconButton>
            {/* <Menu
              sx={{ float: "right" }}
              anchorEl={menuAnchorEl}
              open={selectedCommentId === commentData.id}
              onClose={handleMenuClose}
              onClick={handleMenuClose}>
              <MenuItem
                onClick={() => {
                  showReport(commentData);
                }}>
                Reply
              </MenuItem>
            </Menu> */}
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
