import { Auth } from "../model/auth.model.js";

const generateAccessAndRefereshTokens = async (userid) => {
  try {
    const user = await Auth.findById(userid);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshtoken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return res
      .status(400)
      .json("Something went wrong while generating referesh and access token");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email or password are required" });
    }

    const emailcheck = await Auth.findOne({ email });

    if (!emailcheck) {
      return res.status(400).json("Please register your self");
    }

    const passwordcheck = await emailcheck.isPasswordCorrect(password);

    if (!passwordcheck) {
      return res.status(400).json("Please enter correct password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      emailcheck._id
    );

    const userlogin = await Auth.findById(emailcheck._id).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "successfully login",
        data: userlogin,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (
      [email, password, confirmPassword, role].some((x) => x?.trim() === "")
    ) {
      return res.status(400).json({ message: " All filed are required" });
    }

    const emailchek = await Auth.findOne({ email });

    if (emailchek) {
      return res
        .status(400)
        .json({ message: "you already register your self" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const storeinDb = await Auth.create({
      name,
      email,
      password,
      confirmPassword,
      role,
    });

    return res.status(200).json({ data: storeinDb });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const logout = async (req, res) => {
  const deletedata = await Auth.findByIdAndUpdate(req.user._id, {
    $unset: {
      accessToken: null,
      refreshToken: null,
    },
  },{new:true});

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({messgae:"successfully logout",deletedata})
};
