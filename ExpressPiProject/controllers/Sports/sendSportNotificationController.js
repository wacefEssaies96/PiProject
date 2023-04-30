module.exports = function (io) {
    return function (req, res) {
        // Process request
        // ...
console.log("work");
        // Emit event to client
        io.emit('event', data);
    };
};