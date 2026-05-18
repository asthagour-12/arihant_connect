import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { sendOtp, validateOtp, resendOtp } from "../api/auth";

const OTPLogin = () => {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [canResend, setCanResend] = useState(false);
    const [resendTimer, setResendTimer] = useState(120);
    const [otpError, setOTPError] = useState('');

    // Timer logic
    const startResendTimer = () => {
        setCanResend(false);
        setResendTimer(120);
    };

    useEffect(() => {
        let timer;
        if (showOTP && resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [showOTP, resendTimer]);


    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const data = await sendOtp(mobile);
            
            if (data.status === true || data.success === true) {
                setShowOTP(true);
                setSuccess('OTP sent successfully!');
                toast.success('OTP sent successfully!');
                startResendTimer();
            } else {
                setError(data.message || 'Failed to send OTP');
                toast.error(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to send OTP. Please try again.');
            toast.error('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        setOTPError('');

        try {
            const data = await validateOtp(mobile, otp);

            if (data.status === true || data.success === true) {
                setSuccess('OTP verified successfully!');
                toast.success('OTP verified successfully!');
                // Store token if available
                if (data.token || data.access_token) {
                    localStorage.setItem('authToken', data.token || data.access_token);
                    localStorage.setItem('isLoggedIn', 'true');
                }
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    window.location.href = '/dashboard';
                }
            } else {
                setOTPError(data.message || 'Invalid OTP');
                toast.error(data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error(error);
            setOTPError('Failed to verify OTP. Please try again.');
            toast.error('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = async () => {
        if (!canResend) return;
        try {
            setLoading(true);
            const response = await resendOtp();
            console.log("Resend OTP:", response);
            toast.success("OTP Resent Successfully!");
            startResendTimer();
        } catch (error) {
            console.error(error);
            setOTPError("Failed to resend OTP");
            toast.error("Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setShowOTP(false);
        setOtp('');
        setError('');
        setSuccess('');
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-500">

                {/* Header Decoration */}
                <div className="h-2 bg-[#34b350] w-full"></div>

                <div className="p-8 lg:p-12">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-gray-800 tracking-tighter mb-2">Arihant Capital</h1>
                        <p className="text-gray-400 font-bold text-[11px] uppercase tracking-[0.2em]">Secure OTP Login</p>
                    </div>

                    {!showOTP ? (
                        <form onSubmit={handleSendOTP} className="space-y-8">
                            <div className="space-y-2">
                                <label htmlFor="mobile" className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                                    Mobile Number
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">+91</span>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        value={mobile}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            setMobile(val);
                                        }}
                                        placeholder="10-digit number"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-6 py-4 text-gray-800 font-bold outline-none focus:bg-white focus:border-[#34b350] transition-all shadow-inner"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#34b350] hover:bg-[#2e9e47] text-white py-4 rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-green-500/20 transition-all disabled:bg-gray-200 active:scale-[0.98]"
                                disabled={loading || mobile.length !== 10}
                            >
                                {loading ? 'SENDING...' : 'SEND OTP'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOTP} className="space-y-8">
                            <div className="bg-green-50 p-4 rounded-2xl flex items-center justify-between border border-green-100">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-green-600 font-black uppercase tracking-widest">Mobile</span>
                                    <span className="text-gray-800 font-black">+91 {mobile}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="text-[11px] font-black text-[#34b350] hover:underline uppercase tracking-widest"
                                >
                                    Change
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="otp" className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                                    Enter 6-digit OTP
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="••••••"
                                    className="w-full text-center tracking-[0.8em] text-2xl bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 font-black outline-none focus:bg-white focus:border-[#34b350] transition-all shadow-inner"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#34b350] hover:bg-[#2e9e47] text-white py-4 rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-green-500/20 transition-all disabled:bg-gray-200 active:scale-[0.98]"
                                disabled={loading || otp.length !== 6}
                            >
                                {loading ? 'VERIFYING...' : 'VERIFY OTP'}
                            </button>

                            <div className="text-center pt-4">
                                {canResend ? (
                                    <button
                                        type="button"
                                        onClick={resendOTP}
                                        className="text-[#34b350] font-black hover:underline uppercase tracking-widest text-[11px]"
                                        disabled={loading}
                                    >
                                        Resend OTP
                                    </button>
                                ) : (
                                    <p className="text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                                        Resend OTP in {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
                                    </p>
                                )}
                            </div>
                        </form>
                    )}

                    {/* Removed inline error/success messages to use toast popups instead */}

                    <div className="mt-12 text-center">
                        <p className="text-[11px] text-gray-400 font-medium">
                            Need assistance? <strong className="text-gray-800 font-bold">0731-4217208</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPLogin;
