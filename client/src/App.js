import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";

// Styling
const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    background: "#202124",
    position: "relative",
  },
  header: {
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#202124",
    borderBottom: "1px solid #3c4043",
    zIndex: 1000,

    [theme.breakpoints.down("xs")]: {
      padding: "12px 16px",
    },
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#e8eaed",
    fontSize: "22px",
    fontWeight: 500,
    letterSpacing: "-0.5px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
      gap: "8px",
    },
  },
  logoText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logoTextMobile: {
    display: "none",

    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  logoIcon: {
    width: "40px",
    height: "40px",
    background: "#1a73e8",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "20px",
    fontWeight: 600,

    [theme.breakpoints.down("xs")]: {
      width: "32px",
      height: "32px",
      fontSize: "16px",
    },
  },
  mainContent: {
    display: "flex",
    flex: 1,
    width: "100%",
    overflow: "hidden",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.logo}>
          <div className={classes.logoIcon}>C</div>
          <span>
            ConnectNow - Video Chat WebApp
          </span>
          <span className={classes.logoTextMobile}>ConnectNow</span>
        </div>
      </div>
      <div className={classes.mainContent}>
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
      </div>
    </div>
  );
};

export default App;
