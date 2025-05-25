document.querySelector("#loginBtn").addEventListener("click", async (e) => {
    e.preventDefault();
    
    const email = document.querySelector("#loginEmail").value;
    const password = document.querySelector("#loginPassword").value;

    const response = await fetch("api/users/user-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token); 
        window.location.href = "dashboard.html";
    } else {
        alert("Login failed: " + data.message);
    }
});


document.querySelector("#signupBtn").addEventListener("click", async (e) => {
    e.preventDefault();

    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#signupEmail").value;
    const password = document.querySelector("#signupPassword").value;

    const response = await fetch("api/users/user-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert("Signup successful! Please login.");
        new bootstrap.Modal(document.querySelector("#signupModal")).hide();
        new bootstrap.Modal(document.querySelector("#loginModal")).show();
    } else {
        alert("Signup failed: " + data.message);
    }
});
