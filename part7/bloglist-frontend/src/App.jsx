import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { login, setUser } from './reducers/userReducer'
import Login from "./components/Login";
import BlogPage from "./components/BlogPage"
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  useEffect(() => {
    const userData = window.localStorage.getItem("user");
    
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      dispatch(setUser(parsedUserData))
    }
  }, []);

  const handleLogin = async (username, password) => {

    dispatch(login({ username, password }))
  };

  if (user === null) {
    return (
      <>
            <Login handleLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<BlogPage />}></Route>
      </Routes>
        
    </>
  );
};

export default App;
