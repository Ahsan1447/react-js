
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

    if (result.success === false) {
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
      <div className='bg-black h-screen flex flex-col justify-center  items-center rounded-md border-gray-300 text-gray-300'>
        <div className='flex flex-col items-center'>
          <label className='m-5'>Enter username:</label>
          <input type="email" placeholder="email" className='rounded-md'
            onChange={(e)=>setEmail(e.target.value)}>
          </input>
        </div>

        <div className='flex flex-col items-center rounded-md'>
          <label className='m-3'>Enter password:</label>
          <input type="password" placeholder="password" className='rounded-md'
            onChange={(e)=>setPassword(e.target.value)}>
          </input>
        </div>

        <div >
          <button type="submit" className="btn btn-primary flex flex-col justify-center items-center"
            onClick={login}>
          Login </button>
        </div>

        <div>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
