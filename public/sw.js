self.addEventListener("push", e => {
  const { title, body, icon } = e.data.json();
  self.registration.showNotification(title, {
    body,
    icon
  });
});

