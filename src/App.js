
import Login  from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Signup from './components/Signup/Signup';
import { Outlet } from 'react-router-dom';

function App() {


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h1 className="text-center">React Auth</h1>
            <hr />
            <Login />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
