import { Link, useHistory } from "react-router-dom"
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/button'
import { FormEvent, useState } from "react"
import { database } from "../service/firebase"
import { useAuth } from "../hooks/useAuth"

export function NewRoom() {
  const [newRoom, setNewRoom] = useState('')
  const { user } = useAuth()
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    // esse event que esta sendo tipado recebe os tipos do handleSubmit para fazer diversas verificacoes
    // event prevent default inpede que a pagina fique recarregando mandando o input vazio ao apertar no botao
    event.preventDefault()

    // .trim serve para remover os espacos da esquerda e da direita apartir do inicio
    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')
    
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }


  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustracao simbolizando perguntas e respostas" />
        <strong>Crie salas de perguntas ao vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo da aplicacao" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
             type="text"
             placeholder="Nome da sala"
             onChange={event => setNewRoom(event.target.value)}
             value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}