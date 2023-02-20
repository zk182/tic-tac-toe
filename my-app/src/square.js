export function Square (props) {
    return (
      <button className={props.isWinner ? "winner" : "square"}
        onClick={props.onClick}>
        {props.value}
      </button>
    );
  }