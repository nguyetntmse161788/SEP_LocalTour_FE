import { useState } from "react";
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

    // Function to handle the next image
    const nextImage = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, Math.floor(placeMediums.length / imagesPerRow)));
    };

    // Function to handle the previous image
    const prevImage = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    // Function to toggle language
    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "vi" ? "en" : "vi"));
    };

    // Filter translations based on selected language
    const translation = placeTranslations.find((translation) => translation.languageCode === language);

    // Number of images per row
    const imagesPerRow = 5;
    const totalImages = placeMediums.length;

    // Calculate start and end index for the current row of images
    const startIndex = currentIndex * imagesPerRow;
    const endIndex = Math.min(startIndex + imagesPerRow, totalImages);
    const imagesToShow = placeMediums.slice(startIndex, endIndex);

    return (
        <div>
            <h1>Mod Check Detail</h1>
            <p>ID: {modId}</p>
            <p>Mod Name: {modName}</p>
            <p>Place ID: {placeId}</p>

            <h2>Place Mediums</h2>
            {totalImages > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Left Arrow Button */}
                    {currentIndex > 0 && (
                        <button
                            onClick={prevImage}
                            style={{
                                padding: '10px',
                                fontSize: '20px',
                                cursor: 'pointer',
                                backgroundColor: '#f0f0f0',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        >
                            &lt;
                        </button>
                    )}

                    {/* Image Gallery */}
                    <div style={{ display: 'flex', overflowX: 'auto', gap: '10px' }}>
                        {imagesToShow.map((medium) => (
                            <div key={medium.id} style={{ flex: '0 0 auto', width: '280px', height: '250px' }}>
                                <p>Type: {medium.type}</p>
                                <img
                                    src={medium.url}
                                    alt={medium.type}
                                    style={{
                                        width: '200px',
                                        height: '150px',
                                        borderRadius: '10px', // Rounded corners
                                    }}
                                />
                                <p>Created At: {medium.createDate}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow Button */}
                    {currentIndex < Math.floor(totalImages / imagesPerRow) && (
                        <button
                            onClick={nextImage}
                            style={{
                                padding: '10px',
                                fontSize: '20px',
                                cursor: 'pointer',
                                backgroundColor: '#f0f0f0',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        >
                            &gt;
                        </button>
                    )}
                </div>
            )}

            <h2>Mode Check Images</h2>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '10px' }}>
                {modeCheckImages.map((image, index) => (
                    <div key={index} style={{ flex: '0 0 auto', width: '280px', height: '250px' }}>
                        <img
                            src={image}
                            alt={`Mode Check ${index}`}
                            style={{
                                width: '200px',
                                height: '150px',
                                borderRadius: '10px', // Rounded corners
                            }}
                        />
                    </div>
                ))}
            </div>

            <h2 style={{ display: 'inline-block', marginRight: '10px' }}>Place Translations</h2>
            {/* Language Toggle Button */}
            <button
                onClick={toggleLanguage}
                style={{
                    display: 'inline-block',
                    padding: '5px 10px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
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
