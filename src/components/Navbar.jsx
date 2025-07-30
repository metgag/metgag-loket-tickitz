import { Fragment } from 'react'
import { Link } from 'react-router'

export default function Navbar() {
  const pages = ["Home", "Movie", "Buy Ticket"];
  const auths = [
    { to: "/login", page: "SignIn" },
    { to: "/register", page: "Sign Up" }
  ];

  return (
    <Fragment>
      <header>
        <nav className="d-flex align-center">
          <div className="logo"><img src="/tickitz-blu.svg" alt="" />
          </div>
          <ul className="center d-flex fs-md">
            {pages.map((page, i) => {
              return <li key={i}>{page}</li>
            })}
          </ul>
          <div className="account">
            {auths.map((auth, i) => {
              return <AuthBtn i={i} to={auth.to} page={auth.page} />
            })}
          </div>
          <div className="burger"><i className="nf nf-md-menu"></i></div>
        </nav>
      </header>
    </Fragment>
  )
}

function AuthBtn(props) {
  return (
    <button key={props.i}>
      <Link to={props.to}>
        {props.page}
      </Link>
    </button>
  )
}

function ListItem(props) {
  return <li key={props.i}>{props.page}</li>;
}
