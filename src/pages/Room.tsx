import logoImg from '../assets/logo.svg'
import { Button } from '../components/button'
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { useParams } from 'react-router';

type RoomParams = {
  id: string
}

export function Room() {
  const params = useParams<RoomParams>();


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={params.id} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1> Sala React </h1>
          <span>4 Perguntas</span>
        </div>

        <form>
          <textarea 
            placeholder="O que voce quer perguntar?"
          />
          <div className="form-fotter">
            <span>Para enviar uma pergunta, <button> faca seu login </button>.</span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}