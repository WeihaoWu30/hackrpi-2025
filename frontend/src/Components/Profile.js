import "@fortawesome/fontawesome-free/css/all.min.css";
import "./components.css";


// patient has photo, name, id, sex, age, phone, email, address
const PatientCard = ({ patient }) => {
  return (
    <section className="patient-card">
      <img
        src={patient.photo || "https://via.placeholder.com/160"}
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
