import { FileSystem } from "@/types/os";

export const initialFileSystem: FileSystem = {
    type: "directory",
    name: "root",
    children: {
        home: {
            type: "directory",
            name: "home",
            children: {
                aman: {
                    type: "directory",
                    name: "aman",
                    children: {
                        "about.md": {
                            type: "file",
                            name: "about.md",
                            content: `# Aman Maurya\nSoftware Developer | Mumbai, India\n\n- Email: amaurya.dev@gmail.com\n- GitHub: https://github.com/amanmaurya7\n- LinkedIn: https://www.linkedin.com/in/amanmaurya-me/\n\nI am eager to connect with like-minded professionals and explore opportunities where I can contribute my technical skills.`,
                            component: "Profile"
                        },
                        "experience.json": {
                            type: "file",
                            name: "experience.json",
                            content: JSON.stringify([
                                {
                                    company: "WeSee",
                                    position: "Frontend Developer Intern",
                                    period: "January 2025 – March 2025",
                                    location: "Tokyo, Japan (Remote)",
                                    description: "Developed a F1-themed reaction time game using React & TypeScript..."
                                },
                                {
                                    company: "Shiemvoltech Private Limited",
                                    position: "Software Development Intern",
                                    period: "December 2024 – March 2025",
                                    location: "Mumbai (Remote)",
                                    description: "Developed a user-friendly employee management system..."
                                },
                                {
                                    company: "VG Simulations Pvt. Ltd",
                                    position: "Project Intern",
                                    period: "July 2022 – August 2022",
                                    location: "Mumbai",
                                    description: "Gained proficiency in Blockchain technology..."
                                }
                            ], null, 2),
                            component: "Experience"
                        },
                        "projects.json": {
                            type: "file",
                            name: "projects.json",
                            content: JSON.stringify([
                                {
                                    title: "Kavach: A Quantum-Resistant Biometric Data System",
                                    technologies: ["React.js", "QANplatform", "IPFS", "CRYSTALS-Kyber", "CRYSTALS-Dilithium", "zk-SNARKs", "Blockchain"]
                                },
                                {
                                    title: "Placement Power Hub",
                                    link: "https://placement-power-hub.vercel.app/",
                                    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "React Query", "Recharts"]
                                },
                                {
                                    title: "Decentralized File Storage System",
                                    link: "https://decendata.vercel.app/",
                                    technologies: ["React.js", "Hardhat", "IPFS", "Pinata API", "Ethereum", "Solidity"]
                                }
                            ], null, 2),
                            component: "Projects"
                        },
                        "skills.txt": {
                            type: "file",
                            name: "skills.txt",
                            content: "Frontend: React, TypeScript, TailwindCSS\nBackend: Node.js, Express, PostgreSQL\nTools: Git, Docker, Linux",
                            component: "Skills"
                        },
                        "contact.md": {
                            type: "file",
                            name: "contact.md",
                            content: "Contact me at: amaurya.dev@gmail.com",
                            component: "Contact"
                        }
                    }
                }
            }
        }
    }
};
