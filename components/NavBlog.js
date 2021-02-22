import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {GoTop} from '../components/GoTop'

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    
      // Add event listener
      window.addEventListener("resize", handleResize);
     
      // Call handler right away so state gets updated with initial window size
      handleResize();
    
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export const NavBlog = ({getNavOpen}) => {
  const [searchText, setSearchText] = useState('')
  const [showNav, setShowNav] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [enlargeSearch, setEnlargeSearch] = useState(false)
  const [showGoTop, setShowGoTop] = useState(false)
  const size = useWindowSize()
  const router = useRouter()
  const pathName = router.pathname

  const toggleNav = () => {
    setShowNav(!showNav)
    if (showNav) {
      getNavOpen(false)
      if (enlargeSearch) setEnlargeSearch(false)
    } else {
      getNavOpen(true)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    router.push(`/search?q=${searchText}`)
  }

  const handleScroll = () => {
    const offset = window.scrollY
    if (!showNav && offset > 43) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }

    if (offset < 350) setShowGoTop(false)

    if (offset > 850) {
      setShowGoTop(true)
    } 
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  const capsFirstLetter = () => {
    if (pathName === '/') return 'All'
    else if (pathName === '/higoes-update') return 'HIGOes Update'
    else if (pathName === '/hangout') return 'Hangout'
    else if (pathName === '/lifestyle') return 'Lifestyle'
    else if (pathName === '/tech-social-media') return 'Tech & Social Media'
    else if (pathName === '/business-tips') return 'Business Tips'
    else if (pathName === '/video') return 'Video'
    else return '' 
  }

  useEffect(() => {
    if (size.width > 768) setShowNav(false)
  }, [size])

  let x = [
    'navbar'
  ]

  if (scrolled) x.push('scrolled')

  return (
    <nav style={{zIndex: 9999}} className={`${x.join(' ')} w-full px5 shadow-md h-14`}>
      {
        showGoTop && <GoTop/>
      }
      <ul className="md:flex hidden align-items-center justify-center w-full h-full py-4 px-2 lg:px-0 bg-white">
        <li className={`transition-all duration-150 lg:mx-4 mx-2 xl:mx-6 lg:text-base cursor-pointer hover:border-b-2 hover:border-blue-500 text-sm ${pathName === '/' ? 'border-b-2 border-blue-500' : null}`}>
          <Link href="/">
            <a>All</a>
          </Link>
        </li>
        <li className={`transition-all duration-150 lg:mx-4 mx-2 xl:mx-6 lg:text-base cursor-pointer hover:border-b-2 hover:border-blue-500 text-sm ${pathName === '/higoes-update' ? 'border-b-2 border-blue-500' : null}`}>
          <Link href="/higoes-update">
            <a>HIGOes Update</a>
          </Link>
        </li>
        <li className={`transition-all duration-150 lg:mx-4 mx-2 xl:mx-6 lg:text-base cursor-pointer hover:border-b-2 hover:border-blue-500 text-sm ${pathName === '/hangout' ? 'border-b-2 border-blue-500' : null}`}>
          <Link href="/hangout">
            <a>Hangout</a>
          </Link>
        </li>
        <li className={`transition-all duration-150 lg:mx-4 mx-2 xl:mx-6 lg:text-base cursor-pointer hover:border-b-2 hover:border-blue-500 text-sm ${pathName === '/lifestyle' ? 'border-b-2 border-blue-500' : null}`}>
          <Link href="/lifestyle">
            <a>Lifestyle</a>
          </Link>
        </li>
        <li className={`transition-all duration-150 lg:mx-4 mx-2 xl:mx-6 lg:text-base cursor-pointer hover:border-b-2 hover:border-blue-500 text-sm ${pathName === '/tech-social-media' ? 'border-b-2 border-blue-500' : null}`}>
          <Link href="/tech-social-media">
            <a>Tech & Social Media</a>
          </Link>
        </li>
        <li className={`transition-all duration-150 lg:mx-4 mx-2 xl:mx-6 lg:text-base cursor-pointer hover:border-b-2 hover:border-blue-500 text-sm ${pathName === '/business-tips' ? 'border-b-2 border-blue-500' : null}`}>
          <Link href="/business-tips">
            <a>Business Tips</a>
          </Link>
        </li>
        {/* <li className={`transition-all duration-150 lg:mx-4 mx-2 lg:text-base cursor-pointer hover:border-b-2 hover:border-blue-500 text-sm ${pathName === '/video' ? 'border-b-2 border-blue-500' : null}`}>
          <Link href="/video">
            <a>Video</a>
          </Link>
        </li> */}
        <li className="w-40 lg:w-44 lg:mx-4 lg:text-base text-sm mx-2 xl:mx-6">
        {/* <FontAwesomeIcon color="black" icon={["fas", "search"]} /> */}
          <form onSubmit={handleSubmit} className="px-1 flex rounded-full border-2 border-color-black-300">
            <input
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="w-10/12 px-1 focus:outline-none outline-none border-transparent"
              placeholder="Search..."
            />
            <button type="submit" className="w-3/12">
              <FontAwesomeIcon color="black" icon={["fas", "search"]} />
            </button>
          </form>
        </li>
      </ul>

      {/* Mobile nav */}
      <div className="md:hidden w-full bg-white h-full px-6 flex align-items-center">
      <div className="w-full h-full relative flex items-center">
            <div className="w-6 h-full cursor-pointer flex flex-col justify-center" onClick={toggleNav} >
              <div className="w-full h-0.5 bg-blue-700"></div>
              <div className="w-10/12 h-0.5 bg-blue-700 my-1"></div>
              <div className="w-full h-0.5 bg-blue-700"></div>
            </div>

            <h1 className="w-auto px-4 text-blue-700">{capsFirstLetter(pathName)}</h1>

            <div className={`right-0 absolute transition-all duration-150 ml-auto ${enlargeSearch ? 'w-full' : 'w-10'} shadow-lg h-10 rounded-full bg-white`}>
              {
                !enlargeSearch ? 
                  <button className="w-full h-full" onClick={() => setEnlargeSearch(true)}>
                    <FontAwesomeIcon color="black" icon={["fas", "search"]} />
                  </button>
                :
                  <div className="flex transition-all duration-150 h-full w-full relative items-center">
                    <form onSubmit={handleSubmit} style={{'width': 'calc(100% - 3rem)'}} className="h-full flex">
                      <button type="submit" className="w-10 absolute right-0 h-full rounded-full bg-blue-700 hover:bg-blue-800">
                        <FontAwesomeIcon color="white" icon={["fas", "arrow-right"]} />
                      </button>
                      <input
                        autoFocus
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{'width': 'calc(100% - 3rem)'}}
                        className="px-1 focus:outline-none ml-12"
                        placeholder="Search..."
                      />
                    </form>
                    <button type="submit" className="absolute w-10 h-full rounded-full bg-red-500 hover:bg-red-700 -left-0.5" onClick={() => setEnlargeSearch(false)}>
                      <FontAwesomeIcon color="white" icon={["fas", "times"]} />
                    </button>
                  </div>
              }
            </div>
          </div>
        
        {
          showNav ?
          <>
            <div style={{height: 'calc(100vh - 48px)'}} className="z-50 flex nav-mobile absolute w-full bg-black bg-opacity-25 h-full top-12 left-0">
              <nav className="nav-mobile-blog sm:w-7/12 w-9/12 h-full bg-blue-600">

                <div className="h-14 w-full flex pl-5 items-center"> 
                <div onClick={toggleNav} className="mr-4 w-6 cursor-pointer flex flex-col justify-center" onClick={toggleNav} >
                  <div className="w-full h-0.5 transition-all duration-150 bg-white transform rotate-45"></div>
                  <div className="w-10/12 h-0.5 transition-all duration-150 bg-white hidden my-1"></div>
                  <div className="w-full h-0.5 transition-all duration-150 bg-white transform  -translate-y-0.5 -rotate-45"></div>
                </div>
                  <h1 className="text-white text-lg py-auto">{capsFirstLetter(pathName)}</h1>
                </div>

                <ul className="flex flex-col justify-center pl-4 text-white">
                  <li className="transition-all mx-2 my-2 lg:text-base cursor-pointer text-sm">
                    <Link href="/">
                      <a>All</a>
                    </Link>
                  </li>
                  <li className={`transition-all mx-2 my-2 lg:text-base cursor-pointer text-sm`}>
                    <Link href="/higoes-update">
                      <a>HIGOes Update</a>
                    </Link>
                  </li>
                  <li className={`transition-all mx-2 my-2 lg:text-base cursor-pointer text-sm`}>
                    <Link href="/hangout">
                      <a>Hangout</a>
                    </Link>
                  </li>
                  <li className={`transition-all mx-2 my-2 lg:text-base cursor-pointer text-sm`}>
                    <Link href="/lifestyle">
                      <a>Lifestyle</a>
                    </Link>
                  </li>
                  <li className={`transition-all mx-2 my-2 lg:text-base cursor-pointer text-sm`}>
                    <Link href="/tech-social-media">
                      <a>Tech & Social Media</a>
                    </Link>
                  </li>
                  <li className={`transition-all mx-2 my-2 lg:text-base cursor-pointer text-sm`}>
                    <Link href="/business-tips">
                      <a>Business Tips</a>
                    </Link>
                  </li>
                  {/* <li className={`transition-all mx-2 my-2 lg:text-base cursor-pointer text-sm`}>
                    <Link href="/video">
                      <a>Video</a>
                    </Link>
                  </li> */}
                </ul>
              </nav>
              <div onClick={toggleNav} className="sm:w-5/12 w-3/12 h-full"></div>
            </div>
            </>
          :
          null
        }
      </div>
    </nav>
  )
}