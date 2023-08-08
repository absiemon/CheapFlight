import './App.css'
import {Route, Routes} from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import Layout from './Layout';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL; 
axios.defaults.withCredentials = true;

function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}></Route>
        </Route>
      </Routes>
  )
}

export default App
