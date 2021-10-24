import '../styles/switcher.scss'

export default function Switcher (props) {
  return (
    <div className="switcher">
      <input type="checkbox" id={`switch${props.label}`} checked={props.state} onChange={props.trigger} />
      <label htmlFor={`switch${props.label}`}></label>
    </div>
  )
}