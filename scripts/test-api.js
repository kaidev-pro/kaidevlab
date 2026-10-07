async function run() {
  const baseUrl = "https://learn.kaidevlab.com/api";
  console.log("Checking Health at", baseUrl);
  const healthRes = await fetch(`${baseUrl}/health`);
  console.log("Health status:", healthRes.status, await healthRes.json());

  const testUser = `cadet_${Date.now().toString(36)}`;
  console.log("Registering user:", testUser);
  const regRes = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: testUser,
      password: "securePassword123",
      name: "Bagus Pratama",
      learningTrack: "both",
    }),
  });
  const regData = await regRes.json();
  console.log("Register result:", regRes.status, regData);

  if (regData.token) {
    console.log("Testing Sync...");
    const syncRes = await fetch(`${baseUrl}/study/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${regData.token}`,
      },
      body: JSON.stringify({
        payload: {
          kaidevlab_tango_n3_progress_v1: {
            masteredCardIds: ["tango-001", "tango-002"],
            streak: 3,
          },
        },
        clientTimestamp: Date.now(),
      }),
    });
    console.log("Sync response:", syncRes.status, await syncRes.json());
  }
}

run().catch(console.error);
