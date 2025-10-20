import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="px-8 py-8 flex flex-col items-center text-white h-screen">
      {/* Judul */}
      <h1 className="text-5xl font-extrabold text-center">
        Tentang Tim Kami
      </h1>
      {/* Subjudul */}
      <p className="text-lg text-gray-300 mt-4 text-center max-w-3xl">
        Kami adalah tim mahasiswa yang berdedikasi untuk mengembangkan aplikasi kriptografi ini.
        Dengan semangat belajar dan kolaborasi, kami berusaha memberikan solusi terbaik untuk kebutuhan enkripsi dan dekripsi.
      </p>

      {/* Bagian Tim */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Kartu 1 */}
        <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-6 flex flex-col items-center">
          <img
            src="/images/subhan.jpg"
            alt="Subhan"
            className="h-full object-cover border-4 border-gray-700 rounded-md"
          />
          <h3 className="mt-4 text-xl font-semibold">Subhan Nur Iqbal Hakim</h3>
          <p className="text-gray-400">NPM: 227006163</p>
        </div>

        {/* Kartu 2 */}
        <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-6 flex flex-col items-center">
          <img
            src="/images/shamil.jpg"
            alt="Subhan"
            className="h-full object-cover border-4 border-gray-700 rounded-md"
          />
          <h3 className="mt-4 text-xl font-semibold">Shamil Sidiq </h3>
          <p className="text-gray-400">NPM: 227006159</p>
        </div>

        {/* Kartu 3 */}
        <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-6 flex flex-col items-center">
          <img
            src="/images/jaen.jpg"
            alt="Jaen"
            className="h-full object-cover border-4 border-gray-700 rounded-md"
          />
          <h3 className="mt-4 text-xl font-semibold">AHMAD ZAENURI</h3>
          <p className="text-gray-400">NPM: 227006126</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;