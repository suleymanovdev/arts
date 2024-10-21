import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, CircularProgress, Box, Paper } from '@mui/material';
import apiService from '../api/apiService';
import Cookies from 'js-cookie';

const UpdateTicket = () => {
    const { ticketId } = useParams();
    const [ticketData, setTicketData] = useState(null);
    const [issueDate, setIssueDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const response = await apiService.getUserCarTicketData(ticketId);
                setTicketData(response);
                setIssueDate(new Date(response.issueDate).toISOString().substring(0, 10));
                setExpirationDate(new Date(response.expirationDate).toISOString().substring(0, 10));
                console.log(response);
            } catch (error) {
                setError('Failed to fetch ticket data');
            } finally {
                setLoading(false);
            }
        };

        fetchTicketData();
    }, [ticketId]);

    const handleUpdate = async () => {
        const token = Cookies.get('jwtToken');

        try {
            await apiService.updateTicket(ticketId, issueDate, expirationDate, token);
            navigate('/profile');
        } catch (error) {
            setError('Failed to update ticket');
        }
    };

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
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Update Ticket
                </Typography>

                {ticketData && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body1"><strong>Ticket ID:</strong> {ticketData.id}</Typography>
                        <Typography variant="body1"><strong>Current Issue Date:</strong> {new Date(ticketData.issueDate).toLocaleDateString()}</Typography>
                        <Typography variant="body1"><strong>Current Expiration Date:</strong> {new Date(ticketData.expirationDate).toLocaleDateString()}</Typography>

                        <Box sx={{ mt: 3 }}>
                            <TextField
                                label="New Issue Date"
                                type="date"
                                value={issueDate}
                                onChange={(e) => setIssueDate(e.target.value)}
                                fullWidth
                                sx={{ mb: 3 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="New Expiration Date"
                                type="date"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                                fullWidth
                                sx={{ mb: 3 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>

                        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
                            Update Ticket
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default UpdateTicket;
