import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, CircularProgress } from '@mui/material';
import apiService from '../api/apiService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
    const [carData, setCarData] = useState({
        vin: '',
        registrationPlate: '',
        registrationCertificate: '',
        color: '',
        yearOfManufacture: '',
        make: '',
        model: '',
        type: 0
    });
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
        setValidationErrors({ ...validationErrors, [name]: '' });
    };

    const validateForm = () => {
        const errors = {};
        if (!carData.vin || carData.vin.length !== 15) {
            errors.vin = 'VIN is required and must be 15 characters long.';
        }
        if (!carData.registrationPlate || carData.registrationPlate.length !== 7) {
            errors.registrationPlate = 'Registration plate is required and must be 7 characters long.';
        }
        if (!carData.registrationCertificate) {
            errors.registrationCertificate = 'Registration certificate is required.';
        }
        if (!carData.color) {
            errors.color = 'Color is required.';
        }
        if (!carData.yearOfManufacture) {
            errors.yearOfManufacture = 'Year of manufacture is required.';
        }
        if (!carData.make) {
            errors.make = 'Make is required.';
        }
        if (!carData.model) {
            errors.model = 'Model is required.';
        }
        if (!carData.type) {
            errors.type = 'Type is required.';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setValidationErrors({});

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setValidationErrors(validationErrors);
            return;
        }

        const token = Cookies.get('jwtToken');
        const email = Cookies.get('email');
        setLoading(true);

        try {
            const formattedCarData = {
                ...carData,
                yearOfManufacture: carData.yearOfManufacture.split('T')[0],
                type: Number(carData.type)
            };

            await apiService.addCar(email, formattedCarData, token);
            navigate('/profile'); // Возвращаемся на страницу профиля
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
            } else {
                setError('Failed to add car. Please try again.');
            }
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
                Add New Car
            </Typography>
            {error && (
                <Typography variant="body1" color="error" align="center">
                    {error}
                </Typography>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="VIN"
                    name="vin"
                    value={carData.vin}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!validationErrors.vin}
                    helperText={validationErrors.vin}
                />
                <TextField
                    label="Registration Plate"
                    name="registrationPlate"
                    value={carData.registrationPlate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!validationErrors.registrationPlate}
                    helperText={validationErrors.registrationPlate}
                />
                <TextField
                    label="Registration Certificate"
                    name="registrationCertificate"
                    value={carData.registrationCertificate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!validationErrors.registrationCertificate}
                    helperText={validationErrors.registrationCertificate}
                />
                <TextField
                    label="Color"
                    name="color"
                    value={carData.color}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!validationErrors.color}
                    helperText={validationErrors.color}
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
                    error={!!validationErrors.yearOfManufacture}
                    helperText={validationErrors.yearOfManufacture}
                />
                <TextField
                    label="Make"
                    name="make"
                    value={carData.make}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!validationErrors.make}
                    helperText={validationErrors.make}
                />
                <TextField
                    label="Model"
                    name="model"
                    value={carData.model}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!validationErrors.model}
                    helperText={validationErrors.model}
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


                {loading ? (
                    <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Button type="submit" fullWidth sx={{ mt: 3 }}>
                        Add Car
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default AddCar;
