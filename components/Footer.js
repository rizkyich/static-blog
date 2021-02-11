import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

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
          confirm('naise')
        })
        .catch(err => {
          throw err
        })
  }

  return (
    <div class="footer-container">
    <div class="subscribe-container">
      <div class="top-container">
        <div class="newsletter">
          <h4>
            Subscribe to get our promos, news,
            <br />and the latest marketing kit
          </h4>
          <div class="submit-email">
             <input
              type="email"
              className="text-black"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button class="submit" onClick={() => submitEmail()}>Submit</button>
          </div>
        </div>

        <div class="kanan">
          <div class="summary-container">
            <div class="group-link">
              <a href="https://higo.id/about-us">About Us</a>
              <a href="https://higo.id/higospot">HIGOspot</a>
            </div>
            <div class="group-link">
              <a class="anchor" href="https://higo.id/careers">Career</a>
              <a class="anchor" href="#">Blog</a>
            </div>
            <div class="group-link">
              <a href="https://higo.id/terms-of-use-higospot">Terms & Conditions</a>
              <a href="https://higo.id/privacy-policy-higospot">Privacy & Policy</a>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-banget">
         <div class="icon">
          {/* <div id="logo-1" v-if="windowWidth > 990">
            <img style="width: 75%;" src="@/assets/HIGO-Logo-25-min.png" alt />
          </div> */}
          <a
            href="https://www.linkedin.com/company/pt-higo-fitur-indonesia/"
            target="blank"
            class="sosmed"
          >
            <FontAwesomeIcon color="white" size="2x" icon={["fab", "linkedin"]} />
          </a>
          <a href="https://www.facebook.com/HIGOSPOTINDONESIA/" target="blank" class="sosmed">
            <FontAwesomeIcon color="white" size="2x" icon={["fab", "facebook"]} />
          </a>
          <a href="https://www.instagram.com/higospot/?hl=en" target="blank" class="sosmed">
            <FontAwesomeIcon color="white" size="2x" icon={["fab", "instagram"]} />
          </a>
          <a href="https://twitter.com/HIGO_spot" target="blank" class="sosmed">
            <FontAwesomeIcon color="white" size="2x" icon={["fab", "twitter"]} />
          </a>
        </div> 
        <p
          style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px'}}
        >&copy; PT Higo Fitur Indonesia 2020</p>
      </div>
    </div>
  </div>
  )
}