document.addEventListener("DOMContentLoaded", function () {
  let skipLink = document.querySelector(".skip-to-main");

  skipLink.addEventListener("click", function (e) {
    e.preventDefault();
    let targetId = this.getAttribute("href").substring(1);
    let targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.tabIndex = -1;
      targetElement.focus();
    }
  });
});
