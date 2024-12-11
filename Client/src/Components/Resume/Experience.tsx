import React from 'react';
import "./Homepage.css";

interface ExperienceData {
  postname: string;
  company: string;
  from: string;
  to: string;
  expdesc: string;
}

interface WorkExpProps {
  number: number;
  exp: ExperienceData;
  setexp: (exp: ExperienceData) => void;
  postname: string;
  company: string;
  from: string;
  to: string;
  expdesc: string;
}

const WorkExp: React.FC<WorkExpProps> = ({ number, exp, setexp, postname, company, from, to, expdesc }) => {
  return (
    <div className="form experience">
      <h2>Experience</h2> {/*#{number} */}
      <div className="input-box">
        <span className="details">Post Title</span>
        <input
          type="text"
          placeholder="Post Name"
          value={postname}
          onChange={e => setexp({ ...exp, postname: e.target.value })}
        />
      </div>
      <div className="input-box">
        <span className="details">Company</span>
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={e => setexp({ ...exp, company: e.target.value })}
        />
      </div>
      <div className="input-box">
        <span className="details">From</span>
        <input
          type="text"
          placeholder="Your Subtitle"
          style={{ width: '50%', marginLeft: '1.3rem' }}
          value={from}
          onChange={e => setexp({ ...exp, from: e.target.value })}
        />
        <span className="details" style={{ marginLeft: '1rem', width: '20%' }}>To</span>
        <input
          type="text"
          placeholder="Your Subtitle"
          style={{ width: '50%', marginLeft: '0' }}
          value={to}
          onChange={e => setexp({ ...exp, to: e.target.value })}
        />
      </div>
      <div className="input-box textarea">
        <span className="details">Experience</span>
        <textarea
          placeholder="Write your Experience Here"
          value={expdesc}
          onChange={e => setexp({ ...exp, expdesc: e.target.value })}
        />
      </div>
    </div>
  );
};

interface ExperienceProps {
  exp: ExperienceData;
  setexp: (exp: ExperienceData) => void;
  postname: string;
  company: string;
  from: string;
  to: string;
  expdesc: string;
  exp2: ExperienceData;
  setexp2: (exp: ExperienceData) => void;
  postname2: string;
  company2: string;
  from2: string;
  to2: string;
  expdesc2: string;
  exp3: ExperienceData;
  setexp3: (exp: ExperienceData) => void;
  postname3: string;
  company3: string;
  from3: string;
  to3: string;
  expdesc3: string;
  exp4: ExperienceData;
  setexp4: (exp: ExperienceData) => void;
  postname4: string;
  company4: string;
  from4: string;
  to4: string;
  expdesc4: string;
  exp5: ExperienceData;
  setexp5: (exp: ExperienceData) => void;
  postname5: string;
  company5: string;
  from5: string;
  to5: string;
  expdesc5: string;
  exp6: ExperienceData;
  setexp6: (exp: ExperienceData) => void;
  postname6: string;
  company6: string;
  from6: string;
  to6: string;
  expdesc6: string;
}

const Experience: React.FC<ExperienceProps> = ({
  exp, setexp, postname, company, from, to, expdesc,
  exp2, setexp2, postname2, company2, from2, to2, expdesc2,
  exp3, setexp3, postname3, company3, from3, to3, expdesc3,
  exp4, setexp4, postname4, company4, from4, to4, expdesc4,
  exp5, setexp5, postname5, company5, from5, to5, expdesc5,
  exp6, setexp6, postname6, company6, from6, to6, expdesc6
}) => {
  return (
    <div className="form workexp">
      <h1 className="heading">Work Experience</h1>
      <WorkExp number={1} exp={exp} setexp={setexp} postname={postname} company={company} from={from} to={to} expdesc={expdesc} />
      {/* <WorkExp number={2} exp={exp2} setexp={setexp2} postname={postname2} company={company2} from={from2} to={to2} expdesc={expdesc2} />
      <WorkExp number={3} exp={exp3} setexp={setexp3} postname={postname3} company={company3} from={from3} to={to3} expdesc={expdesc3} />
      <WorkExp number={4} exp={exp4} setexp={setexp4} postname={postname4} company={company4} from={from4} to={to4} expdesc={expdesc4} />
      <WorkExp number={5} exp={exp5} setexp={setexp5} postname={postname5} company={company5} from={from5} to={to5} expdesc={expdesc5} />
      <WorkExp number={6} exp={exp6} setexp={setexp6} postname={postname6} company={company6} from={from6} to={to6} expdesc={expdesc6} /> */}
    </div>
  );
};

export default Experience;