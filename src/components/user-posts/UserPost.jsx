import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

export default function UserPost({ media }) {
  const [audio] = useState(new Audio(media.media_link));
  const [isPlaying, setIsPlaying] = useState(false);
  const play = () => {
    audio.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audio.pause();
    setIsPlaying(false);
  };
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {media.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {media.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {isPlaying ? (
            <IconButton onClick={() => pause()} aria-label="play/pause">
              <PauseIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => play()} aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Card>
  );
}
