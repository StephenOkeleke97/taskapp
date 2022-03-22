import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({ text, loading }) => {
  return (
    <>
      {loading && (
        <div className="loadingContainer">
          <div className="loader">
            <ClipLoader
              loading={loading}
              color={"#fff"}
              speedMultiplier={0.5}
            />
            <p>{text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
