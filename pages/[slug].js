import React, {useState, useEffect, useRef} from 'react'
import {MainLayout} from '../components/MainLayout'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {PopularArticle} from '../components/PopularArticle'
import TitleText from '../components/TitleText'
import {LoadMore} from '../components/LoadMore'

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

const ArticleCont = ({children, data}) => {
  const size = useWindowSize()
  const [windowSize, setWindowSize] = useState(size.width)

  useEffect(() => {
    setWindowSize(size.width)
  }, [size])

  console.log(data, 'sad')

  const numberWithPoint = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const {article} = data

  const subContent = JSON.parse(article.subcontent)

  return (
    <>
      <div className="w-11/12 mx-auto mb-6 lg:w-8/12 lg:mx-0 lg:h-26">
        <div id="tgl-cat" className="mb-2 w-full flex md:justify-start">
          <p className="text-base text-blue-500 mr-4">{article.type}</p>
          <p className="transition-all duratioon-150 text-base group-hover:text-blue-500 md:w-auto">{article.date}</p>
        </div>

        <h1 className="text-left font-semibold leading-snug text-xl md:text-2xl lg:text-3xl">{article.title}</h1>

        <div className="w-full h-auto lg:flex lg:justify-between">
          <h4 className="text-base mt-2 text-gray-500 italic">{article.subtitle}</h4>

          <div id="views" className="flex mt-2 items-center justify-end lg:justify-start">
            <FontAwesomeIcon className="mr-2" color="gray" icon={["fas", "eye"]} />
            <p className="text-sm text-gray-500">{numberWithPoint(article.view)} Views</p>
          </div>
        </div>
      </div>


      <div className="w-auto h-auto relative">
        {/* <div style={{'backgroundImage': 'url(https://blog.higo.id/img//blog/' + article.img_name + ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className="shadow-lg w-full h-64 lg:w-8/12 lg:h-96" id="img-cont">
        </div> */}
        <img src={article.img_url} styles={{height: '32rem'}} className="lg:w-8/12 shadow-xl" />
      </div>


      <div className="relative w-auto h-auto">  
        {children}
        <div className="content-article w-11/12 md:w-12/12 mx-auto h-auto mt-6 text-justify lg:w-8/12 lg:mx-0 lg:pl-32" dangerouslySetInnerHTML={{__html: article.content}}>
          
        </div>
      </div> 
        {/* <div className="hidden md:block mt-1 leading-snug md:mt-2 text-sm text-gray-700"></div> */}

      {
        subContent.map((e, i) => {
          return (  
            e.type === 'content' ? 
               <div key={i} className="content-article w-11/12 md:w-12/12 mx-auto h-auto mt-6 text-justify lg:w-8/12 lg:mx-0 lg:pl-32" dangerouslySetInnerHTML={{__html: e.value}}></div>
            :
            e.type === 'image' ?
              <img key={i} src={e.img_url} styles={{height: '32rem'}} className="lg:w-12/12 mx-auto lg:w-8/12 lg:mx-0 lg:pl-32" />
            :
              <h3 key={i} className="content-article w-11/12 md:w-12/12 mx-auto h-auto mt-12 mb-6 text-justify lg:w-8/12 lg:mx-0 lg:pl-32 font-semibold text-lg">{e.value}</h3>
          )
        })
      }


    </>
  )
}

const ShareArticle = ({slug, res, reloadArticle}) => {
  const {id, title, subtitle, twittershare, facebookshare, linkedinshare, whatsappshare} = res
  const keyId = id
  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {}
        if (d.getElementById(id)) return t
        js = d.createElement(s)
        js.id = id
        js.src = "https://platform.twitter.com/widgets.js"
        fjs.parentNode.insertBefore(js, fjs);
    
        t._e = [];
        t.ready = function(f) {
          t._e.push(f)
        };
    
        return t;
      }(document, "script", "twitter-wjs"))
    }
  })

  const ShareArticle = async (socmed) => {
    const url = 'https://apiw.higo.id/blog-saveshare'
    let reaction = ''

    if (socmed === 'fb') reaction = 'facebookshare'
    if (socmed === 'tw') reaction = 'twittershare'
    if (socmed === 'li') reaction = 'linkedinshare'
    if (socmed === 'wa') reaction = 'whatsappshare'

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({article_id: keyId, action: reaction})
      })

      const json = res.json()

      return json
    } catch (err) {
      console.log(err)
    }
  }

  const openSocmed = (socmed) => {
    if (socmed === 'fb') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://blog.higo.id/' + slug)}`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    if (socmed === 'wa') window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent('https://blog.higo.id/' + slug)}?utm_source=whatsapp&amp;utm_medium=sharer&amp;utm_campaign=social`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    if (socmed === 'tw') window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://blog.higo.id/' + slug)}&text=${title}`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    if (socmed === 'li') window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://blog.higo.id/' + slug)}&text=${title}&summary=${subtitle}&source=LinkedIn`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');

    reloadArticle()
  }

  return (
    <section id="share-container" className="fixed z-50 w-full lg:w-auto left-0 bottom-0 h-12 bg-gray-200 lg:bg-transparent lg:absolute lg:left-8 lg:pt-32">
      <ul className="w-full h-full flex space-x-10 justify-center items-center lg:flex-col lg:space-x-0 lg:space-y-6">
        <li>
          <button className="relative focus:outline-none"  onClick={() => ShareArticle('wa').then(_ => openSocmed('wa'))}>
            <FontAwesomeIcon color="#016FFF" size="2x" icon={["fab", "whatsapp"]} />
            {
              whatsappshare > 0 && <span className="absolute flex items-center justify-center top-0 left-6 w-6 h-6 rounded-full text-sm bg-red-500 text-white ">{whatsappshare}</span>
            }
          </button>
        </li>
        <li>
          <button className="relative focus:outline-none"  onClick={() => ShareArticle('fb').then(_ => openSocmed('fb'))}>
            <FontAwesomeIcon color="#016FFF" size="2x" icon={["fab", "facebook"]} />
            {
             facebookshare > 0 &&<span className="absolute flex items-center justify-center top-0 left-6 w-6 h-6 rounded-full text-sm bg-red-500 text-white ">{facebookshare}</span>
            }
          </button>
        </li>
        <li>
          <button className="relative focus:outline-none"  onClick={() => ShareArticle('tw').then(_ => openSocmed('tw'))}>
            <FontAwesomeIcon color="#016FFF" size="2x" icon={["fab", "twitter"]} />
            {
             twittershare > 0 && <span className="absolute flex items-center justify-center top-0 left-6 w-6 h-6 rounded-full text-sm bg-red-500 text-white ">{twittershare}</span>          
            }
          </button>
        </li>
        <li>
          <button className="relative focus:outline-none" onClick={() => ShareArticle('li').then(_ => openSocmed('li'))}>
            <FontAwesomeIcon color="#016FFF" size="2x" icon={["fab", "linkedin"]} />
            {
              linkedinshare > 0 && <span className="absolute flex items-center justify-center top-0 left-6 w-6 h-6 rounded-full text-sm bg-red-500 text-white ">{linkedinshare}</span>
            }
          </button>
        </li>
      </ul>
    </section>
  )
}

const Reaction = ({res, reloadArticle}) => {
  const [reacted, setReacted] = useState(false)
  const [reactionStr, setReactionStr] = useState('')
  const {suka, terhibur, terinspirasi, bangga, id} = res
  const arrReaction = [{action: 'suka', val: suka}, {action: 'terhibur', val: terhibur}, {val: terinspirasi, action: 'terinspirasi'}, {action: 'bangga', val: bangga}].sort((a, b) => b.val - a.val)
  const keyId = id
  const total = suka + terinspirasi + terhibur + bangga

  // console.log(arrReaction, 'kenapa')

  const updateReaction = async (action) => {
    const url = 'https://apiw.higo.id/blog-savereaction'
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({article_id: keyId, action})
      })

      const json = res.json()
      setReacted(true)
      setReactionStr(action)
      return json
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <section className="mt-16 w-11/12 mx-auto md:w-12/12 lg:w-8/12 lg:ml-0 border-t-2 border-gray-300 py-12 pt-8 flex justify-center items-center flex-wrap ">
      
      {
        reacted ?
        arrReaction.map((e, i) => {
          return (<button key={i}  className={`focus:outline-none flex-col justify-center space-y-1 mx-6 my-2 ${e.action !== reactionStr ? 'opacity-50' : null}`}>
            {/* <Image
              src={`/emoticon/emot_${e.action}.png`}
              alt={e.action}
              width={80}
              height={80}
            /> */}
            <p>{Math.round((e.val === 0 ? total : e.val / total) * 100)}%</p>
            <p>{e.action[0].toUpperCase() + e.action.slice(1, e.action.length)}</p>
          </button>)
        })
        :
        arrReaction.map((e, i) => {
          return (<button key={i} onClick={() => updateReaction(e.action).then(_=> reloadArticle())} className="focus:outline-none flex-col justify-center space-y-1 mx-6 my-2">
            {/* <Image
              src={`/emoticon/emot_${e.action}.png`}
              alt={e.action}
              width={80}
              height={80}
            /> */}
            <p>{Math.round((e.val === 0 ? total : e.val / total) * 100)}%</p>
            <p>{e.action[0].toUpperCase() + e.action.slice(1, e.action.length)}</p>
          </button>)
        })
      }
    </section>
  )
}

const CommentItem = ({keyId, item, goReload}) => {
  const [like, setLike] = useState(false)
  const [openReply, setOpenReply] = useState(false)
  const [username, setUsername] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [replyId, setReplyId] = useState('')
  const [replies, setReplies] = useState([])
  const [showRep, setShowRep] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [lastData, setLastData] = useState(true)
  const [openReplyComment, setOpenReplyComment] = useState(null)
  const [likeArr, setLikeArr] = useState([])
  const replyBtn = useRef()

  const updateLike = async (id) => {
    let likeVal
    if (id) {
      const idFound = likeArr.findIndex(e => e === id)
      console.log(idFound, 'found')
      if (idFound !== -1) {
        const newList = likeArr.filter(x => x !== id)
        setLikeArr(newList)
        likeVal = 0
      } else {
        setLikeArr([...likeArr, id])
        likeVal = 1
      }
    } else {
      setLike(!like)
    }

    const url = 'https://apiw.higo.id/blog-likecomment'
    
    try {
      const res = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }, 
        body: JSON.stringify({comment_id: id ? id : item.id, like: id ? likeVal : like ? 0 : 1}, null, 2)
      })

      const json = await res.json()
      return json
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    if (showRep) {
      // console.log('ayo')
      loadReply().then(data => setReply(data))
    } else {
      // console.log('kenapa')
      setReplies([])
      setReplyId('')
    }
  }, [showRep]);

  const finishComment = () => {
    setLoading(false)
    setComment('')
    setUsername('')
    loadReply(true).then(data => setReply(data))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const url = "https://apiw.higo.id/blog-savecomment"

    try {
      setLoading(true)
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({blog_id: keyId, comment_id: item.id,username, comment})
      })

      const json = res.json()
      // setShowRep(true)
      return json
    } catch (e) {
      throw e
    }

  }
  
  const loadReply = async (rep) => {
    const url = 'https://apiw.higo.id/blog-loadmorereplycomment'
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({comment_id: item.id,reply_comment_id: rep ? '' : replyId})
      })
      console.log('sad')
      const json = await res.json()
      // setShowRep(true)
      return json
    } catch (e) {
      throw e
    }
  }

  const getReplyComment = (id) => {
    if (likeArr.findIndex(em => em === id) !== -1) {
      console.log('kenapa')
      return true
    } else {
      console.log('ga kenapa')
      return false
    }
  }

  const setReply = (data) => {
      // setShowRep(false)
      console.log(data.arr_comment)
      setLastData(data.last_data)
      setReplies([...replies, ...data.arr_comment])
      setReplyId(data.comment_id)
  }

  const getOpenReply = (e) => {
    // const ref = e.currentTarget.id
    if (e === 'base') {
      setOpenReply(true)
    } else {
      setOpenReplyComment(e)
    }

    console.log(openReplyComment, 'kkkk')
  }

  return (
    <div className="w-full py-2 px-2 border-b-2 border-gray-300">
      <div className="flex"><p className="font-semibold mr-3">{item.username}</p><p className="text-gray-600 text-sm">{item.diffdatetext}</p></div>
      <p className="mb-3">{item.comment}</p>
      <div className="flex items-center">
        <p className="mr-3 pt-1">{item.like}</p>
        <button onClick={() => updateLike().then(_ => goReload())} className="focus:outline-none">
          {
            !like ?
            <FontAwesomeIcon color="lightgray" size="lg" icon={["fa", "thumbs-up"]} />
            :
            <FontAwesomeIcon color="blue" size="lg" icon={["fa", "thumbs-up"]} />
          }
        </button>
        {
          !openReply && 
          <button id="btn-base" ref={replyBtn} onClick={() => getOpenReply('base')} className="ml-8 text-sm h-full transition-all duration-150 hover:text-blue-500 focus:outline-none"><p>Balas</p></button>
        }
      </div>
      {
        item.count_reply > 0 &&
        <button onClick={() => setShowRep(!showRep)} className="focus:outline-none text-sm my-1 flex space-x-2 items-center hover:underline text-blue-600"><p>{item.count_reply} Balasan</p><FontAwesomeIcon className="text-blue-500" size="sm" icon={["fa", "chevron-down"]} /></button>
      }
      {
        openReply &&
        <form onSubmit={e => handleSubmit(e).then(data => finishComment(data))} className="flex relative flex-col px-2 mt-2 justify-end items-end w-full h-auto pb-4">
          {
            loading &&
            <div className="absolute top-0 w-full h-full flex justify-center items-center bg-white bg-opacity-70">
              <FontAwesomeIcon className="animate-spin" size="2x" color="#016FFF" icon={["fas", "spinner"]} />
            </div>
          }
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 my-4 py-2 bg-gray-200 focus:outline-none shadow-lg rounded-lg"
            placeholder="Nama"
          />

          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full resize-none px-4 my-0 h-24 py-2 bg-gray-200 focus:outline-none shadow-lg rounded-lg"
            placeholder="Komentar"
          />

          <div className="flex">
            <button onClick={() => setOpenReply(false)} className="focus:outline-none mr-6 w-20 border-2 border-gray-200  bg-gray-200 text-blue-600 mt-4 rounded-lg py-2 group hover:bg-white hover:border-2 hover:border-blue-500">
              <p className="group-hover:text-blue-700">Batal</p>
            </button>

            <button type="submit" className="focus:outline-none w-20 border-b-2 border-blue-700  bg-blue-700 mt-4 rounded-lg py-2 group hover:bg-white hover:border-2 hover:border-blue-500 text-white ">
              <p className="group-hover:text-blue-700">Balas</p>
            </button>
          </div>
        </form>
      }

      {
        replies[0] &&
        replies.map((e, idx) => {

          return (
            <div key={idx} className={`pl-8 mb-3 mt-3 py-3 ${idx !== replies.length - 1 ?' border-gray-300 border-b-2' : null}`}>

              <div className="flex"><p className="font-semibold mr-3">{e.username}</p><p className="text-gray-600 text-sm">{e.diffdatetext}</p></div>
                <p className="mb-3">{e.comment}</p>
                <div className="flex items-center">
                  <p className="mr-3 pt-1">{getReplyComment(e.id) ? e.like + 1 : e.like }</p>
                  <button onClick={() => updateLike(e.id)} className="focus:outline-none">
                    {
                  likeArr.findIndex(em => em === e.id) === -1 ?
                  <FontAwesomeIcon color="lightgray" size="lg" icon={["fa", "thumbs-up"]} />
                  :
                  <FontAwesomeIcon color="blue" size="lg" icon={["fa", "thumbs-up"]} />
                }
              </button>
                {
                  openReplyComment !== idx && 
                  <button id={`btn-${idx}`} ref={replyBtn} onClick={() => getOpenReply(idx)} className="ml-8 text-sm h-full transition-all duration-150 hover:text-blue-500 focus:outline-none"><p>Balas</p></button>
                }
              </div>
              {
                openReplyComment === idx &&
                <form onSubmit={e => handleSubmit(e).then(data => finishComment(data))} className="flex relative flex-col px-2 mt-2 justify-end items-end w-full h-auto pb-4">
                  {
                    loading &&
                    <div className="absolute top-0 w-full h-full flex justify-center items-center bg-white bg-opacity-70">
                      <FontAwesomeIcon className="animate-spin" size="2x" color="#016FFF" icon={["fas", "spinner"]} />
                    </div>
                  }
                  <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full px-4 my-4 py-2 bg-gray-200 focus:outline-none shadow-lg rounded-lg"
                    placeholder="Nama"
                  />

                  <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="w-full resize-none px-4 my-0 h-24 py-2 bg-gray-200 focus:outline-none shadow-lg rounded-lg"
                    placeholder="Komentar"
                  />

                  <div className="flex">
                    <button onClick={() => setOpenReply(false)} className="focus:outline-none mr-6 w-20 border-2 border-gray-200  bg-gray-200 text-blue-600 mt-4 rounded-lg py-2 group hover:bg-white hover:border-2 hover:border-blue-500">
                      <p className="group-hover:text-blue-700">Batal</p>
                    </button>

                    <button type="submit" className="focus:outline-none w-20 border-b-2 border-blue-700  bg-blue-700 mt-4 rounded-lg py-2 group hover:bg-white hover:border-2 hover:border-blue-500 text-white ">
                      <p className="group-hover:text-blue-700">Balas</p>
                    </button>
                  </div>
                </form>
              }
            </div>)
        })

      }
      {
        !lastData && <button onClick={() => loadReply().then(comments => setReply(comments))} className="flex focus:outline-none border-b-2 border-white hover:border-gray-500 transition-all duration-150 space-x-3 my-2 px-3"><FontAwesomeIcon color="lightgray" size="lg" icon={["fa", `${loadMore ? 'minus' : 'plus'}`]} />
        <p className="text-gray-500">{loadMore ? 'Sembunyikan komentar' : 'Komentar lainnyas...'}</p></button>
      }
    </div>
  )
}

const CommentSection = ({data, arrCommentId, isLastData, keyId, reloadArticle, commentLength}) => {
  const [username, setUsername] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [dataComment, setDataComment] = useState([])
  const [commentId, setCommentId] = useState(arrCommentId)
  const [lastData, setLastData] = useState(isLastData)


  useEffect(() => {
    setDataComment(data)

    return () => setDataComment([])
  }, [data])
  // console.log(dataComment)


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username && !comment) {
      return
    }

    const url = "https://apiw.higo.id/blog-savecomment"

    try {
      setLoading(true)
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({blog_id: keyId, username, comment})
      })

      const json = res.json()

      return json
    } catch (e) {
      throw e
    }
  }

  const finishComment = () => {
    setLoading(false)
    setComment('')
    setUsername('')
    reloadArticle()
  }

  const loadMoreComment = async () => {
    const url = 'https://apiw.higo.id/blog-loadmorecomment'

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({blog_id: keyId, comment_id: commentId})
      })

      const json = res.json()

      return json
    } catch (e) {
      throw e
    }
  }

  const setMoreComment = (comments) => {
    const {arr_comment, comment_id, last_data} = comments
    // arr_comment.forEach((e, i) => {
    //   setDataComment(data.c)
    // })
    setLastData(last_data)
    setDataComment([...dataComment, ...arr_comment])
    setCommentId(comment_id)
  }

  const setData = (arr) => {
    if (!loadMore && arr.length > 2) return arr.slice(0, 2)
    else return arr 
  }

  const getReloadArticle = () => {
    console.log('yak')
    reloadArticle()
  }

  return (
    <div className="relative mt-4 w-11/12 mx-auto md:w-12/12 lg:w-8/12 lg:ml-0">
      <h3 className="w-full border-b-2 border-gray-300 font-semibold">{commentLength} Komentar</h3>

      <form onSubmit={e => handleSubmit(e).then(_ => finishComment())} className="flex relative flex-col justify-end items-end w-full h-auto border-b-2 border-gray-300 pb-4">
        {
          loading &&
          <div className="absolute top-0 w-full h-full flex justify-center items-center bg-white bg-opacity-70">
            <FontAwesomeIcon className="animate-spin" size="2x" color="#016FFF" icon={["fas", "spinner"]} />
          </div>
        }
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-4 my-4 py-2 bg-gray-200 focus:outline-none shadow-lg rounded-lg"
          placeholder="Nama"
        />

        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="w-full resize-none px-4 my-0 h-24 py-2 bg-gray-200 focus:outline-none shadow-lg rounded-lg"
          placeholder="Komentar"
        />
        <button type="submit" className="focus:outline-none w-20 border-b-2 border-blue-700  bg-blue-700 mt-4 rounded-lg py-2 group hover:bg-white hover:border-2 hover:border-blue-500 text-white ">
          <p className="group-hover:text-blue-700">Kirim</p>
        </button>
      </form>
      
      {
        dataComment.map((e, i) => {
          return (
            <CommentItem key={i} keyId={keyId} item={e} goReload={getReloadArticle}/>
          )
        })
      }

      {
        !lastData && <button onClick={() => loadMoreComment().then(comments => setMoreComment(comments))} className="flex focus:outline-none border-b-2 border-white hover:border-gray-500 transition-all duration-150 space-x-3 my-2 px-3"><FontAwesomeIcon color="lightgray" size="lg" icon={["fa", `${loadMore ? 'minus' : 'plus'}`]} />
        <p className="text-gray-500">{loadMore ? 'Sembunyikan komentar' : 'Muat komentar sebelumnya...'}</p></button>
      }


    </div>
  )
}


const RecommendArticle = ({articles}) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const numberWithPoint = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const fetchArticles = () => {
    const type = getPathName(pathname)

    setIsLoading(true)
    fetch('https://apiw.higo.id/blog-loadmorearticle', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({type, article_id: articleId, keyword})
      })
    .then(response => {
      if (response.status !== 200) {
        console.log('There was an error', response)
        return
      }

      response.json().then(data => {
        if (!data.arr_current_article[0]) setLoadMore(false)
        setLastData(data.last_data)
        setIsLoading(false)
        setArticlesArr([...articlesArr, ...data.arr_current_article])
        setArticleId(data.article_id)
      })
    })
    .catch(e => {
      console.log('Errorni', e)
    })
  }

  return (
    <div className="container mx-auto md:w-11/12 lg:w-full pt-20 w-full h-auto">
      <div className="w-full">
      <TitleText text={'Rekomendasi untuk Kamu'}/>

      <div className="w-full mt-4 grid grid-flow-col grid-cols-4">
        {
          articles.map((e, index) => (
            <div key={index} className="w-11/12 h-full">
              <img className="w-full shadow-xl h-56" src={e.img_url}/>
              <div className="flex my-2 justify-between">
                <p className="text-xs md:text-base text-blue-500 group-hover:text-blue-700  md:mr-4 w-18">{e.type}</p>
              
                <div id="views" className="flex items-center justify-end lg:justify-start">
                  <FontAwesomeIcon className="mr-2" color="gray" icon={["fas", "eye"]} />
                  <p className="text-sm text-gray-500">{numberWithPoint(e.view)} Views</p>
                </div>
              </div>
              <h4 className="font-semibold">{e.title}</h4>
            </div>
          ))
        }
      </div>
      <div className="w-8/12 mt-20 mx-auto">
        <LoadMore loading={isLoading} getLoadMore={() => fetchArticles()}/>
      </div>
      </div>
    </div>
  )
}

const Article = ({res}) => {
  const router = useRouter()
  const {slug} = router.query 
  const [response, setResponse] = useState(null)
  useEffect(async () => {
    if (slug) setResponse(await fetchData())
  }, [slug])

  const fetchData = async () => {
    const res = await fetch('https://apiw.higo.id/blog-viewarticle', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({article: slug})
    })
    const json = await res.json()
    return json
  }

  const reloadA = async () => {
    setResponse(await fetchData())
  }

  return (
    <MainLayout>
      <main className="w-full h-auto py-8 md:py-12">
        <div className="container mx-auto px-4 md:w-11/12 lg:w-full xl:px-28 relative 2xl:px-32 h-auto md:px-8 w-full">
          {
            !response ?
            <div className="w-full h-screen flex justify-items-center items-center">
              <p>loading</p>
            </div>
            :
            <>
              <ArticleCont data={response}>
                <ShareArticle res={response.article} slug={slug[0]} reloadArticle={async () => setResponse(await fetchData())}/>
              </ArticleCont>

              <Reaction res={response.article} reloadArticle={async () => setResponse(await fetchData())}/>
              <CommentSection data={response.arr_comment} arrCommentId={response.comment_id} isLastData={response.last_data} reloadArticle={reloadA} keyId={response.article.id} commentLength={response.count_comment}/>
              <PopularArticle articles={response.arr_popular_article}/>
              <RecommendArticle articles={response.arr_recommend_article}/>
            </>
          }
        </div>

      </main>
    </MainLayout>
  )
}



export default Article

