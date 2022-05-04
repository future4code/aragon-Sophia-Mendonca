import React from 'react';
import styled from 'styled-components';
import Post from './components/Post/Post';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

class App extends React.Component {
  state = {
    nomeInput: "",
    nome2Input: "",
    nome3Input: "",

    listaDePessoas: [
      {
        nome: "Sophia",
        fotoUsuario: "https://www.canalautismo.com.br/wp-content/uploads/2021/08/Ha-uma-ma-interpretacao-sobre-o-que-isso-significa-defende-Sophia-Mendonca-sobre-autistas-serem-autocentrados.jpg",
        fotoPost: "https://www.canalautismo.com.br/wp-content/uploads/2022/02/sophia-mendonca.jpg"
      },
      {
        nome: "Selma",
        fotoUsuario: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISEhISEhIPEhIYEhkPEhgYDx8XEhAVJSEnJyUhJCQpLjwzKSw4LSQkNEQ0ODE1Nzc3KDE8QEg1Pzw1Q0gBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAgMEBQYHAQj/xAA8EAACAQIEBAQEBAQFBAMAAAABAgADEQQFEiEGMUFhEyJRcQcygZEjM6HBFEJi0SRScrHwU4Lh8RU0Q//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwBxmFahcaSO9iDI6njqLMRuP+2Z7lXjeMofXbre80XK8xwlK9Oqu9uZW4MB0KdNhsV+0i8fhXvamFN9ucg89xJNZjh6jKnoNhGVLNMVTNw9/cQJlaNWmbPYEnoYqyG12b9ZXMRm9Wo16hP0EUw2bbgNuIE1Tw+s6rGwkzgqYt7SKo5nSIsCBJXAYmmQQGHL1gS/DtP8dT3mlUxsJnnDCg1QQb7zRKfIQIfNvmEiMQvlPtJfNPmEjagJUjqYFYQWNS0rOE4QxWNrMyoadK92d/KoHa/OaPlGApo7GpZm+YA/Ks5xXjmWg6JdL+UFTta0A3CfCWEwbE0mepUtZnZrpftbaO+M6OJqYV0w6gvptYc2lbw3FYo4a1MtcEKWI3LdTb7yUynORXpipTr3JO//AJBgYHjMO9Ooy1FZWDEEEWMStPQea5XhsYunFUwtS2laqEBx/wB37GZJxlwrUwL7nXSI8jkga+1vUQKoZww1pwiAVonFDE4AEnuED/iAe0gpP8Hpev8ASBsvCzhiTBBwklg3vBArDYane+lftG1fAU23sLyuUuLhyZY4TiamedxAd1coXmDGlTLSO8WXO6bfzCGGYK3JhAhsRhGB5ROjhADuJK16hPpE6bb8oEdiMMLbbRsviKfKzD6yUqpuYgE3EDRPh3qOksbm01JOkxLhrPf4RwWBK9bTQsJx3g3sDU0H+oWgSmYKS9hGuJIVQtPdztf0naOZJXu9M6lJK3G8QxL22X5j5YEHiUamKljf/M5NgI3y/wDxI02BINifXuYtXc1T4aG1MHS7dXb0HSTfD+UikpIFmJ1e0BvjeGab0ihCgmxBC2N5T62TVcG/iUt6f/6IfkbvNWdDbeMcRhFa9wDeBVMDnVMAay9Nrbq3mWPsV/D4yk1Cqq1KbdA3nU9GX0M5juHwwOgLy2BFxKg+FrAVNJKVEaw5i627QKzxlwkcAwdXNSi/5ZI847NKoZpGIzGpmGEq4OqLYin+NTP/AFNPMfaZywgJsImRFXETgclh4P8AzT7SvywcJD8QntA2bhIeRveCG4RX8MnvOQPPU5Ozhgcv7zgrMOTH7wGJmA5XHVB/MY6o5zUX0MjIBAm//nSeaxWlmyE7i0r8EC3U8fTawDRzRph2CqyEk9WEpSy28AZca+MpqSbA62H9IgbHkmEGFwqJfmNttyTuY3zHELTR2appIHnYfydh3PKPs2rhSB1UeUdNZ6/SZ/iMa2KxaYWluiMXqNz36n3gW7h2jqHi1FFNOVNP8i+p7mT9XOKdIXIe3K+naRTYmnhaYd72Vdha5J9vWQWYcZVEpiocJakzaQXqAMfdekC64XOaVb5HBPp1jlrTP8rxyYgpUSk9FtQuOhvvLpVYinq3B03gOWHtKpntE06hdeTDf3iFezsWrYoUx2b5R3jnFYTVSLUsT4ukarEhg1ukCqih4dQVQBYWcHrpOxEpPEmX+FWqWHkZi9M2/lO9pfDUUmwOzAvTt1B5qZA8X4YGhSrbA6jStbsYFGcRIxapETA7LFwibO3tK7LLwklyxgbLwqPwoIfhhdNEXggec4UwxhTA5EzFYkYAgEEAgCCCdgHpqSdgTNq+FuSfw9Cpi6igO9tG9yE9JmPCeB8WsL6gAQARaxJPKbm9korSS5AUL/qJgU3i3PHp+I+4NiU358xGnwmwusVqjbszgX6+sb/ELDE+Gigmw0bcr85Z/hpl5o4RSwszMX+kC7DLqb2LKLjkSL2hKuVJv5UPuoMVStb3hcZjQiE7k9B6mA1XA0wyg6QegC2jzMEXwwo3FrGVSrn70Nmo1atR28xVbqi9I8xXEdFETxDp1sEBCk7wEMy4dSvSqU1CKXHzeGGZfa8gck4YrYKqGFRqlNkK1FtYFr7NaXjL6wdSBzU6b+oi+ItAybHgrTIU2enUdQO1+U5nS+JlzNbdKi1GHQAi37yOzHFMMZiRfyGsy26He0maBU0alNt1qWoe1+X6wM2rC3UGIGL4hCGYHmCVMRgcMtXBqHzGVYy4cGDyn3gbDkKWpL7QTuRH8Me0EDzbCmdnIAiZEVAiZgFggggCC0EWw4JYBQSegHUwL18NMuFSo1RgSafyAi6Fj1+k2NMKFTWQAdPpID4dZC1DC0xUTS7A1GU7Ncna/wBJbcZTLCxtpG1h1gUHiKkrAAgFmZ/ooQ7yyZKAKFO1vkX/AGkHn+HtTqVCbEXpp7nn+kR4Azjx8IisfOpKN9DtAtSg3JB2iGKqADUxAA9TsI6V1G31kZmuV08ULVASOYAYiARc6wXy+IrMNzYXH3i64jCP5R4Z31fLteQ9DJ8PgwSlPc7i921/cyv8Q06zKHNF8OgJs6JpJ97wNCUhWBUAD5TaK1X2J9BcyA4SreJQW9U1reUlls6n0P8AePeIcV4WExNTlppPp97bQMhwWHfEVatUAkNiHNx6XMttDLXNCopHnV0cfQgyKwVY4fA0KagF3ArN6nzXlsyusKyE73ZQji3uIGPZvbx61tx4jke14xMk85wvh1alMWJRmQ7HoZGGByXThAWS/eUy0uvCyfhg/wBUDXckH4Y9oIMk/KHtOQPNs5OzkAXiRMUaJwBBBABAE0f4c8M67YuoAbflBuSf1n9hKdkGXDEV0pHVYsAbDa1+s3nIcrqP4ey06CAFVBtqtsL/AEgT2Ap6VAOr1uebGHxtRiNNMbnr0XvFnsPQAbRljMYFU25nZf7wKd8QcxFOkQLEpuSOWsiwlG4CxTqKjLf8zUR7xx8QMaavkBsiuSR1dvU/89Y24GYAVENtyCPeBpFLMbgNzPpHuHxqOeYB9JXPDK2IB7iPGdNNzdT0IO4gQPEGc1MRiRToeLdHKU1Q+eqRtfbkL3iGP4azjEMq1KFZltcXrAW9zfaWzgPAU6dOvUJHifxJUuRdtAHlH7y44dwwJLMTe17c4GY8FZXjcFiXpYijUWnUQsrfMmodCRcXteMfiXxGrlcFTYHzBq5B5ei/vNhCejzEfiTkho5i1YJ+HUQVLqPLrGzX7/3gN8zpN+EV5BAD7CWjhpXWwI26XYmR6KDhwxIB06f1k7lFO2nly2uORgL41VJqKMLhi5JGvShZu+5vMk4mwVKhUCJUpvUJLVVTdKPol+p9bS6fEHS1NKl2Q6tD2YgH3mZVCL7WPe0Aku3DL2pqO8pMuPDpsie8DYsl/KX2nYMoH4S+0EDzTOQQQCtCQ7SYyPK0qA1axYUUO4VbvUPoIEZh8HUq38Om7256ULWk7lWR4tKis2EdwDfS9kRh3J6SZfOnSwCLSRRalQX5UH+Z7cz2nMZxI+kgsWPI6twynmLX9YGp8E5Nl6oHp4WmlYC1RrllU9QCektNeuoFkAAvblt3MyX4f8Z06ZfD1mIL3KM3yE7eXty/WXnibHhcJ4tEg60CIR/KT6wHmIxoYEjlewlaz3M1pozEjUbogvyHUxTDOFpql+VPbfnYbmZXxTnT1cQ6qxFNL0x3PX9YC2PTxdZG6izsx5sfb9o+4YoFQKgG1xew7842yRBUwxN72JL787b/ALyX4Xxaeam4CEeS/S8C3KQQDaOVyc4gEB1pgcyYjlov5bbA2P8AeSn8PoHl2PrfnANk+TtSp1aIYFmclW6atGx+8Z4XFVcOaeExeJpPiiviXC2DIdgP0lg4fYsFZuZaof1t+0oHxZpK+ITmH0AAjnAvpXUvkcq1tuokPxA7fw9RKqB9Q0bNZG7k9JV8kwuLw1ChUoVHxAZNdRHPLspltwOPXE0wKlNrnZkdDz+sCnUcPqokDnpDr3seUcZLmKmybEglP/Emc6o06FSmoAVH32HkUnmJTWvQrMygm7lrL094Dnj3CVHpDw0L3YMwC32tMrqU2QkMCCDbeegsjxq1EBawNt+dvtIbjDhWhilLqFp1BurIlg/YwMUlw4fHlpj+qVbF4ZqdQo4IYGxBEtfD4/LH9UDZsuFqajtBOYQWRfaCB5lWAmLqBaN25wCtJvDufDppcgDe3cyNwFEVKqIdgWGr26yQr1B4jW5Em33gL4kKiDTsSbn1MYVOX1iteoWtfba0SY7QClbby38I8T+EhwmIu9N2JW5JC7bfrKfUbb6xFah16uo5doGyVQ61MNUP5ZTwX32GsbH72mSY9DTr1abgkrUZWH1lkyPiweCMNirkL+XUv5lHoe3eMuL6CPUXEoQfEF3F+bDmR7wEshzDwWZSSab7MJM0aL06mtFNSm24IPT+8qeGOoG42Ak/wvn/AID+HUN6bNzP8kDTOHaoNje4tYX5jsZaBSBEpGGxK+NSNMeR9jY3VpcvFKK1+ikj7QJHIAAiDa+gt92MzrjbFq+PKghgBoNv5T1lOXPc0xdRRQfEU7qKCeGSiWB5k9ecjs1w2JweN8KrUNSqHXWQ5bVq9/eBc+EuJ2So1GsV8MMfD6EbmaJRqLUAdCtiOYmZ0cm/F1Cwt5iD7GXHhjDVKSKrEkHcf0wEviJiCmCFQA6lrIb+nOZ7WrNV/EVwjjYgmwPoQZe/iTiP8IKY5vUHT0BMzLL8UqOqVANLrb23/SBYMqzzEUWBfSEJtr1g/wDuWKlxI1QOvlV1B1D6fMJUMywQRCabAknUVOwfue/cSIXMmpJTqLcsGKG+66eo+0B1xDjUq/mBHqWsXB3+/wC0X4ePnpD+oSpVagYk78/KPSW7hlLvR/1CBs+GHkX2ghsN8o9hBA8xGpE4IIDrLh5mb0Xb3izHkYTCiydyTAp8tut4BmbedflaBYWu/P2gJj9okq7ExenupP0iYG0BMw4rsF0XOi97X2vOOJwrfpAVot0JipQGNbER0j7XgWzgbMUp1lp1nKgsPDJPlB9O3vNUxeOpohao6IgG5ZgBPPteqAvc8u0PjHqKKYet4gKBwPFLBAeh9DA0vBce4HCsKQoVGSmxCMttLr67yuZXUTMcyqYiowF3NZEPNrch9JUHcGxhsPimpulRNmVgwgbLh6BasoHIc+8t1JApAsQbfSUrh7NEqinVBGlhv6oeoMu2Gqh9wQfreBTviahZcMFHOqR2FlvMuzhCNJ+g9Zvec5YuIQIbAglkNvla1p5+zenVXFVKdYFXRyrL6e0B2MfURFR/PTK2F9yv/PSR+Y1gQtMWspLe5PpBWqFidQspsFsNktGb9AekDl95deGD56Q7ykqNxLtwvbxaXuIGy0flX2ggo/KPadgeX4JLZJw7isY1qFJmHVjsi/WaFgPhVTp03q4uszaKbOVTyqLC/OBmtIEBQR/wwqWuRf2jpyLW77doyqXVr/8ADAWTqDGtZ4d6nURKmNTAd94DtFsgHa5ibco5rHaNTAKZ1LXIPvBCE2IPpAO73tsO0Mh03vHQ02DEXFtjeMXfWbDleARjqO/0nNEME3sTadcNf94BVPT7Q5XaECdesPr9YFj4KzbwKwpufw3IG/JX6H9psmXPaxHrYzzw1SbPwFmRr4WmzG7jyMfW214F6JvYzM/ipkXyY5EBKjRWIG5H8pP+00tDsIhmFFKlOolQAoVIYHqLQPNr1yf5du8Qa8uGa8L1VxL08PRq1UNnQqt9KnoTy27zr8B49hcUUXsaq3gU1eY95c+FfzqY7iVnMctrYap4dam1N73F+TD1B6yz8Jf/AGEgbLRPlHtBCUjsPaCA5w1CnSQKqpTQDZQLASPzfFDEU6mGUlddNkJHMAiQmb52eQP2M7wrqqNUqtewsi/7n9oGXcQ8O4jBPaoNdMnyOB5T7+hkHUY8p6NxmDp1qbU6iK6MLEETKeLeBquH1VMOGqUuZUC70/7iBn1SGwvOEqHc9IfD7C/eA4rG8TMWtCMsBOcIioWBkMBu4PK5t6QqbGKuhnUQcjtAcMmpb23jZg1/pHdDbYxOuN/pASCdTE6sOXEB3gIEzSvhVXCpWBsPOLHVz25W+n6zNTLfwJjlpsaRsfFqKli1rWUkGBuWHqXEJinBUrfpufQSIwFZggRg5tsdosMReoqaStO4HctA7gHIYsT5T+xtJCpEmwYFyCbHp0govYaW5jkfUQKZ8S8EtTCeJYa6bqwNt7E2I/WVLhI/4hJf+OqZOBxAH+QN9iDM94Sv/EU4Gw0zsPaCFp8h7QQMwxFe+97maNkeF8LD01tZtOtv9R3mecIYM4nELcXpp+JUvy7D7zUPE6GAsDEcU+0MDI7HV7XgUTjXJMK4aoECVOZZdr+4mbqttpf+L8X5WF+hlBBgOKQh/DiamwhhUgKClFPDE4jwO4gcNEROvSAGwX6wj1zCjF9LXgOsowVXEOadGnrqBWawPMAXPOMKlz699uUcUi19dNjTNrHSbG3WIaiN+YPaAVaU7aHFQRJ2gEZQZaPhpgaNfMaS1msFVqiDVbW45D/c/SVUtCoSCCCQRuCDYiB6ZxtNEqAIbErdl9IKeEBcPc3G9ukp3AeLNXC06jsWcDQxJuSRtvLvh22gHcWjaunWOniVQbQIvNKYq0KtM7lqbJ77TLOEVIxCDqDYzWa6zMuH6OnH1F/y1GH6mBqSDYe0ECchOQIvgbJjRwasADUq/iufT0H2jzEUayE3pvb1AvBBARTMk3W+8jcyxQsTBBAzHizFl30jrK4h2nYIBS53FzaAPBBAWFba3WF8UwQQClzOXgggL4ata4PIiEvp69jBBATacJgggcgCk8gT9IIIGhfDDHspqUGDAX8RLj6H9pq+GfYQQQHLwi7wQQGuLSwMzrCLbNKwH/Uv+ggggaEh2nYIIH//2Q==',
        fotoPost: 'https://tudobemserdiferente.files.wordpress.com/2013/04/376824_310531138957368_2035159729_n.jpg'
      },
      {
        nome: "Irene",
        fotoUsuario: 'https://omundoautista.uai.com.br/wp-content/uploads/sites/34/2021/12/irene-maria-da-silva.jpg',
        fotoPost: 'https://omundoautista.uai.com.br/wp-content/uploads/sites/34/2022/04/virar-do-avesso-aos-80-e-agora.jpg'
      },
    ]
  }
  onChangeIdade = (event) => {
    this.setState({ nomeInput: event.target.value })
  }

  onSubmitForm = (event) => {
    event.preventDefault()

    const novaListaDePessoas = [...this.state.listaDePessoas]
    novaListaDePessoas.push({
      nome: this.state.nomeInput,
      nome2: this.state.nome2Input,
      nome3: this.state.nome3Input,

    })

    this.setState({ listaDepessoas: novaListaDePessoas })
  }
  render() {
    return (

      <MainContainer>
        <form onSubmit={this.onSubmitForm}>
          <label for="">
            <input
              name="Nome"
              placeholder='Nome'
              value={this.state.nomeInput}
              onChange={this.onChangeNome}
            />
          </label>

          <label>
            <input
              name="fotoUsuario"
              placeholder='fotoUsuario'
              value={this.state.nome2Input}
              onChange={this.onChangeNome}
            />
          </label>
          <label for="">
            <input
              name="fotoPost"
              placeholder='fotoPost'
              value={this.state.nomeInput}
              onChange={this.onChangeNome}
            />
          </label>

          <button>Adicionar</button>
        </form>
        {this.state.listaDePessoas.map((pessoa) => {
          console.log(pessoa)
          return <Post
            nomeUsuario={pessoa.nome}
            fotoUsuario={pessoa.fotoUsuario}
            fotoPost={pessoa.fotoPost}
          />
        })}
      </MainContainer>
    );
  }
}
export default App;
