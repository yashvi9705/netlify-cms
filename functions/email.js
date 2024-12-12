
require('dotenv').config();
const sgmail = require('@sendgrid/mail');

sgmail.setApiKey(process.env.SEND_GRID_API);


exports.handler = async (event, context) => {
  // Ensure the request is a POST request
  if (event.httpMethod === 'POST') {
    const formData = JSON.parse(event.body); // Parse the contact form data
    const { name, email, message } = formData; // Destructure relevant fields

    // Construct the email message
    const emailMessage = {
      to: email, // You can dynamically set this or leave as a fixed email
      from: 'yashvi.patel3@dcmail.ca', // Use the user's email as the "from" address
      subject: `[Auto] Contact Form Submission from ${name}`,
      text: `You have received a new contact form submission.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p><p>We have received your message and will get back to you soon.</p><p>Best regards,<br>Yashvi Patel</p>`,
    };

    try {
      // Send the email using SendGrid
      await sgmail.send(emailMessage);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent successfully!' }),
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error sending email' }),
      };
    }
  } else {
    // If not a POST request
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }
};

