const Doctors = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <h1 className="text-4xl font-bold text-hospital-primary mb-8">Our Doctors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-hospital-primary mb-4">Dr. Sarah Johnson</h3>
            <p className="text-gray-600 mb-2">Cardiologist</p>
            <p className="text-sm text-gray-500">15+ years experience</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-hospital-primary mb-4">Dr. Michael Chen</h3>
            <p className="text-gray-600 mb-2">Neurologist</p>
            <p className="text-sm text-gray-500">12+ years experience</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-hospital-primary mb-4">Dr. Emily Rodriguez</h3>
            <p className="text-gray-600 mb-2">Pediatrician</p>
            <p className="text-sm text-gray-500">10+ years experience</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors