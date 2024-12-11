/* eslint-disable array-callback-return */
import React from 'react';
import "./Homepage.css";
import IconButton from "@mui/material/IconButton";
import Skillitem from "./Skillitem";

interface SkillsProps {
  input: string;
  skills: string[];
  listofitems: () => void;
  deleteitems: (id: number) => void;
  setinput: (input: string) => void;
  setskills: (skills: string[]) => void;
}

const Skills: React.FC<SkillsProps> = ({ input, skills, listofitems, deleteitems, setinput, setskills }) => {
  return (
    <div className="form">
      <h1 className="heading">Skills</h1>
      <div className="form">
        <div className="input-box">
          <span className="details">Skills</span>
          <input
            type="text"
            placeholder="Type Your Skills Here"
            value={input}
            onChange={e => setinput(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') listofitems();
            }}
          />
          <IconButton onClick={listofitems} disabled={input === ""}>
            +
          </IconButton>
        </div>
        <div className="skills-section">
          {skills.map((item, index) => {
            if (item.length > 0) {
              return <Skillitem item={item} id={index} key={index} onSelect={deleteitems} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;