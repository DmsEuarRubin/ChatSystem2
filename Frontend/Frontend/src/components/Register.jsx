function Register(){
    const onFinish = async (e)=> {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/users/createUser', {
                method: 'POST',
                body: JSON.stringify({
                    name: e.target[0].value,
                    email: e.target[1].value,
                    password: e.target[2].value
                }),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            });
        const data = await response.json();
    }
    return(
        <div>
            <form onSubmit={onFinish}>
                <label for="username">Name:</label>
                <input type="text" id="username" name="username"/><br/>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email"/><br/>
                
                <label for="password">Password:</label>
                <input type="password" id="password" name="password"/><hr/>
                
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default Register