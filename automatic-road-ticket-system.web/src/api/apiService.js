import axios from 'axios';

const API_AUTH_URL = 'http://localhost:5063/api/Auth';
const API_USER_URL = 'http://localhost:5063/api/User';
const API_CAR_URL = 'http://localhost:5063/api/Car';
const API_TICKET_URL = 'http://localhost:5063/api/Ticket';

const apiService = {
  register: async (formData) => {
    try {
      const response = await axios.post(`${API_AUTH_URL}/register`, {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw new Error('Something went wrong');
    }
  },

  verifyOTP: async (email, otp) => {
    try {
      const response = await axios.post(`${API_AUTH_URL}/${email}/verify/${otp}`);
      return response.data;
    } catch (error) {
      console.error("OTP verification failed", error);
      throw error.response.data;
    }
  },

  login: async (data) => {
    try {
      const response = await axios.post(`${API_AUTH_URL}/login`, data);
      return response.data;
    } catch (error) {
      console.error("Login failed", error);
      throw error.response.data;
    }
  },

  getUserInfo: async (email, token) => {
    try {
      const response = await axios.get(`${API_USER_URL}/${encodeURIComponent(email)}/get-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user info", error);
      throw error.response.data;
    }
  },

  updateUserInfo: async (email, data, token) => {
    try {
      const response = await axios.put(`${API_USER_URL}/${encodeURIComponent(email)}/update-info`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Failed to update user info", error);
      throw error.response.data;
    }
  },

  getCars: async (email, token) => {
    try {
      const response = await axios.get(`${API_CAR_URL}/${encodeURIComponent(email)}/get-cars`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.carsData;
    } catch (error) {
      console.error("Failed to fetch cars", error);
      throw error.response?.data || new Error('Something went wrong');
    }
  },

  addCar: async (email, carData, token) => {
    try {
      const response = await axios.post(`${API_CAR_URL}/${encodeURIComponent(email)}/add-car`, carData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.carData;
    } catch (error) {
      console.error("Failed to add car", error);
      throw error.response?.data || new Error('Something went wrong');
    }
  },

  updateCar: async (email, vin, carData, token) => {
    try {
      const response = await axios.put(`${API_CAR_URL}/${encodeURIComponent(email)}/update-car/${vin}`, carData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.carData;
    } catch (error) {
      console.error("Failed to update car", error);
      throw error.response?.data || new Error('Something went wrong');
    }
  },

  deleteCar: async (email, vin, token) => {
    try {
      await axios.delete(`${API_CAR_URL}/${encodeURIComponent(email)}/delete-car/${vin}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Failed to delete car", error);
      throw error.response?.data || new Error('Something went wrong');
    }
  },

  getCarDetails: async (email, vin, token) => {
    try {
      const response = await axios.get(`${API_CAR_URL}/${encodeURIComponent(email)}/get-car/${vin}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch car details', error);
      throw error.response?.data || new Error('Something went wrong');
    }
  },

  getCarId: async (email, vin, token) => {
    try {
      const response = await axios.get(`${API_CAR_URL}/${encodeURIComponent(email)}/get-car-id/${vin}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch car id', error);
      throw error.response?.data || new Error('Something went wrong');
    }
  },

  getUserId: async (email, token) => {
    try {
      const response = await axios.get(`${API_USER_URL}/${encodeURIComponent(email)}/get-user-id`, {
        headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Failed to fetch user id', error);
        throw error.response?.data || new Error('Something went wrong');
    }
  },

  getTickets: async (userId, token) => {
    try {
      const response = await axios.get(`${API_TICKET_URL}/${userId}/get-tickets`, {
        headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
        } catch (error) {
      console.error('Failed to fetch tickets', error);
      throw error.response?.data || new Error('Something went wrong');
    }
  },

  getActiveTickets: async (userId, token) => {
    try {
      const response = await axios.get(`${API_TICKET_URL}/${userId}/get-active-tickets`, {
        headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Failed to fetch active tickets', error);
        throw error.response?.data || new Error('Something went wrong');
    }
  },

  getExpiredTickets: async (userId, token) => {
    try {
      const response = await axios.get(`${API_TICKET_URL}/${userId}/get-expired-tickets`, {
        headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Failed to fetch expired tickets', error);
        throw error.response?.data || new Error('Something went wrong');
    }
  },

  getCanceledTickets: async (userId, token) => {
    try {
      const response = await axios.get(`${API_TICKET_URL}/${userId}/get-canceled-tickets`, {
        headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Failed to fetch canceled tickets', error);
        throw error.response?.data || new Error('Something went wrong');
    }
  },

  getTicket: async (email, ticketId, token) => {
    try {
      const response = await axios.get(`${API_TICKET_URL}/${encodeURIComponent(email)}/get-ticket/${ticketId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
      } catch (error) {
          console.error('Failed to fetch ticket', error);
          throw error.response?.data || new Error('Something went wrong');
      }
    },

  getTicketByCar: async (carId, vin, token) => {
    try {
      const response = await axios.get(`${API_TICKET_URL}/${carId}/get-ticket-by-car`, {
        headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Failed to fetch ticket by car', error);
        throw error.response?.data || new Error('Something went wrong');
    }
  },

  getTicketByUser: async (userId, token) => {
    try {
      const response = await axios.get(`${API_TICKET_URL}/${userId}/get-ticket-by-user`, {
        headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Failed to fetch ticket by user', error);
        throw error.response?.data || new Error('Something went wrong');
    }
  },

  createTicket: async (userId, carId, ticketData, token) => {
    try {
      const response = await axios.post(`${API_TICKET_URL}/create-ticket`, {
        userId: userId,
        carId: carId,
        issueDate: ticketData.issueDate,
        expirationDate: ticketData.expirationDate,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create ticket", error);
      throw error.response?.data || new Error('Something went wrong');
    }
  },

  cancelTicket: async (ticketId, token) => {
    try {
      await axios.post(`${API_TICKET_URL}/cancel-ticket/${ticketId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Failed to cancel ticket', error);
      throw error.response?.data || new Error('Something went wrong');
    }
  },

  updateTicket: async (ticketId, newIssueDate, newExpirationDate, token) => {
    try {
      const currentTicket = await apiService.getUserCarTicketData(ticketId);

      const ticketData = {
        id: ticketId,
        userId: currentTicket.userId,
        carId: currentTicket.carId,
        issueDate: newIssueDate,
        expirationDate: newExpirationDate
      };

      const response = await axios.put(`${API_TICKET_URL}/update-ticket`, ticketData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to update ticket', error);
      throw error.response?.data || new Error('Something went wrong');
    }
  },

  deleteTicket: async (ticketId, token) => {
    try {
      await axios.delete(`${API_TICKET_URL}/${ticketId}/delete-ticket`, {
        headers: {
            Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Failed to delete ticket', error);
        throw error.response?.data || new Error('Something went wrong');
    }
  },

  getUserCarTicketData: async (ticketId) => {
    try {
      const response = await axios.get(`${API_TICKET_URL}/${ticketId}/get-user-car-ticket-data`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user car ticket data', error);
      throw error.response?.data || new Error('Something went wrong');
    }
  }
};

export default apiService;
