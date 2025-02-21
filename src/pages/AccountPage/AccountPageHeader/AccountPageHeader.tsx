import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./accountPageHeader.css";

export interface AccountPageHeaderProps {
  avatarUrl?: string;
  username: string;
  id: number;
  role: string;
  rating: number;
  snippets: number;
  comments: number;
  likes: number;
  dislikes: number;
  questions: number;
  correctAnswers: number;
  regularAnswers: number;
}

const AccountPageHeader: React.FC<AccountPageHeaderProps> = ({
  avatarUrl,
  username,
  id,
  role,
  rating,
  snippets,
  comments,
  likes,
  dislikes,
  questions,
  correctAnswers,
  regularAnswers,
}) => {
  return (
    <Box className="account-header">
      <Box className="account-header__top">
        <Box className="account-header__left">
          <Avatar
            src={avatarUrl}
            sx={{ width: 80, height: 80 }}
            className="account-header__avatar"
          />
          <Box className="account-header__user-info">
            <Typography variant="h5" className="account-header__username">
              {username}
            </Typography>
            <Typography variant="body2" className="account-header__details">
              Id: {id} | Role: {role}
            </Typography>
          </Box>
        </Box>

        <Box className="account-header__actions">
          <IconButton color="warning">
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Box className="account-header__stats">
        <Typography>Rating: {rating}</Typography>
        <Typography>Snippets: {snippets}</Typography>
        <Typography>Comments: {comments}</Typography>
        <Typography>Likes: {likes}</Typography>
        <Typography>Dislikes: {dislikes}</Typography>
        <Typography>Questions: {questions}</Typography>
        <Typography>Correct Answers: {correctAnswers}</Typography>
        <Typography>Regular Answers: {regularAnswers}</Typography>
      </Box>
    </Box>
  );
};

export default AccountPageHeader;
