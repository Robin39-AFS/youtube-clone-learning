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

    window.location.href = "./auth-test.html";
  });
}
