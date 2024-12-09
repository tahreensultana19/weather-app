useEffect(() => {
    const fetchWeather = async () => {
      if (weatherData) return; // Prevent fetching if data already exists
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchDataByCoordinates(latitude, longitude);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );
      }
    };
    fetchWeather();
  }, [weatherData]);