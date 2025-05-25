const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.makeResume = async (req, res) => {
    try {
        const outputPath = path.join(__dirname, "../output/resume_demo.pdf");

        // Create a new PDF document
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        // Simulating template placeholders with static demo values
        const userData = {
            USER_NAME: "John Doe",
            USER_POSITION: "Software Engineer",
            USER_ADDRESS: "123 Street, New York",
            USER_CONTACT: "+91 9876543210",
            USER_EMAIL: "johndoe@example.com",
            USER_LINKED: "linkedin.com/in/johndoe",
            USER_PROFESSIONAL_SUMMARY: "Experienced software engineer skilled in full-stack development.",
            USER_SKILL_HEADING1: "Programming",
            USER_SKILLS_01: "JavaScript, Python, C++",
            USER_SKILL_HEADING2: "Web Development",
            USER_SKILLS_02: "Node.js, React.js, Django",
            USER_SKILL_HEADING3: "Databases",
            USER_SKILLS_03: "MongoDB, MySQL",
            WE1_USER_COMPANY_NAME: "ABC Tech",
            WE1_USER_COMPANY_ADDRESS: "NY, USA",
            WE1_USER_WORK_POSITION: "Backend Developer",
            WE1_DOJ: "Jan",
            WE1_MOJ: "2021",
            WE1_YOJ: "2021",
            WE1_DOC: "Dec",
            WE1_MOC: "2023",
            WE1_YOC: "2023",
            WE1_WORK_DETAILS: "Developed REST APIs, optimized database queries, and implemented security features.",
            PRJ1_NAME: "E-Commerce Platform",
            PRJ1_YEAR: "2022",
            PRJ1_DETAILS: "Built a full-stack e-commerce site with authentication and payment integration.",
            PRJ2_NAME: "Chat Application",
            PRJ2_YEAR: "2021",
            PRJ2_DETAILS: "Developed a real-time chat app using WebSockets and Node.js.",
            USER_ACH1: "Winner of National Coding Championship 2022",
            USER_ACH2: "Published research paper on cloud computing in IEEE",
            UG_COURSE: "B.Tech in Computer Science",
            UG_BYEAR: "2018",
            UG_EYEAR: "2022",
            UG_COLLEGE_NAME: "XYZ University",
            UG_COLLLEGE_ADDRESS: "California, USA",
            PG_COURSE: "M.Tech in AI & ML",
            PG_BYEAR: "2023",
            PG_EYEAR: "2025",
            PG_COLLEGE_NAME: "ABC Institute",
            PG_COLLLEGE_ADDRESS: "Boston, USA"
        };

        // Header
        doc.fontSize(20).text(userData.USER_NAME, { align: "center" });
        doc.fontSize(14).text(`${userData.USER_POSITION} • ${userData.USER_ADDRESS}`, { align: "center" });
        doc.text(`${userData.USER_CONTACT} • ${userData.USER_EMAIL} • ${userData.USER_LINKED}`, { align: "center" });
        doc.moveDown(1.5);

        // Section: Professional Summary
        doc.fontSize(16).text("PROFESSIONAL SUMMARY", { underline: true });
        doc.fontSize(12).text(userData.USER_PROFESSIONAL_SUMMARY);
        doc.moveDown(1);

        // Section: Skills
        doc.fontSize(16).text("SKILLS", { underline: true });
        doc.fontSize(12).text(`${userData.USER_SKILL_HEADING1}: ${userData.USER_SKILLS_01}`);
        doc.text(`${userData.USER_SKILL_HEADING2}: ${userData.USER_SKILLS_02}`);
        doc.text(`${userData.USER_SKILL_HEADING3}: ${userData.USER_SKILLS_03}`);
        doc.moveDown(1);

        // Section: Work Experience
        doc.fontSize(16).text("WORK EXPERIENCE", { underline: true });
        doc.fontSize(14).text(`${userData.WE1_USER_COMPANY_NAME}, ${userData.WE1_USER_COMPANY_ADDRESS}`);
        doc.fontSize(12).text(`${userData.WE1_USER_WORK_POSITION} (${userData.WE1_DOJ}/${userData.WE1_MOJ}/${userData.WE1_YOJ} – ${userData.WE1_DOC}/${userData.WE1_MOC}/${userData.WE1_YOC})`);
        doc.text(userData.WE1_WORK_DETAILS);
        doc.moveDown(1);

        // Section: Projects
        doc.fontSize(16).text("PROJECTS", { underline: true });
        doc.fontSize(14).text(`${userData.PRJ1_NAME} (${userData.PRJ1_YEAR})`);
        doc.fontSize(12).text(userData.PRJ1_DETAILS);
        doc.moveDown(0.5);
        doc.fontSize(14).text(`${userData.PRJ2_NAME} (${userData.PRJ2_YEAR})`);
        doc.fontSize(12).text(userData.PRJ2_DETAILS);
        doc.moveDown(1);

        // Section: Achievements
        doc.fontSize(16).text("ACHIEVEMENTS", { underline: true });
        doc.fontSize(12).text(`✔ ${userData.USER_ACH1}`);
        doc.text(`✔ ${userData.USER_ACH2}`);
        doc.moveDown(1);

        // Section: Education
        doc.fontSize(16).text("EDUCATION", { underline: true });
        doc.fontSize(14).text(`${userData.UG_COURSE}, ${userData.UG_BYEAR} – ${userData.UG_EYEAR}`);
        doc.fontSize(12).text(`(${userData.UG_COLLEGE_NAME}, ${userData.UG_COLLLEGE_ADDRESS})`);
        doc.moveDown(0.5);
        doc.fontSize(14).text(`${userData.PG_COURSE}, ${userData.PG_BYEAR} – ${userData.PG_EYEAR}`);
        doc.fontSize(12).text(`(${userData.PG_COLLEGE_NAME}, ${userData.PG_COLLLEGE_ADDRESS})`);

        doc.end(); // Finalize PDF

        // Send the PDF file after it is created
        stream.on("finish", () => {
            res.download(outputPath); // Send file to Postman
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating resume PDF");
    }
};
