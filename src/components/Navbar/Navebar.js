import React from "react";
import { Link } from "react-router-dom";
export default function Navebar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/SignUp">Sign Up</Link>
      <Link to="/FindALeague">Find A League</Link>
      <Link to="/CreateATeam">Create A Team</Link>
      <Link to="/Leagues">Leagues</Link>
    </div>
  );
}
