function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-5 fixed-bottom">
      <p className="mb-0">
        © {new Date().getFullYear()} E-Waste Management System | Built with React & Spring Boot
      </p>
    </footer>
  );
}

export default Footer;
