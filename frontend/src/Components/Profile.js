import "@fortawesome/fontawesome-free/css/all.min.css";
import "./components.css";

function PatientCard(props) {
  const patient = props.patient; // single patient object

  return (
    <section className="patient-card">
      <img
        src={
          props?.photo ||
          "https://imgs.search.brave.com/pkPyTQFTOVFQw7Hki6hg6cgY5FPZ3UzkpUMsnfiuznQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/MS85MC9hdmF0YXIt/ZGVmYXVsdC11c2Vy/LXByb2ZpbGUtaWNv/bi1zaW1wbGUtZmxh/dC12ZWN0b3ItNTcy/MzQxOTAuanBn"
        }
        alt={patient?.name || "Default User"}
        className="image"
      />
      <div className="patient-main">
        <h2 className="patient-name">{patient?.patientName || "Unknown"}</h2>

        <div className="patient-meta">
          <span>
            <i className="fa-solid fa-id-card"></i> ID {patient?.id || "N/A"}
          </span>
          <span>
            <i className="fa-solid fa-venus-mars"></i> {patient?.sex || "N/A"}
          </span>
          <span>
            <i className="fa-solid fa-cake-candles"></i> {patient?.age || "-"} yrs
          </span>
        </div>

        <div className="patient-details">
          <div className="detail-label">
            <i className="fa-solid fa-phone"></i> Phone
          </div>
          <div className="detail-value">{patient?.phone || "N/A"}</div>

          <div className="detail-label">
            <i className="fa-solid fa-envelope"></i> Email
          </div>
          <div className="detail-value">{patient?.email || "N/A"}</div>

          <div className="detail-label">
            <i className="fa-solid fa-location-dot"></i> Address
          </div>
          <div className="detail-value">{patient?.address || "N/A"}</div>
        </div>
      </div>
    </section>
  );
}

export default PatientCard;
