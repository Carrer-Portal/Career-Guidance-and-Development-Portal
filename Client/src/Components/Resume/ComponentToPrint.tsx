import React from "react";
import "./resumestyling.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import AttachmentIcon from "@mui/icons-material/Attachment";

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

interface ComponentToPrintProps {
  photourl: string;
  name: string;
  subtitle: string;
  userdesc: string;
  email: string;
  contact: string;
  address: string;
  github: string;
  linkedin: string;
  portfolio: string;
  exp: ExperienceData;
  exp2: ExperienceData;
  exp3: ExperienceData;
  exp4: ExperienceData;
  exp5: ExperienceData;
  exp6: ExperienceData;
  edu: Record<string, EducationData>;
  skills: string[];
  achlist: string[];
  project: ProjectData;
  project2: ProjectData;
  project3: ProjectData;
  project4: ProjectData;
  primary: string;
  secondary: string;
  fontFamily: string;
}

export class ComponentToPrint extends React.PureComponent<ComponentToPrintProps> {
  render() {
    const {
      photourl,
      name,
      subtitle,
      userdesc,
      email,
      contact,
      address,
      github,
      linkedin,
      portfolio,
      primary,
      secondary,
      fontFamily,
      exp,
      exp2,
      exp3,
      exp4,
      exp5,
      exp6,
      edu,
      skills,
      achlist,
      project,
      project2,
      project3,
      project4,
    } = this.props;

    return (
      <div className="resume" style={{ fontFamily,}}>
        {/* Basic Info */}
        <div className="info">
          {photourl && <img src={photourl} alt="" width="100" />}
          <div className="main-info">
            <h1 style={{ color: "#1c1a1a" , marginTop: 6, marginBottom:0 }}>{name}</h1>
            <h3 style={{  margin: 0 }}>{subtitle}</h3>
            <p style={{  marginTop: 12 }}>{userdesc}</p>
          </div>
        </div>

        {/* Contact Section */}
        {(email || contact || address || github || linkedin || portfolio) && (
          <div className="extrainfo">
            {email && (
              <a href={`mailto:${email}`}>
                <EmailIcon style={{ color: "#1c1a1a" }} /> {email}
              </a>
            )}
            {contact && (
              <a href={`tel:${contact}`}>
                <PhoneIcon style={{ color: "#1c1a1a" }} /> {contact}
              </a>
            )}
            {address && (
              <a href={`https://maps.google.com/?q=${address}`}>
                <LocationOnIcon style={{ color: "#1c1a1a" }} /> {address}
              </a>
            )}
            {github && (
              <a href={github}>
                <GitHubIcon style={{ color: "#1c1a1a" }} /> {github}
              </a>
            )}
            {linkedin && (
              <a href={linkedin}>
                <LinkedInIcon style={{ color: "#1c1a1a" }} /> {linkedin}
              </a>
            )}
            {portfolio && (
              <a href={portfolio}>
                <LanguageIcon style={{ color: "#1c1a1a" }} /> {portfolio}
              </a>
            )}
          </div>
        )}

        {/* Left Section */}
        <div className="section">
          <div className="left-section">
            {/* Experience Section */}
            {[exp, exp2, exp3, exp4, exp5, exp6].some(
              (item) => item.postname
            ) && (
              <div className="experiences">
                <h2
                  className="section-heading"
                  style={{
                    color: "#1c1a1a",
                    fontSize: "24px",
                    backgroundColor: "#e2dede",
                  }}
                >
                  Experience
                </h2>
                {[exp, exp2, exp3, exp4, exp5, exp6].map(
                  (experience, index) =>
                    experience.postname && (
                      <div className="div" key={index}>
                        <h2
                          style={{ color: "#1c1a1a", fontSize: 18, margin: 0 }}
                        >
                          {experience.postname}
                        </h2>
                        <h2
                          style={{ fontSize: 16, margin: 0, fontWeight: 600 }}
                        >
                          {experience.company}
                        </h2>
                        <p style={{ fontSize: 12, marginTop: 2 }}>
                          {experience.from} - {experience.to}
                        </p>
                        <p>{experience.expdesc}</p>
                      </div>
                    )
                )}
              </div>
            )}

            {/* Education Section */}
            {Object.keys(edu).some((key) => edu[key].school) && (
              <div className="education">
                <h2
                  className="section-heading"
                  style={{
                    color: "#1c1a1a",
                    fontSize: "24px",
                    backgroundColor: "#e2dede",
                  }}
                >
                  Education
                </h2>
                {Object.keys(edu).map((key, index) => {
                  const education = edu[key];
                  return (
                    education.school && (
                      <div key={index}>
                        <h2
                          style={{ color: "#1c1a1a", fontSize: 18, margin: 0 }}
                        >
                          {education.school}
                        </h2>
                        <h2
                          style={{ fontSize: 16, margin: 0, fontWeight: 600 }}
                        >
                          {education.course}
                        </h2>
                        <p style={{ fontSize: 12, marginTop: 2 }}>
                          {education.from} - {education.to}
                        </p>
                        <p>{education.ach}</p>
                      </div>
                    )
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="right-section">
            {/* Skills */}
            {skills.length > 0 && (
              <div className="skills">
                <h2
                  className="section-heading"
                  style={{
                    color: "#1c1a1a",
                    fontSize: "24px",
                    backgroundColor: "#e2dede",
                  }}
                >
                  Skills
                </h2>
                {skills.map((skill, index) => (
                  <p key={index}>
                    <span style={{ marginRight: "8px" }}>•</span>
                    {skill}
                  </p>
                ))}
              </div>
            )}

            {/* Projects */}
            {[project, project2, project3, project4].some(
              (item) => item.name
            ) && (
              <div className="projects">
                <h2
                  className="section-heading"
                  style={{
                    color: "#1c1a1a",
                    fontSize: "24px",
                    backgroundColor: "#e2dede",
                  }}
                >
                  Projects
                </h2>
                {[project, project2, project3, project4].map(
                  (proj, index) =>
                    proj.name && (
                      <div key={index}>
                        <h2
                          style={{ color: "#1c1a1a", fontSize: 18, margin: 0, marginBottom: 2 }}
                        >
                          {proj.name}
                        </h2>
                        <a href={github} style={{ color: "#1c1a1a", fontSize: 10,}}>
                          <GitHubIcon style={{ color: "#1c1a1a", fontSize: 10 }} /> {proj.link}
                        </a>
                        <p>{proj.desc}</p>
                      </div>
                    )
                )}
              </div>
            )}

            {/* Achievements */}
            {achlist.length > 0 && (
              <div className="achievements">
                <h2
                  className="section-heading"
                  style={{
                    color: "#1c1a1a",
                    fontSize: "24px",
                    backgroundColor: "#e2dede",
                  }}
                >
                  Achievements
                </h2>
                {achlist.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
