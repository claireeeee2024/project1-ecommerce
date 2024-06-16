const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container justify-content-center mt-5">
        <div className="text-center">
          <p>&copy; {currentYear} All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
