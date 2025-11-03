import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter with better error handling
export const createEmailTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates
      },
      debug: process.env.NODE_ENV === 'development', // Enable debug logs in development
      logger: process.env.NODE_ENV === 'development' // Enable logger in development
    });

    // Verify transporter configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter verification failed:', error);
        console.log('📧 Email Configuration:');
        console.log('   - EMAIL_USER:', process.env.EMAIL_USER ? '✓ Set' : '✗ Not Set');
        console.log('   - EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✓ Set' : '✗ Not Set');
      } else {
        console.log('✅ Email transporter is ready to send messages');
        console.log('📧 Using email:', process.env.EMAIL_USER);
      }
    });

    return transporter;
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error);
    throw error;
  }
};

// Send email with retry logic
export const sendEmail = async (mailOptions, retries = 3) => {
  const transporter = createEmailTransporter();
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully on attempt ${attempt}`);
      console.log('📨 Message ID:', info.messageId);
      return info;
    } catch (error) {
      console.error(`❌ Email send attempt ${attempt} failed:`, error.message);
      
      if (attempt === retries) {
        throw new Error(`Failed to send email after ${retries} attempts: ${error.message}`);
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
};

// Template for password reset email
export const passwordResetTemplate = (otp, recipientName = 'User') => {
  return {
    subject: 'Password Reset OTP - MedCare Hospital',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #006D77 0%, #005761 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .otp-box {
            background: #EDF6F9;
            border: 2px dashed #006D77;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            border-radius: 8px;
          }
          .otp {
            font-size: 36px;
            font-weight: bold;
            color: #006D77;
            letter-spacing: 8px;
            margin: 10px 0;
          }
          .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
          }
          .button {
            display: inline-block;
            background: #006D77;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0;">🏥 MedCare Hospital</h1>
          <p style="margin: 10px 0 0 0;">Password Reset Request</p>
        </div>
        
        <div class="content">
          <h2>Hello ${recipientName},</h2>
          
          <p>We received a request to reset your password. Use the One-Time Password (OTP) below to proceed:</p>
          
          <div class="otp-box">
            <p style="margin: 0; color: #666;">Your OTP Code</p>
            <div class="otp">${otp}</div>
            <p style="margin: 0; color: #666; font-size: 12px;">Valid for 10 minutes</p>
          </div>
          
          <p><strong>To reset your password:</strong></p>
          <ol>
            <li>Return to the password reset page</li>
            <li>Enter this OTP code</li>
            <li>Create your new password</li>
          </ol>
          
          <div class="warning">
            <strong>⚠️ Security Notice:</strong> This OTP will expire in 10 minutes. If you didn't request this password reset, please ignore this email and your password will remain unchanged.
          </div>
          
          <p>For your security, never share this OTP with anyone, including MedCare Hospital staff.</p>
          
          <div class="footer">
            <p><strong>MedCare Hospital</strong></p>
            <p>123 Medical Center Drive, City, State 12345</p>
            <p>Phone: (555) 123-4567 | Email: info@medcare.com</p>
            <p style="margin-top: 15px;">This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

// Test email configuration
export const testEmailConfiguration = async () => {
  try {
    console.log('\n🧪 Testing Email Configuration...\n');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('EMAIL_USER or EMAIL_PASSWORD not configured in .env file');
    }
    
    const transporter = createEmailTransporter();
    await transporter.verify();
    
    console.log('✅ Email configuration is valid and ready to use\n');
    return true;
  } catch (error) {
    console.error('❌ Email configuration test failed:', error.message);
    console.log('\n📋 Troubleshooting Steps:');
    console.log('1. Make sure EMAIL_USER is set in .env');
    console.log('2. Make sure EMAIL_PASSWORD is set in .env (use Gmail App Password)');
    console.log('3. Enable 2-Step Verification in your Google Account');
    console.log('4. Generate an App Password at: https://myaccount.google.com/apppasswords');
    console.log('5. Copy the App Password (without spaces) to .env file\n');
    return false;
  }
};

export default {
  createEmailTransporter,
  sendEmail,
  passwordResetTemplate,
  testEmailConfiguration
};