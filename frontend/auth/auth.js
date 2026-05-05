const API = "https://red-phantom-auth.vercel.app/api/users";

async function signup() {
  if (password.value.length < 8) {
    alert("Password must be at least 8 characters long!");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    age: age.value,
    phone: phone.value,
    role: role.value,
    gender: document.querySelector("input[name='gender']:checked")?.value,
  };

  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem("email", data.email);
      location.href = "verify-email.html";
    } else {
      alert(result.message || "Signup failed");
    }
  } catch (err) {
    alert("Server error");
  }
}

async function verifyEmail() {
  const email = localStorage.getItem("email");

  try {
    const res = await fetch(`${API}/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        otp: otp.value,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.removeItem("email");
      location.href = "login.html";
    } else {
      alert(result.message || "Invalid OTP");
    }
  } catch (err) {
    alert("Server error");
  }
}

async function login() {
  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      location.href = "../../../main page/main.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    alert("Server error");
  }
}
