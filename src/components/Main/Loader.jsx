function Loader({ error }) {
  return <p className="loader">{error ? error : "Loading..."}</p>;
}

export default Loader;
