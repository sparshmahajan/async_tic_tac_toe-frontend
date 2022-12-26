import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage  from './components/pages/homepage';
import Signup from "./components/pages/signup";
import Login from './components/pages/login';
import HomeLogin from './components/pages/homeLogin';
import TicTacToe from './components/pages/ticTacToe';
import Challenge from './components/pages/challenge';
import { useSelector } from 'react-redux';

const App = () => {
  const isLoggedin = useSelector((state: any) => state.isLoggedin);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ isLoggedin ? <HomeLogin /> : <Homepage /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/start" element={ isLoggedin ? <TicTacToe /> : <Homepage /> } />
        <Route path="*" element={<h1>404 - Not Found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;