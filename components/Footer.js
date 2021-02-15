import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';


export const Footer = () => {
  const [email, setEmail] = useState('')

  const submitEmail = () => {
      let formData = new FormData()

      formData.append('email', email)
      formData.append('from_url', window.location.href)
      axios({
        url: 'https://blog.higo.id/api/subscribecontact',
        method: 'post',
        data: formData
      })
        .then(response => {
          NotificationManager.success('Thanks fot Submitting', 'Success', 2500, true)
        })
        .catch(err => {
          NotificationManager.error('Something is wrong', 'Error', 2500, true)
        })
  }
  
  return (
    <div className="footer-container">
    <div className="subscribe-container">
      <div className="top-container">
        <div className="newsletter">
          <h4>
            Subscribe to get our promos, news,
            <br />and the latest marketing kit
          </h4>
          <div className="submit-email">
             <input
              type="email"
              className="text-black"
              value={email}
              placeholder="Your Email Address..."
              onChange={e => setEmail(e.target.value)}
            />
            <button className="submit" onClick={() => submitEmail()}>Submit</button>
          </div>
        </div>

        <div className="kanan">
          <div className="summary-container">
            <div className="group-link">
              <a href="https://higo.id/about-us">About Us</a>
              <a href="https://higo.id/higospot">HIGOspot</a>
            </div>
            <div className="group-link">
              <a className="anchor" href="https://higo.id/careers">Career</a>
              <a className="anchor" href="#">Blog</a>
            </div>
            <div className="group-link">
              <a href="https://higo.id/terms-of-use-higospot">Terms & Conditions</a>
              <a href="https://higo.id/privacy-policy-higospot">Privacy & Policy</a>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-banget">
         <div className="icon">
          {/* <div id="logo-1" v-if="windowWidth > 990">
            <img style="width: 75%;" src="@/assets/HIGO-Logo-25-min.png" alt />
          </div> */}
          <a
            href="https://www.linkedin.com/company/pt-higo-fitur-indonesia/"
            target="blank"
            className="sosmed"
          >
            <FontAwesomeIcon color="white" size="2x" icon={["fab", "linkedin"]} />
          </a>
          <a href="https://www.facebook.com/HIGOSPOTINDONESIA/" target="blank" className="sosmed">
            <FontAwesomeIcon color="white" size="2x" icon={["fab", "facebook"]} />
          </a>
          <a href="https://www.instagram.com/higospot/?hl=en" target="blank" className="sosmed">
            <FontAwesomeIcon color="white" size="2x" icon={["fab", "instagram"]} />
          </a>
          <a href="https://twitter.com/HIGO_spot" target="blank" className="sosmed">
            <FontAwesomeIcon color="white" size="2x" icon={["fab", "twitter"]} />
          </a>
        </div>Name 
        <p
          style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px'}}
        >&copy; PT Higo Fitur Indonesia 2020</p>
      </div>
    </div>
    <NotificationContainer/>
  </div>
  )
}