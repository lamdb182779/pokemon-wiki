import { useState } from 'react'
import '../../styles/App/App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import clsx from 'clsx'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Home from '../Home/Home'

function App() {
  const [isLogin] = useState<boolean>(false)

  return (
    <div className='App  font-barlow text-white'>
      <BrowserRouter>
        <header className='App-header'>
          {!isLogin &&
            <Header />
          }
        </header>
        <main className={clsx('App-main flex', {
          'mt-20': !isLogin
        })}>
          <Sidebar />
          <div className='App-content h-screen overflow-scroll bg-zinc-800 grow p-8'>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
