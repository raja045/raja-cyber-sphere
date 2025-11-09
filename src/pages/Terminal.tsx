import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Raja's Terminal Portfolio" },
    { type: "output", content: "Type 'help' to see available commands\n" },
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const commands = {
    help: () => [
      "Available commands:",
      "  help          - Show this help message",
      "  ls            - List all projects",
      "  writeups      - List technical write-ups",
      "  skills        - Display skills and certifications",
      "  socials       - Show public profile links",
      "  vcard         - Generate vCard QR code",
      "  cat <project> - Show project details",
      "  search <term> - Search projects and write-ups",
      "  clear         - Clear terminal",
      "  open <url>    - Open external link",
    ],
    ls: () => [
      "Projects:",
      "  1. image-forensic       - Image Data Forensic Using Metadata",
      "  2. homelab-soc          - Home Lab Security Operations Center",
      "  3. pci-compliance       - PCI Compliance on Secure PAW",
      "  4. web-pentest          - Web Application Penetration Testing",
      "  5. anomaly-detection    - Anomaly Detection from Image Metadata",
    ],
    writeups: () => [
      "Technical Write-ups:",
      "  • Ransomware Attack Vectors (Dec 2024)",
      "  • Zero-Day Vulnerability Discovery (Nov 2024)",
      "  • Building a SOC from Scratch (Oct 2024)",
      "  • Web Application Penetration Testing (Sep 2024)",
    ],
    skills: () => [
      "Core Skills:",
      "  Cybersecurity: Penetration Testing, Forensics, Incident Response",
      "  Network Security: Firewalls, IDS/IPS, VPN, SIEM",
      "  Cloud & AI: Azure, AWS, Machine Learning, Deep Learning",
      "  Programming: Python, JavaScript, C++, SQL",
      "  Tools: Wireshark, Burp Suite, Metasploit, Nmap, Splunk",
      "\nCertifications:",
      "  • Certified Ethical Hacker (CEH)",
      "  • Certified Penetration Testing Expert (CPTE)",
    ],
    socials: () => [
      "Public Profiles:",
      "  GitHub:       https://github.com",
      "  LinkedIn:     https://linkedin.com",
      "  HackTheBox:   https://hackthebox.com",
      "  TryHackMe:    https://tryhackme.com",
      "  VulnHub:      https://vulnhub.com",
    ],
    vcard: () => [
      "vCard generation available on main portfolio page",
      "Scan QR code in Contact section to download contact details",
    ],
    clear: () => null,
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: `$ ${cmd}` },
    ];

    if (trimmedCmd === "clear") {
      setLines([
        { type: "output", content: "Welcome to Raja's Terminal Portfolio" },
        { type: "output", content: "Type 'help' to see available commands\n" },
      ]);
      return;
    }

    if (trimmedCmd.startsWith("cat ")) {
      const projectName = trimmedCmd.split(" ")[1];
      newLines.push({
        type: "output",
        content: `Showing details for: ${projectName}\nUse 'ls' to see all projects`,
      });
    } else if (trimmedCmd.startsWith("search ")) {
      const searchTerm = trimmedCmd.split(" ").slice(1).join(" ");
      newLines.push({
        type: "output",
        content: `Searching for: "${searchTerm}"\nMatches found in projects and write-ups`,
      });
    } else if (trimmedCmd.startsWith("open ")) {
      const url = cmd.split(" ")[1];
      newLines.push({
        type: "output",
        content: `Opening: ${url}`,
      });
      window.open(url, "_blank");
    } else if (commands[trimmedCmd as keyof typeof commands]) {
      const result = commands[trimmedCmd as keyof typeof commands]();
      if (result) {
        result.forEach((line) => {
          newLines.push({ type: "output", content: line });
        });
      }
    } else if (trimmedCmd) {
      newLines.push({
        type: "error",
        content: `Command not found: ${trimmedCmd}. Type 'help' for available commands.`,
      });
    }

    setLines(newLines);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-4 flex items-center gap-2 text-sm">
          <Badge variant="outline" className="border-green-400 text-green-400">
            raja@portfolio
          </Badge>
          <span className="text-green-400/50">~</span>
        </div>

        <div className="space-y-1 mb-4">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`${
                line.type === "input"
                  ? "text-green-300"
                  : line.type === "error"
                  ? "text-red-400"
                  : "text-green-400/80"
              }`}
            >
              {line.content}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-300">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
