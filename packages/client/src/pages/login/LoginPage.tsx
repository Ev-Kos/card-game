import { NavLink } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div>
      <h1>Логин</h1>

      <NavLink to="registration">Регистрация</NavLink>
    </div>
  )
}

export default LoginPage
