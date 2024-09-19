const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');  // For email

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, '../'))); // Serve your HTML and static assets from the root folder

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to serve the portfolio page
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '../index.html'));  // Serve the HTML file from the root folder
});

// Contact form handler (POST request)
app.post('/send-message', async (req, res) => {
   const { name, email, message } = req.body;

   try {
      // Example using Nodemailer (configure with your email settings)
      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
         },
      });

      const mailOptions = {
         from: email,
         to: 'your-email@gmail.com', // Your email
         subject: `Message from ${name}`,
         text: message,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).send('Message sent successfully!');
   } catch (error) {
      console.error(error);
      res.status(500).send('Error sending message');
   }
});

// Start server
app.listen(PORT, () => {
   console.log(`Server is running on port ${5501}`);
});
