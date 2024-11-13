from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import json
import os
import httpx

app = FastAPI()

# OpenWeatherMap API Key
api_key = "84387f93c9cd937344e072bd763bb813"

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load turbine data from GeoJSON with utf-8 encoding
geojson_file_path = os.path.join(os.getcwd(), "wind_farms.geojson")

# Specify encoding as utf-8 when opening the file
with open(geojson_file_path, encoding="utf-8") as f:
    geojson_data = json.load(f)
    wind_farms = geojson_data["features"]  # Extract features list from GeoJSON


# Serve HTML page
@app.get("/", response_class=HTMLResponse)
async def get_home(request: Request):
    return "success"

# Get a list of wind farms with names and basic info
@app.get("/turbines", response_model=List[dict])
async def get_wind_farms():
    turbines = [
        {
            "id": feature["properties"].get("id"),
            "name": feature["properties"].get("name", "Unknown"),
            "latitude": feature["geometry"]["coordinates"][1],
            "longitude": feature["geometry"]["coordinates"][0]
        } for feature in wind_farms
    ]
    print(f"Loaded turbines: {turbines}")  # Log turbines to terminal for debugging
    return turbines

# Get wind data for a specific turbine by ID
@app.get("/wind-data/{turbine_id}")
async def get_wind_data(turbine_id: str):
    turbine = next((feature for feature in wind_farms if feature["properties"].get("id") == turbine_id), None)
    if not turbine:
        raise HTTPException(status_code=404, detail="Turbine not found")
    
    # Extract coordinates (lat, lon)
    coordinates = turbine["geometry"]["coordinates"]
    lat, lon = coordinates[1], coordinates[0]
    
    # Fetch wind data from OpenWeatherMap API using httpx
    url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}"
    
    async with httpx.AsyncClient() as client:  # Using httpx.AsyncClient for async requests
        response = await client.get(url)
    
    data = response.json()
    
    filtered_data = [
        {
            "dt": item["dt"],
            "main": item["main"],
            "wind": item["wind"],
            "weather": item["weather"]
        } for item in data['list'][:16] # 16 means 2 days of data with 3-hour intervals
    ]

    return filtered_data