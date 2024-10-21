import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, Grid, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import apiService from '../api/apiService';

const CreateTicket = () => {
    const [formData, setFormData] = useState({
        carVin: '',
        issueDate: '',
        expirationDate: '',
    });
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            const token = Cookies.get('jwtToken');
            const email = Cookies.get('email');
            if (!token || !email) {
                navigate('/login');
                return;
            }

            try {
                const carList = await apiService.getCars(email, token);
                setCars(carList);
            } catch (error) {
                setError('Failed to fetch cars.');
            }
        };

        fetchCars();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('jwtToken');
        const email = Cookies.get('email');

        if (!token || !email) {
            navigate('/login');
            return;
        }

        try {
            const carIdResponse = await apiService.getCarId(email, formData.carVin, token);
            const carId = carIdResponse.carId;
            const userIdResponse = await apiService.getUserId(email, token);
            const userId = userIdResponse.userId;

            formData.issueDate = new Date(formData.issueDate).toISOString();
            formData.expirationDate = new Date(formData.expirationDate).toISOString();

            await apiService.createTicket(userId, carId, formData, token);
            navigate('/profile');
        } catch (error) {
            setError('Failed to create ticket. Please check the input data.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Ticket
                </Typography>
                {error && (
                    <Typography variant="body1" color="error" align="center">
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel id="select-car-vin-label">Car VIN</InputLabel>
                                <Select
                                    labelId="select-car-vin-label"
                                    id="select-car-vin"
                                    name="carVin"
                                    value={formData.carVin}
                                    onChange={handleInputChange}
                                    label="Car VIN"
                                >
                                    {cars.length > 0 ? (
                                        cars.map((car, index) => (
                                            <MenuItem key={index} value={car.vin}>
                                                {car.vin} - {car.make} {car.model} {/* Дополнительная информация */}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem value="">
                                            No cars available
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Issue Date"
                                name="issueDate"
                                type="date"
                                value={formData.issueDate}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Expiration Date"
                                name="expirationDate"
                                type="date"
                                value={formData.expirationDate}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Create Ticket
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ ml: 2 }}
                            onClick={() => navigate('/profile')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default CreateTicket;
