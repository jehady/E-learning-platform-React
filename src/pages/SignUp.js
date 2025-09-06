import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, apiService } from "../utils/api";
import "./SignIn.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [userType, setUserType] = useState("");
  const [teacherFiles, setTeacherFiles] = useState([]); // ✅ store uploaded PDFs
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      let res;

      if (userType === "teacher") {
        // ✅ build FormData for teacher
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password_confirmation", passwordConfirmation);
        formData.append("user_type", userType);

        teacherFiles.forEach((file) => {
          formData.append("file_path[]", file); // multiple files support
        });

        res = await apiService.post("/api/sign_up", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        
        const data = {
          username,
          email,
          password,
          password_confirmation: passwordConfirmation,
          user_type: userType,
        };
        res = await apiService.post("/api/sign_up", data);
      }
      console.log(res.is_approved);


  // Save token & user
  localStorage.setItem("token", res.token);
  localStorage.setItem("user", JSON.stringify(res));

  if (res.is_approved === 1) {
    // ✅ Already approved → go to interests
    alert("Signup successful! Welcome 🎉");
    navigate("/my-Interset");
  } else {
    // ⏳ Pending admin approval
    alert(res.message || "Your account is pending admin approval.");
    // you can still redirect them somewhere, or keep them on the signup page
  }

    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${API_BASE_URL}/google/redirect`;
  };

  return (
    <div className="auth-page">
      <div className="auth-container-modern">
        <div className="auth-header">
          <h1 className="auth-title">Create Your Account</h1>
          <p className="auth-subtitle">Join us and start your learning journey</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSignUp} className="auth-form">
          {/* Username */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              placeholder="Re-enter your password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* User Type */}
          <div className="input-group">
            <label>User Type</label>
            <div className="radio-group-modern">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="teacher"
                  checked={userType === "teacher"}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                />
                Teacher
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="woman"
                  checked={userType === "woman"}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                />
                Woman
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="child"
                  checked={userType === "child"}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                />
                Child
              </label>
            </div>
          </div>

          {/* Teacher File Upload (only if teacher selected) */}
          {userType === "teacher" && (
            <div className="input-group">
              <label htmlFor="teacherFiles">Upload Certificates (PDF)</label>
              <input
                type="file"
                id="teacherFiles"
                accept="application/pdf"
                multiple
                onChange={(e) => setTeacherFiles(Array.from(e.target.files))}
                disabled={loading}
              />
              <small>You can upload one or more PDF files.</small>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="auth-primary-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleSignUp}
          className="auth-google-btn"
          disabled={loading}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          Sign Up with Google
        </button>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="auth-link">
              Sign In
            </Link>
          </p>
          <p>
            <Link to="/reset-password" className="auth-link">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
