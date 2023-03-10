import RegisterPage from "pages/RegisterPage";

const Caps = ({ originalString }) => {
  let arr = originalString.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  let newString = arr.join(" ");

  return <h1>{newString}</h1>;
};

export default Caps;
