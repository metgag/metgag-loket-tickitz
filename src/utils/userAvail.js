import { useNavigate } from 'react-router'

export default function userAvail() {
  const navigate = useNavigate();

  if (localStorage.getItem("user")) {
    return setTimeout(() => {
      navigate("/movie");
    }, 1500);
  }

  setTimeout(() => {
    navigate("/auth/register", {
      replace: true
    });
  }, 1500);
}