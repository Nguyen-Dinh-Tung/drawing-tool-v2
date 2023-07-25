import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CommentSection from "../../components/comment/Comment";
import { artHome, rateArt } from "../../api/art.api";
import { useNotification } from "../../helper/notification";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
  dialogContent: {},
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
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [arts, setArts] = useState([]);
  const [reRender, setReRender] = useState("");
  const [createNotification] = useNotification();
  const handleImageClick = (image) => {
    setOpenDialog(true);
    setCurrentImage(image);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentImage(null);
  };
  const handleClickLike = (art) => {
    const newRate = {
      artId: art.id,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      like: true,
      dislike: false,
    };
    rateArt(newRate)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
        }
      })
      .catch((e) => {
        if (e) {
          createNotification(true, e.response.data.message, "error");
        }
      });
    setReRender(Date.now());
  };

  const handleClickDislike = (art) => {
    const newRate = {
      artId: art.id,
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      dislike: true,
    };
    rateArt(newRate)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
        }
      })
      .catch((e) => {
        if (e) {
          createNotification(true, e.response.data.message, "error");
        }
      });
    setReRender(Date.now());
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
    artHome(filter)
      .then((res) => {
        if (res.data.isError) {
          createNotification(true, res.data.message, "error");
        }
        setArts(res.data.result.data);
      })
      .catch((e) => {
        if (e) {
          createNotification(true, e.response.data.message, "error");
        }
      });
  }, [reRender]);
  return (
    <div style={{ margin: "100px  32px  0" }}>
      <Grid container spacing={4}>
        {arts.map((art, index) => (
          <Grid key={index} item xs={6} sm={3}>
            <Paper
              className={classes.imageContainer}
              style={{ paddingBottom: 0 }}>
              <img
                src={art.artUrl}
                alt={`Image ${index + 1}`}
                onClick={() => handleImageClick(art)}
              />
              <div className={classes.buttonContainer}>
                <Tooltip title="Like" className={classes.likeButton}>
                  <IconButton
                    color="primary"
                    onClick={() => handleClickLike(art)}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="subtitle1" className={classes.likesText}>
                  {art.totalLike}
                </Typography>
                <Tooltip title="Dislike" className={classes.commentButton}>
                  <IconButton
                    color="primary"
                    sx={{ color: "white" }}
                    onClick={() => handleImageClick(art)}>
                    <ThumbDownOffAltIcon />
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
                  src={currentImage && currentImage.artUrl}
                  alt="Enlarged Image"
                  style={{ width: "100%" }}
                />
              </div>
              {currentImage ? (
                <CommentSection art={currentImage && currentImage} />
              ) : (
                ""
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
};

export default Art;
// const images = [
//   "https://cdn.pixabay.com/photo/2016/12/19/21/36/woman-1919143_1280.jpg",
//   "https://cdn.pixabay.com/photo/2017/11/29/09/15/paint-2985569_1280.jpg",
//   "https://cdn.pixabay.com/photo/2014/02/25/22/06/staircase-274614_640.jpg",
//   "https://cdn.pixabay.com/photo/2017/02/04/23/02/candle-2038736_640.jpg",
// ];
