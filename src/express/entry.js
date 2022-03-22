const express = require('express');
const {User, Chat} = require("./schema/schema");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

// addUser("joe", "1995");
// async function addUser(name, password) {
//     const user = new User({username: name, password: password});
//     await user.save();
//     console.log("saved");
// }

module.exports = router;