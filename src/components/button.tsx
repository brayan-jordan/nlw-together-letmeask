import { useState } from "react";
import { ButtonHTMLAttributes } from "react"

import '../styles/button.scss';

// uma tipagem do proprio react que permite passar qualquer tipagem do padrao html para os botoes atraves do props 
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement >

export function Button(props: ButtonProps) {
  return (
    // esse ...props, toda vez que chamar esse componente passara todos os type, submit, etc diretamente pra esse botao
    <button className="button" {...props}/>
  )
}