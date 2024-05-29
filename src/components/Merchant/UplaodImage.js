import React from 'react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function UploadImage(){
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  let formData = new FormData();


  formData.append('image', image)
  formData.append('merchant[image_attributes][name]', name)

  const imageUpload = async () => {
    try{

      let data = localStorage.getItem("user-info");
      data = JSON.parse(data);

      let result = await fetch(`http://localhost:3001/api/v1/merchants/${location.state?.item?.id}/upload_image`,{
        method: 'POST',
        headers: {
          "uid": data['uid'],
          "client": data['client'],
          "access-token": data['access_token']
        },
        body: formData
      })

      if (result)
        navigate('/login/merchant')
    }
    catch(error){
      console.log({error})
    }
  }

  function handleImage(e){
    console.log(e.target.file)
    setImage(e.target.files[0])
  }

  return (
    <>
      <div>
        <label>UplaodImage</label><br />
        <input type='file' name='file' onChange={handleImage} />
      </div>
      <div>
        <label>Image name:</label>
        <input type='text' name='name' value={name} onChange={(e)=>setName(e.target?.value)}></input>
      </div>
      <div>
        <button type='submit' onClick={imageUpload}>upload</button>
      </div>
    </>
  )
}

export default UploadImage;
