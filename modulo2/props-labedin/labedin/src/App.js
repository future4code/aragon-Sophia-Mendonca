import React from 'react';
import './App.css';
import CardGrande from './components/CardGrande/CardGrande';
import CardPequeno from './components/CardPequeno/CardPequeno';
import ImagemButton from './components/ImagemButton/ImagemButton';
import styled from 'styled-components';

const AppStyle = styled.div `
display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

.page-section-container {
  width: 40vw;
  margin: 10px 0;
}

.page-section-container > h3 {
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
`

function App() {
  return (
    <AppStyle>
      <div className="page-section-container">
        <h2>Dados pessoais</h2>
        <CardGrande 
          imagem= "https://media-exp1.licdn.com/dms/image/C5603AQEWpy_uE4nWBw/profile-displayphoto-shrink_200_200/0/1644332275356?e=1655942400&v=beta&t=fzJrCahVkJWHdvIaOxNTZnhYG0BNhu2LrPqtvcL7Ki4" 
          nome="Sophia Mendonça" 
          descricao="Oi, eu sou a Sophia. Sou desenvolvedora na Raia Drogasil RD, em formação pela Labenu, autora de nove livros, youtuber do Mundo Autista e mestre em Comunicação Social pela UFMG"
        />
        
        <ImagemButton 
          imagem="https://cdn-icons-png.flaticon.com/512/6819/6819501.png" 
          texto="Ver mais"
        />

        <CardPequeno
          imagem="https://cdn-icons-png.flaticon.com/512/1782/1782765.png"
          email="email: contatosophiamendonca@gmail.com"
          />

          <CardPequeno
          imagem="https://cdn-icons.flaticon.com/png/512/4064/premium/4064836.png?token=exp=1650415562~hmac=863a999e34b41fbe126c270db1831463"
          endereco="Endereço: Av. Corifeu de Azevedo Marques, 3097 - Vila Butantã, São Paulo - SP, 05339-900
          "
          />
      </div>

      <div className="page-section-container">
        <h2>Experiências profissionais</h2>
        <CardGrande 
          imagem="https://uploads-ssl.webflow.com/5e790d30d198385b09366d8f/5eab0c8d3b34bcc0f12f3ddc_avatar_labenu_branco.png" 
          nome="Labenu" 
          descricao="Formando desenvolvedores para o mercado de trabalho!" 
        />
        
        <CardGrande 
          imagem="https://p7z2w8n8.rocketcdn.me/wp-content/uploads/2020/04/raiadrogasil-e1588124943738.png" 
          nome="Raia Drogasil RD" 
          descricao="Gente, saúde e bem-estar" 
        />
      </div>

      <div className="page-section-container">
        <h2>Minhas redes sociais</h2>
        <ImagemButton 
          imagem="https://d2v9ipibika81v.cloudfront.net/uploads/sites/261/2017/01/facebook-logo-3.png" 
          texto="Facebook" 
        />        

        <ImagemButton 
          imagem="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1-1.png" 
          texto="Twitter" 
        />        
      </div>
    </AppStyle>
  );
}

export default App;
