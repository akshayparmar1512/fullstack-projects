import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import routes from './routes'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter(routes)

function App() {

  return (
    <>
    <RouterProvider router={router}/>
     <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
