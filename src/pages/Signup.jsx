import React, { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import "../styles/signup.css";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function Signup() {
  const navigate = useNavigate();
  const[alertMessage,setAlertMessage]=useState("")
  const[error,setError]=useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // signup functionality
  const signup = async () => {
    setIsLoading(true)
    const { fullname, username, email, password } = values;
    try {
      const res = await fetch("https://instagram12122.herokuapp.com/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          fullname,
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(res.status===200){
        setIsLoading(false);
        setAlertMessage('user created');
        setTimeout(()=>{
          navigate('/')
        },500)
        setError("")
      }
    } catch (error) {
      setIsLoading(false)
      setAlertMessage(error)
    }
  };

  return (
    <div className="signupContainer">
      <div className="container">
        <div className="logoContainer">
          <img src={Logo} alt="insta logo" />
        </div>
        <div className="quote">
          <p>Sign up to see photos and videos from your friends.</p>
        </div>
        <div className="barContainer">
          <div className="line"></div>
          <p>OR</p>
          <div className="line"></div>
        </div>
        <p style={{fontSize:"1.5rem",color:"red"}}>{alertMessage}</p>
        <div className="inputContainer">
          <Input
            className="input"
            placeholder="Mobile Nubmer or Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <Input
            className="input"
            placeholder="Full Name"
            type="text"
            name="fullname"
            value={values.fullname}
            onChange={handleChange}
          />
          <Input
            className="input"
            placeholder="Username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <Input
            className="input"
            placeholder="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div className="signupBtnContainer">
          <Button className="signupBtn" onClick={signup}>
          {isLoading? <ClipLoader color='white'  size={20} />:"Sign Up"}
          </Button>
        </div>
        <div className="loginLink">
          <p>
            Have an account? <span onClick={() => navigate("/")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
