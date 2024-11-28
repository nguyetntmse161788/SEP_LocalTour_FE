import React, { useEffect, useRef, useState } from 'react';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  onLocationSelect: (longitude: string, latitude: string) => void; // Callback to send selected location
  onCloseMap: () => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, onLocationSelect, onCloseMap }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [marker, setMarker] = useState<any>(null); // Marker state
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Kiểm tra khi API VietMap đã sẵn sàng
  useEffect(() => {
    const checkMapApi = () => {
      if (window.vietmapgl) {
        setMapLoaded(true);
      } else {
        setTimeout(checkMapApi, 500);
      }
    };
    checkMapApi();
  }, []);

  // Khi bản đồ đã load, khởi tạo bản đồ và marker
  useEffect(() => {
    if (mapLoaded) {
      const map = new window.vietmapgl.Map({
        container: mapRef.current,
        style: 'https://maps.vietmap.vn/mt/tm/style.json?apikey=9e37b843f972388f80a9e51612cad4c1bc3877c71c107e46',
        center: [longitude, latitude],
        zoom: 9,
      });

      // Tạo marker ban đầu và thêm vào bản đồ
      const newMarker = new window.vietmapgl.Marker().setLngLat([longitude, latitude]).addTo(map);
      setMarker(newMarker);
      setMapInstance(map);

      // Lắng nghe sự kiện click trên bản đồ để di chuyển marker
      map.on('click', (e: any) => {
        const { lng, lat } = e.lngLat;
        newMarker.setLngLat([lng, lat]); // Di chuyển marker
      });
    } else {
      console.error('VietMap API không tải được');
    }
  }, [latitude, longitude, mapLoaded]);

  // Hàm tìm kiếm địa điểm qua API Vietmap
  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await fetch(`https://maps.vietmap.vn/api/search/v3?apikey=9e37b843f972388f80a9e51612cad4c1bc3877c71c107e46&text=${query}`);
        const data = await response.json();
        setSearchResults(data || []); // Cập nhật kết quả tìm kiếm
      } catch (error) {
        console.error('Lỗi khi tìm kiếm địa điểm:', error);
      }
    } else {
      setSearchResults([]); // Nếu input quá ngắn, xóa kết quả
    }
  };

  // Hàm di chuyển bản đồ tới địa điểm đã chọn từ tìm kiếm
  const handleLocationSelect = async (address: string, ref_id: string) => {
    try {
      const response = await fetch(`https://maps.vietmap.vn/api/place/v3?apikey=9e37b843f972388f80a9e51612cad4c1bc3877c71c107e46&refid=${ref_id}`);
  
      if (!response.ok) {
        console.error('Lỗi API:', response.status, response.statusText);
        return;
      }
  
      const data = await response.json();
  
      if (data && data.lng && data.lat) {
        const { lng, lat } = data;
  
        // Di chuyển bản đồ và cập nhật vị trí của marker
        if (mapLoaded && marker) {
          marker.setLngLat([lng, lat]);
          mapInstance.flyTo({ center: [lng, lat], zoom: 500 });
        }
  
        // Cập nhật tọa độ lên parent component
        onLocationSelect(lng.toString(), lat.toString());
  
        // Hiển thị địa chỉ đầy đủ nếu có
        const fullAddress = address || `${data.result.district}, ${data.result.city}`;
        console.log('Địa chỉ đầy đủ:', fullAddress);
      } else {
        console.error('Dữ liệu không hợp lệ từ API: Không tìm thấy tọa độ.', data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy tọa độ từ API:', error);
    }
  };

  // Hàm lấy tọa độ từ marker khi nhấn nút Select Location
  const handleSelectLocation = () => {
    if (marker) {
      const { lng, lat } = marker.getLngLat(); // Lấy tọa độ từ marker
      onLocationSelect(lng.toString(), lat.toString()); // Gửi tọa độ cho parent component
      onCloseMap();
    }
  };

  return (
    <div>
      {/* Input tìm kiếm địa chỉ */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Nhập địa chỉ..."
      />

      {/* Hiển thị danh sách các kết quả tìm kiếm */}
      {searchResults.length > 0 && (
        <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc' }}>
          {searchResults.map((result) => (
            <div
              key={result.ref_id}
              style={{ padding: '8px', cursor: 'pointer' }}
              onClick={() => handleLocationSelect(result.address, result.ref_id)}
            >
              {result.display}
            </div>
          ))}
        </div>
      )}

      {/* Bản đồ */}
      <div ref={mapRef} style={{ width: '100%', height: '300px' }} />
      <div className="map-actions">
        <button onClick={handleSelectLocation} className="btn-select">Select Location</button>
        <button onClick={onCloseMap} className="btn-close">Close</button>
      </div>
    </div>
  );
};

export default MapComponent;


