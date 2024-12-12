import React from "react";
import "./info.css";
import "./Homepage.css";
import UploadIcon from '@mui/icons-material/Upload';

interface InfoProps {
  photourl: string;
  setphotourl: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  setname: (name: string) => void;
  subtitle: string;
  setsubtitle: (subtitle: string) => void;
  userdesc: string;
  setuserdesc: (userdesc: string) => void;
  email: string;
  setemail: (email: string) => void;
  contact: string;
  setcontact: (contact: string) => void;
  address: string;
  setaddress: (address: string) => void;
  github: string;
  setgithub: (github: string) => void;
  linkedin: string;
  setlinkedin: (linkedin: string) => void;
  portfolio: string;
  setportfolio: (portfolio: string) => void;
}

const Info: React.FC<InfoProps> = ({
  photourl,
  setphotourl,
  name,
  setname,
  subtitle,
  setsubtitle,
  userdesc,
  setuserdesc,
  email,
  setemail,
  contact,
  setcontact,
  address,
  setaddress,
  github,
  setgithub,
  linkedin,
  setlinkedin,
  portfolio,
  setportfolio,
}) => {
  return (
    <div>
      <div className="form">
        <h1 className="heading">Information</h1>
        <div className="form">
          <div className="input-box">
            <span className="details">Photo</span>
            <div className="file-uploader">
              <label htmlFor="file-input" className="custom-file-label">
                <UploadIcon
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />{" "}
                Upload Photo
              </label>
              <input
                id="file-input"
                type="file"
                onChange={setphotourl}
                style={{ display: "none" }}
                className="custom-file-input"
              />
            </div>
          </div>
          <div className="input-box">
            <span className="details">Name</span>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Subtitle</span>
            <input
              type="text"
              placeholder="Your Subtitle"
              value={subtitle}
              onChange={(e) => setsubtitle(e.target.value)}
            />
          </div>
          <div className="input-box textarea">
            <span className="details">Description</span>
            <textarea
              placeholder="Description"
              value={userdesc}
              onChange={(e) => setuserdesc(e.target.value)}
            />
          </div>
        </div>
        <h1 className="heading">Extra Information</h1>
        <div className="form">
          <div className="input-box">
            <span className="details">Email</span>
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Contact</span>
            <input
              type="text"
              placeholder="Number"
              value={contact}
              onChange={(e) => setcontact(e.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Address</span>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Github</span>
            <input
              type="text"
              placeholder="Url here"
              value={github}
              onChange={(e) => setgithub(e.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Linkedin</span>
            <input
              type="text"
              placeholder="Url here"
              value={linkedin}
              onChange={(e) => setlinkedin(e.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Portfolio</span>
            <input
              type="text"
              placeholder="Url here"
              value={portfolio}
              onChange={(e) => setportfolio(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
