import React, { useState, useRef, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import img1 from './assets/1.jpeg';
import img2 from './assets/2.jpeg';
import img3 from './assets/3.jpeg';
import img4 from './assets/4.jpeg';
import img5 from './assets/5.jpeg';
import lagu from './assets/lagu2.mp3';

const Propose = () => {
    const [step, setStep] = useState(0);
    const [showHeart, setShowHeart] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const audioRef = useRef(null);
    const autoPlayRef = useRef(null);

    const photos = [
        img1,
        img2,
        img3,
        img4,
        img5
    ];

    const messages = [
        "Hai, Vitha Rahman...",
        "Saya masih ingat dengan jelas saat pertama kali kita bertemu bukan di tempat yang biasa, bukan di dunia nyata, melainkan melalui aplikasi, sebuah cara yang tak pernah terbayangkan bisa membawa kita sejauh ini.",
        "Pada saat itu, semuanya terasa seperti kebetulan, sebuah pertemuan yang tak pernah Saya duga, namun ternyata adalah takdir-Nya yang mempertemukan kita. Seperti yang tertulis dalam takdir-Nya, kita dipertemukan lewat sesuatu yang tidak terduga, bahkan hanya sebuah aplikasi yang awalnya terasa biasa saja.",
        "Namun, Saya tahu saat itu ada sesuatu yang lebih dari sekadar percakapan pertama. Ada benang merah yang menghubungkan kita, sebuah ikatan yang bahkan tanpa kita sadari mulai tumbuh dengan sendirinya.",
        "Saya masih ingat betapa hati ini ragu untuk melangkah lebih jauh, namun tetap ada dorongan untuk menghubungimu lebih lanjut. Saya memutuskan untuk memberanikan diri, mencoba menjalin percakapan yang lebih dalam, walaupun waktu itu Saya merasa seolah Saya tidak tahu arah.",
        "Kemudian, kita sempat kehilangan kontak—hampir dua minggu lamanya. Itu adalah waktu yang cukup lama untuk membuat Saya bertanya-tanya, namun Saya percaya, semuanya ada dalam takdir-Nya. Terkadang, dalam hidup, jarak atau kekosongan sementara seperti itu justru menguatkan niat untuk mencari kembali.",
        "Takdir, ternyata, membawa kita kembali pada satu titik pertemuan. Meskipun jarak waktu sempat memisahkan, Saya merasa ada sesuatu yang lebih besar yang terus mengingatkan kita untuk saling mencari dan terhubung kembali.",
        "Dan kini, di sini kita berdiri mungkin dengan lebih banyak pemahaman, lebih banyak pelajaran dari perjalanan yang tidak pernah terbayangkan sebelumnya.",
        "Vitha Rahman, Saya ingin melangkah lebih jauh lagi dalam perjalanan ini. Maukah kamu berjalan bersama Saya, terus mencari arah bersama, meskipun kita tahu takdir seringkali tidak bisa kita pahami sepenuhnya? 💍"
    ];

    const toggleMute = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
            setIsMuted(!isMuted);
        }
    };

    const handleNext = () => {
        if (step < messages.length - 1) {
            setStep(step + 1);
        } else {
            setShowHeart(true);
        }
    };

    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
        // Reset timer when manually navigating
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            if (isAutoPlaying) {
                startAutoPlay();
            }
        }
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            if (isAutoPlaying) {
                startAutoPlay();
            }
        }
    };

    const startAutoPlay = () => {
        autoPlayRef.current = setInterval(() => {
            setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
        }, 3000);
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
    };

    const buttonReject = () => {
        alert("Tidak bisa menolak 😝");
    };

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, []);

    const handleMouseEnter = () => {
        stopAutoPlay();
        setIsAutoPlaying(false);
    };

    const handleMouseLeave = () => {
        startAutoPlay();
        setIsAutoPlaying(true);
    };

    const sendToWhatsapp = async () => {
        const data = new FormData();
        data.append("target", "082290333669");
        data.append("message", "Saya mau! 💕");
        data.append("url", "https://md.fonnte.com/images/wa-logo.png");
        data.append("schedule", "0");
        data.append("delay", "2");
        data.append("countryCode", "62");

        const response = await fetch("https://api.fonnte.com/send", {
            method: "POST",
            headers: {
                Authorization: "yz2utSh6MvE8SS7bGCrM",
            },
            body: data,
        });

        const res = await response.json();
        if (res.detail == "success! message in queue") {
            alert("Jawabanmu sudah terkirim ke Rizki");
            window.location.reload()
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
            <audio
                ref={audioRef}
                loop
                src={lagu}
            />

            <button
                onClick={toggleMute}
                className="fixed top-4 right-4 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>

            <div
                className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden"
                style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fce7f3' fill-opacity='0.7' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E')"
                }}
            >
                <div
                    className="relative mb-6 rounded-lg overflow-hidden shadow-lg"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={photos[currentPhotoIndex]}
                        alt={`Memory ${currentPhotoIndex + 1}`}
                        className="w-full h-80 object-cover transition-opacity duration-500"
                    />
                    <button
                        onClick={prevPhoto}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextPhoto}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                    >
                        <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {photos.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {showHeart && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-pink-100/90 to-red-100/90 backdrop-blur-sm">
                        <Heart
                            className="text-red-500 animate-pulse"
                            size={120}
                            fill="currentColor"
                        />
                    </div>
                )}

                <div className="mb-8">
                    <h2 className={`text-3xl font-bold text-pink-600 mb-4 drop-shadow-sm ${showHeart ? 'z-0 blur-sm' : ''}`}>
                        {messages[step]}
                    </h2>
                </div>

                {!showHeart && (
                    <button
                        onClick={handleNext}
                        className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-8 rounded-full transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 shadow-lg"
                    >
                        Lanjut ♥️
                    </button>
                )}

                {showHeart && (
                    <div className="flex gap-4 justify-center mt-8 z-10">
                        <button
                            className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-bold py-3 px-8 rounded-full transform transition hover:scale-105 shadow-lg"
                            onClick={buttonReject}
                        >
                            Maaf 😢
                        </button>
                        <button
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-full transform transition hover:scale-105 shadow-lg"
                            onClick={sendToWhatsapp}
                        >
                            Ya, Saya mau! 💕
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Propose;