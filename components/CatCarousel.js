import React, {useEffect, useState} from 'react'
import Link from  'next/link'
import TitleText from '../components/TitleText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

const CatContainer = ({catIdx, item}) => {
  const numberWithPoint = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
  return (
    <div className="mt-4 w-full md:flex flex-col lg:flex-row lg:space-x-4 xl:space-x-6">
      <div className="w-full md-4 md:w-full lg:w-12/12 2xl:w-12/12 xl:w-12/12 2xl:w-10/12 h-auto relative" id="big-cat-1">
        <img className="w-full sm:w-11/12 sm:mx-auto md:w-full h-52 sm:h-80 md:h-96 xl:h-96 2xl:h-xl shadow-lg" src={item[0].img_url} />
        <div className="w-11/12 md:w-full mx-auto">
          <div className="w-full mt-3 flex">
            <p className="text-blue-500 text-sm mr-4">{item[0].type}</p>
            <p className="text-sm text-gray-500">{item[0].date}</p>
          </div>

          <Link href="/[...slug]" as={`/${item[0].redirect_link}`}>
            <a className="group"> 
              <h1 className="transition-all leading-snug h-16 md:h-auto  duratioon-150 mt-1 md:text-lg group-hover:text-blue-700 2xl:text-xl font-bold">{item[0].title}</h1>
              <div className="hidden mt-4 md:block md:h-16 lg:h-auto leading-snug md:mt-2 text-sm 2xl:text-base  group-hover:text-blue-700 text-gray-700" dangerouslySetInnerHTML={{__html: item[0].content}}></div>
            </a>
          </Link>


          <div id="views" className="flex lg:absolute bottom-0 left-0 items-center justify-start">
            <FontAwesomeIcon className="mr-2" color="gray" icon={["fas", "eye"]} />
            <p className="text-xs lg:text-sm text-gray-500">{numberWithPoint(item[0].view)} Views</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-11/12 md:w-full mt-6 lg:mt-0 xl:w-11/12 2xl:w-8/12 mx-auto">

        <div className="flex space-x-4 md:space-x-6 lg:space-x-4 xl:space-x-6">

          <div className="h-auto w-full w-12/12">
            <img className="w-full h-32 sm:h-40 xl:h-40 2xl:h-56 shadow-lg" src={item[1].img_url} />
            <div className="w-full mx-auto">
              <div className="w-full mt-3 flex">
                <p className="text-blue-500 text-sm mr-4">{item[1].type}</p>
                {/* <p className="text-sm">{item[1].date}</p> */}
              </div>
              <Link href="/[...slug]" as={`/${item[1].redirect_link}`}>
                <a>
                  <h1 className="hover:text-blue-700 transition-all font-bold leading-snug h-20 md:h-16 duratioon-150 mt-1 text-sm md:text-base 2xl:text-lg  group-hover:text-blue-500">{item[1].title.length > 63 ? item[1].title.slice(0, 63) + '...' : item[1].title }</h1>
                </a>
              </Link>
              <div id="views" className="flex items-center justify-start">
                <FontAwesomeIcon className="mr-2" color="gray" icon={["fas", "eye"]} />
                <p className="text-xs lg:text-sm text-gray-500">{numberWithPoint(item[1].view)} Views</p>
              </div>
            </div>
          </div>

          <div className="h-auto w-full w-12/12">
            <img className="w-full h-32 sm:h-40 xl:h-40 2xl:h-56 shadow-lg" src={item[2].img_url} />
            <div className="w-full mx-auto">
              <div className="w-full mt-3 flex">
                <p className="text-blue-500 text-sm mr-4">{item[2].type}</p>
                {/* <p className="text-sm">{item[1].date}</p> */}
              </div>
              <Link href="/[...slug]" as={`/${item[2].redirect_link}`}>
                <a>
                  <h1 className="hover:text-blue-700 transition-all font-bold h-20 md:h-16 duratioon-150 leading-snug mt-1 text-sm md:text-base 2xl:text-lg group-hover:text-blue-500">{item[2].title.length > 63 ? item[2].title.slice(0, 58) + '...' : item[2].title }</h1>
                </a>
              </Link>
              <div id="views" className="flex items-center justify-start">
                <FontAwesomeIcon className="mr-2" color="gray" icon={["fas", "eye"]} />
                <p className="text-xs lg:text-sm text-gray-500">{numberWithPoint(item[2].view)} Views</p>
              </div>
            </div>
          </div>


        </div>

        <div className="hidden lg:flex mt-4 space-x-4 xl:space-x-6">

        <div className="h-auto w-full w-12/12">
            <img className="w-full shadow-lg h-40 xl:h-40 2xl:h-56" src={item[3].img_url} />
            <div className="w-full mx-auto">
              <div className="w-full mt-3 flex">
                <p className="text-blue-500 text-sm mr-4">{item[3].type}</p>
                {/* <p className="text-sm">{item[1].date}</p> */}
              </div>
              <Link href="/[...slug]" as={`/${item[3].redirect_link}`}>
                <a>
                  <h1 className="hover:text-blue-700 transition-all font-bold h-20 md:h-16 duratioon-150 mt-1 md:text-base 2xl:text-lg group-hover:text-blue-500">{item[3].title.length > 63 ? item[3].title.slice(0, 60) + '...' : item[3].title }</h1>
                </a>
              </Link>
              <div id="views" className="flex items-center justify-start">
                <FontAwesomeIcon className="mr-2" color="gray" icon={["fas", "eye"]} />
                <p className="text-xs lg:text-sm text-gray-500">{numberWithPoint(item[3].view)} Views</p>
              </div>
            </div>
          </div>

          <div className="h-auto w-full w-12/12">
            <img className="w-full h-40 xl:h-40 shadow-lg 2xl:h-56" src={item[4].img_url} />
            <div className="w-11/12 md:w-full mx-auto">
              <div className="w-full mt-3 flex">
                <p className="text-blue-500 text-sm mr-4">{item[4].type}</p>
                {/* <p className="text-sm">{item[1].date}</p> */}
              </div>
              <Link href="/[...slug]" as={`/${item[4].redirect_link}`}>
                <a>
                  <h1 className="hover:text-blue-700 transition-all font-bold h-20 md:h-16 duratioon-150 mt-1 md:text-base 2xl:text-lg group-hover:text-blue-500">{item[4].title.length > 63 ? item[4].title.slice(0, 60) + '...' : item[4].title }</h1>
                </a>
              </Link>
              <div id="views" className="flex items-center justify-start">
                <FontAwesomeIcon className="mr-2" color="gray" icon={["fas", "eye"]} />
                <p className="text-xs lg:text-sm text-gray-500">{numberWithPoint(item[4].view)} Views</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export const CatCarousel = ({businesstips, lifestyles, techs, hangouts, updates}) => {
  const [categories, setCategories] = useState(['HIGOes Update', 'Hangout', 'Lifestyle', 'Tech & Social Media', 'Business Tips'])
  const size = useWindowSize()
  const [catIndex, setCatIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const idx = catIndex
      if (idx === categories.length - 1) setCatIndex(0)
      else setCatIndex(idx + 1)
    }, 6000)

    if (size.width > 768) {
      clearTimeout(timer)
    } 

    return () => clearTimeout(timer)
  }, [size, catIndex])

  const changeSlide = (operator) => {
    let idx = catIndex
      if (operator === 1) {
        if (catIndex === 0) idx = 4 
        else idx--
      } else {
        if (catIndex === 4) idx = 0
        else idx++
      }
    setCatIndex(idx)
  }

  return (
    <section className="w-full h-auto pt-8 mt-12 overflow-hidden">
      <div className="container mx-auto md:w-11/12 lg:w-full md:px-8 lg:px-0 xl:px-10 2xl:px-20 w-full h-auto">
        <div className="w-full h-auto relative">
          <div className="flex md:hidden absolute top-2 right-4">
            {
              categories.map((e, index) => {
                return (
                  <div className={`${index === 0 ? 'mr-1' : index === categories.length - 1 ? 'ml-1' : 'mx-1'} ${index === catIndex ? 'bg-blue-200': 'bg-white'} w-4 h-4 rounded-full border-2 border-blue-700`} key={e}>
                    
                  </div>
                )
              })
            }
          </div>
          <div className="w-full h-auto flex space-x-4">
            <TitleText text={categories[catIndex]}/>
            <div className="hidden md:flex w-auto h-full">
              
              <button onClick={() => changeSlide(1)} className="w-9  h-8 mr-2 rounded-lg shadow-lg grid place-items-center cursor-pointer">
                <FontAwesomeIcon color="black" size="lg" icon={["fas", "chevron-left"]} />
              </button>
              <button onClick={() => changeSlide(0)} className="w-9  h-8 rounded-lg shadow-lg grid place-items-center cursor-pointer">
                <FontAwesomeIcon color="black" size="lg" icon={["fas", "chevron-right"]} />
              </button>
            </div>
          </div>

          
              <div className={`${catIndex  === 0 ? 'cat-cont cat' : 'invisible hidden' }`}>
                <CatContainer item={updates} catIdx={catIndex}/>
              </div>

              <div className={`${catIndex  === 1 ? 'cat-cont cat' : 'invisible hidden' }`}>
                <CatContainer item={hangouts} className="cat-carousel" catIdx={catIndex}/>
              </div>

              <div className={`${catIndex  === 2 ? 'cat-cont cat' : 'invisible hidden' }`}>
                <CatContainer item={lifestyles} className="cat-carousel" catIdx={catIndex}/>
              </div>

              <div className={`${catIndex  === 3 ? 'cat-cont cat' : 'invisible hidden' }`}>
                <CatContainer item={techs} className="cat-carousel" catIdx={catIndex}/>
              </div>

              <div  className={`${catIndex  === 4 ? 'cat-cont cat' : 'invisible hidden' }`}>
                <CatContainer item={businesstips} className="cat-carousel" catIdx={catIndex}/>
              </div>

        <div id="link-cat" className="w-full mt-8 flex justify-end">
          <Link className="ml-auto w-full" href={catIndex === 0 ? '/higoes-update' : catIndex === 1 ? '/hangout' : catIndex === 2 ? '/lifestyle' : catIndex === 3 ? '/tech-social-media' : '/business-tips' }>
            <a className="text-sm w-16 ml-auto mr-4 text-blue-700">View All</a>
          </Link>
        </div>

        </div>
      </div>
    </section>
  )
}