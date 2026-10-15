import axios from 'axios';

const API_URL = '/api';
const apiClient = axios.create({
  baseURL: API_URL,
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // --- AUTH ---
  login: (data) => apiClient.post('/auth/login', data),

  // --- STORIES ---
  submitStory: (data) => apiClient.post('/stories', data),
  getStories: (page = 1) => apiClient.get(`/stories?page=${page}`),
  getPublishedStories: (page = 1) => apiClient.get(`/stories?page=${page}&isPublished=true`),
  toggleStoryStatus: (id, isPublished) => apiClient.put(`/stories/${id}`, { isPublished }),
  deleteStory: (id) => apiClient.delete(`/stories/${id}`),
  updateStory: (id, data) => apiClient.put(`/stories/${id}`, data), 


  // --- PEER SUPPORT ---
  submitPeerSupport: (data) => apiClient.post('/peer-support', data),
  getPeerSupports: () => apiClient.get('/peer-support'),
  deletePeerSupport: (id) => apiClient.delete(`/peer-support/${id}`),

  // --- WELLNESS ---
  submitWellness: (data) => apiClient.post('/wellness', data),
  getWellness: () => apiClient.get('/wellness'),
  deleteWellness: (id) => apiClient.delete(`/wellness/${id}`),

  // --- CULTURAL EVENTS ---
  submitCultural: (data) => apiClient.post('/cultural', data),
  getCultural: () => apiClient.get('/cultural'),
  deleteCultural: (id) => apiClient.delete(`/cultural/${id}`),

  // --- EVENTS ---

  submitEvent: (data) => apiClient.post('/createEvent', data),
  getEvents: () => apiClient.get('/getEvent'),
  deleteEvent: (id) => apiClient.delete(`/events/${id}`),

  registerForEvent: (eventId, data) => apiClient.post(`/events/${eventId}/register`, data),
  getEventRegistrations: (eventId) => apiClient.get(`/events/${eventId}/registrations`),
 deleteEventRegistration: (id) => apiClient.delete(`/registrations/${id}`), // NEW
   // --- NEWS & ADVOCACY ---
  submitNews: (data) => apiClient.post('/news', data),
  getNews: () => apiClient.get('/news'),
  deleteNews: (id) => apiClient.delete(`/news/${id}`),

  // --- VOLUNTEERS ---
  submitVolunteer: (data) => apiClient.post('/volunteers', data),
  getVolunteers: (page = 1) => apiClient.get(`/volunteers?page=${page}`),
  deleteVolunteer: (id) => apiClient.delete(`/volunteers/${id}`),

  // --- PARTNERSHIPS ---
  submitPartnership: (data) => apiClient.post('/partnerships', data),
  getPartnerships: (page = 1) => apiClient.get(`/partnerships?page=${page}`),
  deletePartnership: (id) => apiClient.delete(`/partnerships/${id}`),

  // --- SUPPORT REQUESTS ---
  submitSupportRequest: (data) => apiClient.post('/support-requests', data),
  getSupportRequests: (page = 1) => apiClient.get(`/support-requests?page=${page}`),
  deleteSupportRequest: (id) => apiClient.delete(`/support-requests/${id}`),
 
    // --- CONTACT ---
  submitContact: (data) => apiClient.post('/contact', data),
  getContacts: () => apiClient.get('/contact'),
  deleteContact: (id) => apiClient.delete(`/contact/${id}`),

  // --- CARE PACKS ---
  submitCarePack: (data) => apiClient.post('/care-packs', data),
  getCarePacks: () => apiClient.get('/care-packs'),
  deleteCarePack: (id) => apiClient.delete(`/care-packs/${id}`),

   // --- PARTNERSHIPS ---
  // Submits the community form data to the backend
  submitPartnership: (data) => apiClient.post('/contactpartnerships', data),
  // Fetches data for the admin panel (with pagination)
  getPartnerships: (page = 1) => apiClient.get(`/contactpartnerships?page=${page}`),
  // Deletes a specific submission in the admin panel
  deletePartnership: (id) => apiClient.delete(`/contactpartnerships/${id}`),

  // Add to your existing apiService object:
  submitYouthProgram: (data) => apiClient.post('/youth-programs', data),
  getYouthPrograms: () => apiClient.get('/youth-programs'),
  deleteYouthProgram: (id) => apiClient.delete(`/youth-programs/${id}`),


};