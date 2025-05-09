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
