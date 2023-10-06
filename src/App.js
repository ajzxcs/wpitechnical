import "./styles.css";
import { useState } from "react";
import { createTickets, requestTicketNumber } from "./firebase/Database";
import Track from "./Track";

// step heading and instruction array
const stepInfo = [
  {
    heading: "Submit a request",
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

      {/* Buttons */}
      <button onClick={() => props.functionTicks()} className="now-btn">
        Track your ticket
      </button>
      <a href="https://wpi-projects-17ff6.web.app">
        <button className="back-btn">Back</button>
      </a>
    </div>
  );
}

// Step II: Plan selection component
function Plans(props) {
  const typeOfRequests = [
    "Corrective Maintenance/Repair (Default)",
    "Preventive Maintenance",
    "Delivery/Installation",
    "Inquiry/SCE",
    "Internal Request"
  ];

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
      <div>
      {/* DAGDAG1 */}
        <label>
          Designation<span>{props.errorCode === 11 && "This field is required"}</span>
        </label>
        <input
          type="text"
          placeholder=""
          value={props.designation}
          onChange={(e) => props.setDesignation(e.target.value)}
        />
      </div>
      <div>
      {/* DAGDAG2 */}
        <label>
          Type of Request
          <span>{props.errorCode === 12 && "This field is required"}</span>
        </label>
        <select
          value={props.typeOfRequest}
          onChange={(e) => props.setTypeOfRequest(e.target.value)}
        >
          {typeOfRequests.map((request, index) => (
            <option key={index} value={request}>
              {request}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Step III: Add-ons component
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
          Model<span>{props.errorCode === 7 && "This field is required"}</span>
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
          Serial Number<span>{props.errorCode === 8 && "This field is required"}</span>
        </label>
        <input
          type="text"
          placeholder=""
          value={props.serialNumber}
          onChange={(e) => props.setSerialNumber(e.target.value)}
        />
      </div>
      <div>
      {/* DAGDAG3 */}
        <label>
          Warranty Status<span>{props.errorCode === 13 && "This field is required"}</span>
        </label>
        <select
          value={props.warrantyStatus}
          onChange={(e) => props.setWarrantyStatus(e.target.value)}
        >
          <option value="Under Warranty">Under Warranty</option>
          <option value="Non-Warranty">Non-Warranty</option>
        </select>
      </div>
    </div>
  );
}


// Step IV: Summary of services provided and its calculation
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
          Please input the most convenient time for you
          <span>{props.errorCode === 10 && "This field is required"}</span>
        </label>
        <input
          type="date"
          placeholder=""
          value={props.date}
          onChange={(e) => props.setDate(e.target.value)}
        />
        <br /><br />
      </div>
    </div>
  );
}

function Confirm(ticketID ) {

  // handle on Click
  const handleOnlick = () => {
    ticketID.setTicketView(!ticketID.ticketView)
  }

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
            This is your ticket number please save this or take a screenshot of this!
          </p>
          <p style={{ color: 'red' }}>
            <strong>{ticketID.tsgID}</strong>
          </p>
          <br></br>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <a href="https://wpi-projects-17ff6.web.app">
              <button className="next-btn">Finish</button>
            </a>
            {/* DAGDAG4 */}

              <button className="next-btn" onClick={handleOnlick}>Track request</button>


            <a href="/">
              <button className="next-btn">Submit Again</button>
            </a>
          </div>

          <br></br>
          <br></br>
          <p>
            Thanks for confirming your submission! If you ever need support, please feel free to email us
            at support@wpi.com.ph
          </p><br></br>

        </div>
      </div>
    </div>
  );
}

// Form structure
function FormStructure({ step, setStep, setTicketView, ticketView, setRequestID }) {

  // handle on Click
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
  const [designation, setDesignation] = useState(""); {/* DAGDAG1 */}
  const [typeOfRequest, setTypeOfRequest] = useState("Corrective Maintenance/Repair (Default)"); {/* DAGDAG1 */}

  // Part 3
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [warrantyStatus, setWarrantyStatus] = useState("Under Warranty"); {/* DAGDAG1 */}

  // Part 4
  const [issueDescription, setIssueDescription] = useState("");
  const [date, setDate] = useState("");

  function checkNonEmpty() {
    if (step === 0 && (name === "" || email === "" || phone === "")) {
      setErrorCode(1);
    } else if (step === 1 && (address === "" || institution === "" || designation === "" || typeOfRequest === "")) {
      setErrorCode(2);
    } else if (step === 2 && (brand === "" || model === "" || serialNumber === "" || warrantyStatus === "")) { {/* DAGDAG1 */}
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
            designation={designation}  
            setDesignation={setDesignation}
            typeOfRequest={typeOfRequest}
            setTypeOfRequest={setTypeOfRequest} 
          />
        ) : step === 2 ? (
          <AddOns
            brand={brand}
            setBrand={setBrand}
            model={model}
            setModel={setModel}
            serialNumber={serialNumber}
            setSerialNumber={setSerialNumber}
            warrantyStatus={warrantyStatus} // {/* DAGDAG1 */}
            setWarrantyStatus={setWarrantyStatus} // {/* DAGDAG1 */}
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
            }
            if (step === 3) {
              const data = {

                // personal info
                name: name,
                email: email,
                contactNumber: String(phone),

                // plans
                address: address,
                institution: institution,
                designation:designation,
                typeOfRequest: typeOfRequest,

                // addons
                brand: brand,
                model: model,
                serialNumber: serialNumber,
                warrantyStatus:warrantyStatus,

                // summary
                issue: String(issueDescription),
                schedule: String(date),
                status: "pending",
                
              };

      

              requestTicketNumber()
                .then(idNumber => {
                  createTickets(data, idNumber);
                  setRequestID(idNumber);
                });
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
  const [ticketView, setTicketView] = useState(true);
  const [ticketID, setTicketID] = useState("TSG20230000");

  return (
    <div>

      {ticketView ? (
        <div className="multi-step-form">
          <Sidebar step={step} />
          {step >= 0 && step <= 3 ? (
            <FormStructure
              step={step}
              setStep={setStep}
              setTicketView={setTicketView}
              ticketView={ticketView}
              setRequestID={setTicketID}
            />
          ) : (
            <Confirm tsgID={ticketID} setTicketView={setTicketView} ticketView={ticketView} />
          )}
        </div>
      ) : (
        <div>
          <Track setTicketView={setTicketView} />
        </div>
      )}
    </div>
  );
}
