import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const WeatherInfo = ({capital}) => {
    const [weather, setWeather] = useState(null)
    if (!capital) {
        return null
    }

    useEffect(() => {
        weatherService
            .getCityWeather(capital)
            .then(weatherData => {
                setWeather(weatherData)
            })
    }, [capital]);


    return (
        <div>
            <h3>
                Weather in {capital}
            </h3>
            <p>Temperature {weather?.main?.temp} Celcius</p>
            <p>
                {weather?.weather?.[0]?.icon && (
                    <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                />
                )}
            </p>
            <p>
                Wind {weather?.wind?.speed} m/s
            </p>
        </div>
    );
};

export default WeatherInfo