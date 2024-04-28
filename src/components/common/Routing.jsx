// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Header from "./Header";
import HowTo from "../howto/HowTo";

export default function Routing() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/howtouse" element={<HowTo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
