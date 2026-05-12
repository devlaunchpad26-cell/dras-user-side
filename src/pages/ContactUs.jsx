import React, { useState } from "react";
import PageHero from "../components/PageHero";
import useData from "../hooks/useData";

const ContactUs = () => {
  const { data, loading, error } = useData();
  const [submitted, setSubmitted] = useState(false);
  

  const contactData = data?.contact;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const email = form.email.value;
    const mobile = form.mobile.value;
    const message = form.message.value;

    // ✅ MOBILE VALIDATION (ONLY ADDITION)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    const inquiryTime = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const payload = {
      To: contactData.receiverEmail,
      Subject: `Inquiry on DRAS Website | ${inquiryTime}`,
      Body: `
Name: ${firstname} ${lastname}
Email: ${email}
Phone: ${mobile}

Message:
${message}
      `,
    };

    try {
      await fetch(
        "https://prod-11.westindia.logic.azure.com:443/workflows/c70198654a414a82b3ed72853ec57ffb/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=_dKSmxb3VSM7gsFuuM1N1mqaR3FZ0HKnJF_iI3L5GyE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  // 🔄 Loading
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  // ❌ Error
  if (error) return <div>Error loading data</div>;

  if (!contactData) return null;

  return (
    <>
      {/* HERO */}
      {data?.contactPage?.hero?.visible !== false && (
        <PageHero
          title={data?.contactPage?.hero?.title || contactData.title}
          backgroundImage={
            data?.contactPage?.hero?.background ||
            contactData.backgroundImage
          }
        />
      )}

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-stretch">

          {/* MAP */}
          <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Location"
              src={contactData.mapEmbed}
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>

          {/* FORM */}
          <div className="h-[500px] flex flex-col justify-center">

            {!submitted ? (
              <>
                <h2 className="text-3xl font-semibold mb-8 text-center">
                  {contactData.formTitle}
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>

                  {/* NAME */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Enter Firstname"
                      required
                      className="w-full p-3 border rounded-md"
                    />

                    <input
                      type="text"
                      name="lastname"
                      placeholder="Enter Lastname"
                      required
                      className="w-full p-3 border rounded-md"
                    />
                  </div>

                  {/* EMAIL + MOBILE */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      required
                      className="w-full p-3 border rounded-md"
                    />

                    <input
                      type="text"
                      name="mobile"
                      placeholder="Enter Mobile"
                      required
                      maxLength={10}
                      className="w-full p-3 border rounded-md"
                    />
                  </div>

                  {/* MESSAGE */}
                  <textarea
                    rows="4"
                    name="message"
                    placeholder="Enter Message"
                    required
                    className="w-full p-3 border rounded-md"
                  ></textarea>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-md transition"
                  >
                    Submit Enquiry
                  </button>

                </form>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-700 mb-3">
                  Inquiry Submitted 🎉
                </h3>
                <p className="text-gray-600">
                  Thank you for contacting us. Our team will get back to you shortly.
                </p>
              </div>
            )}

          </div>

        </div>
      </section>
    </>
  );
};

export default ContactUs;