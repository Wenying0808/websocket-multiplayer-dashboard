const socket = io("http://localhost:3100");

socket.on("connect", (response) => {
    console.log(response);
})