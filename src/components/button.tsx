import { useState } from "react"

// ponto de interrogacao torna o atributo que que vai ser recebido de maneira opcional
type ButtonProps = {
  // recebendo a parametrizacao atraves da tag aberta e seus dados sendo recebidos por ali
  children?: string;
}

type ButtonProps2 = {
  txt: string;
}

export function Button(props: ButtonProps) {
  return (
    // sinal de "||" e como um valor default caso nao receba nenhum valor (como ele e opcional isso e possivel)
    <button> {props.children || "Default"} </button>
  )
}

export function ButtonSemChildren(props: ButtonProps2) {
  return (
    <button> {props.txt || "Valor default "} </button>
  )
}

export function BotaoContadorUsandoEstado() {
  // iniciando uma variavel do tipo useState, de forma desestruturada, pois sempre que usa
  // um useState ele retorna um array com o retorno do tipo da variavel e uma funcao, no caso
  // seria o setCounter para setarOValor de counter (desestrutura em 2 partes (1 array) o tipo)
  const [counter, setCounter] = useState(0)

  // funcao incremenent usando o setCounter declarado acima desesstruturando o array e transformando em 2
  // retornos distintos
  function increment() {
    setCounter(counter + 1) 
  }
  return (
    <button onClick={increment}>
      {counter}
    </button>
  )
}

// forma de importar nao tao boa, podendo ser feito da maneira acima com o export
// direto no nome da funcao (named Export), assim quando importar tem que falar o que quer ser importado
// export default Button;
