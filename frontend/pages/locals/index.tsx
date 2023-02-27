import {
    ChangeEvent,
    SyntheticEvent,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import LocalsCategoryMenu from "../../components/LocalComponents/localsCategoryMenu";
import SearchBar from "../../components/LocalComponents/searchBar";
import LocalsFilter from "../../components/LocalComponents/localsFilter";
import LocalsCard from "../../components/LocalComponents/LocalsCard";
import styles from "../../styles/Locals.module.css";
import useGeoLocation from "../../hooks/useGeoLocation";
import {ILocalCompany, IUserTime} from "../../types/interfaces";
import {getDistance} from "geolib";
import {any} from "prop-types";
import NewLocal from "../../components/LocalComponents/newLocal";
import SearchField from "../../components/EventsComponets/SearchField";
import { useDebounce } from "use-debounce";

// Fetch data from DB
export async function getServerSideProps() {
    const res = await fetch(`http://localhost:5050/businesses`);
    const localsData = await res.json();

    // Pass data to the page via props
    return {props: {localsData}};
}

const LocalsPage = ({localsData}: { localsData: ILocalCompany[] }) => {
    //filtering locals by category
    const [selectedCategory, setSelectedCategory] = useState(
        localsData[0].category
    );

    //@ts-ignore
    const onClick = (event) => {
        setSelectedCategory(event);
    };

    // get All locals by clicking Alle : setting category to undefined
    const handleClickAlle = (event: any) => {
        event.preventDefault();
        setSelectedCategory("");
    };

    // Get user location
    const userLocation = useGeoLocation();

    //handling search field in search bar
    const [searchInput, setSearchInput] = useState("");

    //using useDebounce to debounce any fast changing value
    const [debounceResult] = useDebounce(searchInput, 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchInput(e.target.value)
        console.log(searchInput);
    };

    // Filtering Locals by free delivery
    const [freeDelivery, setFreeDelivery] = useState(false);

    const handleFilterByDelivery = (e: ChangeEvent<HTMLInputElement>) => {
        setFreeDelivery(!freeDelivery);
    };

    // Filtering Locals by isBookingNeeded
    const [bookingNeeded, setBookingNeeded] = useState(false);

    const handleFilterByBooking = (e: ChangeEvent<HTMLInputElement>) => {
        setBookingNeeded(!bookingNeeded);
    };

    // Filtering Locals by short distance to User
    const [closeToUserToggleEnabled, setCloseToUserToggleEnabled] =
        useState(false);

    const handleFilterbyDistance = (e: ChangeEvent<HTMLInputElement>) => {
        setCloseToUserToggleEnabled(!closeToUserToggleEnabled);
    };

    // Get user date, day and time
    const userDate = new Date();
    const userDay: number = userDate.getDay();
    const userTime: string = userDate.toLocaleTimeString("de-DE");
    const userTimeInfo: IUserTime = {userDay, userTime};

    // Filtering locals by actual working hours
    const [closeToUserTimeToggleEnabled, setCloseToUserTimeToggleEnabled] =
        useState(false);

    const handleFilterByOpenTime = (e: ChangeEvent<HTMLInputElement>) => {
        setCloseToUserTimeToggleEnabled(!closeToUserTimeToggleEnabled);
    };

    // Merken button to save marked locals in local storage
    let storedLikedItemsData: Record<string, boolean> = {};

    const [likedItems, setLikedItems] = useState<any>({});

    const handleAddMerken = (itemID: string) => {
        const newLikedItems = {...likedItems, [itemID]: !likedItems[itemID]};
        setLikedItems(newLikedItems);
        if (typeof window !== "undefined") {
            localStorage.setItem("likedLocals", JSON.stringify(newLikedItems));
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            storedLikedItemsData = JSON.parse(
                localStorage.getItem("likedLocals") || "{}"
            );
        }
        setLikedItems(storedLikedItemsData);
    }, []);

    // One filter to display final list of Locals
    const filteredLocals = localsData.filter((local) => {
        let isMatchedFreeDelivery =
            local.isFreeDelivery === freeDelivery ||
            (!local.isFreeDelivery && !freeDelivery) ||
            !freeDelivery;
        let isMatchedCategory =
            local.category === selectedCategory || !selectedCategory;
        let isMatchedBooking =
            !local.isBookingNeeded === bookingNeeded ||
            (!local.isBookingNeeded && !bookingNeeded) ||
            !bookingNeeded;
        let isMatchedSearch =
            local.name.toLowerCase().includes(debounceResult.toLowerCase()) || !searchInput;

        return (
            isMatchedCategory &&
            isMatchedFreeDelivery &&
            isMatchedBooking &&
            isMatchedSearch
        );
    });

    // get new local for newLocal card
    const newLocal = localsData[localsData.length - 1];

    // get overall number of locals for Locals counter
    const numberOfLocals: number = filteredLocals.filter(company => company.isVisible).length;


    return (
        <div className={styles.localsPage}>
            <LocalsCategoryMenu
                onClick={onClick}
                onClickAll={handleClickAlle}
                localCompanies={localsData}
                selectedCategory={selectedCategory}
            />

            <div className={styles.mainContainer}>
                <div className={styles.leftSideBar}>
                    <div className={styles.counter}> {numberOfLocals} Locals</div>
                    <div className={styles.filtersContainer}>
                        <LocalsFilter
                            label="Am nächsten zeigen"
                            isChecked={closeToUserToggleEnabled}
                            handleChange={handleFilterbyDistance}
                        />
                        <LocalsFilter
                            label="Ohne Buchung"
                            handleChange={handleFilterByBooking}
                            isChecked={bookingNeeded}
                        />
                        <LocalsFilter
                            label="Jetzt geöffnet"
                            handleChange={handleFilterByOpenTime}
                            isChecked={closeToUserTimeToggleEnabled}
                        />
                        <LocalsFilter
                            label="Kostenlose Lieferung"
                            handleChange={handleFilterByDelivery}
                            isChecked={freeDelivery}
                        />
                    </div>
                    <NewLocal company={newLocal}></NewLocal>
                </div>
                <div className={styles.rightSideBar}>
                    <div className={styles.searchField}>
                        <div className={styles.search}>
                            <SearchField
                                handleChange={handleChange}
                                searchInput={searchInput}
                                placeholder={"Locals durchsuchen ..."}/>
                        </div>
                    </div>


                    <div className={styles.companyList}>
                        {filteredLocals.map((local, index) =>
                            (!local.isVisible ? null :
                                <LocalsCard
                                    isLiked={!!likedItems[local?.itemId]}
                                    company={local}
                                    userLocation={userLocation}
                                    key={index}
                                    handleFilterbyDistance={handleFilterbyDistance}
                                    closeToUserToggleEnabled={closeToUserToggleEnabled}
                                    userTimeInfo={userTimeInfo}
                                    closeToUserTimeToggleEnabled={closeToUserTimeToggleEnabled}
                                    handleFilterByOpenTime={handleFilterByOpenTime}
                                    handleAddMerken={handleAddMerken}
                                />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocalsPage;
