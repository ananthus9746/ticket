import React from "react";
import "./Login.css";

import { useState } from "react";
import { firebase, auth } from "../../firebase";
import { useNavigate,Link } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  // Inputs
  const [mynumber, setnumber] = useState("");

  // const [fnum,setfnum]=useState('')

  let fnum=`+91${mynumber}`

  console.log("fnum",fnum)

  const [otp, setotp] = useState("");
  // const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");

  // Sent OTP
  const signin = () => {
    if (fnum === "" || fnum.length < 10) return;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(fnum, verify)
      .then((result) => {
        setfinal(result);
        alert("Otp sended on your phone");

        // setshow(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        // success
        alert("Success")
                navigate("/Myticket");

      })
      .catch((err) => {
        alert("Wrong code");
      });
  };

  return (
    <div className="LoginWrapper">
      <div className="login_Container">
        <p className="ticker">Ticker</p>
        <div className=""></div>
        <label className="login_txt" htmlFor="">Phone</label>
        <input    value={mynumber}
              onChange={(e) => {
                setnumber(e.target.value);
              }}
              placeholder="phone number" className="login_input" type="text" name="" id="" placeholder="Phone number" />
        <label className="login_txt"  htmlFor="">OTP</label>
        <input  placeholder={"Enter your OTP"}
              onChange={(e) => {
                setotp(e.target.value);
              }} className="login_input" type="text" name="" id="" />
        <button className="login_btn"  onClick={signin}>Get OTP</button>
        {/* <Link to="scanqr"> */}
        <button  onClick={ValidateOtp} className="login_btn">Login</button>
        {/* </Link> */}
        {/* <button className="login_btn">Verify</button> */}

      </div>

      <div style={{ marginTop: "200px" }}>
        <center>
            <div id="recaptcha-container"></div>
        </center>

      </div>
    </div>
  );
}

export default Login;
