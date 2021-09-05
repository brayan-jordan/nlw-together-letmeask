import { useHistory } from 'react-router-dom'

import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleIconImg from '../assets/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/button'
import { useAuth } from '../hooks/useAuth'

export function Home() {
  const { signInWithGoogle, user } = useAuth()
  const history = useHistory();
  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form action="">
            <input
             type="text"
             placeholder="Digite o codigo da sala"
            />
            <Button type="submit">
              Ou entrar em uma sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}