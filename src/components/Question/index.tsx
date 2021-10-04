import './styles.scss' 

import { Children, ReactNode } from 'react'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string
  }
  // tipando para poder receber components filho (React Node indica que pode ser qualquer coisa tsx)
  children?: ReactNode
}


// desestruturando objeto como padrao, assim pegando apenas content e author
export function Question({content, author, children}: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}