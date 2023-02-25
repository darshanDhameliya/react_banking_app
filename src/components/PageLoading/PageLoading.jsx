import React from "react";
import ReactLoading from "react-loading";
import "./PageLoading.css";

const PageLoading = () => {
  return (
    <>
      <div className="center">
        <ReactLoading type="spin" color="#212529" height={100} width={100} />
      </div>
    </>
  );
};

export default PageLoading;
