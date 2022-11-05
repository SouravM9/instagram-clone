import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../../App';

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const PostData = () => {

    if (!validateEmail(email)) {
      M.toast({ html: 'Invalid Email', classes: "#e53935 red darken-1" });
      return;
    }

    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" });
        }
        else {
          localStorage.setItem("jwt", data.token);  // Save the token locally to use in create post
          localStorage.setItem("user", JSON.stringify(data.user));

          dispatch({ type: "USER", payload: data.user });

          M.toast({ html: 'Login Successful!', classes: "#81c784 green lighten-2" });
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instawild</h2>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={PostData}
        >
          Login
        </button>
        <h5>
          <Link to="/signup">Dont have an account ?</Link>
        </h5>
        <h6>
          <Link to="/reset">Forgot password ?</Link>
        </h6>

      </div>
    </div>
  )
}

export default Login
