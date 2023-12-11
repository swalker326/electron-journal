let inactivityTime = function () {
  let time: NodeJS.Timeout;
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;

  function logout() {
    // Set some global "need to re-auth" flag
    localStorage.setItem("locked", "true");
    console.log(window.location.pathname);
    if (window.location.pathname !== "/locked") {
      window.location.pathname = "/locked";
    }
    console.log("needsReauth to true YAY");
  }

  function resetTimer() {
    console.log("resetting timer");
    clearTimeout(time);
    time = setTimeout(() => logout(), 5000); // 600000 milliseconds = 10 minutes
  }
};
inactivityTime();
