import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, CircularProgress, Modal, TextField, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import apiService from '../api/apiService';
import { QRCodeCanvas } from 'qrcode.react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [cars, setCars] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openQrModal, setOpenQrModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [qrTicketId, setQrTicketId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('jwtToken');
        const email = Cookies.get('email');

        if (!token || !email) {
            navigate('/login');
        } else {
            const fetchData = async () => {
                try {
                    const userIdResponse = await apiService.getUserId(email, token);
                    const userId = userIdResponse.userId;
                    const userInfo = await apiService.getUserInfo(email, token);
                    const userCars = await apiService.getCars(email, token);
                    const userTicketsResponse = await apiService.getTickets(userId, token);

                    setUserData(userInfo.userData);
                    setCars(userCars);
                    setTickets(userTicketsResponse.ticketsData || []);

                    console.log(userId);
                    console.log(userInfo.userData);
                    console.log(userCars);

                    setFormData({
                        name: userInfo.userData.name || '',
                        surname: userInfo.userData.surname || '',
                        email: userInfo.userData.email || '',
                        phoneNumber: userInfo.userData.phoneNumber || '',
                        address: userInfo.userData.address || '',
                        fin: userInfo.userData.fin || '',
                        birthDate: userInfo.userData.birthDate ? new Date(userInfo.userData.birthDate).toISOString().substring(0, 10) : ''
                    });

                    if (!userInfo.userData.phoneNumber || !userInfo.userData.address || !userInfo.userData.birthDate) {
                        setOpenModal(true);
                    }
                } catch (err) {
                    setError('Failed to fetch profile or car data');
                    Cookies.remove('jwtToken');
                    Cookies.remove('email');
                    navigate('/login');
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [navigate]);

    const handleLogout = () => {
        Cookies.remove('jwtToken');
        Cookies.remove('email');
        navigate('/login');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = () => {
        setOpenModal(true);
    };

    const handleSave = async () => {
        const token = Cookies.get('jwtToken');
        const email = Cookies.get('email');
        try {
            const response = await apiService.updateUserInfo(email, formData, token);
            if (response.status === 200) {
                setOpenModal(false);
                setUserData({ ...userData, ...formData });
            } else {
                setError('Failed to update profile data.');
            }
        } catch (error) {
            setError('Failed to update profile data.');
        }
    };

    const handleDeleteCar = async (vin) => {
        const token = Cookies.get('jwtToken');
        const email = Cookies.get('email');
        try {
            await apiService.deleteCar(email, vin, token);
            setCars(cars.filter(car => car.vin !== vin));
        } catch (error) {
            setError('Failed to delete car');
        }
    };

    const handleDeleteTicket = async (ticketId) => {
        const token = Cookies.get('jwtToken');
        try {
            await apiService.deleteTicket(ticketId, token);
            setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        } catch (error) {
            setError('Failed to delete ticket');
        }
    };

    const handleCreateTicket = () => {
        navigate('/create-new-ticket');
    };

    const handleUpdateTicket = (ticketId) => {
        navigate(`/update-ticket/${ticketId}`);
    };

    const handleCancelTicket = async (ticketId) => {
        const token = Cookies.get('jwtToken');
        try {
            await apiService.cancelTicket(ticketId, token);
            setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        } catch (error) {
            setError('Failed to cancel ticket');
        }
        window.location.reload();
    };

    const getTicketStatus = (status) => {
        switch (status) {
            case 1:
                return 'Active';
            case 2:
                return 'Expired';
            case 3:
                return 'Cancelled';
            default:
                return 'Unknown';
        }
    };

    const handleShareTicket = (ticketId) => {
        setQrTicketId(ticketId);
        setOpenQrModal(true);
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

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <img src="/logo512.png" alt="Logo" style={{ width: '150px', height: '150px' }} />
            </Box>
            {error && (
                <Typography variant="body1" color="error" align="center">
                    {error}
                </Typography>
            )}
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            User Profile
                        </Typography>
                        {userData && (
                            <Box>
                                <Typography variant="body1"><strong>Name:</strong> {userData.name}</Typography>
                                <Typography variant="body1"><strong>Surname:</strong> {userData.surname}</Typography>
                                <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
                                <Typography variant="body1"><strong>Phone Number:</strong> {userData.phoneNumber}</Typography>
                                <Typography variant="body1"><strong>Address:</strong> {userData.address}</Typography>
                                <Typography variant="body1"><strong>FIN:</strong> {userData.fin}</Typography>
                                <Typography variant="body1"><strong>Birth Date:</strong> {userData.birthDate ? new Date(userData.birthDate).toLocaleDateString() : 'N/A'}</Typography>
                                <Box sx={{ mt: 3, textAlign: 'center' }}>
                                    <Button variant="contained" color="primary" onClick={handleEdit}>
                                        Edit Profile
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ ml: 2 }}>
                                        Log Out
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Your Cars
                        </Typography>
                        {cars.length ? (
                            cars.map((car, index) => (
                                <Box key={index} sx={{ mt: 2, mb: 2 }}>
                                    <Typography variant="body1"><strong>VIN:</strong> {car.vin}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate(`/edit-car/${car.vin}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDeleteCar(car.vin)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            onClick={() => navigate(`/car-details/${car.vin}`)}
                                        >
                                            View Details
                                        </Button>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1">You don't have any cars yet.</Typography>
                        )}
                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Button variant="contained" color="primary" onClick={() => navigate('/add-car')}>
                                Add New Car
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Your Tickets
                        </Typography>
                        {tickets.length ? (
                            tickets.map((ticket, index) => (
                                <Box key={index} sx={{ mt: 2, mb: 2 }}>
                                    <Typography variant="body1"><strong>Ticket ID:</strong> {ticket.id}</Typography>
                                    <Typography variant="body1"><strong>Status:</strong> {getTicketStatus(ticket.status)}</Typography>
                                    <Typography variant="body1"><strong>Start Date:</strong> {new Date(ticket.issueDate).toLocaleDateString()}</Typography>
                                    <Typography variant="body1"><strong>End Date:</strong> {new Date(ticket.expirationDate).toLocaleDateString()}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleUpdateTicket(ticket.id)}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDeleteTicket(ticket.id)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            onClick={() => handleCancelTicket(ticket.id)}
                                        >
                                            Cancel Ticket
                                        </Button>
                                        {ticket.status === 1 && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleShareTicket(ticket.id)}
                                            >
                                                Share
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1">You don't have any tickets yet.</Typography>
                        )}
                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Button variant="contained" color="primary" onClick={() => navigate('/create-new-ticket')}>
                                Create New Ticket
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* QR Code Modal */}
            <Modal open={openQrModal} onClose={() => setOpenQrModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        p: 4,
                        boxShadow: 24,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Share Ticket
                    </Typography>
                    <QRCodeCanvas value={`http://localhost:3000/ticket/${qrTicketId}`} />  {/* Updated */}
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Scan this QR code to view the ticket details.
                    </Typography>
                    <Button variant="contained" onClick={() => setOpenQrModal(false)} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>

            {/* Profile Edit Modal */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        p: 4,
                        boxShadow: 24
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Edit Your Profile
                    </Typography>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="FIN"
                        name="fin"
                        value={formData.fin}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Birth Date"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default Profile;
