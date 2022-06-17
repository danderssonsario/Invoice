import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Reset from './pages/Reset.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NewPass from './pages/Newpass.jsx'
import Invoices from './pages/Invoices.jsx'
import Invoice from './pages/Invoice.jsx'
import Create from './pages/Create.jsx'

function App() {
  return (
    <>
      <Router>
        <>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/reset' element={<Reset />}></Route>
            <Route path='/reset/:token' element={<NewPass />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route exact path='/invoice' element={<Invoices />}></Route>
            <Route path='/invoice/:id' element={<Invoice />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
          </Routes>
        </>
      </Router>
      <ToastContainer
        limit={1}
        position='top-right'
        autoClose={2000}
        hideProgressBar={true}
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
