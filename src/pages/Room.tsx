import logoImg from '../assets/logo.svg'
import { Button } from '../components/button'
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { useParams } from 'react-router';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../service/firebase';
import { Question } from '../components/Question';

type RoomParams = {
  id: string
}

type Question = {
  id: string
  author: {
    name: string;
    avatar: string;
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}>

export function Room() {
  const { user } = useAuth()
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('')
  const roomId = params.id
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState ('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      // desestruturando o map para pegar a key e o value de acordo com o formato de retorno do firebase
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])
  // o useffect e uma funcao que espera a atualizacao de algo para ser executado, dentro do array no final a gente
  // passa o que ele fica esperando atualizacao (caso vazio ele vai executar apenas uma vez durante o carregamento da pagina)

  // toda vez que uma funcao for colocada em um formulario com onsubmit precisa tipar com o event: formevent
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if(newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('Voce nao esta autenticado');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')

  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          
          {/* um if ternario porem sem else */}
          {questions.length > 0 && <span>{questions.length} Perguntas</span>}
          
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que voce quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-fotter">
            {user ? (
              <div className="user-info"> 
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
            <span>Para enviar uma pergunta, <button> faca seu login </button>.</span>
            ) }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

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