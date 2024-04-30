function MovieDetails({ selectedId, onClose }) {
  return (
    <>
      <button className="btn-back" onClick={onClose}>
        &larr;
      </button>
      <div className="details">{selectedId}</div>
    </>
  );
}

export default MovieDetails;
