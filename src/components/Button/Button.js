import './Button.scss';
function Button(props) {
  return (
    <div className={props.size === 'sm' ? 'button-container sm' : 'button-container'}>
      <button>{props.name}</button>
    </div>
  );
}

export default Button;
