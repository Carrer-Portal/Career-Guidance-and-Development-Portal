import React, { useState } from 'react';
import './Homepage.css';

interface EduProps {
  number: number;
  edu: Record<string, EducationData>;
  setedu: React.Dispatch<React.SetStateAction<Record<string, EducationData>>>;
  school: string;
  course: string;
  from: string;
  to: string;
  ach: string;
  id: string;
}

interface EducationData {
  school: string;
  course: string;
  from: string;
  to: string;
  ach: string;
}

interface EducationProps {
  edu: Record<string, EducationData>;
  setedu: React.Dispatch<React.SetStateAction<Record<string, EducationData>>>;
}

const Edu: React.FC<EduProps> = ({ number, edu, setedu, school, course, from, to, ach, id }) => {
  const updateData = (id: string, field: string, data: string) => {
    let updatededu = edu[id];
    updatededu = {
      ...updatededu,
      [field]: data,
    };
    setedu({ ...edu, [id]: updatededu });
  };

  return (
    <>
      <div className="form experience">
        <h2>Education #{number}</h2>
        <div className="input-box">
          <span className="details">School</span>
          <input
            type="text"
            placeholder="School Name"
            value={school}
            onChange={(e) => updateData(id, 'school', e.target.value)}
          />
        </div>
        <div className="input-box">
          <span className="details">Course</span>
          <input
            type="text"
            placeholder="Course Name"
            value={course}
            onChange={(e) => updateData(id, 'course', e.target.value)}
          />
        </div>
        <div className="input-box">
          <span className="details">From</span>
          <input
            type="text"
            placeholder="Your Subtitle"
            style={{ width: '50%', marginLeft: '1.3rem' }}
            value={from}
            onChange={(e) => updateData(id, 'from', e.target.value)}
          />
          <span className="details" style={{ marginLeft: '1rem', width: '20%' }}>
            To
          </span>
          <input
            type="text"
            placeholder="Your Subtitle"
            style={{ width: '50%', marginLeft: '0' }}
            value={to}
            onChange={(e) => updateData(id, 'to', e.target.value)}
          />
        </div>
        <div className="input-box">
          <span className="details">Achievements</span>
          <input
            type="text"
            placeholder="Achievements"
            value={ach}
            onChange={(e) => updateData(id, 'ach', e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

const Education: React.FC<EducationProps> = ({ edu, setedu }) => {
  const [index, setIndex] = useState(2);

  const createNewEdu = (edu: Record<string, EducationData>, index: number) => {
    setedu({
      ...edu,
      [`edu_${index}`]: {
        school: '',
        course: '',
        from: '',
        to: '',
        ach: '',
      },
    });
    setIndex((index) => index + 1);
  };

  return (
    <div className="form education">
      <h1 className="heading">Education</h1>
      {Object.keys(edu).map((eduid, index) => (
        <Edu
          key={index + 1}
          number={index + 1}
          edu={edu}
          id={eduid}
          school={edu[eduid].school}
          setedu={setedu}
          course={edu[eduid].course}
          from={edu[eduid].from}
          to={edu[eduid].to}
          ach={edu[eduid].ach}
        />
      ))}
      <button
        className="add-edu-button"
        onClick={() => createNewEdu(edu, index)}
        style={{ marginTop: '20px' }}
      >
        Add more Education
      </button>
    </div>
  );
};

export default Education;