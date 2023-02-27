import Head from 'next/head';
import styles from "../../styles/SingleLocal.module.css";
import {StaticImageData} from 'next/image';
import Link from 'next/link';
import Image from 'next/image';
import facebook from "../../public/social/facebook.svg";
import instagram from "../../public/social/instagram.svg";
import tikTok from "../../public/social/tikTok.svg";
import twitter from "../../public/social/twitter.svg";
import youtube from "../../public/social/youtube.svg";
import {ILocalCompany} from '../../types/interfaces';
import LocalMap from '../../components/LocalComponents/localMap';
import map from "../../public/map.png";

// Fetch data and paths for single Local page 

export const getServerSideProps = async (context: { params: { id: string; } }) => {
    const id = context.params.id;

    const res = await fetch(`http://localhost:5050/businesses/${id}`);
    const data = await res.json();

    // Pass data to the page via props
    return {
        props: {local: data}
    }
};


const SingleLocalPage = ({local}: { local: ILocalCompany }) => {

    const week = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];


    return (
        <>
            <Head>
                <title>Aachen locale | local.name </title>
                <meta name='title' content='Aachen locale'/>
            </Head>
            <div className={styles.main}>
                <div className={styles.pageContainer}>
                    <div className={styles.mediaContainer}>
                        <div className={styles.banner}
                             style={{
                                 backgroundImage: `url(${local.bigPhotoURL})`,
                                 width: '100%',
                                 backgroundSize: "cover",
                                 backgroundRepeat: "no-repeat",
                                 backgroundPosition: "center",
                             }}>
                        </div>
                        <div className={styles.buttonsMenu}>Buttons</div>
                        <div className={styles.descriptionContainer}>
                            <div className={styles.description}>
                                <h3>{local.name}</h3>
                                <div>{local.description}</div>
                                <div style={{paddingTop: "1rem"}}>Adresse: {local.location} </div>
                                {!local.website ? null :
                                    <Link href={local.website}
                                          style={{paddingTop: "1rem"}}
                                    >
                                        <div>{local.website} </div>
                                    </Link>
                                }
                            </div>
                            <div className={styles.workingHoursandMedia}>

                                <div className={styles.workingHours}>
                                    <h3 style={{textAlign: "center", paddingBottom: "2rem"}}>Öffnungszeiten</h3>
                                    <div className={styles.workinghoursList}>

                                        <div className={styles.days}>
                                            {week.map((day) => (
                                                <div>{day} : </div>
                                            ))}
                                        </div>


                                            {!local.openingHours ? `Please contact Local` :
                                                <div className={styles.hours}>
                                                    {local.openingHours.map((week) => (
                                                        <div>
                                                            {week.close.time === 'Geöffnet' && week.open.time}
                                                            {week.open.time === 'Geschlossen' && week.close.time}
                                                            {week.close.time !== 'Geöffnet' && week.open.time !== 'Geschlossen' && <div>{week.open.time} - {week.close.time} </div>}
                                                        </div>
                                                    ))}
                                                </div>
                                            }


                                    </div>
                                </div>

                                {!local.instagram ? null :
                                    <div className={styles.socialMedia}>
                                        <h3> Soziale Medien </h3>
                                        <div className={styles.socialMediaContainer}>
                                            <div className={styles.socialIconWrapper}>
                                                <Image style={{width: "100%", height: "100%"}}
                                                    src={instagram}
                                                    alt={instagram}
                                                    object-fit="contain"/>
                                            </div>
                                            <div> Instagram @{local.instagram}</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={styles.map}>
                            <h3>Standort</h3>
                            <div>{local.location} Aachen</div>

                            {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?
                                <div className={styles.map_picture} style={{
                                    backgroundImage: `url(${map.src})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    position: "relative",
                                    width: "100%",
                                }}> Map </div> :
                                <div className={styles.mapContainer}>
                                    <LocalMap latitude={local.latitude} longitude={local.longitude}/>
                                </div>
                            }

                        </div>
                    </div>
                    <div className={styles.couponsAndCalendar}>

                        {local.couponList.length < 1 ? `No coupons available` :
                            <>
                                <div className={styles.coupons} style={{textAlign: "center"}}>Coupons</div>
                                {local.couponList.map((coupon) => (
                                    <div className={styles.coupon}>
                                        <h3>{coupon.title}</h3>
                                        <p style={{color: "rgba(250, 197, 32, 1)"}}>Code: {coupon.code}</p>
                                    </div>
                                ))} </>
                        }

                        <div className={styles.calendar}>Calendar</div>
                    </div>
                </div>
                <div className={styles.bottomBtns}>
                    <Link href="/locals">
                        <button className={styles.btn}>Zurück</button>
                    </Link>
                    {!local.website ? null :
                        <Link href={local.website}>
                            <button className={styles.btnB}>Website besuchen</button>
                        </Link>
                    }
                </div>
            </div>
        </>
    )
}

export default SingleLocalPage;