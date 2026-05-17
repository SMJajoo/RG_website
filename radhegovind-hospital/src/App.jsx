import { useState } from 'react';

export default function RadheGovindHospitalWebsite() {
  const [expandedService, setExpandedService] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    treatment: 'Select Treatment',
    dateTime: '',
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus('');

    try {
      // Send data without dateTime
      const dataToSend = {
        fullName: formData.fullName,
        phone: formData.phone,
        treatment: formData.treatment,
        dateTime: new Date().toISOString(), // Auto-set to current time
        notes: formData.notes,
      };

      const response = await fetch('http://localhost:3001/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({
          fullName: '',
          phone: '',
          treatment: 'Select Treatment',
          dateTime: '',
          notes: '',
        });
      } else {
        setFormStatus('error');
      }
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
      name: 'Anita Sharma',
      review: 'The doctors at RadheGovind Hospital treated my father with genuine care and patience. We felt supported throughout his recovery journey.',
    },
    {
      name: 'Ramesh Verma',
      review: 'Affordable treatment, friendly staff, and experienced doctors. Our family has trusted this clinic for years.',
    },
    {
      name: 'Pooja Kulkarni',
      review: 'Excellent consultation and compassionate guidance. The environment feels calm, clean, and reassuring.',
    },
    {
      name: 'Vikram Singh',
      review: 'Got treated for my hypertension. The doctors explained everything clearly and the follow-ups have been excellent. Highly recommended!',
    },
    {
      name: 'Priya Desai',
      review: 'Best place for family healthcare. The staff is very welcoming and the treatment is effective. My whole family visits here now.',
    },
    {
      name: 'Rajesh Kumar',
      review: 'Very professional and caring. They took time to understand my condition and provided a comprehensive treatment plan. Thank you!',
    },
    {
      name: 'Meera Patel',
      review: 'After 2 years of struggling with diabetes, I finally found the right support here. The nutritional guidance changed my life.',
    },
    {
      name: 'Arjun Nair',
      review: 'Visited for my asthma treatment. The doctors are very knowledgeable and the medicines prescribed have really helped me breathe better.',
    },
    {
      name: 'Sneha Chopra',
      review: 'Great experience! The cleanliness, professionalism, and care shown by the entire team is commendable. Will recommend to everyone.',
    },
    {
      name: 'Hari Menon',
      review: 'After my paralysis attack, I did physiotherapy here. The recovery process was smooth thanks to their expert guidance and support.',
    },
  ];

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
            <a href="#testimonials" className="hover:text-teal-600 transition">Testimonials</a>
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
              ❤️ Trusted Family Healthcare Since 1992
            </div>

            <div>
              <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight text-slate-800">
                Healing Hearts <br />
                <span className="text-teal-600">Since 1992</span>
              </h2>

              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                Quality Healthcare with Affordable Care for Every Family. Compassionate,
                patient-first treatment designed to support long-term wellness and healthier lives.
              </p>
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              {[
                '30+ Years of Care',
                'Experienced Doctors',
                'Affordable Treatment',
                'Compassionate Support',
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm text-center"
                >
                  <p className="text-sm font-semibold text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl opacity-70"></div>

            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
              alt="Professional healthcare"
              className="relative rounded-3xl shadow-2xl object-cover h-[580px] w-full"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
              alt="Doctor consulting patient"
              className="rounded-3xl shadow-xl"
            />
          </div>

          <div>
            <div className="inline-block bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
              About RadheGovind Hospital
            </div>

            <h3 className="text-4xl font-bold text-slate-800 leading-tight">
              Caring for Families with Compassion & Trust Since 1992
            </h3>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Founded in 1992, RadheGovind Hospital has been dedicated to providing ethical,
              affordable, and patient-centered healthcare for individuals and families. Our mission
              is rooted in compassion, trust, and long-term wellness.
            </p>

            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              We believe every patient deserves personalized treatment and supportive medical care.
              From preventive healthcare to chronic disease management, our experienced team focuses
              on helping patients lead healthier and happier lives.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {[
                'Ethical & Affordable Healthcare',
                'Personalized Treatment Plans',
                'Preventive Wellness Focus',
                'Trusted Community Care',
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                    ✓
                  </div>
                  <span className="font-medium text-slate-700">{point}</span>
                </div>
              ))}
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

                <p className="text-slate-600 leading-relaxed text-sm">{service.desc}</p>

                {expandedService === index && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-slate-600 leading-relaxed text-sm">{service.details}</p>
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
                  <p className="text-lg text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=1200&auto=format&fit=crop"
              alt="Friendly medical staff"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-sky-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-white px-4 py-2 rounded-full shadow-sm text-teal-700 text-sm font-medium mb-4">
              Patient Testimonials
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
            
            <div className="overflow-hidden relative">
              <div className="scrolling-container flex gap-6 w-max">
                {[...testimonials, ...testimonials].map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex-shrink-0 w-96 hover:shadow-2xl transition-shadow"
                  >
                    <div className="text-yellow-400 text-xl mb-4">★★★★★</div>

                    <p className="text-slate-600 leading-relaxed h-24 line-clamp-4">"{testimonial.review}"</p>

                    <div className="mt-6 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-200 to-sky-200 flex items-center justify-center text-xl font-bold text-white">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-teal-600 font-medium">Patient Review</p>
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

                <select
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleFormChange}
                  required
                  className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="Select Treatment" className="text-slate-700">Select Treatment</option>
                  <option value="Heart Disease" className="text-slate-700">Heart Disease</option>
                  <option value="High Blood Pressure" className="text-slate-700">High Blood Pressure</option>
                  <option value="Diabetes" className="text-slate-700">Diabetes</option>
                  <option value="Thyroid Disorder" className="text-slate-700">Thyroid Disorder</option>
                  <option value="Memory Loss" className="text-slate-700">Memory Loss</option>
                  <option value="Obesity" className="text-slate-700">Obesity</option>
                  <option value="Paralysis" className="text-slate-700">Paralysis</option>
                  <option value="Asthma" className="text-slate-700">Asthma</option>
                  <option value="Anemia" className="text-slate-700">Anemia</option>
                  <option value="Alcohol De-addiction" className="text-slate-700">Alcohol De-addiction</option>
                  <option value="Insomnia" className="text-slate-700">Insomnia</option>
                  <option value="Fever & General Illness" className="text-slate-700">Fever & General Illness</option>
                </select>

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

            <div className="mt-8 space-y-6 text-slate-300 text-lg">
              <div>
                <h4 className="font-semibold text-white mb-1">Phone Number</h4>
                <p>+91 95799 12389</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">Clinic Timings</h4>
                <p>Monday - Saturday: 9:00 AM – 8:00 PM</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">Emergency Support</h4>
                <p>24/7 Emergency Assistance Available</p>
              </div>
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
            <p className="mt-3 max-w-md leading-relaxed">
              Healing Hearts Since 1992 with compassionate, affordable, and patient-centered healthcare.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="#appointment" className="hover:text-white transition">Appointments</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4">Care & Support</h5>
            <ul className="space-y-2">
              <li>Affordable Consultation</li>
              <li>Family Healthcare</li>
              <li>Preventive Wellness</li>
              <li>Long-term Treatment Plans</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm">
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
