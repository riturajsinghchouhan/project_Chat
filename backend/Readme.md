backend/
 ┣ config/
 ┃ ┣ db.js                # MongoDB connection
 ┃ ┣ cloudinary.js        # Image upload config (later)
 ┃
 ┣ controllers/
 ┃ ┣ auth.controller.js
 ┃ ┣ user.controller.js
 ┃ ┣ chat.controller.js
 ┃ ┣ message.controller.js
 ┃ ┣ settings.controller.js
 ┃
 ┣ models/
 ┃ ┣ User.model.js
 ┃ ┣ Contact.model.js
 ┃ ┣ ChatRoom.model.js
 ┃ ┣ Message.model.js
 ┃ ┣ Settings.model.js
 ┃
 ┣ routes/
 ┃ ┣ auth.routes.js
 ┃ ┣ user.routes.js
 ┃ ┣ chat.routes.js
 ┃ ┣ message.routes.js
 ┃ ┣ settings.routes.js
 ┃
 ┣ middleware/
 ┃ ┣ auth.middleware.js   # JWT verify
 ┃ ┣ upload.middleware.js
 ┃ ┣ error.middleware.js
 ┃
 ┣ sockets/
 ┃ ┣ socket.js            # All socket events
 ┃
 ┣ utils/
 ┃ ┣ otp.util.js
 ┃ ┣ token.util.js
 ┃ ┣ constants.js
 ┃
 ┣ uploads/               # local images (optional)
 ┃
 ┣ .env
 ┣ app.js
 ┣ server.js
 ┣ package.json


frontend/
 ┣ src/
 ┃ ┣ assets/
 ┃ ┃ ┣ images/
 ┃ ┃ ┣ icons/
 ┃
 ┃ ┣ components/
 ┃ ┃ ┣ common/
 ┃ ┃ ┃ ┣ Button/
 ┃ ┃ ┃ ┃ ┣ Button.jsx
 ┃ ┃ ┃ ┃ ┣ Button.css
 ┃ ┃ ┃ ┣ Loader/
 ┃ ┃ ┃ ┃ ┣ Loader.jsx
 ┃ ┃ ┃ ┃ ┣ Loader.css
 ┃ ┃
 ┃ ┃ ┣ chat/
 ┃ ┃ ┃ ┣ ChatWindow/
 ┃ ┃ ┃ ┃ ┣ ChatWindow.jsx
 ┃ ┃ ┃ ┃ ┣ ChatWindow.css
 ┃ ┃ ┃ ┣ MessageBubble/
 ┃ ┃ ┃ ┃ ┣ MessageBubble.jsx
 ┃ ┃ ┃ ┃ ┣ MessageBubble.css
 ┃ ┃
 ┃ ┃ ┣ contacts/
 ┃ ┃ ┃ ┣ ContactList/
 ┃ ┃ ┃ ┃ ┣ ContactList.jsx
 ┃ ┃ ┃ ┃ ┣ ContactList.css
 ┃ ┃
 ┃ ┃ ┣ settings/
 ┃ ┃ ┃ ┣ PrivacySettings/
 ┃ ┃ ┃ ┃ ┣ PrivacySettings.jsx
 ┃ ┃ ┃ ┃ ┣ PrivacySettings.css
 ┃
 ┃ ┣ pages/
 ┃ ┃ ┣ Login/
 ┃ ┃ ┃ ┣ Login.jsx
 ┃ ┃ ┃ ┣ Login.css
 ┃ ┃
 ┃ ┃ ┣ OTP/
 ┃ ┃ ┃ ┣ OTP.jsx
 ┃ ┃ ┃ ┣ OTP.css
 ┃ ┃
 ┃ ┃ ┣ Home/
 ┃ ┃ ┃ ┣ Home.jsx
 ┃ ┃ ┃ ┣ Home.css
 ┃ ┃
 ┃ ┃ ┣ Profile/
 ┃ ┃ ┃ ┣ Profile.jsx
 ┃ ┃ ┃ ┣ Profile.css
 ┃
 ┃ ┣ context/
 ┃ ┃ ┣ AuthContext.jsx
 ┃ ┃ ┣ SocketContext.jsx
 ┃
 ┃ ┣ services/
 ┃ ┃ ┣ api.js
 ┃ ┃ ┣ auth.service.js
 ┃ ┃ ┣ chat.service.js
 ┃
 ┃ ┣ utils/
 ┃ ┃ ┣ socket.js
 ┃ ┃ ┣ helpers.js
 ┃
 ┃ ┣ App.jsx
 ┃ ┣ main.jsx
 ┃
 ┣ .env
 ┣ package.json
