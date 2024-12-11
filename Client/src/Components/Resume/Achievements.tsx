import React from 'react';
import "./Homepage.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

interface AchProps {
  item: string;
  id: number;
  onSelect: (id: number) => void;
}

const Ach: React.FC<AchProps> = (props) => {
  return (
    <div className="achivelist">
      <p>{props.item}</p>
      <DeleteIcon onClick={() => props.onSelect(props.id)} />
    </div>
  );
};

interface AchievementsProps {
  ach: string;
  setach: (ach: string) => void;
  list: string[];
  setlist: (list: string[]) => void;
  additem: () => void;
  deleteitem: (id: number) => void;
}

const Achievements: React.FC<AchievementsProps> = ({ ach, setach, list, setlist, additem, deleteitem }) => {
  return (
    <div className="form">
      <h1 className="heading">Achievements</h1>
      <div className="form">
        <div className="input-box">
          <span className="details">Achievements</span>
          <input
            type="text"
            placeholder="Type Your Achievements Here"
            style={{ width: '85%' }}
            value={ach}
            onKeyPress={e => {
              if (e.key === 'Enter') additem();
            }}
            onChange={e => setach(e.target.value)}
          />
          <IconButton onClick={additem} disabled={ach === ''}>
            +
          </IconButton>
        </div>
        <div className="skills-section" style={{ boxShadow: 'none', height: '22rem' }}>
          {list.map((item, index) => (
            item.length > 0 && <Ach item={item} id={index} key={index} onSelect={deleteitem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;