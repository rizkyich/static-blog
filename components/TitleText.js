import React from 'react'

export default function TitleText({text}) {
  return (
    <h1 className="w-11/12 mx-auto md:w-full text-lg xl:text-2xl text-blue-700 border-b-2 border-blue-400">{text}</h1>
  )
}