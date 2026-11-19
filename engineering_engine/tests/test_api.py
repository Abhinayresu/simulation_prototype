"""
Integration tests for FastAPI endpoints in engineering_engine/api.py.
"""
import pytest
from fastapi.testclient import TestClient
from engineering_engine.api import app

client = TestClient(app)

def test_api_reynolds_number():
    payload = {
        "velocity": 50.0,
        "characteristic_length": 1.0,
        "density": 1.225,
        "dynamic_viscosity": 1.7894e-5,
        "velocity_unit": "m/s",
        "length_unit": "m",
        "density_unit": "kg/m^3",
        "viscosity_unit": "Pa*s"
    }
    response = client.post("/api/v1/compute/reynolds-number", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["calculation_name"] == "Reynolds Number"
    assert data["result"] == pytest.approx(3422935.06, rel=1e-3)
    assert data["output_unit"] == "dimensionless"

def test_api_reynolds_number_invalid():
    payload = {
        "velocity": -10.0,
        "characteristic_length": 1.0,
        "density": 1.225,
        "dynamic_viscosity": 1.7894e-5
    }
    response = client.post("/api/v1/compute/reynolds-number", json=payload)
    assert response.status_code == 400
    assert "velocity" in response.json()["detail"]

def test_api_mach_number():
    payload = {
        "velocity": 102.088,
        "temperature_kelvin": 288.15
    }
    response = client.post("/api/v1/compute/mach-number", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["result"] == pytest.approx(0.3, rel=1e-2)

def test_api_gci():
    payload = {
        "r21": 1.3,
        "r32": 1.3,
        "phi1": 6.12,
        "phi2": 6.08,
        "phi3": 6.00,
        "formal_order": 2.0
    }
    response = client.post("/api/v1/compute/gci", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["results"]["convergence_mode"] == "Monotonic convergence"
    assert data["results"]["gci_fine_percent"] > 0
