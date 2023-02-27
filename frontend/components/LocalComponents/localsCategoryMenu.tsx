import Link from "next/link";
import { FC } from "react";
import styles from "../../styles/localsCategoryMenu.module.css";
import { ILocalCompany } from "../../types/interfaces";


type Props = {
    onClick: (el: string) => void;
    onClickAll:(event: any) => void;
    localCompanies: ILocalCompany[];
    selectedCategory : string
}

const LocalsCategoryMenu: FC<Props> = ({ onClick, onClickAll, localCompanies, selectedCategory }) => {

// Get categories grom array of Locals 
    let filteredCategories: string[] = [];

    localCompanies.forEach(element => {
        if (!filteredCategories.find(e => e === element.category)) {
            filteredCategories.push(element.category || '')
        }
    });

    return (
        <>
            <div className={styles.categoryMenu}>
                <ul className={styles.categoryList}>
                    <li className={styles.singleCategoryAlle}
                        onClick={onClickAll}
                        style={{ border: (selectedCategory !== "") ? 'transparent' : '1px solid #FAC520' }}
                        >
                        <Link href='/category' className={styles.disabled_link}>
                            Alle
                        </Link></li>
                    {filteredCategories.map((element) => (
                        <li 
                        className={styles.singleCategory}
                            key={element}
                            onClick={() => onClick(element)}
                            style={{ border: (selectedCategory !== element) ? 'transparent' : '1px solid #FAC520' }}
                        >
                            <Link href='/category' className={styles.disabled_link} 
                            key={element}
                                >
                                {`${element}`}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}

export default LocalsCategoryMenu;