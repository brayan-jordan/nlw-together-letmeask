import logoImg from '../assets/logo.svg'
import { Button } from '../components/button'
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { useParams } from 'react-router';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';


type RoomParams = {
  id: string
}

export function AdminRoom() {
  // const { user } = useAuth()
  const params = useParams<RoomParams>();
  const roomId = params.id
  const { questions, title } = useRoom(roomId)

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            {/*  por ser um booleano o isOutlined nao precisa por = true */}
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          
          {/* um if ternario porem sem else */}
          {questions.length > 0 && <span>{questions.length} Perguntas</span>}
          
        </div>

        <div className="question-list">
          {
            questions.map(question => {
              return (
                <Question 
                // essa key vai automaticamente pelo react, toda vez que faz um map e obrigatario fazer isso
                // tendo em vista que todo component deve ter um indentificador unico
                  key={question.id}
                  content={question.content}
                  author={question.author}
                />
              )
            })
          }
        </div>
      </main>
    </div>
  )
}