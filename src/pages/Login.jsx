import React, { useState } from "react";
import "../styles/login.css";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function Login() {
  const navigate = useNavigate();
  const[alertMessage,setAlertMessage]=useState("")
  const[isLoading,setIsLoading]=useState(false)
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // login functionality
  const login = async () => {
    setIsLoading(true)
    const { email, password } = values;
    try {
      const res = await fetch("https://instagram12122.herokuapp.com/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(res.status===200){
        setIsLoading(false)
        const data = await res.json();
        localStorage.setItem("token", data);
        window.location='/home'
      }
      else if(res.status!==200){
        setAlertMessage('Invalid credentials')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginMain">
      <div className="container">
        <div className="imageContainer">
          <div className="imageOverlay"></div>
        </div>
        <div className="cardContainer">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="inputContainer">
          <p style={{fontSize:"1.5rem",color:"red",marginBottom:'12px'}}>{alertMessage}</p>
            <Input
              className="input"
              placeholder="fullname or email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <Input
              className="input"
              placeholder="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div className="loginBtnContainer">
            <Button  onClick={login} className="btn">
              {isLoading? <ClipLoader color='white'  size={20} />:"Log In"}
            </Button>
          </div>
          <div className="signupContainer">
            <p>
              Don't have an accout?
              <span onClick={() => navigate("/signup")}>Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
