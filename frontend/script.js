function openTab(tabName, event) {
  const tabLinks = document.getElementsByClassName("tab-links");
  const tabContents = document.getElementsByClassName("tab-contents");

  for (let tabLink of tabLinks) {
    tabLink.classList.remove("active-link");
  }
  for (let tabContent of tabContents) {
    tabContent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

    
const sideMenu = document.getElementById("sideMenu")

function openMenu(){
  sideMenu.style.right = "0"
}
function closeMenu(){
  sideMenu.style.right = "-200px"
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const data = {
      Name: form.Name.value,
      Email: form.Email.value,
      Message: form.Message.value
    };

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.result === 'success') {
        alert('Message sent!');
        form.reset();
      } else {
        alert('Failed to send!');
      }
    } catch (error) {
      alert('Something went wrong!');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send";
    }
  });
});

