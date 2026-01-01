import React, { useContext } from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Call } from "@material-ui/icons";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    margin: "24px",
    padding: "20px 24px",
    background: "#3c4043",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    border: "1px solid #5f6368",
    animation: "$slideIn 0.3s ease-out",

    [theme.breakpoints.down("xs")]: {
      margin: "16px",
      padding: "16px",
    },
  },
  callerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#1a73e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: 600,
    color: "#fff",
  },
  callerDetails: {
    flex: 1,
  },
  callerName: {
    color: "#e8eaed",
    fontWeight: 500,
    fontSize: "16px",
    marginBottom: "4px",
  },
  callerStatus: {
    color: "#9aa0a6",
    fontSize: "13px",
  },
  buttonContainer: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      gap: "8px",
    },
  },
  button: {
    borderRadius: "24px",
    padding: "8px 24px",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
    minHeight: "44px",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "12px 24px",
      minHeight: "48px",
    },
  },
  declineButton: {
    background: "#5f6368",
    color: "#e8eaed",

    "&:hover": {
      background: "#80868b",
    },
  },
  answerButton: {
    background: "#1a73e8",
    color: "#fff",

    "&:hover": {
      background: "#1765cc",
    },
  },
  "@keyframes slideIn": {
    from: {
      opacity: 0,
      transform: "translateY(-20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className={classes.notificationContainer}>
          <div className={classes.callerInfo}>
            <div className={classes.avatar}>
              {(call.name || "?")[0].toUpperCase()}
            </div>
            <div className={classes.callerDetails}>
              <Typography className={classes.callerName}>
                {call.name || "Someone"}
              </Typography>
              <Typography className={classes.callerStatus}>
                Incoming call...
              </Typography>
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={`${classes.button} ${classes.answerButton}`}
              startIcon={<Call />}
              onClick={answerCall}
            >
              Accept
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
