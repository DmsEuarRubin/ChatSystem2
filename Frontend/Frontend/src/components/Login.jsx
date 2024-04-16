import { useState } from "react"

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onFinish = async (e)=> {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3001/users/loginUser', {
                method: 'POST',
                // credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
        } catch(err){
            console.log(err.message)
        };
    };
    return (
        <form onSubmit={onFinish}>
            <label for="email">Email:</label>
            <input type="text" id="email" value={email} onChange={(e)=> setEmail(e.target.value)}/><br/>

            <label for="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}/><hr/>

            <button type="submit">Login</button>
        </form>
    )
}

export default Login