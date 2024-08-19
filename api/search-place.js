import puppeteer from "puppeteer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { placeName } = req.body;

    if (!placeName) {
      return res.status(400).json({ error: "Place name is required" });
    }

    try {
      const browser = await puppeteer.launch({
        headless: false,
        // args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
      });
      const page = await browser.newPage();
      await page.goto("https://www.google.com/maps");
      await page.waitForSelector("input#searchboxinput");
      await page.type("input#searchboxinput", placeName);
      await page.click("button#searchbox-searchbutton");
      await page.waitForNavigation({ waitUntil: "networkidle2" });

      const placeURL = page.url();
      await browser.close();

      res.status(200).json({ link: placeURL });
    } catch (error) {
      console.error("Puppeteer error:", error);
      res.status(500).json({ message: "Failed to search place", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
