import "./styles.css";
import { useState } from "react";
import { createTickets } from "./firebase/Database"
import Track from "./Track";

// step heading and instruction array
const stepInfo = [
  {
    heading: "Submit a ticket",
    instruction: "Welcome to Wellness Pro Technical Services"
    
  },
  {
    heading: "Additional Info",
    instruction: "Please provide accurate information"
  },
  {
    heading: "Item Description",
    instruction: "Let's validate your item"
  },
  {
    heading: "Finishing up",
    instruction: "Describe the issue for us"
  },
  {}
];

// Sidebar of the form
function Sidebar(props) {
  // Sidebar steps name array
  const steps = ["Your Info", "Institution", "Item", "Issue"];
  
  return (
    // Sidebar element
    <div className="sidebar">
      {/* Iterating an array steps */}
      {steps.map((stepName, index) => (
        <div className="step" key={index}>
          <div
            className="step-num"
            style={
              props.step === index
                ? { backgroundColor: "#A6D0DD", color: "#000" }
                : {}
            }
          >
            {index + 1}
          </div>
          <div className="step-info">
            <span>STEP {index + 1}</span>
            <span>{stepName.toUpperCase()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Step: I Personal information Component
function PersonalInfo(props) {
  return (
    <div>
      <div className="personal-info-inputs">
        <div>
          <label>
            Full Name<span>{props.errorCode === 1 && "This field is required"}</span>
          </label>
          <input
            type="text"
            placeholder="e.g Taylor Swift"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
          />
        </div>
        <div>
          <label>
            Email Address
            <span>{props.errorCode === 2 && "This field is required"}</span>
          </label>
          <input
            type="email"
            placeholder="e.g taylorswift@gmail.com"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>
            Phone Number / Telephone Number
            <span>{props.errorCode === 3 && "This field is required"}</span>
          </label>
          <input
            type="tel"
            placeholder=""
            value={props.phone}
            onChange={(e) => props.setPhone(e.target.value)}
          />
        </div>
      </div>
      
   {/* wards */}
      <button onClick={()=>props.functionTicks()} className="now-btn" >Track your ticket</button>
      <a href="https://wpi-projects-17ff6.web.app">
      <button className="back-btn">Back</button></a>
    </div>
  );
}

// Step: II Plan selection component
function Plans(props) {
  return (
    <div className="personal-info-inputs">
      <div>
        <label>
          Address<span>{props.errorCode === 4 && "This field is required"}</span>
        </label>
        <input
          type="text"
          placeholder=""
          value={props.address}
          onChange={(e) => props.setAddress(e.target.value)}
        />
      </div>
      <div>
        <label>
          Institution
          <span>{props.errorCode === 5 && "This field is required"}</span>
        </label>
        <input
          type="text"
          placeholder=""
          value={props.institution}
          onChange={(e) => props.setInstitution(e.target.value)}
        />
      </div>
    </div>
  );
}

// Step III : Add-ons component
function AddOns(props) {
  return (
    <div className="personal-info-inputs">
      <div>
        <label>
          Brand<span>{props.errorCode === 6 && "This field is required"}</span>
        </label>
        <input
          type="text"
          placeholder=""
          value={props.brand}
          onChange={(e) => props.setBrand(e.target.value)}
        />
      </div>
      <div>
        <label>
          Model
          <span>{props.errorCode === 7 && "This field is required"}</span>
        </label>
        <input
          type="text"
          placeholder=""
          value={props.model}
          onChange={(e) => props.setModel(e.target.value)}
        />
      </div>
      <div>
        <label>
          Serial Number
          <span>{props.errorCode === 8 && "This field is required"}</span>
        </label>
        <input
          type="text"
          placeholder=""
          value={props.serialNumber}
          onChange={(e) => props.setSerialNumber(e.target.value)}
        />
      </div>
    </div>
  );
}

// STEP IV : Summary of services provided and its calculation
function Summary(props) {
  return (
    <div className="personal-info-inputs">
      <div>
        <label>
          Description of the issue
          <span>{props.errorCode === 9 && "This field is required"}</span>
        </label>
        <input
          type="text"
          placeholder=""
          value={props.issueDescription}
          onChange={(e) => props.setIssueDescription(e.target.value)}
        />
      </div>
      <div>
        <label>
          Pick a date
          <span>{props.errorCode === 10 && "This field is required"}</span>
        </label>
        <input
          type="date"
          placeholder=""
          value={props.date}
          onChange={(e) => props.setDate(e.target.value)}
        />
        <br /><br />Please input the most convenient time for you
      </div>
    </div>
  );
}

function Confirm() {
  return (
    <div className="confirm left-side">
      <div className="confirm-box">
        <div className="confirm-checkbox">
          <span className="material-symbols-outlined">new_releases</span>
        </div>
        <div className="confirm-thank">
          <h1>Thank You!</h1>
        </div>
        <div className="confirm-info">
          <p>
            Thanks for confirming your submission! If you ever need support, please feel free to email us
            at support@wpi.com.ph
          </p><br></br>

          <div 
          style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
   
            }}>
              <a href="https://wpi-projects-17ff6.web.app">
              <button className="next-btn">Finish</button></a>

              <a href="/">
              <button className="next-btn">Submit Again</button></a>
          </div>
     
        </div>
      </div>
    </div>
  );
}

// Form structure
function FormStructure({ step, setStep, setTicketView, ticketView}) {

  // handle on CLick
  const handleOnlick = () => {
    setTicketView(!ticketView)
  }

  // Profile info states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorCode, setErrorCode] = useState(0);
 
  // Part 2
  const [address, setAddress] = useState("");
  const [institution, setInstitution] = useState("");

  // Part 3
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  // Part 4
  const [issueDescription, setIssueDescription] = useState("");
  const [date, setDate] = useState("");

  function checkNonEmpty() {
    if (step === 0 && (name === "" || email === "" || phone === "")) {
      setErrorCode(1);
    } else if (step === 1 && (address === "" || institution === "")) {
      setErrorCode(2);
    } else if (step === 2 && (brand === "" || model === "" || serialNumber === "")) {
      setErrorCode(3);
    } else if (step === 3 && (issueDescription === "" || date === "")) {
      setErrorCode(4);
    } else {
      return true;
    }
    return false;
  }

  return (
    <div className="form left-side">
      <div className="form-heading">
        <h1>{stepInfo[step].heading}</h1>
        <p>{stepInfo[step].instruction}</p>
      </div>
      <div className="step-form">
        {step === 0 ? (
          <PersonalInfo
            name={name}
            email={email}
            phone={phone}
            setName={setName}
            setEmail={setEmail}
            setPhone={setPhone}
            errorCode={errorCode}
            functionTicks={handleOnlick}
          />
        ) : step === 1 ? (
          <Plans
            address={address}
            setAddress={setAddress}
            institution={institution}
            setInstitution={setInstitution}
            errorCode={errorCode}
          />
        ) : step === 2 ? (
          <AddOns
            brand={brand}
            setBrand={setBrand}
            model={model}
            setModel={setModel}
            serialNumber={serialNumber}
            setSerialNumber={setSerialNumber}
            errorCode={errorCode}
          />
        ) : (
          <Summary
            issueDescription={issueDescription}
            setIssueDescription={setIssueDescription}
            date={date}
            setDate={setDate}
            errorCode={errorCode}
          />
        )}
      </div>
      <div className="btn">
        {step > 0 && (
          <button
            className="prev-btn"
            onClick={() => {
              if (step > 0 && step <= 3) {
                setStep(step - 1);
              }
            }}
          >
            Go back
          </button>
        )}
        <button
          className="next-btn"
          onClick={() => {
            const check = checkNonEmpty();
            if (check && step >= 0 && step <= 3) {
              setStep(step + 1);

              // console.log({
              //   "name": name,
              //   "email": email,
              //   "phone": phone,
              //   "address": address,
              //   "institution": institution,
              //   "brand": brand,
              //   "model": model,
              //   "serialNumber": serialNumber,
              //   "issueDescription": issueDescription,
              //   "date":date
              // })

            }
            if(step===3){
              const data = {
                "name": name,
                "address": address,
                "institution": institution,
                "contactNumber": String(phone),
                "brand": brand,
                "model": model,
                "email": email,
                "serialNumber": serialNumber,
                "issue": String(issueDescription),
                "schedule": String(date),
                "status": "pending"
              }
              createTickets(data)

              // console.log({
              //   "name": name,
              //   "address": address,
              //   "institution": institution,
              //   "contactNumber": phone,
              //   "brand": brand,
              //   "model": model,
              //   "email": email,
              //   "serialNumber": serialNumber,
              //   "issue": issueDescription,
              //   "schedule":date,
              //   "status": "pending"
              // })
            }

      
          }}
        >
          {step !== 3 ? "Next Step" : "Confirm"}
        </button>
      </div>
    </div>
  );
}

// Export App Component to index.js
export default function App() {
  const [step, setStep] = useState(0);
  const [ticketView,setTicketView] = useState(true)

  return (
    // <div className="multi-step-form">
    //  <Sidebar step={step} />
    // <Confirm /> 
<div>
    {  
    
    ticketView ? 
        <div className="multi-step-form">
          <Sidebar step={step} />
          {step >= 0 && step <= 3 ? ( <FormStructure step={step} setStep={setStep} setTicketView={setTicketView} ticketView={ticketView}/> ) : ( <Confirm /> ) }
        </div>
        :

      <div>
        <Track setTicketView={setTicketView}/>
      </div> 
    }
  </div>
  );
}
