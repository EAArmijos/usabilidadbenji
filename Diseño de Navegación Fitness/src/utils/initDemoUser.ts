// Initialize demo user if not exists
export function initializeDemoUser() {
  const users = localStorage.getItem("fitpro_users");
  if (!users) {
    const demoUsers = [
      {
        id: "demo-1",
        name: "Usuario Demo",
        email: "demo@fitpro.com",
        password: "demo123",
        avatar: "https://ui-avatars.com/api/?name=Usuario+Demo&background=ea580c&color=fff",
      },
    ];
    localStorage.setItem("fitpro_users", JSON.stringify(demoUsers));
  }
}
