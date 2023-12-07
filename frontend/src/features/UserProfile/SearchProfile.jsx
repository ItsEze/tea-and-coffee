const SearchProfile = ({ searchInfo , handleSearchChange, handleSearchUser }) => {

  return (
    <>
      <h2>Search to find what other users have added to their favorites list!</h2>
      <div className="d-flex justify-content-center align-items-center">
        <input value={searchInfo} onChange={handleSearchChange}></input>
        <button className="btn btn-success m-2" onClick={() => handleSearchUser(searchInfo)}>
          Search User
        </button>
      </div>
    </>
  );
};

export default SearchProfile;
