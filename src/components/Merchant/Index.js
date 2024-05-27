import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Index() {
  const [listMerchants, setListMerchants ] = useState(null);
  const [updateMerchant, setUpdateMerchant] = useState(null);

  useEffect(() => {
    getMerchants();
  }, []);

  const getMerchants = async () => {
    try {
      let data = localStorage.getItem("user-info");
      data = JSON.parse(data);
      let result = await fetch("http://localhost:3001/api/v1/merchants", {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
          "uid": data['uid'],
          "client": data['client'],
          "access-token": data['access_token']
        }
      });

      result = await result.json();
      setListMerchants(result?.data);

    } catch (error) {
      console.log({error});
    }
  }

  const handlDelete = async (id) => {
    let local = localStorage.getItem("user-info");
    local = JSON.parse(local);

    try {
      let result = await fetch(`http://localhost:3001/api/v1/merchants/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
          "uid": local['uid'],
          "client": local['client'],
          "access-token": local['access_token']
        }
      });
      if(result){
        getMerchants();
      }
    }
    catch (error) {
      console.log({error});
    }
    console.log(id);
  }

  return (
    <>
      <div className="flex flex-inline justify-center justify-item-center">
        Merchants
      </div>

      <div>
        {listMerchants?.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th className='px-9'>Id</th>
                <th className='px-9'>Name</th>
                <th className='px-9'>Phone</th>
                <th className='px-9'>action</th>
              </tr>
            </thead>
            <tbody>
              {listMerchants?.map((item) => (
                <tr key={`${item?.id}`} >
                  <td className='px-9'>{item?.id}</td>
                  <td className='px-20'>{item?.name}</td>
                  <td className='px-9'>{item?.phone}</td>
                  <td className='px-9' ><a href='#'onClick={()=>handlDelete(item?.id)}>Delete</a>  <Link to='/login/merchant/create' state={{item: item}} >Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <br />
      <div className='flex flex-col items-center'>
        <Link to="/login/merchant/create">Create Merchant</Link>
      </div>
    </>
  );
}

export default Index;
