import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


function Create() {
  const navigate = useNavigate();
  const [listMerchants, setMerchants ] = useState({
      name: '',
      email: '',
      phone: ''
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state?.item?.id) {
        setMerchants({
            name: location.state.item.name,
            email: location.state.item.email,
            phone: location.state.item.phone
        });
    }
  }, [location.state?.item?.id]);

  const handlechange = (e) => {
    const {name, value} = e.target;
    setMerchants({
      ...listMerchants,
      [name]: value
    });
  }

  const createMerchant = async(e) =>{
    e.preventDefault();

    let local = localStorage.getItem("user-info");
    local = JSON.parse(local);
    let payload = {
      merchant: {
        name: listMerchants.name,
        email: listMerchants.email,
        phone: listMerchants.phone
      }
    };
    try {
      let api = location.state?.item?.id ? `http://localhost:3001/api/v1/merchants/${location.state.item.id}` : 'http://localhost:3001/api/v1/merchants';

      let method = location.state?.item?.id ? 'PUT' : 'POST';
      const result = await fetch(api, {
        method: method,
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
          "uid": local['uid'],
          "client": local['client'],
          "access-token": local['access_token']
        },
        body: JSON.stringify(payload)
      });
      if(result){
        navigate('/login/merchant');
      }


    } catch (error) {
      console.log({error});
    }
  }

  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text"
          name="name"
          value={listMerchants?.name}
          onChange={handlechange}
            >
          </input>
        </label>
        <br />
        <label>
          Email:
          <input type="email"
            name="email"
           value={listMerchants?.email}
            onChange={handlechange}>
          </input>
        </label>
        <br />
        <label>
          Phone:
          <input type="text"
            name="phone"
            value={listMerchants?.phone}
            onChange={handlechange}>
          </input>
        </label>
        <br />
        <div className='flex flex-col items-center'>
          <button type="submit" onClick={createMerchant}> {location.state?.item?.id ? "Update" : "Create"} </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
