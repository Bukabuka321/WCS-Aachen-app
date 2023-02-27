import styles from "../../styles/Locals.module.css";
import Link from "next/link";
import {ILocalCompany} from "../../types/interfaces";

const NewLocal = ({company}: { ILocalCompany }) => {
    const {
        name,
        bigPhotoURL,
        itemId,
    } = company;

    return (
        <div className={styles.newLocalCard}>
            <div className={styles.newLocalHeader}>Neu in der Aachen App</div>
            <div className={styles.newLocalPic}
                 style={{
                     backgroundImage: `url(${bigPhotoURL})`,
                     width: '100%',
                     backgroundSize: "cover",
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center",
                 }}>
                <div
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)', width: '100%', height: '35px', justifyContent: 'center', alignItems: 'center', display: 'flex'}}
                >{name}</div>
            </div>
            <div className={styles.newLocalBtn}>
                <Link href={`locals/${itemId}`}>
                    <button style={{
                        border: '1px solid #FAC520',
                        borderRadius: '12px',
                        width: '130px',
                        backgroundColor: 'rgba(45, 45, 45, 1)',
                        height: '30px'
                    }}>Anschauen
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default NewLocal;


