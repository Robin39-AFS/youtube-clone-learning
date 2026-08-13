const signUpForm = document.getElementById("signUp");

if (signUpForm) {
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const conPass = document.getElementById("conPass").value;

    if (pass !== conPass) {
      alert("Password Not Match!");
      return;
    }

    const user = { name, email, pass };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existUser = users.find((x) => {
      return x.email === email;
    });
    if (existUser) {
      alert("Account is Exit with this email");
      return 0;
    }
    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created succesfully!");

    window.location.href = "./signIn.html";

    console.log(user);
  });
}

// Sign IN

const signInForm = document.getElementById("signIn");

if (signInForm) {
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((x) => {
      return x.email === email && x.pass === pass;
    });

    if (!user) {
      alert("Email or Password is Invalid");
      return;
    }

    const logged = {
      name: user.name,
      email: user.email,
    };

    localStorage.setItem("logged", JSON.stringify(logged));
    alert("Sign in Success");

    window.location.href = "./index.html";
  });
}

// Check Sign in Sign up

const authArea = document.getElementById("auth-area");

if (authArea) {
  const loggedUser = JSON.parse(localStorage.getItem("logged"));

  if (loggedUser) {
    authArea.innerHTML = `
      <span class="text-sm font-medium">
        ${loggedUser.name}
      </span>

      <button
        id="logout-btn"
        class="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer"
      >
        Logout
      </button>
    `;

    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("logged");
      window.location.reload();
    });
  } else {
    authArea.innerHTML = `
      <a
        href="./signIn.html"
        class="text-sm font-medium hover:text-red-500 transition"
      >
        Sign In
      </a>

      <a
        href="./signUp.html"
        class="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-full text-sm font-medium transition"
      >
        Sign Up
      </a>
    `;
  }
}