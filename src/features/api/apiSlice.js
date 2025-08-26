import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ lat, lon }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6dc6990ca4694213346820cc8daa1ed2`
    );

    const tempC = Math.round(response.data.main.temp - 273.15);
    const tempMax = Math.round(response.data.main.temp_max - 273.15);
    const tempMin = Math.round(response.data.main.temp_min - 273.15);
    const country = response.data.sys.country;
    const description = response.data.weather[0].description;
    const icon = response.data.weather[0].icon;

    return { temp: tempC, temp_min: tempMin, temp_max: tempMax, description, country, icon };
  }
);

const initialState = {
  temp: "",
  temp_min: "",
  temp_max: "",
  description: "",
  country: "",
  icon: "",
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.temp = action.payload.temp;
        state.temp_min = action.payload.temp_min;
        state.temp_max = action.payload.temp_max;
        state.description = action.payload.description;
        state.country = action.payload.country;
        state.icon = action.payload.icon;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
