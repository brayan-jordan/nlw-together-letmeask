import copyImg from '../assets/copy.svg'
import '../styles/roomcode.scss'

type RoomCodePorps = {
  code: string
}

export function RoomCode(props: RoomCodePorps) {
  function copyRoomCodeToClickboard() {
    navigator.clipboard.writeText(props.code)
  }
  return (
    <button className="room-code" onClick={copyRoomCodeToClickboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span> Sala #{props.code}</span>
    </button>
  )
}