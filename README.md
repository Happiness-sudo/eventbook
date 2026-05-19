 EventBook

EventBook is a full-stack event planning and vendor booking platform. It connects event organizers with service vendors (caterers, photographers, makeup artists, DJs, and more), enabling end-to-end booking workflows from discovery to confirmation.


# Features

- JWT-based authentication with bcrypt password hashing
- Role-based access control for customers and vendors
- Vendor marketplace with browsing and detailed profile pages
- Booking workflow customers send requests, vendors accept or reject
- Vendor dashboard with real-time booking stats and revenue tracking
- Customer "My Bookings" page showing status of all bookings
- Email notifications via EmailJS when bookings are created or updated
- Protected routes that redirect unauthenticated users to login
- Responsive UI with a consistent dark-themed design

# Tech Stack

#Frontend
- React 18 with Vite
- React Router DOM
- Context API for auth state
- Inline styling with CSS variables

# Backend
- Flask 3 with Flask-SQLAlchemy
- SQLite (via SQLAlchemy ORM)
- Flask-JWT-Extended for authentication
- Flask-CORS for cross-origin requests
- bcrypt for password hashing
- python-dotenv for environment variables

## Project Structure

eventbook/
├── backend/
│   ├── app.py
│   ├── extensions.py
│   ├── requirements.txt
│   ├── .env
│   ├── controllers/
│   │   ├── auth_controller.py
│   │   ├── booking_controller.py
│   │   └── vendor_controller.py
│   ├── middleware/
│   │   └── auth_middleware.py
│   ├── models/
│   │   ├── user_model.py
│   │   ├── vendor_model.py
│   │   └── booking_model.py
│   ├── routes/
│   │   ├── auth_routes.py
│   │   ├── vendor_routes.py
│   │   └── booking_routes.py
│   └── instance/
│       └── eventbook.db
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── pages/
    │   │   ├── auth/
    │   │   ├── user/
    │   │   └── vendor/
    │   ├── App.jsx
    │   └── index.css
    ├── public/
    └── package.json


# Getting Started

# Prerequisites

- Python 3.8+
- Node.js 18+
- npm

# Clone the repository

git clone https://github.com/Happiness-sudo/eventbook.git

cd eventbook

# Backend setup

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt


Create a `.env` file in the `backend` folder:


JWT_SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///eventbook.db
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_USER_ID=your_user_id
EMAILJS_ACCESS_TOKEN=your_access_token


Run the backend:

flask run

The API will be available at `http://localhost:5000`.



#Frontend setup
In a separate terminal:


cd frontend
npm install
npm run dev


The app will be available at `http://localhost:5173`.

# API Endpoints

# Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Log in and receive a JWT token |

# Vendors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vendors` | List all vendors |
| GET | `/api/vendors/<id>` | Get a specific vendor |
| GET | `/api/vendors/me` | Get logged-in vendor's profile |
| PUT | `/api/vendors/me` | Update logged-in vendor's profile |

# Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create a new booking (customer) |
| GET | `/api/bookings` | Get logged-in user's bookings |
| GET | `/api/bookings/vendor` | Get bookings for logged-in vendor |
| PATCH | `/api/bookings/<id>/status` | Accept or reject a booking |

# Future Improvements

- Payment processing integration (Stripe or M-Pesa)
- Communication through texts and calls within the app 
- Vendor rating and review system
- Cloudinary integration for image uploads
- Real-time notifications via WebSockets
- Google Maps integration for vendor locations
- Admin dashboard for platform moderation
- Mobile app with React Native

## Authors

- [Happiness-sudo](https://github.com/Happiness-sudo)
- [sharleenS](https://github.com/sharleenS)
- [aminSHARIFF](https://github.com/aminSHARIFF)
- [SolomonKirumba](https://github.com/SolomonKirumba)

## License

This project is licensed under the MIT License.
