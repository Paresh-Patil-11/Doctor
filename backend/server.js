import dotenv from 'dotenv';
import { httpServer } from './src/app.js';
import { connectDB } from './src/config/database.js';
import seedDoctor from './src/utils/seedDoctor.js';
import { testEmailConfiguration } from './src/config/email.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Seed doctor data
    await seedDoctor();
    
    // Test email configuration
    console.log('\n📧 Testing Email Configuration...');
    await testEmailConfiguration();

    // Start server
    httpServer.listen(PORT, () => {
      console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`🔌 Socket.IO server is ready`);
      console.log(`📧 Email: ${process.env.EMAIL_USER ? '✓ Configured' : '✗ Not Configured'}`);
      console.log(`\n✨ Server is ready to accept requests!\n`);
    });
  } catch (error) {
    console.error(`\n❌ Error starting server: ${error.message}\n`);
    process.exit(1);
  }
};

startServer();