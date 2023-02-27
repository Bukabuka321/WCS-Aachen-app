import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <nav className={styles.header_nav}>
          <div className={styles.logo_header}>
            <Link href={"/"}>
              <Image src="/logo.png" alt="logo" width={70} height={60} />
            </Link>
          </div>
          <ul className={styles.header_list}>
            <li className={styles.item_header}>
              <Link className={styles.link_header} href="/events">
                Events
              </Link>
            </li>
            <li className={styles.item_header}>
              <Link className={styles.link_header} href="/locals">
                Locals
              </Link>
            </li>
            <li className={styles.item_header}>
              <Link className={styles.link_header} href="/nachrichten">
                Nachrichten
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.download}>
          <Link
            className={styles.link_download}
            href="https://www.aachen-app.de"
          >
            <div className={styles.download_button}>Download</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
