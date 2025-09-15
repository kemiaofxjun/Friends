import "dotenv/config";
import fs from "fs/promises";
import axios from "axios";
import { Telegraf } from "telegraf";
import chalk from "chalk";

// 读取 links.json 文件
const readLinks = async () => {
  console.log("Reading links from links.json...");
  const data = await fs.readFile("links.json", "utf-8");
  const links = JSON.parse(data);
  console.log(`Found ${links.length} links.`);
  return links;
};

// 检查友链是否可访问
const checkLinks = async (links) => {
  console.log(chalk.greenBright("[INFO] Start checking links..."));
  const deadLinks = [];
  const aliveLinks = [];

  for (const link of links) {
    try {
      console.log(chalk.cyan(`[INFO] Checking ${link.link}...`));
      const response = await axios.get(link.link, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; Link Checker Bot; +https://www.example.com)",
        },
        timeout: 10000,
      });

      if (response.status < 200 || response.status >= 300) {
        console.log(chalk.yellowBright(`[WARN] Link ${link.link} is dead.`));
        link.errormsg = `Status code: ${response.status}`;
        deadLinks.push(link);
      } else {
        aliveLinks.push(link);
      }
    } catch (error) {
      console.log(chalk.red(`[ERROR] Error checking ${link.link}: ${error.message}`));
      link.errormsg = error.message;
      deadLinks.push(link);
    }
  }

  const updatedLinks = links.filter((link) => !deadLinks.includes(link));
  await fs.writeFile("links.json", JSON.stringify(updatedLinks, null, 2));
  console.log(chalk.cyan(`[INFO] Found ${deadLinks.length} dead links.`));
  return { deadLinks, aliveLinks };
};

// 检查 links-dead.json 中的链接是否恢复访问
const checkDeadLinks = async () => {
  try {
    console.log(chalk.greenBright("[INFO] Start checking dead links..."));
    const deadLinksData = await fs.readFile("links-dead.json", "utf-8");
    const deadLinks = JSON.parse(deadLinksData);
    const aliveLinks = [];

    for (const link of deadLinks) {
      try {
        const response = await axios.get(link.link, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (compatible; Link Checker Bot; +https://www.example.com)",
          },
          timeout: 10000,
        });

        if (response.status === 200) {
          console.log(chalk.greenBright(`[INFO] Link ${link.link} is alive.`));
          delete link.errormsg;
          aliveLinks.push(link);
        }
      } catch {
        // 链接仍然无法访问，不做处理
      }
    }

    const updatedDeadLinks = deadLinks.filter(
      (link) => !aliveLinks.includes(link)
    );
    await fs.writeFile("links-dead.json", JSON.stringify(updatedDeadLinks, null, 2));
    return aliveLinks;
  } catch (error) {
    console.error(chalk.red("[ERROR] Failed to check dead links:", error));
    return [];
  }
};

// 保存死链并恢复活链
const saveDeadLinks = async (newDeadLinks, recoveredLinks) => {
  console.log(chalk.cyan("[INFO] Saving dead links to links-dead.json..."));

  const deadLinksData = await fs.readFile("links-dead.json", "utf-8");
  let deadLinks = JSON.parse(deadLinksData);
  deadLinks = [...deadLinks, ...newDeadLinks];
  await fs.writeFile("links-dead.json", JSON.stringify(deadLinks, null, 2));

  const linksData = await fs.readFile("links.json", "utf-8");
  const links = JSON.parse(linksData);
  const updatedLinks = [...links, ...recoveredLinks];
  await fs.writeFile("links.json", JSON.stringify(updatedLinks, null, 2));
};

// Telegram 通知
const sendNotification = async (deadLinks) => {
  if (deadLinks.length === 0) {
    console.log(chalk.cyan("[INFO] No dead links found, no notification sent."));
    return;
  }

  console.log(chalk.cyan("[INFO] Sending Telegram notification..."));
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  const message = `🔍 友链巡查完成，以下链接无法访问已移除：\n\n${deadLinks
    .map((link) => `• <b>${link.name}</b>\n${link.link}\n错误信息: ${link.errormsg}\n`)
    .join("\n")}`;

  try {
    await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message, {
      parse_mode: "HTML",
    });
  } catch (error) {
    console.log(chalk.red("[ERROR] Failed to send Telegram message:", error));
  }
};

// 主函数
const main = async () => {
  try {
    const recoveredLinks = await checkDeadLinks();
    const links = await readLinks();
    const { deadLinks, aliveLinks } = await checkLinks(links);
    await saveDeadLinks(deadLinks, recoveredLinks);

    if (deadLinks.length > 0) {
      await sendNotification(deadLinks);
    } else {
      console.log(chalk.greenBright("[INFO] All links are alive."));
    }
  } catch (error) {
    console.error(chalk.red("[ERROR] Unexpected error:", error));
  }
};

main();
