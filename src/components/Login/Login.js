
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail ] = useState('');
  const [password, setPassword] = useState('');


  async function login() {
    let item = {email, password};

    let result = await fetch("http://localhost:3001/api/v1/auth/sign_in", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(item),
    });

    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));

    if (result.error) {
      alert("Invalid User");
    }
    else {
      alert("Login Successful");
        navigate('/logout')
        navigate('/login/merchant')
    }
  }


  return (
    <>
        <div className='flex flex-col'>
          username: <input type="email" placeholder="email" className="form-controller"
            onChange={(e)=>setEmail(e.target.value)}>
          </input>
        </div>

        <div className='flex flex-col'>
          password: <input type="password" placeholder="password" className="form-controller"
            onChange={(e)=>setPassword(e.target.value)}>
          </input>
        </div>

        <div className='flex flex-col'>
          <button type="submit" className="btn btn-primary flex flex-col justify-center items-center"
            onClick={login}>
          Login </button>
        </div>

        <div className='flex flex-col items-center'>
          <Link to="/signup">Signup</Link>
        </div>
    </>
  );
}

export default Login;
