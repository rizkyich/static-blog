import React, {useState, useEffect} from 'react'

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


export default function NavBar () {
  const [navOpen, setNavOpen] = useState(false)
  const size = useWindowSize()

  useEffect(() => {
    if (size.width > 768) setNavOpen(false)
  }, [size])

  return (
    <nav id="nav-web" className="relative py-3 px-6 md:px-16 xl:px-32 2xl:px-60 shadow-md flex justify-between">
      {/* <div className="container"> */}
        <a className="flex h-12/12 items-center" href="https://higo.id/">
          <img src="/logo-sosmed/higo.png" className="w-9/12"/>
        </a>

        <ul className="justify-between hidden md:flex">
          <li className="mx-5">
            <a href="https://higo.id/about-us">About Us</a>
          </li>
          <li className="mx-5">
            <a href="https://higo.id/higospot">HIGOspot</a>
          </li>
          <li className="mx-5">
            <a href="https://higo.id/case-study">Case Study</a>
          </li>
          <li className="mx-5">
            <a href="">Blog</a>
          </li>
          <li className="mx-5">
            <a href="https://higo.id/contact-us">Contact Us</a>
          </li>
        </ul>

        <button onClick={() => setNavOpen(!navOpen)} className="w-7 py-1 h-12/12 flex flex-col md:hidden justify-between">
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
        </button>
      {/* </div> */}
      {
        navOpen &&
        <div style={{backgroundColor: 'rgba(0,0,0,.2)'}} className="w-full absolute top-12 left-0 md:hidden  h-screen overflow-hidden">
            <div className="nav-open w-full rounded-b-3xl h-72 z-50 transition-all duration-150">
            <ul className="flex flex-col items-center w-full h-full py-8 justify-between">
              <li className="my-2">
                <a href="https://higo.id/about-us">About Us</a>
              </li>
              <li className="my-2">
                <a href="https://higo.id/higospot">HIGOspot</a>
              </li>
              <li className="my-2">
                <a href="https://higo.id/case-study">Case Study</a>
              </li>
              <li className="my-2">
                <a href="">Blog</a>
              </li>
              <li className="my-2">
                <a href="https://higo.id/contact-us">Contact Us</a>
              </li>
            </ul>
            </div>
            <div onClick={() => setNavOpen(false)} className="w-full h-full bg-black opacity-40"></div>
        </div>
      }
    </nav>
  )
}