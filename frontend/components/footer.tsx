import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyrights}>
          <div className={styles.logo}>
            <Image src={"/logo.png"} alt={"logo"} width={100} height={90} />
          </div>
          <div className={styles.rights_info}>
            <h3>Aachen App</h3>
            <p>
              Die App für Aachen <br /> © 2022 Copyright. Alle Rechte
              vorbehalten
            </p>
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.app}>
            <h2>Aachen App</h2>
            <ul>
              <li className={styles.item_footer}>
                <Link href="/dowload" className={styles.link_footer}>
                  Download
                </Link>
              </li>
              <li className={styles.item_footer}>
                <Link href="/dowload" className={styles.link_footer}>
                  Aachen App API
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.about}>
            <h2>Über uns</h2>
            <ul>
              <li className={styles.item_footer}>
                <Link href="/mitwirkende" className={styles.link_footer}>
                  Mitwirkende
                </Link>
              </li>
              <li className={styles.item_footer}>
                <Link href="/kontakt" className={styles.link_footer}>
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.rights}>
            <h2>Rechtliches</h2>
            <ul>
              <li className={styles.item_footer}>
                <Link href="/impressum" className={styles.link_footer}>
                  Mitwirkende
                </Link>
              </li>
              <li className={styles.item_footer}>
                <Link
                  href="/datenschutzerklärung"
                  className={styles.link_footer}
                >
                  Datenschutzerklärung
                </Link>
              </li>
              <li className={styles.item_footer}>
                <Link
                  href="/allgemeinegeschäftsbedingungen"
                  className={styles.link_footer}
                >
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
