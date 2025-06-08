import axios from 'axios';

// conectando frontend e backend usando o axios
const api = axios.create({
    baseURL: "http://localhost:3000"
})

export default api