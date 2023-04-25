const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    // validation
    if (!email || !password || !passwordVerify) {
      return res.status(400).json({
        errorMessage: "모든 정보를 입력해 주세요.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: "비밀번호가 6자 이상이여야 합니다.",
      });
    }

    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "비밀번호가 일치하지 않습니다.",
      });
    }

    // Check duplicate account
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "이미 사용중인 아이디입니다.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Save a new user account to the db
    const newUser = new User({
      email,
      passwordHash,
    });
    const savedUser = await newUser.save();

    // Log the user in
    const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);

    // send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ userId: savedUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password) {
      return res.status(400).json({
        errorMessage: "모든 정보를 입력해 주세요.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        errorMessage: "아이디나 비밀번호가 일치하지 않습니다.",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!checkPassword) {
      return res.status(400).json({
        errorMessage: "아이디나 비밀번호가 일치하지 않습니다.",
      });
    }

    // Log the user in
    const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);

    // send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Logout
router.get("/logout", (req, res) => {
  //clear cookie
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

// LoggedIn
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
