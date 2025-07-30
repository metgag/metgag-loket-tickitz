import { Fragment } from 'react'

export default function Navbar() {
  return (
    <Fragment>
      <header>
        <nav className="d-flex align-center">
          <div className="logo"><img src="/tickitz-blu.svg" alt="" />
          </div>
          <div className="center d-flex fs-md">
            <a className="decoration-none" href="index.html">Home</a>
            <a className="decoration-none" href="home-dua.html">Movie</a>
            <a className="decoration-none" href="../ticket/order.html">Buy
              Ticket</a>
          </div>
          <div className="account">
            <button className="color-blue"><a
              href="../sign/login.html">SignIn</a></button>
            <button className="bg-blue"><a href="../sign/register.html">Sign
              Up</a></button>
          </div>
          <div className="burger"><i className="nf nf-md-menu"></i></div>
        </nav>
      </header>
    </Fragment>
  )
}
