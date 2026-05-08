# EventBook Frontend

EventBook is a modern event planning and vendor booking platform built with React and Vite. The platform allows users to create events, browse vendors, make bookings, and manage event-related services through a clean and responsive interface.

## Project Overview

This frontend application focuses on three main user roles:

Users / Event Organizers

   Register and log in
   Browse vendors
   View vendor profiles
   Book services for events

Vendors

  * Create vendor accounts
  * Manage vendor profiles
  * Upload portfolio information
  * Manage booking requests

 Tech Stack

* React
* Vite
* React Router DOM
* Context API
* CSS / Inline Styling
* LocalStorage (temporary frontend authentication)
* EmailJS (booking confirmation emails)


# Features

* User authentication (frontend demo flow)
* Role-based routing
* Admin dashboard
* Vendor dashboard
* Vendor browsing interface
* Responsive UI
* Booking workflow
* Email notifications using EmailJS




# Folder Structure

src/
│
├── components/
├── context/
├── pages/
│   ├── admin/
│   ├── auth/
│   ├── user/
│   └── vendor/
├── services/
├── assets/
└── App.jsx



 Getting Started

 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/eventbook.git


 2. Navigate into the project

    cd eventbook/frontend
 
 4. Install dependencies
    npm install

5. Start development server

  npm run dev


# Environment Variables

Create a `.env file in the frontend root:

.env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key


# Current Status

This project is currently in the frontend development phase.

Authentication and data handling are temporarily managed using localStorage until backend integration is completed.

Backend features planned:

 Flask API
 Database integration
 JWT authentication
 Real booking system
 Payment integration



# Known Limitations

  No backend/database yet
 Authentication is frontend-only for demo purposes
 Some pages still use placeholder/mock data
 Booking functionality is not yet connected to a real API


# Team Collaboration Workflow

Each team member works on a separate feature branch.

Recommended workflow:

git checkout main
git pull origin main
git checkout feature/your-branch
git merge main




# Deployment

Frontend deployment will be done using:

[Vercel](https://vercel.com/?utm_source=chatgpt.com)

---

# Future Improvements

* Backend API integration
* Real-time booking updates
* Vendor approval system
* Payment processing
* Google Maps integration
* Cloudinary image uploads

---

# Authors

Developed collaboratively by the EventBook team as a frontend-first event vendor booking platform project.
