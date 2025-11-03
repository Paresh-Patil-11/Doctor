import { useState } from 'react'
import { Heart, Brain, Bone, Baby, Stethoscope, AlertCircle, ArrowRight, Phone, Clock, Award, Users, X, Shield, Star, CheckCircle, Activity } from 'lucide-react'

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)

  const stats = [
    { icon: Users, value: '50+', label: 'Specialties', color: 'bg-blue-100', iconColor: 'text-blue-600' },
    { icon: Award, value: '200+', label: 'Expert Doctors', color: 'bg-green-100', iconColor: 'text-green-600' },
    { icon: Heart, value: '50,000+', label: 'Patients Treated', color: 'bg-red-100', iconColor: 'text-red-600' },
    { icon: Clock, value: '24/7', label: 'Emergency Care', color: 'bg-purple-100', iconColor: 'text-purple-600' }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Advanced Technology',
      description: 'State-of-the-art medical equipment and cutting-edge treatment facilities'
    },
    {
      icon: Star,
      title: 'Expert Care Team',
      description: 'Board-certified specialists with years of experience in their fields'
    },
    {
      icon: CheckCircle,
      title: 'Patient-Centered',
      description: 'Personalized care plans tailored to your unique health needs'
    },
    {
      icon: Activity,
      title: 'Comprehensive Care',
      description: 'Complete healthcare solutions from prevention to treatment'
    }
  ]

  const services = [
    {
      id: 1,
      title: 'Cardiology',
      description: 'Comprehensive heart care with advanced diagnostic and treatment options.',
      icon: Heart,
      color: '#006D77',
      bgColor: '#EDF6F9',
      features: [
        'Electrocardiogram (ECG)',
        'Echocardiography',
        'Cardiac Catheterization',
        'Heart Surgery',
        'Preventive Cardiology'
      ],
      specialists: '12 Cardiologists',
      availability: '24/7 Emergency Care'
    },
    {
      id: 2,
      title: 'Neurology',
      description: 'Expert diagnosis and treatment of brain, spinal cord, and nervous system disorders.',
      icon: Brain,
      color: '#006D77',
      bgColor: '#EDF6F9',
      features: [
        'Brain MRI & CT Scans',
        'EEG Testing',
        'Stroke Treatment',
        'Epilepsy Management',
        'Movement Disorders'
      ],
      specialists: '8 Neurologists',
      availability: 'Mon-Sat, 8AM-8PM'
    },
    {
      id: 3,
      title: 'Orthopedics',
      description: 'Specialized care for bones, joints, ligaments, and musculoskeletal conditions.',
      icon: Bone,
      color: '#006D77',
      bgColor: '#EDF6F9',
      features: [
        'Joint Replacement',
        'Sports Medicine',
        'Spine Surgery',
        'Fracture Care',
        'Physical Therapy'
      ],
      specialists: '10 Orthopedic Surgeons',
      availability: 'Mon-Sat, 9AM-6PM'
    },
    {
      id: 4,
      title: 'Pediatrics',
      description: 'Gentle and comprehensive healthcare services for infants, children, and adolescents.',
      icon: Baby,
      color: '#006D77',
      bgColor: '#EDF6F9',
      features: [
        'Well-Child Visits',
        'Vaccinations',
        'Growth Monitoring',
        'Behavioral Health',
        'Acute Illness Care'
      ],
      specialists: '15 Pediatricians',
      availability: 'Mon-Sun, 8AM-8PM'
    },
    {
      id: 5,
      title: 'Primary Care',
      description: 'Your first point of contact for routine check-ups, preventive care, and general health.',
      icon: Stethoscope,
      color: '#006D77',
      bgColor: '#EDF6F9',
      features: [
        'Annual Physicals',
        'Chronic Disease Management',
        'Health Screenings',
        'Immunizations',
        'Minor Procedures'
      ],
      specialists: '20 Primary Care Physicians',
      availability: 'Mon-Fri, 7AM-7PM'
    },
    {
      id: 6,
      title: 'Emergency Care',
      description: '24/7 emergency medical services with rapid response and expert care.',
      icon: AlertCircle,
      color: '#DC2626',
      bgColor: '#FEE2E2',
      features: [
        'Trauma Care',
        'Critical Care',
        'Urgent Surgery',
        'Ambulance Services',
        'Life Support'
      ],
      specialists: 'Emergency Medicine Team',
      availability: '24/7 Always Available'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      service: 'Cardiology',
      rating: 5,
      text: 'Excellent care and professional staff. They saved my life with their quick response and expert treatment.'
    },
    {
      name: 'Michael Chen',
      service: 'Orthopedics',
      rating: 5,
      text: 'The orthopedic team helped me recover from my sports injury. Back to playing football now!'
    },
    {
      name: 'Emily Rodriguez',
      service: 'Pediatrics',
      rating: 5,
      text: 'Amazing pediatric care for my children. The doctors are patient, kind, and highly skilled.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#006D77] via-[#005761] to-[#004a52] text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                Comprehensive Healthcare Solutions
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Expert Medical Services<br />for Your Health
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              From routine check-ups to specialized treatments, our team of expert healthcare professionals is dedicated to providing you with exceptional medical care.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-transform duration-200">
                    <Icon className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-200">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MedCare Hospital?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine medical excellence with compassionate care to deliver the best healthcare experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <div className="bg-[#EDF6F9] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-[#006D77]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Medical Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Specialized departments staffed with experienced healthcare professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer border border-gray-100"
                onClick={() => setSelectedService(service)}
              >
                {/* Card Header */}
                <div
                  className="p-5 text-center border-b border-gray-100"
                  style={{ backgroundColor: service.bgColor }}
                >
                  <div
                    className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 transform group-hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: service.color }}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {service.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-sm text-gray-600 mb-4 text-center line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Quick Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-gray-600">
                      <Users className="h-3.5 w-3.5 mr-2 text-[#006D77] flex-shrink-0" />
                      <span>{service.specialists}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock className="h-3.5 w-3.5 mr-2 text-[#006D77] flex-shrink-0" />
                      <span>{service.availability}</span>
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <button
                    className="w-full bg-[#006D77] text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-[#005662] transition-colors duration-200 flex items-center justify-center"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Additional Info */}
        <div className="mt-12 bg-[#EDF6F9] rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-gray-600 mb-6">
            We offer many more specialized services. Contact us to discuss your specific healthcare needs.
          </p>
          <a href="/contact">
            <button className="bg-[#006D77] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#005662] transition-colors duration-200">
              Contact Our Team
            </button>
          </a>
        </div>
      </div>

      {/* Patient Testimonials */}
      <div className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-lg text-gray-600">
              Real experiences from real patients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.service} Patient</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency CTA Section */}
      <div className="bg-[#006D77] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Immediate Medical Attention?
            </h2>
            <p className="text-base text-gray-100 mb-6">
              Our emergency department is open 24/7 with expert staff ready to help
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:108"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md text-sm"
              >
                <Phone className="mr-2 h-4 w-4" />
                Emergency: 108
              </a>
              <a
                href="tel:+15551234567"
                className="bg-white text-[#006D77] hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md text-sm"
              >
                <Phone className="mr-2 h-4 w-4" />
                Book: (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="p-6 text-center border-b border-gray-100"
              style={{ backgroundColor: selectedService.bgColor }}
            >
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: selectedService.color }}
              >
                <selectedService.icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedService.title}
              </h2>
              <p className="text-sm text-gray-600">
                {selectedService.description}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">
                Our Services Include:
              </h3>
              <ul className="space-y-2 mb-5">
                {selectedService.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-[#006D77] rounded-full mr-2 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="bg-gray-50 rounded-lg p-4 mb-5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-700">
                    <Users className="h-4 w-4 mr-2 text-[#006D77]" />
                    <span className="font-medium">{selectedService.specialists}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 mr-2 text-[#006D77]" />
                    <span className="font-medium">{selectedService.availability}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 bg-[#006D77] text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-[#005662] transition-colors duration-200"
                  onClick={() => {
                    setSelectedService(null)
                    window.location.href = '/appointment'
                  }}
                >
                  Book Appointment
                </button>
                <button
                  className="flex-1 bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors duration-200"
                  onClick={() => setSelectedService(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Services