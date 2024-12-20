import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ModCheckProps } from "../mod-check-table-row";

export function ModCheckDetailView() {
    const location = useLocation();
    const state = location.state as { detail: ModCheckProps } | null;

    if (!state || !state.detail) {
        return <div>No data available</div>;
    }

    const {
        modId,
        modName,
        placeId,
        placeTranslations,
        placeMediums,
        modeCheckImages,
    } = state.detail;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [language, setLanguage] = useState("vi"); // Default language is 'vi'
    const [placeStatus, setPlaceStatus] = useState<string | null>(null); // State to store place status
    const [loadingStatus, setLoadingStatus] = useState(false); // State to handle loading
    const [error, setError] = useState<string>('');
    
    // Fetch place status
    useEffect(() => {
        const fetchPlaceStatus = async () => {
            if (!placeId) return;

            setLoadingStatus(true);
            try {
                const response = await fetch(
                    `https://api.localtour.space/api/Place/getPlaceById?placeid=${placeId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setPlaceStatus(data.status || "Unknown");
                } else {
                    console.error("Failed to fetch place status");
                    setPlaceStatus("Error fetching status");
                }
            } catch (error) {
                console.error("Error:", error);
                setPlaceStatus("Error fetching status");
            } finally {
                setLoadingStatus(false);
            }
        };

        fetchPlaceStatus();
    }, [placeId]);

    const changePlaceStatus = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError('No access token found. Please log in.');
            return;
        }
    
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
    
        if (decodedToken.exp < currentTime) {
            setError('Token has expired. Please log in again.');
            return;
        }
    
        try {
            // Ensure you are comparing the correct status values (e.g., "Rejected" vs "Reject")
            const newStatus = placeStatus === "Rejected" || placeStatus === "Approved" ? "Pending" : placeStatus;
    
            const response = await axios.put(
                `https://api.localtour.space/api/Place/changeStatusPlace?placeid=${placeId}&status=${newStatus}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
            if (response.status === 200) {
                setPlaceStatus(newStatus);
                alert(`Status has been changed to ${newStatus}.`);
            } else {
                alert("Failed to change status.");
            }
        } catch (error) {
            console.error("Failed to change place status:", error);
            alert("Failed to change status.");
        }
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, Math.floor(placeMediums.length / imagesPerRow))
        );
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "vi" ? "en" : "vi"));
    };

    const translation = placeTranslations.find(
        (translation) => translation.languageCode === language
    );

    const imagesPerRow = 5;
    const totalImages = placeMediums.length;

    const startIndex = currentIndex * imagesPerRow;
    const endIndex = Math.min(startIndex + imagesPerRow, totalImages);
    const imagesToShow = placeMediums.slice(startIndex, endIndex);

    return (
        <div>
            <h1>Mod Check Detail</h1>
            <p>ID: {modId}</p>
            <p>Mod Name: {modName}</p>
            <p>Place ID: {placeId}</p>

            <h2>Place Status</h2>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                {loadingStatus ? (
                    <p>Loading status...</p>
                ) : (
                    <p>Status: {placeStatus}</p>
                )}
                {(placeStatus === "Approved" || placeStatus === "Rejected") && (
                    <button
                        onClick={changePlaceStatus}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#f0ad4e",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Check again
                    </button>
                )}
            </div>

            <h2>Place Mediums</h2>
            {totalImages > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {currentIndex > 0 && (
                        <button
                            onClick={prevImage}
                            style={{
                                padding: "10px",
                                fontSize: "20px",
                                cursor: "pointer",
                                backgroundColor: "#f0f0f0",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        >
                            &lt;
                        </button>
                    )}
                    <div style={{ display: "flex", overflowX: "auto", gap: "10px" }}>
                        {imagesToShow.map((medium) => (
                            <div
                                key={medium.id}
                                style={{ flex: "0 0 auto", width: "250px", height: "250px" }}
                            >
                                <p>Type: {medium.type}</p>
                                <img
                                    src={medium.url}
                                    alt={medium.type}
                                    style={{
                                        width: "200px",
                                        height: "150px",
                                        borderRadius: "10px",
                                    }}
                                />
                                <p>Created At: {new Intl.DateTimeFormat('en-GB').format(new Date(medium.createDate))}</p>
                            </div>
                        ))}
                    </div>
                    {currentIndex < Math.floor(totalImages / imagesPerRow) && (
                        <button
                            onClick={nextImage}
                            style={{
                                padding: "10px",
                                fontSize: "20px",
                                cursor: "pointer",
                                backgroundColor: "#f0f0f0",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        >
                            &gt;
                        </button>
                    )}
                </div>
            )}

            <h2>Mode Check Images</h2>
            <div style={{ display: "flex", overflowX: "auto", gap: "10px" }}>
                {modeCheckImages.map((image, index) => (
                    <div
                        key={index}
                        style={{ flex: "0 0 auto", width: "250px", height: "180px" }}
                    >
                        <img
                            src={image}
                            alt={`Mode Check ${index}`}
                            style={{
                                width: "200px",
                                height: "150px",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                ))}
            </div>

            <h2 style={{ display: "inline-block", marginRight: "10px" }}>
                Place Translations
            </h2>
            <button
                onClick={toggleLanguage}
                style={{
                    display: "inline-block",
                    padding: "5px 10px",
                    fontSize: "14px",
                    cursor: "pointer",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            >
                {language === "vi" ? "VN" : "EN"}
            </button>
            {translation ? (
                <div>
                    <p>Language: {translation.languageCode}</p>
                    <p>Name: {translation.name}</p>
                    <p>Description: {translation.description}</p>
                    <p>Address: {translation.address}</p>
                    <p>Contact: {translation.contact}</p>
                </div>
            ) : (
                <p>No translation available for the selected language</p>
            )}
        </div>
    );
}
