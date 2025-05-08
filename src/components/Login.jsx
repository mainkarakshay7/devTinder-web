import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true } //helps to set cookie
      );

      if (res.data) {
        dispatch(addUser(res.data));
        return navigate("/");
      }
    } catch (err) {
      setError(err?.response?.data ?? "Something went wrong!");
      console.error(err);
    }
  };

  const signUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          emailId: email,
          password,
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true } //helps to set cookie
      );

      if (res.data) {
        dispatch(addUser(res.data.data));
        return navigate("/profile");
      }
    } catch (err) {
      setError(err?.response?.data ?? "Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm flex justify-center m-auto mt-20">
      <div className="card-body">
        <h2 className="card-title flex justify-center text-2xl">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        {!isLoginForm && (
          <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                className="input w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                className="input w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input w-full"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                className="input w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
          </>
        )}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            className="input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <div className="flex flex-col card-actions justify-center mt-5">
          <p className="text-red-500">{error}</p>
          <button
            className="btn btn-primary w-full"
            onClick={async () =>
              isLoginForm ? await signIn() : await signUp()
            }
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </div>
        {isLoginForm ? (
          <p>
            New user? Please sign up{" "}
            <a
              className="cursor-pointer font-bold text-blue-500"
              onClick={() => setIsLoginForm(false)}
            >
              here
            </a>
          </p>
        ) : (
          <p>
            Already a user? Please login{" "}
            <a
              className="cursor-pointer font-bold text-blue-500"
              onClick={() => setIsLoginForm(true)}
            >
              here
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
