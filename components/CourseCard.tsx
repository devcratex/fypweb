



// src/components/CourseCard.tsx
import Image from "next/image";
import Link from "next/link";

export default function CourseCard() {
  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden my-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT: Instructor Info + Course Details */}
        <div className="p-8 sm:p-10 md:p-12 lg:p-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex flex-col justify-center">
          <div className="text-center lg:text-left space-y-6">

            {/* Instructor Name + Title */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900">
                Hamza Nazir
              </h2>
              <p className="text-xl sm:text-2xl font-bold text-cyan-600 mt-2">
                Senior MERN Stack Developer
              </p>
              <p className="text-lg text-gray-700 mt-1">
                5+ Years Real-World Experience
              </p>
            </div>

            {/* Course Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="text-gray-900">1-MONTH</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                MERN STACK
              </span>
              <br />
              <span className="text-gray-900">COURSE</span>
            </h1>

            {/* Key Benefits */}
            <div className="mt-8 space-y-4 text-lg sm:text-xl text-gray-800 font-medium">
              <p>✅ Learn React.js, Node.js, Express.js & MongoDB</p>
              <p>✅ Build Your Final Year Project in 30 Days</p>
              <p>✅ Complete Guidance + Code + Documentation</p>
              <p>✅ 100% Job Assistance After Course</p>
              <p className="text-2xl font-bold text-green-600 mt-6">
                Only 15,000 /-RS
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <Link
                href="https://wa.me/+923126025681 ?text=Hi Hamza Bhai! I want to join your 1-Month MERN Stack Course for 15,000/-Rs"
                target="_blank"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xl sm:text-2xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition duration-300"
              >
                ENROLL NOW – LIMITED SEATS!
              </Link>
            </div>

            <p className="text-center lg:text-left text-gray-600 mt-6 text-sm sm:text-base">
              www.fyphub.shop | Next Batch Starts Soon
            </p>
          </div>
        </div>

        {/* RIGHT: Instructor Image – Always Fully Visible */}
        <div className="relative bg-gradient-to-tr from-blue-100 to-cyan-100 min-h-[500px] flex items-center justify-center p-10 lg:p-0">
          <Image
            src="/images/PicsArt_11-18-11.44.54.png"    // ← Put your Canva image here
            alt="Hamza Nazir - MERN Stack Expert & Instructor"
            fill
            priority
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}