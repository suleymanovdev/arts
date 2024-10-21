import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Paper, Grid } from '@mui/material';
import apiService from '../api/apiService';

const Ticket = () => {
    const { ticketId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const response = await apiService.getUserCarTicketData(ticketId);
                setData(response);
            } catch (error) {
                setError('Failed to fetch ticket data');
            } finally {
                setLoading(false);
            }
        };

        fetchTicketData();
    }, [ticketId]);

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
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <img src="/logo512.png" alt="Logo" style={{ width: '150px', height: '150px' }} />
            </Box>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Ticket Details
                </Typography>
                {data && (
                    <Grid container spacing={3}>
                        {/* User Data */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6">User Information</Typography>
                            <Typography><strong>Name:</strong> {data.name}</Typography>
                            <Typography><strong>Surname:</strong> {data.surname}</Typography>
                            <Typography><strong>Email:</strong> {data.email}</Typography>
                            <Typography><strong>Phone Number:</strong> {data.phoneNumber}</Typography>
                            <Typography><strong>Address:</strong> {data.address}</Typography>
                            <Typography><strong>FIN:</strong> {data.fin}</Typography>
                            <Typography><strong>Birth Date:</strong> {new Date(data.birthDate).toLocaleDateString()}</Typography>
                        </Grid>

                        {/* Car Data */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6">Car Information</Typography>
                            <Typography><strong>VIN:</strong> {data.vin}</Typography>
                            <Typography><strong>Registration Plate:</strong> {data.registrationPlate}</Typography>
                            <Typography><strong>Registration Certificate:</strong> {data.registrationCertificate}</Typography>
                            <Typography><strong>Color:</strong> {data.color}</Typography>
                            <Typography><strong>Year of Manufacture:</strong> {new Date(data.yearOfManufacture).toLocaleDateString()}</Typography>
                            <Typography><strong>Make:</strong> {data.make}</Typography>
                            <Typography><strong>Model:</strong> {data.model}</Typography>
                        </Grid>

                        {/* Ticket Data */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6">Ticket Information</Typography>
                            <Typography><strong>Ticket Status:</strong> {data.status === 1 ? 'Active' : data.status === 2 ? 'Expired' : 'Cancelled'}</Typography>
                            <Typography><strong>Issue Date:</strong> {new Date(data.issueDate).toLocaleDateString()}</Typography>
                            <Typography><strong>Expiration Date:</strong> {new Date(data.expirationDate).toLocaleDateString()}</Typography>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </Container>
    );
};

export default Ticket;
