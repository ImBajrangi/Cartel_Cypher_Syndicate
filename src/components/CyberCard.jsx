const CyberCard = ({ icon, title, description, children, className = '', onClick }) => {
  return (
    <div className={`cyber-card ${className}`} onClick={onClick}>
      {icon && <div className="cyber-card-icon">{icon}</div>}
      {title && <h3 className="cyber-card-title">{title}</h3>}
      {description && <p className="cyber-card-desc">{description}</p>}
      {children}
    </div>
  );
};

export default CyberCard;
