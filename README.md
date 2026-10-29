# 🎓 LearnHub – Student Learning Management System (LMS)

**LearnHub** is a modern, responsive Student Learning Management System designed to help students organize their learning activities in one place. It provides an interactive dashboard to explore courses, track lesson completion, take timed quizzes, manage assignments, and monitor learning progress.

This project is developed using **HTML5, CSS3, and Vanilla JavaScript**, with Chart.js for learning activity visualization.

## ✨ Features

- **Interactive Dashboard:** View enrolled courses, completed lessons, learning activities, and progress.
- **Course Library:** Browse courses in Web Development, Python & Data Science, Databases, and AI & Machine Learning.
- **Course Enrollment:** Enroll in or unenroll from available courses.
- **My Courses:** Track course progress and mark lessons as completed or incomplete.
- **Quiz & Assessment:** Attempt a timed quiz with multiple-choice questions, automatic scoring, and pass/fail results.
- **Assignments Management:** View assignment deadlines and update demo submission statuses.
- **Learning Analytics:** View overall course completion and weekly study activity charts.
- **Student Profile:** Edit and save profile information.
- **Dark Mode:** Switch between light and dark themes.
- **Global Search:** Search courses by title or category.
- **Notifications:** View notifications and mark them as read.
- **Responsive Design:** Sidebar navigation adapts to smaller screens.
- **Local Storage:** Save supported profile changes, enrollment details, lesson progress, assignments, and theme preferences in the browser.
- **Modern UI:** Teal and blue color palette, card-based layouts, icons, transitions, and toast notifications.

## 🛠️ Technologies Used

| Technology            | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| HTML5                 | Website structure and content                       |
| CSS3                  | Styling, responsive layouts, animations, and themes |
| JavaScript            | Interactive features and application logic          |
| Chart.js              | Weekly learning activity chart                      |
| Font Awesome          | Icons and visual elements                           |
| Google Fonts          | Plus Jakarta Sans typography                        |
| Browser Local Storage | Saving demo application data                        |

## 📂 Project Structure

```text
LearnHub/
│
├── index.html      # Main website structure
├── style.css       # Styling and responsive design
├── script.js       # Application logic and interactions
└── README.md       # Project documentation
```

## 🚀 Getting Started

### Prerequisites

You need a modern web browser and a code editor such as Visual Studio Code.

### Installation

**Step 1: Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/LearnHub.git
```

Replace `YOUR-USERNAME` with your GitHub username.

**Step 2: Open the project folder**

```bash
cd LearnHub
```

**Step 3: Open the project**

Open the folder in Visual Studio Code and ensure that `index.html`, `style.css`, and `script.js` are in the same directory.

**Step 4: Run the website**

Install the Live Server extension in VS Code, right-click `index.html`, and select **Open with Live Server**.

You can also open `index.html` directly in your browser for basic testing.

> **Note:** An internet connection is needed for externally hosted Google Fonts, Font Awesome, Chart.js, and Unsplash images.

## 📖 How to Use

1. Open the LearnHub website.
2. Explore the dashboard and view the sample learning statistics.
3. Navigate to **Course Library** to browse and enroll in courses.
4. Open **My Courses** to mark lessons as completed and track progress.
5. Go to **Quiz & Assessment** to attempt the timed programming quiz.
6. Visit **Assignments** to view deadlines and test the demo submission workflow.
7. Open **My Progress** to view course completion statistics and the certificate preview.
8. Use **Profile** to update your demo student information.
9. Switch between light and dark modes using the sidebar toggle.

## 📸 Screenshots

Add screenshots of your running project to a `screenshots/` folder and include them here.

Suggested screenshots:

- Dashboard
- Course Library
- My Cours es
- Quiz & Assessment
- Learning Progress
- Assignments
- Student Profile
- Dark Mode

Example Markdown:

```markdown
![LearnHub Dashboard](screenshots/dashboard.png)

![Course Library](screenshots/course-library.png)

![Quiz Assessment](screenshots/quiz.png)
```

## 💾 Data Storage

LearnHub uses the browser's `localStorage` to retain supported demo data between page reloads.

The application stores information such as:

- Student profile updates
- Course enrollment status
- Lesson completion status
- Assignment submission status
- Theme preference

Data is stored in the current browser on the current device. It is not synchronized between users or devices.

## 🔒 Project Limitations

- This is a front-end demonstration project.
- No backend server or database is connected.
- There is no real user authentication or multi-user account system.
- Course content, assignments, notifications, and quiz questions use sample data.
- Assignment submission updates the demonstration status; it does not upload files to a server.
- The certificate is a preview and does not represent an independently verified credential.
- Course enrollment and progress are not synchronized with a learning management server.

## 🎯 Learning Objectives

This project demonstrates practical knowledge of:

- Semantic HTML and page structure
- CSS variables, Flexbox, Grid, and responsive design
- JavaScript DOM manipulation and event handling
- Dynamic rendering of course cards and assignment tables
- Arrays, objects, and application state management
- Timers and quiz score calculation
- Browser Local Storage
- Chart.js integration
- Single-page application-style navigation
- User interface design and usability

## 🔮 Future Enhancements

- Backend integration using Node.js and Express
- Database integration using MySQL or MongoDB
- Secure student registration and login
- Real course videos and downloadable learning materials
- File upload functionality for assignments
- Instructor and administrator dashboards
- Quiz history and detailed performance reports
- Real certificate generation and verification
- Cloud-based data synchronization

## 👨‍💻 Author

**Kaushal Kumar**

Student Project | LearnHub LMS

## 📄 License

This project is intended for educational and learning purposes. If you plan to distribute or reuse third-party images, icons, fonts, or libraries, check their respective licenses and attribution requirements.

---

⭐ **If you find this project useful, consider giving the repository a star on GitHub!**
