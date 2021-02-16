import React from 'react'

export default function TitleText({text}) {
  return (
    <h1 id="sect-title" style={{color: '#016FFF'}} className="w-11/12 mx-auto md:w-full text-lg xl:text-2xl border-b-2 border-blue-300 tracking-wide font-black">{text}</h1>
  )
}