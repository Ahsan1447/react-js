import { useState } from 'react';

function Index() {
  const [listMerchants, setMerchants ] = useState([{}]);
  let data = localStorage.getItem("user-info");
  data = JSON.parse(data);

  async function getMerchants() {
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
    let result_data = result['data'];
    setMerchants(result_data);
    console.log(listMerchants);
  }

  return (
    <>
      <div className="flex flex-inline justify-center justify-item-center">
        Merchants
      </div>

      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className='px-9'>Id</th>
              <th className='px-9'>Name</th>
              <th className='px-9'>Phone</th>
            </tr>
          </thead>
          <tbody>
          {
            listMerchants.map((item) => (
              <tr>
                <td className='px-9'>{item.id}</td>
                <td className='px-20'>{item.name}</td>
                <td className='px-9'>{item.phone}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>

      <div>
        <button className="btn btn-primary" onClick={getMerchants}
          >Get Merchants
          </button>
      </div>
    </>

  );
}

export default Index;
