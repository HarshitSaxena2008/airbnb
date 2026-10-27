# 🏠 Airbnb Clone

A full-stack Airbnb-style web application where **hosts** can list their homes and **guests** can browse homes and save their favorites.

---

## ✨ Features

### 🔐 Authentication

- Sign up and log in as a **Guest** or a **Host**
- Secure logout
- Role-based access (Guest and Host see different options)

### 🧑‍💼 Host

- Add a new home (name, price, location, rating , photo)
- Edit details of an existing home
- Delete a home

### 🧳 Guest

- Browse all available homes with photos
- Add homes to **Favorites**
- Remove homes from Favorites
- View the list of favorite homes

---

## 🛠️ Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | HTML, CSS, JavaScript / EJS |
| Backend  | Node.js, Express.js         |
| Database | MongoDB (Mongoose)          |
| Auth     | Sessions / JWT, bcrypt      |
| Uploads  | Multer (for home photos)    |

---

## 📁 Project Structure

```
airbnb/
├── controllers/
├── models/
├── routes/
├── views/ or client/
├── public/
├── uploads/          # home photos
├── .env.example
├── .gitignore
├── package.json
└── app.js / server.js
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root folder (use `.env.example` as a reference):

```
DATABASE_URL=your_database_url_here
SESSION_SECRET=your_secret_here
PORT=3000
```

### 4. Run the project

```bash
npm start
```

Open `http://localhost:5000` in your browser.

---

## 👥 User Roles

| Action                   | Guest | Host |
| ------------------------ | :---: | :--: |
| Sign up / Login / Logout |  ✅   |  ✅  |
| View all homes & photos  |  ✅   |  ✅  |
| Add to favorites         |  ✅   |  ❌  |
| Add a home               |  ❌   |  ✅  |
| Edit a home              |  ❌   |  ✅  |
| Delete a home            |  ❌   |  ✅  |

---

## 🔄 How It Works

1. **Sign up** and choose your role: Guest or Host.
2. **Host:** go to "Add Home", fill in the details, upload a photo and submit. You can edit or delete your homes anytime from "My Homes".
3. **Guest:** browse homes and click the ❤️ icon to add a home to favorites. Open "Favorites" to see all saved homes.
4. **Logout** when done.

---

## 🔮 Future Improvements

- Booking system with dates
- Search and filters (price, location)
- Reviews and ratings
- Payment integration

---

## 🤝 Contributing

Contributions are welcome. Fork the repo, create a new branch, make your changes and open a pull request.

---

## 👤 Author

**Harshit Saxena**
GitHub: https://github.com/HarshitSaxena2008/airbnb

---

⭐ If you like this project, give it a star!
