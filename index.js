const app = require("express")()
const server = require("http").createServer(app)
const cors = require("cors") // useful when deploying

const io = require("socket.io")(server, {
  // option object
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

app.use(cors())

const PORT = process.env.PORT || 5000

// Routes
app.get("/", (req, res) => {
  res.send("Running")
})

// Socket.io Handlers
io.on("connection", (socket) => {
  socket.emit("me", socket.id)

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded")
  })

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name })
  })

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal)
  })
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
