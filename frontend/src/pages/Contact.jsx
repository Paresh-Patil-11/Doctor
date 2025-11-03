import { Phone, Mail, MapPin, Clock, Headphones, Calendar, MessageCircle } from 'lucide-react'

const Contact = () => {
  const contactCards = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', 'Emergency: 911'],
      bgColor: 'bg-[#83C5BE]/20',
      iconColor: 'text-[#006D77]'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@medcare.com', 'support@medcare.com'],
      bgColor: 'bg-[#83C5BE]/20',
      iconColor: 'text-[#006D77]'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Medical Center Dr', 'City, State 12345'],
      bgColor: 'bg-[#83C5BE]/20',
      iconColor: 'text-[#006D77]'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon-Fri: 9AM - 5PM', 'Sat: 10AM - 2PM'],
      bgColor: 'bg-[#83C5BE]/20',
      iconColor: 'text-[#006D77]'
    }
  ]

  const departments = [
    { name: 'Emergency', phone: '+1 (555) 123-0001', icon: Headphones },
    { name: 'Appointments', phone: '+1 (555) 123-0002', icon: Calendar },
    { name: 'General Inquiry', phone: '+1 (555) 123-0003', icon: MessageCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF6F9] via-white to-[#83C5BE]/10">
      <div className="bg-gradient-to-r from-[#006D77] to-[#005761] text-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-base md:text-xl text-[#83C5BE] max-w-2xl mx-auto">
            We're here to help and answer any questions you might have
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#83C5BE]"
            >
              <div className={`${card.bgColor} rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
                <card.icon className={`w-7 h-7 ${card.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-[#006D77] mb-3">{card.title}</h3>
              {card.details.map((detail, idx) => (
                <p key={idx} className="text-sm text-gray-600 mb-1">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-l-4 border-[#83C5BE]">
              <h3 className="text-xl md:text-2xl font-bold text-[#006D77] mb-6">Quick Contact</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-center p-4 bg-[#EDF6F9] rounded-lg hover:bg-[#83C5BE]/20 transition-colors duration-200">
                    <dept.icon className="w-10 h-10 text-[#006D77] mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#006D77]">{dept.name}</h4>
                      <p className="text-sm text-gray-600">{dept.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#006D77] to-[#005761] text-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4">Frequently Asked</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#83C5BE] mr-2">•</span>
                  <span className="text-sm md:text-base">How do I book an appointment?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#83C5BE] mr-2">•</span>
                  <span className="text-sm md:text-base">What insurance do you accept?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#83C5BE] mr-2">•</span>
                  <span className="text-sm md:text-base">Do you offer telemedicine?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#83C5BE] mr-2">•</span>
                  <span className="text-sm md:text-base">Where can I find parking?</span>
                </li>
              </ul>
              <button className="mt-6 bg-white text-[#006D77] px-6 py-2 rounded-lg font-semibold hover:bg-[#EDF6F9] transition-colors duration-200">
                View All FAQs
              </button>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-red-900 mb-2">Medical Emergency?</h4>
              <p className="text-red-800 text-sm mb-3">
                If you're experiencing a medical emergency, please call 911 immediately or visit our emergency department.
              </p>
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200">
                Emergency Info
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-l-4 border-[#83C5BE]">
            <h3 className="text-xl md:text-2xl font-bold text-[#006D77] mb-6">Visit Us</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#006D77] mb-2 text-lg">Location</h4>
                <p className="text-gray-700 mb-4">
                  123 Medical Center Drive<br />
                  City, State 12345<br />
                  United States
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#006D77] mb-2 text-lg">Office Hours</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="font-semibold text-[#006D77]">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday</span>
                    <span className="font-semibold text-[#006D77]">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday</span>
                    <span className="font-semibold text-[#006D77]">Closed</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#006D77] mb-2 text-lg">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#006D77] mr-3" />
                    <span className="text-gray-700">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-[#006D77] mr-3" />
                    <span className="text-gray-700">info@medcare.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-[#006D77] mr-3" />
                    <span className="text-gray-700">Get Directions</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#006D77] mb-2 text-lg">Parking Information</h4>
                <p className="text-gray-700 text-sm">
                  Free parking available for visitors in our main lot. Accessible parking spots are located near all entrances.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#006D77] mb-2 text-lg">Public Transportation</h4>
                <p className="text-gray-700 text-sm">
                  Served by bus routes 12, 45, and 67. Nearest metro station is Medical Center (0.3 miles).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-[#006D77]">
          <div className="p-6 md:p-8 bg-gradient-to-r from-[#006D77] to-[#005761] text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Location</h2>
            <p className="text-[#83C5BE]">123 Medical Center Drive, City, State 12345</p>
          </div>
          <div className="relative h-64 md:h-96 lg:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635180000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="MedCare Hospital Location"
            />
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#EDF6F9]">
            <div>
              <h4 className="font-bold text-[#006D77] mb-2">Main Building</h4>
              <p className="text-sm text-gray-600">Emergency entrance on North side</p>
            </div>
            <div>
              <h4 className="font-bold text-[#006D77] mb-2">Parking</h4>
              <p className="text-sm text-gray-600">Free parking available for visitors</p>
            </div>
            <div>
              <h4 className="font-bold text-[#006D77] mb-2">Public Transport</h4>
              <p className="text-sm text-gray-600">Bus routes 12, 45, 67 nearby</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact