import { Heart, Award, Users, Building2, Target, Eye, Sparkles, TrendingUp, Shield, Clock } from 'lucide-react'

const About = () => {
  const stats = [
    { icon: Users, value: '50,000+', label: 'Patients Treated Annually' },
    { icon: Building2, value: '25+', label: 'Years of Excellence' },
    { icon: Award, value: '200+', label: 'Medical Professionals' },
    { icon: Heart, value: '98%', label: 'Patient Satisfaction' }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We treat every patient with dignity, empathy, and respect, ensuring comfort throughout their healthcare journey.'
    },
    {
      icon: Award,
      title: 'Clinical Excellence',
      description: 'Our commitment to medical excellence drives us to maintain the highest standards of patient care and safety.'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We embrace cutting-edge technology and evidence-based practices to deliver the most advanced treatments.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold ethical standards in all our practices, maintaining transparency and trust with our patients.'
    }
  ]

  const milestones = [
    { year: '1999', title: 'Foundation', description: 'MedCare Hospital opened its doors with a vision to revolutionize healthcare' },
    { year: '2005', title: 'Expansion', description: 'Added specialized departments for Cardiology and Neurology' },
    { year: '2012', title: 'Technology Upgrade', description: 'Implemented state-of-the-art diagnostic equipment and digital systems' },
    { year: '2018', title: 'Accreditation', description: 'Received national accreditation for excellence in patient care' },
    { year: '2024', title: 'Digital Innovation', description: 'Launched advanced telemedicine and patient portal services' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#EDF6F9]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#006D77] to-[#83C5BE] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-full px-6 py-2">
                <p className="text-sm font-semibold">Established 1999</p>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About MedCare Hospital
            </h1>
            <p className="text-xl md:text-2xl text-[#EDF6F9] leading-relaxed">
              For over 25 years, MedCare Hospital has been a beacon of hope and healing in our community, 
              combining cutting-edge medical technology with compassionate care.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#006D77] to-[#83C5BE] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#006D77] mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-[#006D77] rounded-xl flex items-center justify-center mr-4">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#006D77]">Our Mission</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide exceptional, patient-centered healthcare services that promote healing, 
              wellness, and dignity. We are committed to delivering compassionate care through 
              medical excellence, innovative treatments, and a dedication to improving the health 
              and wellbeing of every individual we serve.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-[#83C5BE] rounded-xl flex items-center justify-center mr-4">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#006D77]">Our Vision</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              To be the leading healthcare provider recognized for clinical excellence, 
              innovative care delivery, and exceptional patient outcomes. We envision a future 
              where every community member has access to world-class medical care that combines 
              advanced technology with the human touch of compassionate professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-[#EDF6F9] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#006D77] mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and define who we are as an organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#006D77] to-[#83C5BE] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#006D77] mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#006D77] mb-4">Our Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Milestones that shaped MedCare Hospital into the trusted healthcare provider we are today
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#83C5BE]"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative mb-12 lg:mb-16 ${
                  index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                }`}
              >
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:ml-auto'}`}>
                  <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
                    <div className="inline-block bg-[#006D77] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-bold text-[#006D77] mb-3">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 top-8 transform -translate-x-1/2 w-6 h-6 bg-[#006D77] rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-[#EDF6F9] rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006D77] mb-4">
            Ready to Experience Quality Healthcare?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust MedCare Hospital for their health needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#006D77] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#005662] transition-all duration-200 shadow-lg hover:shadow-xl">
              Schedule Appointment
            </button>
            <button className="bg-white text-[#006D77] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-[#006D77]">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About