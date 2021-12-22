import "./../components/Footer";

function Footer() {
  return (
    <footer className="footer">
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2021 Copyright:
        <a className="text-dark" href="https://mdbootstrap.com/">
          Kill-the-oscar
        </a>
      </div>
    </footer>
  );
}

export default Footer;
