const { Router } = require("express");
const router = Router();

const User = require("../models/Users");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => res.send("Hello max"));

router.post("/signup", async (req, res) => {
  const newUser = new User({ email, password });
  await newUser.save();
  const token = jwt.sign({ _id: newUser._id }, 'secret');
  res.status(200).json({ token });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("the email doesn't exist");
  if (user.password !== password) return res.status(401).send("wrong password");
  const token = jwt.sign({ _id: user._id }, 'secret');
  res.status(200).json({ token });
});

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: "description one",
            date: "2023-05-18T20:39:05.2112"
        },
        {
            _id: 2,
            name: 'Task two',
            description: "description two",
            date: "2023-05-18T20:39:05.2112"
        },
        {
            _id: 3,
            name: 'Task three',
            description: "description three",
            date: "2023-05-18T20:39:05.2112"
        }
    ])
});

router.get('/private-tasks',verifyToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: "description one",
            date: "2023-05-18T20:39:05.2112"
        },
        {
            _id: 2,
            name: 'Task two',
            description: "description two",
            date: "2023-05-18T20:39:05.2112"
        },
        {
            _id: 3,
            name: 'Task three',
            description: "description three",
            date: "2023-05-18T20:39:05.2112"
        }
    ])
});

module.exports = router;

function verifyToken(req, res, next) {
if(!req.headers.authorization) {
    return res.status(401).send('Unauthorize request')
}

const token = req.headers.authorization.split(' ')[1]
if(token === "null"){
    return res.status(401).send('Unauthorize request')
}
console.log(token)
const payload = jwt.verify(token, 'secret')
console.log(payload)
req.userId = payload._id;
next()
}

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId)
})