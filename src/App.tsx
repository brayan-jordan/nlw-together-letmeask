import { Button, ButtonSemChildren, BotaoContadorUsandoEstado } from "./components/button";

function App() {
  return (
    <>
      {/* tudo que ta sendo enviado no formato de tag aberta exemplo abaixo (clique aqui),
      tem seu nome padrao no react como children  */}
      <Button> Clique aqui </Button>
      <BotaoContadorUsandoEstado />
      {/* botao sem ser com o children, rebendo de forma de tags fechadas os atributos */}
      <ButtonSemChildren txt="Foda"/>
      <Button />
    </>
  );
}

export default App;
