export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { vin } = req.body;

  if (!vin) {
    return res.status(400).json({ error: "VIN is required" });
  }

  try {
    const apiKey = process.env.VINAUDIT_API_KEY;

    const response = await fetch(
      `https://api.vinaudit.com/v1/query?key=${apiKey}&vin=${vin}&format=json`
    );

    const data = await response.json();

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: "Request failed" });
  }
}
