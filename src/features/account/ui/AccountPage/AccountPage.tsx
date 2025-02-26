import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAccountInfo } from "../../model/useMe";
import { useUserStatistic } from "../../model/useUserStatistics";
import { useLogout } from "../../../auth/model/useLogout";
import EditProfileForm from "../EditProfileForm/index";
import ChangePasswordForm from "../ChangePasswordForm";
import "./accountPage.css";

const AccountPage: React.FC = () => {
  const {
    data: account,
    isLoading: accLoading,
    isError: accError,
  } = useAccountInfo();
  const userId = account?.id ? Number(account.id) : undefined;
  const {
    data: stat,
    isLoading: statLoading,
    isError: statError,
  } = useUserStatistic(userId);
  const logoutMutation = useLogout();
  const isLogoutLoading = logoutMutation.status === "pending";

  if (accLoading || statLoading) {
    return <CircularProgress />;
  }
  if (accError || statError || !account || !stat) {
    return (
      <Typography color="error">Error loading account or stats</Typography>
    );
  }

  return (
    <Box className="account-page">
      <Typography variant="h4" className="account-page__title">
        Welcome, <span className="highlight">{account.username}</span>
      </Typography>

      {/* Header */}
      <Box className="account-header">
        <Box className="account-header__top">
          <Box className="account-header__left">
            <Avatar
              src="" /* Здесь можно передать URL аватара, если он есть */
              sx={{ width: 80, height: 80 }}
              className="account-header__avatar"
            />
            <Box className="account-header__user-info">
              <Typography variant="h5" className="account-header__username">
                {account.username}
              </Typography>
              <Typography variant="body2" className="account-header__details">
                Id: {Number(account.id)} | Role: {account.role}
              </Typography>
            </Box>
          </Box>
          <Box className="account-header__actions">
            <IconButton
              color="warning"
              onClick={() => logoutMutation.mutate()}
              disabled={isLogoutLoading}
            >
              <LogoutIcon />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Box className="account-header__stats">
          <Typography>Rating: {stat.rating}</Typography>
          <Typography>Snippets: {stat.snippets}</Typography>
          <Typography>Comments: {stat.comments}</Typography>
          <Typography>Likes: {stat.likes}</Typography>
          <Typography>Dislikes: {stat.dislikes}</Typography>
          <Typography>Questions: {stat.questions}</Typography>
          <Typography>Correct Answers: {stat.correctAnswers}</Typography>
          <Typography>Regular Answers: {stat.regularAnswers}</Typography>
        </Box>
      </Box>

      {/* Формы редактирования */}
      <Paper className="account-page__forms">
        <Box className="account-page__forms-inner">
          <Box className="account-page__form">
            <Typography variant="h6" sx={{ mb: 1 }}>
              Edit your profile
            </Typography>
            <EditProfileForm currentUsername={account.username} />
          </Box>
          <Box className="account-page__form">
            <Typography variant="h6" sx={{ mb: 1 }}>
              Change your password
            </Typography>
            <ChangePasswordForm />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AccountPage;
