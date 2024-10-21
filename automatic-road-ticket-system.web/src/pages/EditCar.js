import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, CircularProgress } from '@mui/material';
import apiService from '../api/apiService';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const EditCar = () => {
    const [carData, setCarData] = useState({
        vin: '',
        registrationPlate: '',
        registrationCertificate: '',
        color: '',
        yearOfManufacture: '',
        make: '',
        model: '',
        type: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const { vin } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarData = async () => {
            const token = Cookies.get('jwtToken');
            const email = Cookies.get('email');
            try {
                const response = await apiService.getCars(email, token);
                const carToEdit = response.find((car) => car.vin === vin);
                setCarData(carToEdit);
            } catch (error) {
                setError('Failed to load car data');
            } finally {
                setLoading(false);
            }
        };
        fetchCarData();
    }, [vin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const token = Cookies.get('jwtToken');
        const email = Cookies.get('email');

        const formattedCarData = {
            ...carData,
            yearOfManufacture: new Date(carData.yearOfManufacture).toISOString(),
            type: Number(carData.type),
        };

        try {
            await apiService.updateCar(email, vin, formattedCarData, token);
            navigate('/profile');
        } catch (error) {
            setError('Failed to update car');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <img src="/logo512.png" alt="Logo" style={{ width: '150px', height: '150px' }} />
            </Box>
            <Typography variant="h4" align="center" gutterBottom>
                Edit Car
            </Typography>
            {loading ? (
                <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        label="VIN"
                        name="vin"
                        value={carData.vin}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        disabled
                    />
                    <TextField
                        label="Registration Plate"
                        name="registrationPlate"
                        value={carData.registrationPlate}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Registration Certificate"
                        name="registrationCertificate"
                        value={carData.registrationCertificate}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Color"
                        name="color"
                        value={carData.color}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Year of Manufacture"
                        name="yearOfManufacture"
                        type="date"
                        value={carData.yearOfManufacture}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Make"
                        name="make"
                        value={carData.make}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Model"
                        name="model"
                        value={carData.model}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        select
                        label="Type"
                        name="type"
                        value={carData.type}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        SelectProps={{ native: true }}
                    >
                        <option value={0}>Sedan</option>
                        <option value={1}>SUV</option>
                        <option value={2}>Truck</option>
                        <option value={3}>Van</option>
                        <option value={4}>Coupe</option>
                        <option value={5}>Convertible</option>
                    </TextField>
                    <Button type="submit" fullWidth sx={{ mt: 3 }}>
                        Save Changes
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default EditCar;
