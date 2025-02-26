import React from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { useAccountInfo } from "../../features/account/model/useMe";
import { useUserStatistic } from "../../features/account/model/useUserStatistics";
import AccountPageHeader from "./AccountPageHeader";
import EditProfileForm from "../../features/account/ui/EditProfileForm";
import ChangePasswordForm from "../../features/account/ui/ChangePasswordForm";
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

      <AccountPageHeader
        username={account.username}
        id={Number(account.id)}
        role={account.role}
        avatarUrl=""
        rating={stat.rating}
        snippets={stat.snippets}
        comments={stat.comments}
        likes={stat.likes}
        dislikes={stat.dislikes}
        questions={stat.questions}
        correctAnswers={stat.correctAnswers}
        regularAnswers={stat.regularAnswers}
      />

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
