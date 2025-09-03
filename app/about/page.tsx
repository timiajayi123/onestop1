'use client';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          About Us
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Learn more about who we are, what we stand for, and our vision for the
          future.
        </p>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          {/* Company Story */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Our Story
            </h2>
            <p>
              <span className="font-semibold">OneStop Shop</span> was founded
              with a simple mission: to provide a convenient and reliable online
              shopping experience for everyone in Nigeria. Starting in Abuja, we
              are building a trusted platform where customers can shop for
              quality products with confidence.
            </p>
          </section>

          {/* Mission */}
          <section className="bg-gray-100 p-5 rounded-xl">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Our Mission
            </h2>
            <p>
              Our mission is to make online shopping fast, secure, and
              accessible. We focus on delivering the best customer experience
              through timely delivery, transparent policies, and quality
              products.
            </p>
          </section>

          {/* Vision */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Our Vision
            </h2>
            <p>
              We aim to become Nigeria’s most trusted online marketplace,
              expanding from Abuja to serve customers nationwide and eventually
              across Africa.
            </p>
          </section>

          {/* Values */}
          <section className="bg-gray-100 p-5 rounded-xl">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Our Values
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">Customer First:</span> We put
                our customers at the heart of everything we do.
              </li>
              <li>
                <span className="font-semibold">Integrity:</span> We believe in
                honesty, transparency, and fairness.
              </li>
              <li>
                <span className="font-semibold">Innovation:</span> Constantly
                improving to serve you better.
              </li>
              <li>
                <span className="font-semibold">Excellence:</span> Committed to
                delivering the highest quality in products and service.
              </li>
            </ul>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Join Us on Our Journey
            </h2>
            <p>
              Thank you for being part of our story. Whether you’re shopping for
              yourself or a loved one,{" "}
              <span className="font-semibold">OneStop Shop</span> is here to
              make it seamless.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
