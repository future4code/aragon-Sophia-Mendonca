import React from 'react'
import logo from '../../Assets/logo.svg'
import { Container } from './style';
import { useNavigate } from 'react-router-dom'
import { goToHome } from '../../Routes/Coordinator';

export default function Header() {
  const history = useNavigate()
  return (
    <Container>
      <header>
        <img
        className='logo'
          src={logo}
          alt="Logo do app TMDB (The Movie Database)"
          onClick={() => goToHome(history)}
        />
      </header>
    </Container>
  )
} 