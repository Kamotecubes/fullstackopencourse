import Notification from "./Notification";

const Login = ({handleLogin}) => {
    const submit =  (event) => {
        event.preventDefault();
        handleLogin(event.target.Username.value, event.target.Password.value)
      };
    return (
        <>
            <h2>login to application</h2>
            <Notification />
            <form onSubmit={submit}>
              <div>
                username
                <input
                  data-testid="username"
                  type="text"
                  name="Username"
                />
              </div>
              <div>
                password
                <input
                  data-testid="password"
                  type="password"
                  name="Password"
                />
              </div>
              <button type="submit">login</button>
            </form>
        </>
      );
}

export default Login