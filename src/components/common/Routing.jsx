// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Answers from "../answers/Answers";
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
          <Route path="/answers" element={<Answers />} />
          <Route path="/howto" element={<HowTo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
