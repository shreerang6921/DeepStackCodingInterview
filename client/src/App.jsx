import { useState } from "react";
import PetForm from "./components/PetForm";
import GetPets from "./components/getPets";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <PetForm />
      <GetPets />
    </>
  );
}

export default App;
