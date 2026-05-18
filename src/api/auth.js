import axios from "axios";

const api = axios.create({
  baseURL: "https://korpapuatapi.arihantcapital.com/api/V1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// LOGIN API
export const loginUser = async (branchCode) => {
  const response = await api.post("Auth/Login", {
    username: branchCode,
    password: "",
    login_type: "Mobile_OTP",
  });

  return response.data;
};

// SEND OTP
export const sendOtp = async (mobileNumber) => {
  const response = await api.post("sendotp", {
    mobileNumber,
  });

  return response.data;
};

// VALIDATE OTP
export const validateOtp = async (mobileNumber, otp) => {
  const response = await api.post("validatingotp", {
    mobileNumber,
    otp,
  });

  return response.data;
};

// RESEND OTP
export const resendOtp = async () => {
  const response = await api.get("resentOtp");

  return response.data;
};

export default api;
