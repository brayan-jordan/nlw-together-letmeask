import { useEffect, useState } from "react"
import { database } from "../service/firebase"
import { useAuth } from "./useAuth"

type QuestionType = {
  id: string
  author: {
    name: string;
    avatar: string;
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  hasLiked: boolean
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likes: Record<string, {
    authorId: string
  }>
}>


export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([])
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
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          // some vai percorrer e retornar um true ou false caso a condicao seja validada ou nao
          hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id)
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id])

  return { questions, title }
}