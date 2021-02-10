import React, {useState} from 'react'
import NavBar from './NavWeb'
import {NavBlog} from './NavBlog'

export const MainLayout = ({children}) => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div>
      <NavBar/>
      <NavBlog getNavOpen={(val) => setIsNavOpen(val)}/>
      <div className={`${isNavOpen ? 'overflow-hidden' : null}`} style={{height: `${isNavOpen ? 'calc(100vh - 8rem)' : 'auto'}`}}>
        {children}
      </div>
    </div>
  )
}