import { Fragment } from 'react'

export default function Footer() {
  return (
    <Fragment>
      <footer className="d-flex flex-col">
        <div className="top d-flex">
          <div className="foo-logo">
            <img src="/tickitz-blu.svg" alt="" />
            <p>Stop waiting in line. Buy tickets conveniently, watch movies
              quietly.</p>
          </div>
          <div className="explore">
            <h4>Explore</h4>
            <div className="link d-flex flex-col">
              <a href="">Cinemas</a>
              <a href="">Movies List</a>
              <a href="">My Ticket</a>
              <a href="">Notification</a>
            </div>
          </div>
          <div className="sponsor">
            <h4>Our Sponsor</h4>
            <div className="spons-img d-flex flex-col">
              <img src="/sponsor/ebv.png" alt="" width="88" />
              <img src="/sponsor/cine.svg" alt=""
                width="124" />
              <img src="/sponsor/hif.svg" alt="" width="72" />
            </div>
          </div>
          <div className="follow">
            <h4>Follow us</h4>
            <div className="social d-flex flex-col">
              <a href=""><img src="/social/fb.svg" alt="" />
              </a>
              <a href=""><img src="/social/ig.svg" alt="" />
              </a>
              <a href=""><img src="/social/tw.svg" alt="" />
              </a>
              <a href=""><img src="/social/yt.svg"
                alt="" /></a>
            </div>
          </div>
        </div>
        <div className="bottom">
          <p>&copy; 2020 Tickitz. All Rights Reserved.</p>
        </div>
      </footer>
    </Fragment>
  )
}
