import Image, {StaticImageData} from "next/image";
import styles from "../../styles/LocalsCard.module.css";
import {getDistance, convertDistance} from "geolib";
import {ILocalProps} from "../../types/interfaces";
import Logo from "../public/logo.png";
import Link from "next/link";
import {useState} from "react";
import MeldenWindow from "../EventsComponets/MeldenWindow";
import useOutsideClick from "../../hooks/useClickOutside";


const LocalsCard = (props: ILocalProps) => {
    const {
        company,
        userLocation,
        handleFilterbyDistance,
        closeToUserToggleEnabled,
        isLiked,
        handleAddMerken,
        userTimeInfo,
        closeToUserTimeToggleEnabled,
    } = props;
    const {
        name,
        bigPhotoURL,
        location,
        category,
        latitude,
        longitude,
        itemId,
        openingHours = [],
        logoImageUrl,
    } = company;
    const {coordinates, error} = userLocation || {};
    const {userDay, userTime} = userTimeInfo;
    const LocalsCoords = {latitude, longitude};

    const distance = getDistance(LocalsCoords, coordinates, 1000);

    const convertedDistance = convertDistance(distance, "km");

    function showDistance(distance: number) {
        if (distance < 1000) {
            return `${distance} m`;
        } else {
            return `${convertedDistance} km`;
        }
    }

    const getBtnStyle = () => {
        if (props.isLiked) return styles["isNotFavouriteBtn"];
        else return styles["isFavouriteBtn"];
    };

    const currentDayOpeningHours = openingHours[userDay];
    const {
        close: {time: closeTime = ""} = {},
        open: {time: openTime = ""} = {},
    } = currentDayOpeningHours || {};
    const displayByDistance = closeToUserToggleEnabled ? distance < 15000 : true;

    const [openHour, openMinutes] = openTime.split(":");
    const [closeHour, closeMinutes] = closeTime.split(":");
    const [userHour, userMinutes] = userTime.split(":");


    const isUserMatchedSchedule = () => {
        if (userHour < closeHour && userHour > openHour) {
            return true;
        } else if (userHour === openHour || userHour === closeHour) {
            return userMinutes > openMinutes;
        } else {
            return false;
        }
    };

    const displayByTime = closeToUserTimeToggleEnabled
        ? isUserMatchedSchedule()
        : true;

    const shouldDisplayCard = displayByDistance && displayByTime;

    const [windowOpen, setWindowOpen] = useState<boolean>(false);

    function handleClick() {
        setWindowOpen(!windowOpen)
        console.log("click");
    }

    function handleClickOutside() {
        setWindowOpen(false);
    }
    const ref: any = useOutsideClick(handleClickOutside);

    //function for dispalying alert message
    const openNewWindowOnClick = () => {
        window.open(`/locals/${itemId}`);
    };


    return (
        <>
            <div
                style={{display: shouldDisplayCard ? "" : "none"}}
                className={styles.cardContainer}
            >
                <div className={styles.pictureBox}>
                    <Image
                        className={styles.companyPicture}
                        src={bigPhotoURL}
                        alt={name}
                        width="195"
                        height="120"
                        object-fit="contain"
                    />
                </div>
                <div className={styles.infoBox}>
                    <div className={styles.info}>
                        <Link href={`/locals/${itemId}`}>
                            {" "}
                            <h2 className={styles.companyName}>{name}</h2>
                        </Link>
                        <div className={styles.nameAndPictureMobile}>
                            <div
                                className={styles.pictureBoxMobile}
                                style={{
                                    width: "full",
                                    backgroundSize: "cover",
                                    backgroundImage: `url(${logoImageUrl})`,
                                    backgroundPosition: "center",
                                }}
                            ></div>
                            <Link href={`/${itemId}`}>
                                <div className={styles.companyNameMobile}>{name}</div>
                            </Link>
                        </div>
                        <div className={styles.categoryAndWorkingHours}>
                            <div>{category}</div>
                            {!openTime ? null : (
                                <div className={styles.openingHours}>
                                    <div> ·</div>
                                    {openTime === "Geschlossen" ||
                                    (parseInt(openTime) < parseInt(userTime) &&
                                        parseInt(closeTime) < parseInt(userTime)) ? (
                                        <div style={{color: "rgba(250, 197, 32, 1)"}}>
                                            Geschlossen
                                        </div>
                                    ) : (
                                        <div style={{color: "green"}}>
                                            {closeTime === "Geöffnet" ? 'Geöffnet' : `Geöffnet bis ${closeTime}`}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={styles.line}></div>
                        <div className={styles.addressLine}>
                            <div>
                                {location} {` `}
                                {error ? "" : `(${showDistance(distance)} entfernt)`}
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonBox}>
                        <div className={styles.moreInfoBtn}
                             ref={ref}
                             onClick={handleClick}>
                        </div>
                        {windowOpen ? <MeldenWindow
                            openAlertClick={openNewWindowOnClick}
                            windowText={"Mehr Info"}
                        /> : ""}
                        <button
                            className={getBtnStyle()}
                            onClick={() => handleAddMerken(itemId)}
                        >
                            {" "}
                            {isLiked ? "Gemerkt" : "Merken"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LocalsCard;
