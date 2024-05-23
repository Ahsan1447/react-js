import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    async function  logout() {
        let data = JSON.parse(localStorage.getItem("user-info"));

        let result = await fetch("http://localhost:3001/api/v1/auth/sign_out", {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "access-token": data["access_token"],
                "client": data["client"],
                "uid": data["uid"]
            }
        });

        result = await result.json();

        if (result.success) {
            localStorage.clear();
            navigate('/');
        }
        else{
            alert("Invalid User");
        }
    }
    return (
        <>
            <button type="submit" className="btn btn-primary"
                onClick={logout}>
                Logout
            </button>
        </>
    )
}

export default Logout;
