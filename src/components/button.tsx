import { useState } from "react";
import { ButtonHTMLAttributes } from "react"

import '../styles/button.scss';

// esse & serve para alem de receber os atributos padroes de um botao html ele tambem pode receber outras variaveis
// conforme sera mostrado a seguir
// uma tipagem do proprio react que permite passar qualquer tipagem do padrao html para os botoes atraves do props 
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

// pegando o is outlined, e o resto esta jogando dentro de um props atraves do ... (rest operator)
export function Button({ isOutlined = false, ...props}: ButtonProps) {
  return (
    // esse ...props, toda vez que chamar esse componente passara todos os type, submit, etc diretamente pra esse botao
    <button 
      // classname button e caso o isOutlined for true vai adicionar mais um classname no caso outlined
      className={`button ${isOutlined ? 'outlined': ''}`}
      {...props}
    />
  )
}