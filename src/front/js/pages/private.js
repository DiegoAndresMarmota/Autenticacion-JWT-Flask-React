import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Private = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.verifyUser(sessionStorage.getItem("token"));
  }, [store.errorMessage]);

  return (
    <div className="text-center mt-5">
      <h1 className="PRIVATE">Dashboard</h1>
      <hr className="my-4" />
      {store.errorMessage ? (
        <h1>{store.errorMessage}</h1>
      ) : (
        <h1>You are logged in.</h1>
      )}
    </div>
  );
};
