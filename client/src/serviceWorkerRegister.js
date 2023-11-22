export function serviceWorkerRegister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js") // Adjust the path accordingly
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
}
