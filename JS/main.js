// THE MAIN API
// PUT THE /(WHAT YOU WANT)
const url = "https://tarmeezacademy.com/api/v1";
getposts();
// GET METHOD BY AXIOS LIBARY
function getposts() {
  axios.get(`${url}/posts`).then((res) => {
    let posts = res.data.data;
    for (let post of posts) {
      //  GET TAGS AND ADD TO THE BODY
      let tags = post.tags.map((tag) => {
        return `<span class="badge bg-primary ">${tag}</span>`;
      });
      tags = tags.join("");
      // FILL THE CARD IN THE EMBTY DIV, FISRT WRITHE IN THE ACUAL AND THE COPY THE CODE HERE
      let card = `
          <div class="card col-9 p-2 shadow mb-5">
        <div class="card-header d-flex flex-row">
          <img
            src="${post.author.profile_image}"
            alt=""
            srcset=""
            class="rounded-5 border border-1"
            style="width: 40px; height: 40px"
          />
          <h4 class="mx-2">${post.author.name}</h4>
        </div>
        <div class="card-body d-flex flex-column">
          <img
            src="${post.image}"
            alt=""
            srcset=""
            class="rounded-1"
        />
        <h6 class="mt-2" style="color: rgb(172, 172, 172)">socail</h6>
        <h2>${post.title}</h2>
        <p>
            ${post.body}
        </p>
        <hr />
        <div>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pen"
            viewBox="0 0 16 16"
            >
            <path
                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
            />
            </svg>
            <span >  (${post.comments_count}) comments </span>
            <span class="mx-2">${tags}</span>
        </div>
        </div>
    </div>    
        `;
      // ADD BY + TO NOT DELETE EVERY THING FROM THE DOM IN CARD SECTION
      document.querySelector("#posts").innerHTML += card;
    }
  });
}

// LOGIN
function login() {
  let username = document.querySelector("#recipient-name").value;
  let password = document.querySelector("#message-text").value;
  // CHECK IF THE USER ENTER THE USER NNME AND PASSWORD
  if (username && password) {
    axios
      .post(`${url}/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        // ADD TOKEN && USER TO THE LOCALSTORGE
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // ADD TOKEN && USER TO THE LOCALSTORGE
        // HIDE THE MODEL
        const modalEl = document.querySelector("#exampleModal");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance.hide();
        // SHOW ALARTE
        alertUser("login success", "success");
        showUI();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("Please enter username and password");
  }
}

const loginbtn = document.getElementById("model-login-btn");
// ADD EVENT WHEN YOU CLICK
loginbtn.addEventListener("click", login);
// ADD EVENT WHEN YOU CLICK

// REGISTER
function Register() {
  // GET DATA FROM MAIN INPUT
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#Password").value;
  let email = document.querySelector("#email").value;
  let name = document.querySelector("#name").value;
  let image = document.querySelector("#image").value;
  let formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("email", email);
  formdata.append("image", image);
  formdata.append("name", name);
  if (username && password) {
    axios
      .post(`${url}/register`, formdata, {
        headers: {
          Content_Type: "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        const modalEl = document.querySelector("#Register");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance.hide();
        alertUser("register success", "success");
        showUI();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // CHECK IF THE USER ENTER THE USER NNME AND PASSWORD
    alert("Please enter username and password");
  }
}
const Registerbtn = document.getElementById("Register-model-btn");
// ADD EVENT WHEN YOU CLICK
Registerbtn.addEventListener("click", Register);
// ADD EVENT WHEN YOU CLICK

// SHAW ALARTE
function alertUser(message, type = "success") {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");
    alertPlaceholder.append(wrapper);
  };
  alertPlaceholder.style.display = "block";
  appendAlert(message, type);
  setTimeout(() => {
    alertPlaceholder.firstChild.remove();
    alertPlaceholder.style.display = "none";
  }, 2000);
}
// SWITHCH THE FACE
function showUI() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  // GET ELEMENT TO CHANGE DISPLAY FOR HIM
  const btnLogin = document.getElementById("Login");
  const Register = document.getElementById("Register");
  const logout = document.getElementById("logout");
  const image = document.getElementById("userImage");
  const userName = document.getElementById("userName");
  const addpost = document.getElementById("add-post");
  if (token) {
    logout.style.display = "block";
    btnLogin.style.display = "none";
    Register.style.display = "none";
    // ADD THE USER NAME TO THE DOM
    userName.innerHTML = user.name;
    image.src = user.profile_image;
    image.style.display = "block";
    userName.style.display = "block";
    addpost.style.display = "block";
  } else {
    logout.style.display = "block";
    btnLogin.style.display = "none";
    Register.style.display = "none";
  }
}
// ADD POST
function addPost() {
  // GET THE TOKEN FROM THE LOCALSTORAGE
  const token = localStorage.getItem("token");
  const title = document.getElementById("title-post").value;
  const bodypost = document.getElementById("bodypost").value;
  const imagepost = document.getElementById("imagepost").files[0];
  // CREATE FROM DATA
  let formdata = new FormData();
  formdata.append("body", bodypost);
  formdata.append("title", title);
  formdata.append("image", imagepost);
  // MUST TELL THE BACKEND YOU WANT TO SENT DATA AS A DATAFROM
  axios
    .post(`${url}/posts`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const modalEl = document.querySelector("#AddPostmodel");
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
      alertUser("Post added successfully", "success");
      getposts();
    })
    .catch((err) => {
      let message = "An error occurred";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      alertUser(message, "danger");
    });
}

const addpost = document.getElementById("AddPost-model-btn");
// ADD EVENT WHEN YOU CLICK
addpost.addEventListener("click", addPost);
// ADD EVENT WHEN YOU CLICK

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  const btnLogin = document.getElementById("Login");
  const Register = document.getElementById("Register");
  const logout = document.getElementById("logout");
  const image = document.getElementById("userImage");
  const addpost = document.getElementById("add-post");
  const name = document.getElementById("userName");
  // HIDE AND DISPLAY ELMENT FROM DOM
  name.style.display = "none";
  logout.style.display = "none";
  addpost.style.display = "none";
  image.style.display = "none";
  // ================================
  btnLogin.style.display = "block";
  Register.style.display = "block";
  alertUser("YOU LOGOUT !", "danger");
}

//  TODO:
// window.onload = function () {
//   checkUserLogin();
// };
// function checkUserLogin() {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     // Redirect to login if not authenticated
//     window.location.href = "index.html";
//   } else {
//     // Use the token in your API requests
//     axios
//       .get("YOUR_API_URL", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         const image = document.getElementById("userImage");
//         const userName = document.getElementById("userName");
//         const addpost = document.getElementById("add-post");
//         userName.innerHTML = user.name;
//         image.src = user.profile_image;
//         image.style.display = "block";
//         userName.style.display = "block";
//         addpost.style.display = "block";
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
// }
