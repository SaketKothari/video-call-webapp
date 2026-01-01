import React, { useState, useContext } from "react";
import {
 Button,
 TextField,
 Typography,
 IconButton,
 Tooltip,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
 FileCopy,
 Call,
 CallEnd,
 Mic,
 MicOff,
 Videocam,
 VideocamOff,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
 sidebar: {
   width: "380px",
   background: "#202124",
   borderLeft: "1px solid #3c4043",
   display: "flex",
   flexDirection: "column",
   height: "calc(100vh - 73px)",
   overflow: "auto",

   [theme.breakpoints.down("md")]: {
     width: "100%",
     height: "auto",
     borderLeft: "none",
     borderTop: "1px solid #3c4043",
     maxHeight: "50vh",
   },
   [theme.breakpoints.down("xs")]: {
     maxHeight: "none",
   },
 },
 section: {
   padding: "24px",
   borderBottom: "1px solid #3c4043",

   [theme.breakpoints.down("xs")]: {
     padding: "16px",
   },
 },
 sectionTitle: {
   fontSize: "14px",
   fontWeight: 500,
   color: "#9aa0a6",
   marginBottom: "16px",
   textTransform: "uppercase",
   letterSpacing: "0.5px",
 },
 textField: {
   marginBottom: "16px",

   "& .MuiOutlinedInput-root": {
     background: "#3c4043",
     borderRadius: "8px",
     color: "#e8eaed",

     "& fieldset": {
       borderColor: "#5f6368",
     },
     "&:hover fieldset": {
       borderColor: "#80868b",
     },
     "&.Mui-focused fieldset": {
       borderColor: "#1a73e8",
     },
   },
   "& .MuiInputLabel-root": {
     color: "#9aa0a6",
   },
   "& .MuiInputLabel-root.Mui-focused": {
     color: "#1a73e8",
   },
 },
 button: {
   borderRadius: "24px",
   padding: "10px 24px",
   textTransform: "none",
   fontSize: "14px",
   fontWeight: 500,
   width: "100%",
   marginBottom: "8px",
   minHeight: "44px",

   [theme.breakpoints.down("xs")]: {
     padding: "12px 20px",
     minHeight: "48px",
   },
 },
 copyButton: {
   background: "#3c4043",
   color: "#e8eaed",

   "&:hover": {
     background: "#5f6368",
   },
 },
 callButton: {
   background: "#1a73e8",
   color: "#fff",

   "&:hover": {
     background: "#1765cc",
   },

   "&:disabled": {
     background: "#3c4043",
     color: "#5f6368",
   },
 },
 hangupButton: {
   background: "#ea4335",
   color: "#fff",

   "&:hover": {
     background: "#d33b2c",
   },
 },
 idDisplay: {
   background: "#3c4043",
   padding: "12px 16px",
   borderRadius: "8px",
   marginBottom: "12px",
   wordBreak: "break-all",
   fontSize: "13px",
   color: "#e8eaed",
   fontFamily: "monospace",
   overflowWrap: "break-word",

   [theme.breakpoints.down("xs")]: {
     fontSize: "11px",
     padding: "10px 12px",
   },
 },
 controls: {
   display: "flex",
   gap: "12px",
   justifyContent: "center",
   padding: "20px 24px",
   background: "#202124",

   [theme.breakpoints.down("xs")]: {
     padding: "16px",
     gap: "8px",
   },
 },
 controlButton: {
   width: "56px",
   height: "56px",
   background: "#3c4043",
   color: "#e8eaed",

   "&:hover": {
     background: "#5f6368",
   },

   [theme.breakpoints.down("sm")]: {
     width: "52px",
     height: "52px",
   },
   [theme.breakpoints.down("xs")]: {
     width: "56px",
     height: "56px",
   },
 },
}));

const Sidebar = ({ children }) => {
 const {
   me,
   callAccepted,
   name,
   setName,
   callEnded,
   leaveCall,
   callUser,
   toggleMute,
   toggleVideo,
 } = useContext(SocketContext);
 const [idToCall, setIdToCall] = useState("");
 const [copied, setCopied] = useState(false);
 const [isMuted, setIsMuted] = useState(false);
 const [isVideoOff, setIsVideoOff] = useState(false);
 const classes = useStyles();

 const handleCopy = () => {
   setCopied(true);
   setTimeout(() => setCopied(false), 2000);
 };

 const handleToggleMute = () => {
   toggleMute();
   setIsMuted(!isMuted);
 };

 const handleToggleVideo = () => {
   toggleVideo();
   setIsVideoOff(!isVideoOff);
 };

 return (
   <div className={classes.sidebar}>
     <div className={classes.section}>
       <Typography className={classes.sectionTitle}>Account Info</Typography>
       <TextField
         label="Your Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
         fullWidth
         className={classes.textField}
         variant="outlined"
         size="small"
       />
       <CopyToClipboard text={me} onCopy={handleCopy}>
         <Button
           variant="contained"
           fullWidth
           startIcon={<FileCopy />}
           className={`${classes.button} ${classes.copyButton}`}
         >
           {copied ? "ID Copied!" : "Copy Your ID"}
         </Button>
       </CopyToClipboard>
     </div>

     <div className={classes.section}>
       <Typography className={classes.sectionTitle}>Join a Call</Typography>
       <TextField
         label="Enter ID to Call"
         value={idToCall}
         onChange={(e) => setIdToCall(e.target.value)}
         fullWidth
         className={classes.textField}
         variant="outlined"
         size="small"
       />
       {callAccepted && !callEnded ? (
         <Button
           variant="contained"
           startIcon={<CallEnd />}
           fullWidth
           onClick={leaveCall}
           className={`${classes.button} ${classes.hangupButton}`}
         >
           End Call
         </Button>
       ) : (
         <Button
           variant="contained"
           startIcon={<Call />}
           fullWidth
           onClick={() => callUser(idToCall)}
           className={`${classes.button} ${classes.callButton}`}
           disabled={!idToCall}
         >
           Start Call
         </Button>
       )}
     </div>

     {callAccepted && !callEnded && (
       <div className={classes.section}>
         <Typography className={classes.sectionTitle}>
           Call Controls
         </Typography>
         <div
           style={{ display: "flex", gap: "12px", justifyContent: "center" }}
         >
           <Tooltip title={isMuted ? "Unmute" : "Mute"}>
             <IconButton
               onClick={handleToggleMute}
               className={classes.controlButton}
               style={{ background: isMuted ? "#ea4335" : "#3c4043" }}
             >
               {isMuted ? <MicOff /> : <Mic />}
             </IconButton>
           </Tooltip>
           <Tooltip title={isVideoOff ? "Turn on camera" : "Turn off camera"}>
             <IconButton
               onClick={handleToggleVideo}
               className={classes.controlButton}
               style={{ background: isVideoOff ? "#ea4335" : "#3c4043" }}
             >
               {isVideoOff ? <VideocamOff /> : <Videocam />}
             </IconButton>
           </Tooltip>
         </div>
       </div>
     )}

     {children}
   </div>
 );
};

export default Sidebar;

