import { useNavigate } from 'react-router'

export default function userAvail() {
  const navigate = useNavigate();

  if (localStorage.getItem("user")) {
    return setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  setTimeout(() => {
    navigate("/auth/register", {
      replace: true
    });
  }, 1500);
}