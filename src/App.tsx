import ChartsAndMaps from "./components/ChartsAndMaps"
import CreateContact from "./components/CreateContact"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Route, Routes } from 'react-router-dom'
import UpdateContact from "./components/UpdateContact"
import ReadContact from "./components/ReadContact"

function App() {

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex lg:relative">
        <div className="xl:absolute h-full sm:block hidden">
          <Sidebar />
        </div>
        <div className="flex justify-center w-full pt-4 sm:pt-5">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path="/create" element={<CreateContact />} />
            <Route path='/read/:id' element={<ReadContact />}/>
            <Route path="/edit/:id" element={<UpdateContact />} />
            <Route path="/charts/:condition" element={<ChartsAndMaps />} />
          </Routes>
        </div>
        
      </div>
    </div>
  )
}

export default App
