import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Reset from './components/Reset.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
// import NavBar from './components/NavBar.jsx'

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/reset' element={<Reset />}></Route>
            {/*<Route path='/reset/:token' component={Reset}></Route> */}
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme='dark'
      />
    </>
  )
}

export default App;
