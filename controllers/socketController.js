export const socketController = (io) => {
  console.log("I am in socket controller");

  // Track connected players
  const players = {};

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    // Handle new player joining
    socket.on("player_joined", (data) => {
      console.log(`Player joined:`, data);

      // Add the new player to the players list
      players[socket.id] = {
        id: socket.id,
        position: data.position,
        name: data.name,
        color: data.color
      };
      // Broadcast to other players about the new player
      socket.broadcast.emit("new_player", players[socket.id]);
      // Send the current list of players to the newly connected client
      socket.emit("current_players", players);
    });

    // Handle player movement
    socket.on("player_moved", (data) => {
      console.log(`Player moved:`, data);

      // Update the player's position
      if (players[socket.id]) {
        players[socket.id].position = data.position;
      }

      // Broadcast the new position to all other clients
      io.emit("update_position", {
        id: socket.id,
        position: data.position,
      });
    });

    // Handle player disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);

      // Remove the player from the players list
      delete players[socket.id];

      // Notify other clients about the disconnection
      socket.broadcast.emit("player_left", {
        id: socket.id,
      });
    });
  });
};
