import "@fortawesome/fontawesome-free/css/all.min.css";
import "./components.css";


// patient has photo, name, id, sex, age, phone, email, address
const PatientCard = ({ patient }) => {
  return (
    <section className="patient-card">
      <img
        src={patient.photo || "https://imgs.search.brave.com/pkPyTQFTOVFQw7Hki6hg6cgY5FPZ3UzkpUMsnfiuznQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/MS85MC9hdmF0YXIt/ZGVmYXVsdC11c2Vy/LXByb2ZpbGUtaWNv/bi1zaW1wbGUtZmxh/dC12ZWN0b3ItNTcy/MzQxOTAuanBn"}
        alt="Patient"
        className="patient-photo"
      />
      <div className="patient-main">
        <h2 className="patient-name">{patient.name}</h2>

        <div className="patient-meta">
          <span><i className="fa-solid fa-id-card"></i> ID {patient.id}</span>
          <span><i className="fa-solid fa-venus-mars"></i> {patient.sex}</span>
          <span><i className="fa-solid fa-cake-candles"></i> {patient.age} yrs</span>
        </div>

        <div className="patient-details">
          <div className="detail-label"><i className="fa-solid fa-phone"></i> Phone</div>
          <div className="detail-value">{patient.phone}</div>

          <div className="detail-label"><i className="fa-solid fa-envelope"></i> Email</div>
          <div className="detail-value">{patient.email}</div>

          <div className="detail-label"><i className="fa-solid fa-location-dot"></i> Address</div>
          <div className="detail-value">{patient.address}</div>
        </div>
      </div>
    </section>
  );
};

export default PatientCard;
