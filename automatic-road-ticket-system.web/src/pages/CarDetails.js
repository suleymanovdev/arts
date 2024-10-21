import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import apiService from '../api/apiService';

const CarDetails = () => {
    const { vin } = useParams();
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const carTypes = {
        0: 'Sedan',
        1: 'SUV',
        2: 'Truck',
        3: 'Van',
        4: 'Coupe',
        5: 'Convertible'
    };

    useEffect(() => {
        const fetchCarDetails = async () => {
            const token = Cookies.get('jwtToken');
            const email = Cookies.get('email');
            try {
                const response = await apiService.getCarDetails(email, vin, token);
                setCarData(response.carData);
            } catch (error) {
                setError('Failed to fetch car details');
            } finally {
                setLoading(false);
            }
        };
        fetchCarDetails();
    }, [vin]);

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h6" color="error" align="center">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <img src="/logo512.png" alt="Logo" style={{ width: '150px', height: '150px' }} />
            </Box>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Car Details
                </Typography>
                {carData && (
                    <Box>
                        <Typography variant="body1"><strong>VIN:</strong> {carData.vin}</Typography>
                        <Typography variant="body1"><strong>Make:</strong> {carData.make}</Typography>
                        <Typography variant="body1"><strong>Model:</strong> {carData.model}</Typography>
                        <Typography variant="body1"><strong>Color:</strong> {carData.color}</Typography>
                        <Typography variant="body1"><strong>Registration Plate:</strong> {carData.registrationPlate}</Typography>
                        <Typography variant="body1"><strong>Registration Certificate:</strong> {carData.registrationCertificate}</Typography>
                        <Typography variant="body1"><strong>Year of Manufacture:</strong> {carData.yearOfManufacture}</Typography>
                        <Typography variant="body1"><strong>Type:</strong> {carTypes[carData.type]}</Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default CarDetails;
