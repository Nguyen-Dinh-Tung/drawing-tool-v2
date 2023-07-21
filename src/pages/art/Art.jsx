import React, { useState } from "react";
import {
  Grid,
  Paper,
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { makeStyles } from "@mui/styles";
import CommentSection from "../../components/comment/Comment";
const useStyles = makeStyles((theme) => ({
  imageContainer: {
    position: "relative",
    "& img": {
      display: "block",
      width: "100%",
      transition: "filter 0.3s ease-in-out",
      cursor: "pointer",
    },
    "&:hover img": {
      filter: "blur(4px)",
    },
  },
  buttonContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    width: "calc(100% - 16px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
    "&:hover": {
      opacity: 1,
    },
  },
  likeButton: {
    pointerEvents: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    border: "2px solid #fff",
    padding: 4,
  },

  commentButton: {
    pointerEvents: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    border: "2px solid #fff",
    padding: 4,
  },
  likesText: {
    color: "#f0f0f0",
  },
  dialogContent: {
    padding: 16,
  },
  imageSection: {},
  commentSection: {
    paddingTop: 8,
  },
  comment: {
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    padding: 16,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginBottom: 8,
  },
}));

const Art = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const handleImageClick = (image) => {
    setOpenDialog(true);
    setCurrentImage(image);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentImage(null);
  };
  const handleClickLike = () => {
    console.log("fack");
  };
  const images = [
    "https://cdn.pixabay.com/photo/2016/12/19/21/36/woman-1919143_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/11/29/09/15/paint-2985569_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/02/25/22/06/staircase-274614_640.jpg",
    "https://cdn.pixabay.com/photo/2017/02/04/23/02/candle-2038736_640.jpg",
  ];

  return (
    <div style={{ margin: "100px  32px  0" }}>
      <Grid container spacing={4}>
        {images.map((image, index) => (
          <Grid key={index} item xs={6} sm={3}>
            <Paper
              className={classes.imageContainer}
              style={{ paddingBottom: 0 }}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                onClick={() => handleImageClick(image)}
              />
              <div className={classes.buttonContainer}>
                <Tooltip title="Like" className={classes.likeButton}>
                  <IconButton color="primary" onClick={handleClickLike}>
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="subtitle1" className={classes.likesText}>
                  20 Likes
                </Typography>
                <Tooltip
                  title="View comments"
                  className={classes.commentButton}>
                  <IconButton
                    color="primary"
                    sx={{ color: "white" }}
                    onClick={handleImageClick}>
                    <CommentIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Paper>
          </Grid>
        ))}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
          <DialogContent>
            <div className={classes.dialogContent}>
              <div className={classes.imageSection}>
                {/* Replace 'currentImage' with the URL of the clicked image */}
                <img
                  src={currentImage}
                  alt="Enlarged Image"
                  style={{ width: "100%" }}
                />
              </div>
              <CommentSection />
            </div>
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
};

export default Art;
// {/* <div className={classes.commentSection}>
//                 <Typography variant="h6">Comments</Typography>
//                 <div>
//                   {/* Replace this div with your actual comment section */}
//                   <div className={classes.comment}>
//                     <Typography
//                       variant="body1"
//                       className={classes.commentAuthor}>
//                       John Doe
//                     </Typography>
//                     <Typography variant="body2">
//                       This is a beautiful photo! I love the colors and
//                       composition.
//                     </Typography>
//                   </div>
//                   <div className={classes.comment}>
//                     <Typography
//                       variant="body1"
//                       className={classes.commentAuthor}>
//                       Jane Smith
//                     </Typography>
//                     <Typography variant="body2">Wow! Amazing shot!</Typography>
//                   </div>
//                   {/* Add more comments as needed */}
//                 </div>
//                 <TextField
//                   variant="outlined"
//                   label="Write a comment"
//                   fullWidth
//                   margin="normal"
//                   value={comment}
//                   className={classes.commentTextField}
//                   onChange={(e) => {
//                     setComment(e.target.value);
//                   }}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       console.log(comment);
//                       setComment("");
//                     }
//                   }}
//                   // Add comment handling logic here (e.g., using state or API)
//                 />
//               </div> */}
