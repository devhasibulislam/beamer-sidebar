document.addEventListener("DOMContentLoaded", function () {
  // Create button element
  var notificationButton = document.createElement("button");
  notificationButton.setAttribute("type", "button");
  notificationButton.style.position = "fixed";
  notificationButton.style.bottom = "20px";
  notificationButton.style.left = "20px";
  notificationButton.style.cursor = "pointer";
  notificationButton.style.borderRadius = "50%";
  notificationButton.style.border = "1px solid #000";
  notificationButton.style.backgroundColor = "#fff";
  notificationButton.style.color = "#000";
  notificationButton.style.width = "40px";
  notificationButton.style.height = "40px";
  notificationButton.style.display = "flex";
  notificationButton.style.justifyContent = "center";
  notificationButton.style.alignItems = "center";
  notificationButton.style.zIndex = "99999";

  // Create SVG element
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("class", "w-10 h-10 notification-center p-2");

  // Create path element
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute(
    "d",
    "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
  );

  // Append path to SVG
  svg.appendChild(path);

  // Append SVG to button
  notificationButton.appendChild(svg);

  // Append button to the body or any other desired parent element
  document.body.appendChild(notificationButton);

  // Get references to the button and sidebar elements
  const button = document.querySelector(".notification-center");
  const sidebar = document.createElement("div");
  sidebar.style =
    "position: fixed; top: 0; left: 0; height: 100vh; transform: translateX(-100%); background-color: #f5f5f5; padding: 1rem; z-index: 99999;";
  sidebar.style.transition = "transform 0.3s ease-in-out";

  // Function to open the sidebar
  function openSidebar() {
    sidebar.style.transform = "translateX(0)";
  }

  // Function to close the sidebar
  function closeSidebar() {
    sidebar.style.transform = "translateX(-100%)";
  }

  // Event listener for button click
  button.addEventListener("click", () => {
    openSidebar();
    fetchPostsData(); // Fetch and display posts data when sidebar is opened
  });

  // Event listener for clicking outside the sidebar
  document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && event.target !== button) {
      closeSidebar();
    }
  });

  // Append the sidebar to the body
  document.body.appendChild(sidebar);

  // Add scrollable functionality to the sidebar
  sidebar.style.overflowY = "auto";
  sidebar.style.maxHeight = "calc(100vh - 2rem)";

  // Function to fetch posts data and display in the sidebar
  function fetchPostsData() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        // Clear existing sidebar content
        sidebar.innerHTML = "";
        // Iterate through each post and create a div to display title and body
        data.forEach((post) => {
          const postDiv = document.createElement("div");
          const title = document.createElement("h3");
          title.textContent = post.title;
          const body = document.createElement("p");
          body.textContent = post.body;
          postDiv.appendChild(title);
          postDiv.appendChild(body);
          sidebar.appendChild(postDiv);
        });
      })
      .catch((error) => {
        console.error("Error fetching posts data:", error);
      });
  }

  // Set different sidebar widths based on screen size
  const setSidebarWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      sidebar.style.width = "20%";
    } else if (screenWidth >= 768) {
      sidebar.style.width = "33%";
    } else {
      sidebar.style.width = "45%";
    }
  };

  // Call the function initially and on window resize
  setSidebarWidth();
  window.addEventListener("resize", setSidebarWidth);
});
