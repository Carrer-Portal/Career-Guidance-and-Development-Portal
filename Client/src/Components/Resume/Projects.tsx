import React from 'react';
import "./Homepage.css";

interface ProjectData {
  name: string;
  link: string;
  tech: string;
  desc: string;
}

interface ProjectProps {
  number: number;
  project: ProjectData;
  setproject: (project: ProjectData) => void;
  name: string;
  link: string;
  tech: string;
  desc: string;
}

const Project: React.FC<ProjectProps> = ({ number, project, setproject, name, link, tech, desc }) => {
  return (
    <div className="form experience">
      <h2>Project #{number}</h2>
      <div className="input-box">
        <span className="details">Name</span>
        <input type="text" placeholder="Project Name" value={name} onChange={e => setproject({ ...project, name: e.target.value })} />
      </div>
      <div className="input-box">
        <span className="details">Link</span>
        <input type="text" placeholder="Github/working Link" value={link} onChange={e => setproject({ ...project, link: e.target.value })} />
      </div>
      <div className="input-box">
        <span className="details">Tech Used</span>
        <input type="text" placeholder="Technology Used" value={tech} onChange={e => setproject({ ...project, tech: e.target.value })} />
      </div>
      <div className="input-box textarea">
        <span className="details">Description</span>
        <textarea placeholder="Description" value={desc} onChange={e => setproject({ ...project, desc: e.target.value })} />
      </div>
    </div>
  );
};

interface ProjectsProps {
  project: ProjectData;
  setproject: (project: ProjectData) => void;
  name: string;
  link: string;
  tech: string;
  desc: string;
  project2: ProjectData;
  setproject2: (project: ProjectData) => void;
  name2: string;
  link2: string;
  tech2: string;
  desc2: string;
  project3: ProjectData;
  setproject3: (project: ProjectData) => void;
  name3: string;
  link3: string;
  tech3: string;
  desc3: string;
  project4: ProjectData;
  setproject4: (project: ProjectData) => void;
  name4: string;
  link4: string;
  tech4: string;
  desc4: string;
}

const Projects: React.FC<ProjectsProps> = ({
  project, setproject, name, link, tech, desc,
  project2, setproject2, name2, link2, tech2, desc2,
  project3, setproject3, name3, link3, tech3, desc3,
  project4, setproject4, name4, link4, tech4, desc4
}) => {
  return (
    <div className="form">
      <Project number={1} project={project} setproject={setproject} name={name} link={link} tech={tech} desc={desc} />
      {/* <Project number={2} project={project2} setproject={setproject2} name={name2} link={link2} tech={tech2} desc={desc2} />
      <Project number={3} project={project3} setproject={setproject3} name={name3} link={link3} tech={tech3} desc={desc3} />
      <Project number={4} project={project4} setproject={setproject4} name={name4} link={link4} tech={tech4} desc={desc4} /> */}
    </div>
  );
};

export default Projects;