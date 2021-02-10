import React from 'react'

export default function NavBar () {
  return (
    <nav className="py-3 px-6 md:px-20 shadow-md flex justify-between">
      <h1>HIGO</h1>

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

    </nav>
  )
}