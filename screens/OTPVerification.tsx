import React, { useState, useEffect } from 'react';

const OTPVerification = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        const interval = timer > 0 ? setInterval(() => setTimer(timer - 1), 1000) : null;
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (e, index) => {
        if (/\d/.test(e.key)) {
            const value = e.key;
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        } else if (e.key === 'Backspace' && index > 0) {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handleResend = () => {
        if (timer === 0) {
            setLoading(true);
            setIsResending(true);
            // Simulate an API call
            setTimeout(() => {
                setLoading(false);
                setIsResending(false);
                setTimer(30);
            }, 2000);
        }
    };

    const handleSubmit = () => {
        // Handle OTP submission
        // Validate OTP
        if (otp.join('').length < 6) {
            setError('Please enter a valid OTP.');
            return;
        }
        // Additional submission logic here
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-lg font-bold mb-4">Enter OTP</h1>
            <div className="flex space-x-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 border rounded text-center focus:outline-none"
                        value={digit}
                        onKeyDown={(e) => handleChange(e, index)}
                        aria-label={`OTP digit ${index + 1}`}
                    />
                ))}
            </div>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Submit'}
            </button>
            <div className="mt-4">
                <button
                    onClick={handleResend}
                    className={`text-blue-600 ${timer > 0 ? 'cursor-not-allowed' : ''}`}
                    disabled={timer > 0}
                >
                    Resend OTP {timer > 0 && `(${timer})`}
                </button>
            </div>
        </div>
    );
};

export default OTPVerification;