import React from 'react';
import { useNavigate } from 'react-router-dom';


function Create() {
  const navigate = useNavigate();

  async function createMerchant() {
    let name = document.querySelector('input[name="name"]').value;
    let email = document.querySelector('input[name="email"]').value;

    let local = localStorage.getItem("user-info");
    local = JSON.parse(local);

    let data = {
      merchant: {
        name: name,
        email: email
      }
    };

    await fetch("http://localhost:3001/api/v1/merchants", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "uid": local['uid'],
        "client": local['client'],
        "access-token": local['access_token']
      },
      body: JSON.stringify(data)
    });
    navigate('/login/merchant');
  }

  return (
    <div>
      <h1> Create </h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <button type="submit" onClick={createMerchant}> Submit </button>
      </form>
    </div>
  );
}

export default Create;
