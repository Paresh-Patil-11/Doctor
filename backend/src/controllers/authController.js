import User from '../models/User.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendEmail, passwordResetTemplate } from '../config/email.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, age, gender } = req.body;
    
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    
    const user = await User.create({ name, email, password, phone, role: role || 'patient' });
    
    if (role === 'doctor') {
      await Doctor.create({ userId: user.id, ...req.body }); 
    } else {
      await Patient.create({ userId: user.id, age, gender });
    }

    const token = generateToken(user.id); 
    res.status(201).json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); 
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};

// ==================== FIXED FORGOT PASSWORD FLOW ====================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log('📧 Forgot Password Request for:', email);
    
    // Validate email
    if (!email || !email.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('❌ EMAIL_USER or EMAIL_PASSWORD not configured');
      return res.status(500).json({ 
        success: false, 
        message: 'Email service is not configured. Please contact administrator.' 
      });
    }

    // Find user
    const user = await User.findOne({ where: { email: email.toLowerCase().trim() } });

    if (!user) {
      console.log('❌ User not found for email:', email);
      return res.status(404).json({ 
        success: false, 
        message: 'No account found with this email address' 
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log(`🔐 Generated OTP for ${email}: ${otp}`);
    console.log(`⏰ OTP expires at: ${otpExpire}`);

    // Update user with OTP and expiry
    user.resetPasswordToken = otp;
    user.resetPasswordExpire = otpExpire;
    await user.save({ hooks: false }); // Skip hooks to prevent password rehashing

    console.log('✅ OTP saved to database');

    // Prepare email
    const emailTemplate = passwordResetTemplate(otp, user.name);
    const mailOptions = {
      from: `"MedCare Hospital" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    };

    // Send email with retry logic
    try {
      console.log('📤 Attempting to send email...');
      await sendEmail(mailOptions);
      console.log(`✅ Password reset email sent successfully to ${email}`);
      
      res.json({ 
        success: true, 
        message: 'Password reset OTP has been sent to your email. Please check your inbox and spam folder.',
        debug: process.env.NODE_ENV === 'development' ? { otp } : undefined // Only in dev
      });
    } catch (emailError) {
      console.error('❌ Failed to send email:', emailError);
      
      // Rollback OTP if email fails
      user.resetPasswordToken = null;
      user.resetPasswordExpire = null;
      await user.save({ hooks: false });
      
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send reset email. Please try again or contact support.',
        error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
      });
    }
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log('🔍 Verify OTP Request:', { email, otp });

    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and OTP are required' 
      });
    }

    // Clean up inputs
    const cleanEmail = email.toLowerCase().trim();
    const cleanOTP = otp.toString().trim();

    const user = await User.findOne({ 
      where: { 
        email: cleanEmail,
        resetPasswordToken: cleanOTP
      } 
    });

    if (!user) {
      console.log('❌ Invalid OTP for email:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP. Please check and try again.' 
      });
    }

    // Check if OTP has expired
    const now = new Date();
    if (user.resetPasswordExpire < now) {
      console.log('❌ OTP expired for email:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'OTP has expired. Please request a new one.' 
      });
    }

    console.log(`✅ OTP verified successfully for ${email}`);

    res.json({ 
      success: true, 
      message: 'OTP verified successfully. You can now reset your password.' 
    });
  } catch (error) {
    console.error('❌ Verify OTP error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to verify OTP. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    console.log('🔄 Reset Password Request for:', email);

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, OTP, and new password are required' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Clean up inputs
    const cleanEmail = email.toLowerCase().trim();
    const cleanOTP = otp.toString().trim();

    const user = await User.findOne({ 
      where: { 
        email: cleanEmail,
        resetPasswordToken: cleanOTP
      } 
    });

    if (!user) {
      console.log('❌ Invalid OTP during password reset for:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP. Please try the forgot password process again.' 
      });
    }

    // Check if OTP has expired
    const now = new Date();
    if (user.resetPasswordExpire < now) {
      console.log('❌ OTP expired during password reset for:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'OTP has expired. Please request a new password reset.' 
      });
    }

    // Update password and clear reset tokens
    // The password will be hashed by the beforeUpdate hook
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save(); // Use hooks to hash password

    console.log(`✅ Password reset successful for ${email}`);

    res.json({ 
      success: true, 
      message: 'Password has been reset successfully. You can now login with your new password.' 
    });
  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to reset password. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};