import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Heart,
  Users,
  Award,
  Clock,
  Star,
} from "lucide-react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 5 DIFFERENT IMAGES FOR SLIDER
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&h=600&fit=crop",
      title: "Exceptional Healthcare",
      subtitle: "Your health is our priority"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&h=600&fit=crop",
      title: "Expert Medical Team",
      subtitle: "Board-certified specialists"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1920&h=600&fit=crop",
      title: "Modern Facilities",
      subtitle: "State-of-the-art equipment"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920&h=600&fit=crop",
      title: "24/7 Emergency Care",
      subtitle: "Always here when you need us"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1920&h=600&fit=crop",
      title: "Comprehensive Services",
      subtitle: "Complete healthcare solutions"
    },
  ];

  const services = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Comprehensive heart care with advanced diagnostic and treatment options.",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Users,
      title: "Neurology",
      description: "Expert diagnosis and treatment of brain, spinal cord, and nervous system disorders.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Award,
      title: "Orthopedics",
      description: "Specialized care for bones, joints, ligaments, and musculoskeletal conditions.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Heart,
      title: "Pediatrics",
      description: "Gentle and comprehensive healthcare services for infants, children, and adolescents.",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      icon: Users,
      title: "Primary Care",
      description: "Your first point of contact for routine check-ups, preventive care, and general health.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Clock,
      title: "Emergency Care",
      description: "24/7 emergency medical services with rapid response and expert care.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      experience: "15+ years",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      experience: "12+ years",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialization: "Pediatrician",
      experience: "10+ years",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1594824475065-8c2e5d61acea?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialization: "Orthopedic Surgeon",
      experience: "18+ years",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Happy Patients",
      description: "Trusted by thousands",
    },
    {
      icon: Users,
      value: "100+",
      label: "Expert Doctors",
      description: "Board-certified specialists",
    },
    {
      icon: Award,
      value: "25+",
      label: "Years of Excellence",
      description: "Serving the community",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Emergency Care",
      description: "Always available",
    },
  ];

  // AUTO-SLIDE EVERY 3 SECONDS
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen">
      {/* HERO SLIDER - 5 IMAGES */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 109, 119, 0.7), rgba(0, 109, 119, 0.7)), url('${slide.image}')`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                  <div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-xl md:text-2xl">{slide.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200 z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators - SHOWS ALL 5 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-hospital-primary flex items-center justify-center">
        <Link to="/appointment">
          <button className="btn bg-hospital-secondary hover:bg-hospital-secondary/90 text-hospital-primary px-10 py-4 font-semibold text-lg rounded-md shadow-lg transition-transform hover:scale-105">
            <Calendar className="inline mr-2 h-6 w-6" />
            Book Appointment
          </button>
        </Link>
      </section>

      {/* Stats Section */}
      <div className="container mx-auto">
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up">
                  <div className="w-16 h-16 bg-hospital-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-hospital-primary" />
                  </div>
                  <div className="text-3xl font-bold text-hospital-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-800 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-16 bg-hospital-neutral">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-hospital-primary mb-4">
                Our Medical Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer a comprehensive range of medical services delivered by
                experienced healthcare professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="card p-6 text-center hover-scale hover-shadow"
                >
                  <div
                    className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-hospital-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link to="/services">
                    <button className="btn btn-outline">Learn More</button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/services">
                <button className="btn btn-primary px-8 py-3">
                  View All Services
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Doctors Preview */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-hospital-primary mb-4">
                Meet Our Expert Doctors
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our team of board-certified physicians brings decades of
                experience and expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="card overflow-hidden hover-scale hover-shadow"
                >
                  <div className="relative">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">
                        {doctor.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-hospital-primary mb-2">
                      {doctor.name}
                    </h3>
                    <p className="text-hospital-secondary font-medium mb-2">
                      {doctor.specialization}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {doctor.experience} experience
                    </p>
                    <div className="flex flex-col space-y-2">
                      <Link to={`/doctors/${doctor.id}`}>
                        <button className="btn btn-outline w-full">
                          View Profile
                        </button>
                      </Link>
                      <Link to="/appointment">
                        <button className="btn btn-secondary w-full">
                          <Calendar className="inline mr-2 h-4 w-4" />
                          Book Appointment
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-hospital-primary">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience Quality Healthcare?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied patients who have chosen MedCare
              Hospital for their healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/appointment">
                <button className="btn bg-white hover:bg-gray-100 text-hospital-primary px-8 py-3 font-semibold">
                  <Calendar className="inline mr-2 h-5 w-5" />
                  Schedule Your Appointment
                </button>
              </Link>
              <Link to="/contact">
                <button className="btn border-white text-white hover:bg-white hover:text-hospital-primary px-8 py-3 font-semibold">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;