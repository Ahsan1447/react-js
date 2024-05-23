import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail ] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const navigate = useNavigate();

  async function signup() {
    let item = { email, password, password_confirmation: passwordConfirmation };

    let result = await fetch("http://localhost:3001/api/v1/auth", {
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
    else{
      navigate('/');
    }
  }

  return (
    <>
      <input type="email" placeholder="email" className="form-controller"
        onChange={(e)=>setEmail(e.target.value)}></input>
      <br />
      <input type="password" placeholder="password" className="form-controller"
        onChange={(e)=>setPassword(e.target.value)}></input>
      <br />
      <input type="password" placeholder="password confirmation" className="form-controller"
        onChange={(e)=>setPasswordConfirmation(e.target.value)}></input>
      <br />
      <button type="submit" className="btn btn-primary"
        onClick={signup}>
        Signup
        </button>
      <br />

      <Link to="/">Login</Link>
    </>
  );
}

export default Signup
