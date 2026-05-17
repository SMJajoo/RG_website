import { useState, useEffect } from 'react';
import doctorImg from './assets/doctor.jpeg';
import hospital_logoImg from './assets/hospital_logo.jpeg';
import ecgImg from './assets/ecg.png';
import high_bpImg from './assets/high_bp.png';
import diabetesImg from './assets/diabetes.png';
// import thyroidImg from './assets/thyroid.png';
import spirometerImg from './assets/spirometer.png';

export default function RadheGovindHospitalWebsite() {
  const [expandedService, setExpandedService] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    appointmentDate: '',
    notes: '',
  });
  const [formStatus, setFormStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const phoneNumber = '919579912389';
  const whatsappNumber = '919579912389';

  const handleCallNow = () => {
    window.location.href = `tel:+${phoneNumber}`;
  };

  const handleBookAppointment = () => {
    const appointmentSection = document.getElementById('appointment');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetDirections = () => {
    window.open('https://www.google.com/maps/search/RadheGovind+Hospital', '_blank');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus('');

    try {
      // Format appointment date
      const appointmentDateObj = new Date(formData.appointmentDate);
      const dateString = appointmentDateObj.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Construct WhatsApp message
      const message = `Hello! I would like to book an appointment at RadheGovind Hospital.

*Patient Details:*
 Full Name: ${formData.fullName}
 Phone: ${formData.phone}
 Preferred Appointment Date: ${dateString}
${formData.notes ? ` Additional Notes: ${formData.notes}` : ''}

Please confirm my appointment. Thank you!`;

      // Send to WhatsApp
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

      // Show success message
      setFormStatus('success');
      setFormData({
        fullName: '',
        phone: '',
        appointmentDate: '',
        notes: '',
      });
    } catch (error) {
      setFormStatus('error');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      title: 'Heart Disease',
      icon: '❤️',
      desc: 'Comprehensive cardiac care with compassionate treatment and preventive health guidance.',
      details: 'Our cardiac specialists provide advanced heart disease management including ECG, stress tests, and personalized treatment plans. We focus on prevention, early detection, and long-term heart health management.',
    },
    {
      title: 'High Blood Pressure',
      icon: '🩺',
      desc: 'Personalized hypertension management focused on long-term wellness and healthy living.',
      details: 'We offer comprehensive blood pressure management with regular monitoring, medication adjustment, and lifestyle counseling to prevent complications and improve cardiovascular health.',
    },
    {
      title: 'Diabetes',
      icon: '💉',
      desc: 'Affordable diabetes care with lifestyle support and regular monitoring programs.',
      details: 'Our diabetes care program includes blood sugar monitoring, nutritional guidance, exercise plans, and medication management to help patients maintain optimal glucose levels.',
    },
    {
      title: 'Thyroid Disorder',
      icon: '🧬',
      desc: 'Accurate diagnosis and effective thyroid treatment plans for better daily health.',
      details: 'We provide thyroid function testing, hormone level management, and personalized treatment for hypothyroidism, hyperthyroidism, and other thyroid conditions.',
    },
    {
      title: 'Memory Loss',
      icon: '🧠',
      desc: 'Supportive neurological care designed to improve cognitive health and confidence.',
      details: 'Our neurological specialists assess cognitive decline, provide memory enhancement strategies, and offer treatment options for age-related memory issues and cognitive disorders.',
    },
    {
      title: 'Obesity',
      icon: '⚖️',
      desc: 'Holistic weight management with nutritional guidance and medical supervision.',
      details: 'Our weight management program combines personalized nutrition plans, fitness guidance, behavioral therapy, and medical supervision for sustainable weight loss.',
    },
    {
      title: 'Paralysis',
      icon: '♿',
      desc: 'Dedicated rehabilitation and recovery-focused treatment for improved mobility.',
      details: 'We provide comprehensive rehabilitation services including physiotherapy, occupational therapy, and mobility training to help patients regain independence and quality of life.',
    },
    {
      title: 'Asthma',
      icon: '🌬️',
      desc: 'Breathing care and asthma management to help patients live comfortably and actively.',
      details: 'Our asthma management includes pulmonary function testing, inhaler training, allergy identification, and personalized treatment plans for better respiratory health.',
    },
    {
      title: 'Anemia',
      icon: '🩸',
      desc: 'Nutritional and medical support for healthy blood levels and restored energy.',
      details: 'We diagnose and treat various types of anemia through blood tests, nutritional counseling, supplementation, and medical management to restore energy and vitality.',
    },
    {
      title: 'Alcohol De-addiction',
      icon: '🌿',
      desc: 'Confidential and compassionate support programs for recovery and wellness.',
      details: 'Our de-addiction program offers confidential counseling, medical detoxification support, psychological therapy, and long-term recovery planning in a supportive environment.',
    },
    {
      title: 'Insomnia',
      icon: '🌙',
      desc: 'Sleep wellness care to improve rest, mental health, and overall wellbeing.',
      details: 'We address sleep disorders through sleep assessment, behavioral therapy, relaxation techniques, and appropriate medication to ensure restful, rejuvenating sleep.',
    },
    {
      title: 'Fever & General Illness',
      icon: '🩹',
      desc: 'Trusted family healthcare for common illnesses with attentive patient-first treatment.',
      details: 'Our general healthcare services cover fever management, infection treatment, diagnostic testing, and preventive care for your entire family\'s health needs.',
    },
  ];

  const testimonials = [
    {
      name: 'Prakashrao Pole',
      review: 'My blood pressure  wasn\'t under control despite taking many medicines. Someone recommended Dr.Govind Sir and he patiently explained everything during my first visit Now I\'m his regular patient he controlld it quickly with just a few medicines',
    },
    {
      name: 'Vijay Khandagale',
      review: 'Thank you, Doctor Govind Bhattad Sir for your excellent care. My diabetes is finally managed well. The staff is also very supportive, and the hospital is clean and affordable.',
    },
    {
      name: 'Digambar Wagatkar',
      review: 'My thyroid problem was affecting my energy and weight Dr.Govind Bhattad gave me the right treatment and guidance. I feel so much better now he is the best doctor for thyroid issues in Nanded',
    },
    {
      name : 'Arshad Shik',
      review:'Asthma made breathing difficult especially during season changes Dr. Govind Bhattad treatment improved my condition and now I breathe freely',
    },
    {
      name: 'Bhagwanrao Maske',
      review: 'Highly recommended for diabetes care! Dr.Govind sir takes time to understand the patient and gives the right treatment my sugar levels improved within weeks',
    },
    {
      name: 'Shakti Mudderaj',
      review: 'Constant fatigue due to anemia made daily tasks difficult but the treatment at Radhe Govind Hospital changed everything now I feel stronger more active and full of energy',
    },
    {
      name : 'Dhanraj Puri',
      review: 'I had a severe infection and was in pain Dr. Govind Bhattad sir gave me the right medicines and I recovered quickly he is a very kind and experienced doctor',
    }
  ];

  const medicalEquipment = [
    {
      src: ecgImg,
      alt: 'ECG/Heart Monitor - Heart Disease',
      title: 'Cardiac Monitoring Equipment',
      disease: 'Heart Disease'
    },
    {
      src: high_bpImg,
      alt: 'Blood Pressure Monitor - Hypertension',
      title: 'Blood Pressure Monitoring',
      disease: 'High Blood Pressure'
    },
    {
      src: diabetesImg,
      alt: 'Glucometer - Diabetes Care',
      title: 'Diabetes Management Equipment',
      disease: 'Diabetes'
    },
    // {
    //   src: thyroidImg,
    //   alt: 'Laboratory Testing - Thyroid & General Health',
    //   title: 'Advanced Lab Testing',
    //   disease: 'Thyroid & Health Testing'
    // },
    {
      src: spirometerImg,
      alt: 'Spirometer - Respiratory Testing for Asthma',
      title: 'Respiratory Care Equipment',
      disease: 'Asthma & Breathing Disorders'
    },
  ];

  // Auto-rotate medical equipment images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % medicalEquipment.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [medicalEquipment.length]);

  return (
    <div className="font-sans text-slate-700 bg-white scroll-smooth">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-teal-700">RadheGovind Hospital</h1>
            <p className="text-sm text-slate-500">Healing Hearts Since 1992</p>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#home" className="hover:text-teal-600 transition">Home</a>
            <a href="#about" className="hover:text-teal-600 transition">About</a>
            <a href="#services" className="hover:text-teal-600 transition">Services</a>
            <a href="#testimonials" className="hover:text-teal-800 transition">Testimonials</a>
            <a href="#appointment" className="hover:text-teal-600 transition">Appointment</a>
            <a href="#contact" className="hover:text-teal-600 transition">Contact</a>
          </nav>

          <button
            onClick={handleCallNow}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full shadow-md transition"
          >
            Call Now
          </button>
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-teal-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-white shadow-md rounded-full px-5 py-2 border border-teal-100 text-teal-700 text-sm font-medium">
              🏥 Trusted Family Healthcare Since 1992
            </div>

            <div>
              <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight text-slate-800">
                RadheGovind <br />
                <span className="text-teal-600">Hospital</span>
              </h2>

              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl text-justify">
                Serving our community for over 30 years with ethical, affordable, and compassionate healthcare. From preventive wellness to comprehensive disease management, we're dedicated to supporting your family's health.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">💰</span>
                  <div>
                    <p className="font-semibold text-slate-800">Affordable & Accessible</p>
                    <p className="text-sm text-slate-600">Quality care for everyone, regardless of budget</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">👨‍⚕️</span>
                  <div>
                    <p className="font-semibold text-slate-800">Expert Medical Team</p>
                    <p className="text-sm text-slate-600">Experienced doctors devoted to patient wellness</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">❤️</span>
                  <div>
                    <p className="font-semibold text-slate-800">Compassionate Care</p>
                    <p className="text-sm text-slate-600">Personalized treatment with genuine concern</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleBookAppointment}
                className="bg-teal-600 hover:bg-teal-700 text-white px-7 py-3 rounded-full font-medium shadow-lg transition-transform hover:-translate-y-1"
              >
                Book Appointment
              </button>

              <button
                onClick={handleCallNow}
                className="bg-white border border-slate-200 hover:border-teal-400 px-7 py-3 rounded-full font-medium shadow-sm transition"
              >
                Call Now
              </button>

              <button
                onClick={handleGetDirections}
                className="bg-sky-100 hover:bg-sky-200 text-sky-700 px-7 py-3 rounded-full font-medium transition"
              >
                Get Directions
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl opacity-70"></div>

            <img
              src={hospital_logoImg}
              alt="RadheGovind Hospital"
              className="relative rounded-full shadow-2xl object-cover h-[400px] w-[400px] mx-auto"
            />
          </div>
        </div>
      </section>

      {/* About - Doctor & Team */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src={doctorImg}
              alt="Dr. Govind Bhattad - RadheGovind Hospital"
              className="rounded-3xl shadow-xl"
            />
          </div>

          <div>
            <div className="inline-block bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
              Our Doctor & Team
            </div>

            <h3 className="text-4xl font-bold text-slate-800 leading-tight">
              Expert Care with Heart & Dedication
            </h3>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed text-justify">
              Our experienced medical team, led by dedicated doctors, brings years of expertise in patient care and wellness. We believe in treating each patient as family, taking time to understand their unique health needs and concerns.
            </p>

            <p className="mt-5 text-lg text-slate-600 leading-relaxed text-justify">
              With comprehensive training and a commitment to staying current with modern healthcare practices, our team provides personalized attention and treatment plans tailored to help you achieve optimal health and quality of life.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {[
                'Years of Clinical Experience',
                'Patient-Centered Approach',
                'Compassionate Care Philosophy',
                'Continuous Learning & Growth',
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 flex-shrink-0">
                    ✓
                  </div>
                  <span className="font-medium text-slate-700">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-teal-50 border-l-4 border-teal-600 rounded-lg p-6">
              <p className="text-slate-700 italic">
                "We treat our patients like family. Your health, comfort, and trust are our top priority. We're here to guide you through every step of your healthcare journey."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-white px-4 py-2 rounded-full shadow-sm text-teal-700 text-sm font-medium mb-4">
              Treatments & Services
            </div>

            <h3 className="text-4xl font-bold text-slate-800">
              Comprehensive Healthcare Services for Every Family
            </h3>

            <p className="mt-5 text-lg text-slate-600">
              Compassionate treatment, preventive healthcare, and long-term wellness solutions from
              experienced medical professionals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-3xl mb-6">
                  {service.icon}
                </div>

                <h4 className="text-xl font-semibold text-slate-800 mb-3">{service.title}</h4>

                <p className="text-slate-600 leading-relaxed text-base">{service.desc}</p>

                {expandedService === index && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-slate-600 leading-relaxed text-base">{service.details}</p>
                  </div>
                )}

                <button
                  onClick={() =>
                    setExpandedService(expandedService === index ? null : index)
                  }
                  className="mt-6 text-teal-700 font-semibold hover:text-teal-800 transition"
                >
                  {expandedService === index ? 'Show Less ↑' : 'Learn More →'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
              Why Choose Us
            </div>

            <h3 className="text-4xl font-bold text-slate-800 leading-tight">
              Trusted Healthcare Built on Compassion & Experience
            </h3>

            <div className="mt-8 space-y-5">
              {[
                'Experienced medical care with patient-first treatment',
                'Affordable consultations and healthcare support',
                'Long-term disease management and wellness planning',
                'Trusted by families since 1992',
                'Friendly staff and compassionate guidance',
                'Modern approach with ethical healthcare values',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                    ✓
                  </div>
                  <p className="text-lg md:text-xl text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="relative w-full h-96 overflow-hidden rounded-3xl shadow-2xl bg-slate-100">
              {/* Auto-rotating carousel */}
              <div className="relative w-full h-full">
                {medicalEquipment.map((equipment, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={equipment.src}
                      alt={equipment.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6">
                      <h4 className="text-white font-bold text-2xl">{equipment.title}</h4>
                      <p className="text-white/90 text-lg">{equipment.disease}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {medicalEquipment.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImageIndex
                        ? 'bg-white w-8'
                        : 'bg-white/50 w-2 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  ></button>
                ))}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => setCurrentImageIndex((currentImageIndex - 1 + medicalEquipment.length) % medicalEquipment.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white px-4 py-2 rounded-full transition z-10"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentImageIndex((currentImageIndex + 1) % medicalEquipment.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white px-4 py-2 rounded-full transition z-10"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-sky-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-white px-4 py-2 rounded-full shadow-sm text-teal-700 text-sm font-medium mb-4">
              Google Reviews from Patients
            </div>

            <h3 className="text-4xl font-bold text-slate-800">
              Families Trust Our Care & Compassion
            </h3>
          </div>

          <div className="relative">
            <style>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .scrolling-container {
                animation: scroll 40s linear infinite;
              }
              .scrolling-container:hover {
                animation-play-state: paused;
              }
            `}</style>
            
            <div className="overflow-hidden relative py-6">
              <div className="scrolling-container flex gap-6 w-max h-90">
                {[...testimonials, ...testimonials].map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex-shrink-0 w-100 hover:shadow-2xl transition-shadow"
                  >
                    <div className="text-yellow-400 text-xl mb-4">★★★★★</div>

                    <p className="text-slate-800 leading-relaxed h-40 line-clamp-4 text-base">"{testimonial.review}"</p>

                    <div className="mt-6 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-200 to-sky-200 flex items-center justify-center text-xl font-bold text-white">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-base">{testimonial.name}</h4>
                        <p className="text-sm text-teal-600 font-medium">Patient Review</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-sky-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-sky-50 to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Appointment */}
      <section id="appointment" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-teal-600 to-sky-600 rounded-[40px] p-10 lg:p-16 shadow-2xl text-white">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="text-4xl font-bold">Book an Appointment</h3>
              <p className="mt-4 text-white/90 text-lg">
                Schedule your consultation with our experienced healthcare professionals.
              </p>
            </div>

            {formStatus === 'success' ? (
              <div className="bg-white rounded-2xl p-10 text-center max-w-2xl mx-auto">
                <div className="text-5xl mb-4">🙏</div>
                <h4 className="text-2xl font-bold text-slate-800 mb-4">Thank You!</h4>
                <p className="text-slate-600 text-lg mb-6">
                  Thank you for contacting RadheGovind Hospital. We will contact you shortly to confirm your appointment.
                </p>
                <p className="text-slate-600 mb-6">
                  If you do not receive a call, please reach out to us on WhatsApp:
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi,%20I%20recently%20booked%20an%20appointment%20at%20RadheGovind%20Hospital.%20Please%20confirm%20my%20appointment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition"
                >
                  💬 Contact us on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  required
                  className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 placeholder-white/70 outline-none focus:ring-2 focus:ring-white text-white"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 placeholder-white/70 outline-none focus:ring-2 focus:ring-white text-white"
                />

                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleFormChange}
                  required
                  className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-white text-white"
                />

                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Additional Notes (Optional)"
                  value={formData.notes}
                  onChange={handleFormChange}
                  className="md:col-span-2 bg-white/10 border border-white/20 rounded-2xl px-5 py-4 placeholder-white/70 outline-none focus:ring-2 focus:ring-white text-white"
                ></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className="md:col-span-2 bg-white text-teal-700 hover:bg-slate-100 font-semibold py-4 rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>

                {formStatus === 'error' && (
                  <div className="md:col-span-2 p-4 rounded-2xl bg-red-100 text-red-700 text-center font-semibold">
                    ❌ Error submitting form. Please try again.
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-5">
              Contact Us
            </div>

            <h3 className="text-4xl font-bold leading-tight">
              We’re Here to Support Your Health Journey
            </h3>

            <div className="mt-8 space-y-6 text-slate-300 text-xl">
              <div>
                <h4 className="font-semibold text-white mb-2 text-lg">Phone Number</h4>
                <p className="text-lg">+91 95799 12389</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2 text-lg">Clinic Timings</h4>
                <p className="text-lg">Monday - Saturday: 9:00 AM – 8:00 PM</p>
              </div>

              {/* <div>
                <h4 className="font-semibold text-white mb-2 text-lg">Emergency Support</h4>
                <p className="text-lg">24/7 Emergency Assistance Available</p>
              </div> */}
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-medium transition inline-block"
              >
                WhatsApp Us
              </a>

              <button
                onClick={handleCallNow}
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-medium transition"
              >
                Emergency Contact
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-2xl border border-white/10">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=RadheGovind+Hospital&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h4 className="text-2xl font-bold text-white">RadheGovind Hospital</h4>
            <p className="mt-3 max-w-md leading-relaxed text-base">
              Healing Hearts Since 1992 with compassionate, affordable, and patient-centered healthcare.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4 text-lg">Quick Links</h5>
            <ul className="space-y-2 text-base">
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="#appointment" className="hover:text-white transition">Appointments</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4 text-lg">Care & Support</h5>
            <ul className="space-y-2 text-base">
              <li>Affordable Consultation</li>
              <li>Family Healthcare</li>
              <li>Preventive Wellness</li>
              <li>Long-term Treatment Plans</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-base">
          © 2026 RadheGovind Hospital. All rights reserved.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center text-3xl shadow-2xl z-50 transition-transform hover:scale-110"
      >
        💬
      </a>
    </div>
  );
}
