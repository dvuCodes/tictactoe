// A cell represents a single cell on the gameboard
// A cell can be empty or have a mark
// A cell can be marked by a player
export default function Cell() {
  let value = "";

  const getValue = () => value;

  const setValue = (newValue) => (value = newValue);

  return { getValue, setValue };
}