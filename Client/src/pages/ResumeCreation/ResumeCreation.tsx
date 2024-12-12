import React, { useState, useEffect, useRef } from "react";
import "./Resumecreation.css";
import { useNavigate } from "react-router-dom";
import "../../Components/Resume/Homepage.css";
import Info from "../../Components/Resume/Info";
import Skills from "../../Components/Resume/Skills";
import Projects from "../../Components/Resume/Projects";
import Experience from "../../Components/Resume/Experience";
import Education from "../../Components/Resume/Education";
import Achievements from "../../Components/Resume/Achievements";
import { ComponentToPrint } from "../../Components/Resume/ComponentToPrint";
import { ArrowLeftShort } from "react-bootstrap-icons";

interface ExperienceData {
  postname: string;
  company: string;
  from: string;
  to: string;
  expdesc: string;
}

interface EducationData {
  school: string;
  course: string;
  from: string;
  to: string;
  ach: string;
}

interface ProjectData {
  name: string;
  link: string;
  tech: string;
  desc: string;
}

const ResumeCreation: React.FC = () => {
  const navigate = useNavigate();
  
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Reload to restore the original content
    }
  };

  const [nav, setNav] = useState<string>("info");

  const [photourl, setPhotourl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [userdesc, setUserdesc] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [portfolio, setPortfolio] = useState<string>("");

  const setPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        setPhotourl(fileReader.result as string);
      });

      fileReader.readAsDataURL(file);
    }
  };

  const [exp, setExp] = useState<ExperienceData>({
    postname: "",
    company: "",
    from: "",
    to: "",
    expdesc: "",
  });
  const [exp2, setExp2] = useState<ExperienceData>({
    postname: "",
    company: "",
    from: "",
    to: "",
    expdesc: "",
  });
  const [exp3, setExp3] = useState<ExperienceData>({
    postname: "",
    company: "",
    from: "",
    to: "",
    expdesc: "",
  });
  const [exp4, setExp4] = useState<ExperienceData>({
    postname: "",
    company: "",
    from: "",
    to: "",
    expdesc: "",
  });
  const [exp5, setExp5] = useState<ExperienceData>({
    postname: "",
    company: "",
    from: "",
    to: "",
    expdesc: "",
  });
  const [exp6, setExp6] = useState<ExperienceData>({
    postname: "",
    company: "",
    from: "",
    to: "",
    expdesc: "",
  });

  const [edu, setEdu] = useState<Record<string, EducationData>>({
    edu_1: {
      school: "",
      course: "",
      from: "",
      to: "",
      ach: "",
    },
  });

  const eduObject: Record<string, EducationData> = {
    edu_1: {
      school: "",
      course: "",
      from: "",
      to: "",
      ach: "",
    },
  };

  const [input, setInput] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const listofitems = () => {
    setSkills((olditems) => [...olditems, input]);
    setInput("");
  };
  const deleteitems = (id: number) => {
    setSkills((olditems) => olditems.filter((_, index) => id !== index));
  };

  const [project, setProject] = useState<ProjectData>({
    name: "",
    link: "",
    tech: "",
    desc: "",
  });
  const [project2, setProject2] = useState<ProjectData>({
    name: "",
    link: "",
    tech: "",
    desc: "",
  });
  const [project3, setProject3] = useState<ProjectData>({
    name: "",
    link: "",
    tech: "",
    desc: "",
  });
  const [project4, setProject4] = useState<ProjectData>({
    name: "",
    link: "",
    tech: "",
    desc: "",
  });

  const projectObject: ProjectData = {
    name: "",
    link: "",
    tech: "",
    desc: "",
  };

  const [ach, setAch] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const additem = () => {
    setList((olditem) => [...olditem, ach]);
    setAch("");
  };
  const deleteitem = (id: number) => {
    setList((olditem) => olditem.filter((_, index) => id !== index));
  };

  const removeall = () => {
    setPhotourl("");
    setName("");
    setSubtitle("");
    setUserdesc("");
    setEmail("");
    setContact("");
    setAddress("");
    setGithub("");
    setLinkedin("");
    setPortfolio("");
    setSkills([]);
    setList([]);
    setEdu(eduObject);
    setProject(projectObject);
    setProject2(projectObject);
    setProject3(projectObject);
    setProject4(projectObject);
    setExp({
      postname: "",
      company: "",
      from: "",
      to: "",
      expdesc: "",
    });
    setExp2({
      postname: "",
      company: "",
      from: "",
      to: "",
      expdesc: "",
    });
    setExp3({
      postname: "",
      company: "",
      from: "",
      to: "",
      expdesc: "",
    });
    setExp4({
      postname: "",
      company: "",
      from: "",
      to: "",
      expdesc: "",
    });
    setExp5({
      postname: "",
      company: "",
      from: "",
      to: "",
      expdesc: "",
    });
    setExp6({
      postname: "",
      company: "",
      from: "",
      to: "",
      expdesc: "",
    });
    localStorage.clear();
  };

  const isEmpty = () => {
    if (
      photourl.length ||
      name.length ||
      subtitle.length ||
      userdesc.length ||
      email.length ||
      contact.length ||
      address.length ||
      github.length ||
      linkedin.length ||
      portfolio.length
    ) {
      return false;
    }
    if (input.length || skills.length > 0 || ach.length > 0 || list.length > 0) {
      return false;
    }
    const dummyExp: ExperienceData = {
      postname: "",
      company: "",
      from: "",
      to: "",
      expdesc: "",
    };

    let expArray = [exp, exp2, exp3, exp4, exp5, exp6];

    for (let i = 0; i < 6; ++i) {
      if (JSON.stringify(expArray[i]) !== JSON.stringify(dummyExp)) {
        return false;
      }
    }

    const dummyProject: ProjectData = {
      name: "",
      link: "",
      tech: "",
      desc: "",
    };

    let projectArray = [project, project2, project3, project4];
    for (let i = 0; i < 4; ++i) {
      if (JSON.stringify(projectArray[i]) !== JSON.stringify(dummyProject)) {
        return false;
      }
    }
    return true;
  };

  const [primary, setPrimary] = useState<string>("");
  const [secondary, setSecondary] = useState<string>("");

  const [fontFamily, setFontFamily] = useState<string>("Arial");

  useEffect(() => {
    const prename = localStorage.getItem("name") || "";
    setName(prename);
    setSubtitle(localStorage.getItem("subtitle") || "");
    setPhotourl(localStorage.getItem("photourl") || "");
    setUserdesc(localStorage.getItem("userdesc") || "");
    setEmail(localStorage.getItem("email") || "");
    setContact(localStorage.getItem("contact") || "");
    setAddress(localStorage.getItem("address") || "");
    setGithub(localStorage.getItem("github") || "");
    setLinkedin(localStorage.getItem("linkedin") || "");
    setPortfolio(localStorage.getItem("portfolio") || "");
    setSkills(localStorage.getItem("skills") ? JSON.parse(localStorage.getItem("skills")!) : []);
    setList(localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")!) : []);
    setEdu(localStorage.getItem("edu") ? JSON.parse(localStorage.getItem("edu")!) : eduObject);
    setProject(localStorage.getItem("project") ? JSON.parse(localStorage.getItem("project")!)[0] : projectObject);
    setProject2(localStorage.getItem("project") ? JSON.parse(localStorage.getItem("project")!)[1] : projectObject);
    setProject3(localStorage.getItem("project") ? JSON.parse(localStorage.getItem("project")!)[2] : projectObject);
    setProject4(localStorage.getItem("project") ? JSON.parse(localStorage.getItem("project")!)[3] : projectObject);
    setExp(localStorage.getItem("exp") ? JSON.parse(localStorage.getItem("exp")!)[0] : exp);
    setExp2(localStorage.getItem("exp") ? JSON.parse(localStorage.getItem("exp")!)[1] : exp2);
    setExp3(localStorage.getItem("exp") ? JSON.parse(localStorage.getItem("exp")!)[2] : exp3);
    setExp4(localStorage.getItem("exp") ? JSON.parse(localStorage.getItem("exp")!)[3] : exp4);
    setExp5(localStorage.getItem("exp") ? JSON.parse(localStorage.getItem("exp")!)[4] : exp5);
    setExp6(localStorage.getItem("exp") ? JSON.parse(localStorage.getItem("exp")!)[5] : exp6);
    setPrimary(localStorage.getItem("theme_primary") || "#34678c");
    setSecondary(localStorage.getItem("theme_secondary") || "rgb(242, 100, 100)");
  }, []);

  useEffect(() => {
    localStorage.setItem("photourl", photourl);
    localStorage.setItem("name", name);
    localStorage.setItem("subtitle", subtitle);
    localStorage.setItem("userdesc", userdesc);
    localStorage.setItem("email", email);
    localStorage.setItem("contact", contact);
    localStorage.setItem("address", address);
    localStorage.setItem("github", github);
    localStorage.setItem("linkedin", linkedin);
    localStorage.setItem("portfolio", portfolio);
    localStorage.setItem("skills", JSON.stringify(skills));
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("edu", JSON.stringify(edu));
    localStorage.setItem("project", JSON.stringify([project, project2, project3, project4]));
    localStorage.setItem("exp", JSON.stringify([exp, exp2, exp3, exp4, exp5, exp6]));
  }, [
    name,
    subtitle,
    photourl,
    userdesc,
    email,
    contact,
    address,
    github,
    portfolio,
    linkedin,
    exp,
    skills,
    list,
    edu,
    project,
    project2,
    project3,
    project4,
    exp,
    exp2,
    exp3,
    exp4,
    exp5,
    exp6,
  ]);

  return (
    <div className="resumecreation">
        <div className="backButtonStyle">
          <button className="btn btn-light back" onClick={() => navigate(-1)}>
          <ArrowLeftShort fontSize={20} />Back
          </button>
        </div>

      <div className="body resumecreation">
        <div className="left">
          <div className="navbarresume">
            <li className={nav === "info" ? "active" : ""} onClick={() => setNav("info")}>
              Info
            </li>
            <li className={nav === "Experience" ? "active" : ""} onClick={() => setNav("Experience")}>
              Experience
            </li>
            <li className={nav === "Education" ? "active" : ""} onClick={() => setNav("Education")}>
              Education
            </li>
            <li className={nav === "Skills" ? "active" : ""} onClick={() => setNav("Skills")}>
              Skills
            </li>
            <li className={nav === "Projects" ? "active" : ""} onClick={() => setNav("Projects")}>
              Projects
            </li>
            <li className={nav === "Achievements" ? "active" : ""} onClick={() => setNav("Achievements")} style={{ width: "25%" }}>
              Achievements
            </li>
          </div>
          {nav === "info" ? (
            <Info
              photourl={photourl}
              setphotourl={setPhoto}
              name={name}
              setname={setName}
              subtitle={subtitle}
              setsubtitle={setSubtitle}
              userdesc={userdesc}
              setuserdesc={setUserdesc}
              email={email}
              setemail={setEmail}
              contact={contact}
              setcontact={setContact}
              address={address}
              setaddress={setAddress}
              github={github}
              setgithub={setGithub}
              linkedin={linkedin}
              setlinkedin={setLinkedin}
              portfolio={portfolio}
              setportfolio={setPortfolio}
            />
          ) : null}
          {nav === "Experience" ? (
            <Experience
              exp={exp}
              setexp={setExp}
              postname={exp.postname}
              company={exp.company}
              from={exp.from}
              to={exp.to}
              expdesc={exp.expdesc}
              exp2={exp2}
              setexp2={setExp2}
              postname2={exp2.postname}
              company2={exp2.company}
              from2={exp2.from}
              to2={exp2.to}
              expdesc2={exp2.expdesc}
              exp3={exp3}
              setexp3={setExp3}
              postname3={exp3.postname}
              company3={exp3.company}
              from3={exp3.from}
              to3={exp3.to}
              expdesc3={exp3.expdesc}
              exp4={exp4}
              setexp4={setExp4}
              postname4={exp4.postname}
              company4={exp4.company}
              from4={exp4.from}
              to4={exp4.to}
              expdesc4={exp4.expdesc}
              exp5={exp5}
              setexp5={setExp5}
              postname5={exp5.postname}
              company5={exp5.company}
              from5={exp5.from}
              to5={exp5.to}
              expdesc5={exp5.expdesc}
              exp6={exp6}
              setexp6={setExp6}
              postname6={exp6.postname}
              company6={exp6.company}
              from6={exp6.from}
              to6={exp6.to}
              expdesc6={exp6.expdesc}
            />
          ) : null}
          {nav === "Education" ? <Education edu={edu} setedu={setEdu} /> : null}
          {nav === "Skills" ? (
            <Skills
              input={input}
              skills={skills}
              listofitems={listofitems}
              deleteitems={deleteitems}
              setinput={setInput}
              setskills={setSkills}
            />
          ) : null}

          {nav === "Projects" ? (
            <Projects
              project={project}
              setproject={setProject}
              name={project.name}
              link={project.link}
              tech={project.tech}
              desc={project.desc}
              project2={project2}
              setproject2={setProject2}
              name2={project2.name}
              link2={project2.link}
              tech2={project2.tech}
              desc2={project2.desc}
              project3={project3}
              setproject3={setProject3}
              name3={project3.name}
              link3={project3.link}
              tech3={project3.tech}
              desc3={project3.desc}
              project4={project4}
              setproject4={setProject4}
              name4={project4.name}
              link4={project4.link}
              tech4={project4.tech}
              desc4={project4.desc}
            />
          ) : null}
          {nav === "Achievements" ? (
            <Achievements
              ach={ach}
              setach={setAch}
              list={list}
              setlist={setList}
              additem={additem}
              deleteitem={deleteitem}
            />
          ) : null}
          <div className="scroller"></div>
        </div>
        <div className="right">
          <div className="up">
            <div className="buttons">
              <button className="print-button" onClick={handlePrint}>
                Print this out!
              </button>
              <button className="remove-button" onClick={removeall}>
                Clear All
              </button>
            </div>
          </div>
          <div className="resume-preview" ref={printRef}>
            <ComponentToPrint
              photourl={photourl}
              name={name}
              subtitle={subtitle}
              userdesc={userdesc}
              email={email}
              contact={contact}
              address={address}
              github={github}
              linkedin={linkedin}
              portfolio={portfolio}
              exp={exp}
              exp2={exp2}
              exp3={exp3}
              exp4={exp4}
              exp5={exp5}
              exp6={exp6}
              edu={edu}
              skills={skills}
              achlist={list}
              project={project}
              project2={project2}
              project3={project3}
              project4={project4}
              primary={primary}
              secondary={secondary}
              fontFamily={fontFamily}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCreation;