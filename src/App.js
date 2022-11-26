import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../src/front/js/component/scrollToTop";

import { Home } from "./front/js/pages/home";
import { Demo } from "./front/js/pages/demo";
import { Single } from "./front/js/pages/single";
import { Login } from "./front/js/pages/login";
import { SignUp } from "./front/js/pages/signup";
import { Private } from "./front/js/pages/private";
import injectContext from "../src/front/js/store/appContext";

import { Navbar } from "./front/js/component/navbar";
import { Footer } from "./front/js/component/footer";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Login />} path="/login" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<Private />} path="/private" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};
