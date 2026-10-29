/**
 * LearnHub LMS - Single Page Application Core Controller
 */

// Initial Sample Data Payload
const INITIAL_DATA = {
    user: {
        name: "Kaushal Kumar",
        email: "kaushalkr00045@learnhub.edu",
        major: "Computer Science & Engineering",
        goal: "Full-Stack Web Development & Data Science Mastery",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    },
    courses: [
        {
            id: "web-bootcamp",
            title: "Complete Web Development Bootcamp",
            category: "web",
            instructor: "Alex Johnson",
            thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500",
            enrolled: true,
            progress: 75,
            lessons: [
                { title: "HTML5 Semantic Elements & Structure", completed: true },
                { title: "CSS3 Flexbox and Grid Layouts", completed: true },
                { title: "JavaScript ES6+ Core & DOM Manipulation", completed: true },
                { title: "Asynchronous JS, Fetch API & Promises", completed: false }
            ]
        },
        {
            id: "python-data",
            title: "Python for Data Analysis & Pandas",
            category: "python",
            instructor: "Dr. Sarah Lee",
            thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500",
            enrolled: true,
            progress: 40,
            lessons: [
                { title: "Python Fundamentals & Syntax", completed: true },
                { title: "NumPy Arrays and Data Operations", completed: true },
                { title: "Data Wrangling with Pandas", completed: false },
                { title: "Data Visualization with Matplotlib", completed: false }
            ]
        },
        {
            id: "mysql-db",
            title: "MySQL Database Design & Advanced SQL",
            category: "db",
            instructor: "Michael Chang",
            thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500",
            enrolled: true,
            progress: 90,
            lessons: [
                { title: "Relational Database Concepts", completed: true },
                { title: "SQL Joins and Complex Queries", completed: true },
                { title: "Database Indexing and Performance", completed: true },
                { title: "Stored Procedures and Triggers", completed: false }
            ]
        },
        {
            id: "ai-intro",
            title: "Introduction to AI & Machine Learning",
            category: "ai",
            instructor: "Prof. Elena Rostova",
            thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500",
            enrolled: true,
            progress: 20,
            lessons: [
                { title: "Understanding Artificial Intelligence Concepts", completed: true },
                { title: "Supervised vs Unsupervised Learning", completed: false },
                { title: "Building your first Neural Network", completed: false }
            ]
        }
    ],
    assignments: [
        { id: 1, title: "Build a Portfolio Site", course: "Web Bootcamp", due: "Oct 28, 2026", status: "Submitted" },
        { id: 2, title: "MySQL Normalization Project", course: "MySQL Database", due: "Oct 31, 2026", status: "Pending" },
        { id: 3, title: "Pandas Exploratory Analysis", course: "Python Data", due: "Nov 05, 2026", status: "Pending" }
    ],
    quizQuestions: [
        {
            q: "Which HTML5 element is best used to encapsulate a standalone, reusable piece of content?",
            options: ["<section>", "<article>", "<div>", "<aside>"],
            correct: 1
        },
        {
            q: "What does CSS 'box-sizing: border-box' do?",
            options: [
                "Adds borders inside the padding",
                "Includes padding and border in element's total width and height",
                "Fixes margin collapse issues",
                "Centers elements horizontally"
            ],
            correct: 1
        },
        {
            q: "Which JavaScript array method creates a new array populated with the results of calling a provided function?",
            options: ["forEach()", "filter()", "map()", "reduce()"],
            correct: 2
        },
        {
            q: "In SQL, which keyword is used to sort the result set?",
            options: ["SORT BY", "GROUP BY", "ORDER BY", "ALIGN BY"],
            correct: 2
        },
        {
            q: "What is the primary function of local/session storage in browsers?",
            options: [
                "Run background server threads",
                "Store key-value pairs locally in client browser",
                "Encrypt web socket traffic",
                "Compress image assets dynamically"
            ],
            correct: 1
        }
    ]
};

// Global State Initializer
let appData = JSON.parse(localStorage.getItem('learnhub_data')) || INITIAL_DATA;

function saveData() {
    localStorage.setItem('learnhub_data', JSON.stringify(appData));
}

// App Controller Initialization
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeToggle();
    initUserProfile();
    renderDashboard();
    renderCourseLibrary();
    renderMyCourses();
    initQuizEngine();
    renderAssignments();
    renderProgress();
    initChart();
    initSearch();
});

// Toast System
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-teal"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Navigation Handler
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.spa-view');
    const sidebar = document.getElementById('sidebar');

    function switchView(viewName) {
        views.forEach(v => v.classList.remove('active'));
        navItems.forEach(n => n.classList.remove('active'));

        const targetView = document.getElementById(`view-${viewName}`);
        if(targetView) targetView.classList.add('active');

        const activeNavItem = document.querySelector(`.nav-item[data-view="${viewName}"]`);
        if(activeNavItem) activeNavItem.classList.add('active');

        sidebar.classList.remove('open');
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            switchView(view);
        });
    });

    document.querySelectorAll('[data-navigate]').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.getAttribute('data-navigate')));
    });

    // Mobile Drawer Controls
    document.getElementById('openSidebar').addEventListener('click', () => sidebar.classList.add('open'));
    document.getElementById('closeSidebar').addEventListener('click', () => sidebar.classList.remove('open'));

    // Top Dropdowns
    const profileBtn = document.getElementById('profileDropdownBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('hidden');
    });

    const notifBtn = document.getElementById('notificationBtn');
    const notifDropdown = document.getElementById('notificationDropdown');
    notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
        profileDropdown.classList.add('hidden');
        notifDropdown.classList.add('hidden');
    });

    document.getElementById('markAllReadBtn').addEventListener('click', () => {
        document.querySelectorAll('.notif-list li').forEach(li => li.classList.remove('unread'));
        document.getElementById('notifBadge').textContent = '0';
        showToast("Notifications marked as read.");
    });

    document.getElementById('resetDemoBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('learnhub_data');
        appData = INITIAL_DATA;
        saveData();
        location.reload();
    });
}

// Dark/Light Theme System
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const isDark = localStorage.getItem('learnhub_theme') === 'dark';

    if (isDark) {
        document.body.classList.replace('light-mode', 'dark-mode');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('learnhub_theme', 'dark');
            showToast("Dark mode activated");
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('learnhub_theme', 'light');
            showToast("Light mode activated");
        }
    });
}

// Dynamic Profile Handler
function initUserProfile() {
    function updateUI() {
        document.getElementById('headerUserName').textContent = appData.user.name;
        document.getElementById('greetingUser').textContent = `Hello, ${appData.user.name.split(' ')[0]} 👋`;
        document.getElementById('headerAvatar').src = appData.user.avatar;
        document.getElementById('profileFormAvatar').src = appData.user.avatar;
        document.getElementById('profileDisplayName').textContent = appData.user.name;
        document.getElementById('profileDisplayMajor').textContent = appData.user.major;
        document.getElementById('certStudentName').textContent = appData.user.name;

        document.getElementById('inputName').value = appData.user.name;
        document.getElementById('inputEmail').value = appData.user.email;
        document.getElementById('inputMajor').value = appData.user.major;
        document.getElementById('inputGoal').value = appData.user.goal;
    }

    updateUI();

    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        appData.user.name = document.getElementById('inputName').value;
        appData.user.email = document.getElementById('inputEmail').value;
        appData.user.major = document.getElementById('inputMajor').value;
        appData.user.goal = document.getElementById('inputGoal').value;
        saveData();
        updateUI();
        showToast("Profile settings saved!");
    });
}

// Dashboard Renderer
function renderDashboard() {
    const enrolledCount = appData.courses.filter(c => c.enrolled).length;
    let completedLessons = 0;
    appData.courses.forEach(c => {
        if(c.enrolled) completedLessons += c.lessons.filter(l => l.completed).length;
    });

    document.getElementById('statEnrolled').textContent = enrolledCount;
    document.getElementById('statLessons').textContent = completedLessons;

    const grid = document.getElementById('continueLearningGrid');
    grid.innerHTML = '';

    appData.courses.filter(c => c.enrolled).forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-thumb" style="background-image: url('${course.thumbnail}')">
                <div class="course-thumb-overlay"></div>
                <span class="course-cat-badge">${course.category.toUpperCase()}</span>
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <p class="instructor-text">Instructor: ${course.instructor}</p>
                <div class="progress-section">
                    <div class="progress-meta">
                        <span>Progress</span>
                        <span>${course.progress}%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${course.progress}%"></div>
                    </div>
                    <button class="btn btn-secondary btn-sm mt-4 w-100" data-navigate="my-courses">Continue Learning</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Course Library Filter & Renderer
function renderCourseLibrary() {
    const grid = document.getElementById('libraryGrid');
    
    function render(category = 'all') {
        grid.innerHTML = '';
        const list = category === 'all' ? appData.courses : appData.courses.filter(c => c.category === category);

        list.forEach(c => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <div class="course-thumb" style="background-image: url('${c.thumbnail}')">
                    <div class="course-thumb-overlay"></div>
                    <span class="course-cat-badge">${c.category.toUpperCase()}</span>
                </div>
                <div class="course-content">
                    <h3>${c.title}</h3>
                    <p class="instructor-text">Instructor: ${c.instructor}</p>
                    <button class="btn ${c.enrolled ? 'btn-secondary' : 'btn-primary'} btn-sm mt-4 enroll-btn" data-id="${c.id}">
                        ${c.enrolled ? 'Enrolled' : 'Enroll Now'}
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

        document.querySelectorAll('.enroll-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const targetCourse = appData.courses.find(c => c.id === id);
                targetCourse.enrolled = !targetCourse.enrolled;
                saveData();
                render(category);
                renderDashboard();
                renderMyCourses();
                showToast(targetCourse.enrolled ? `Enrolled in ${targetCourse.title}` : `Unenrolled from course`);
            });
        });
    }

    render();

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            render(btn.getAttribute('data-category'));
        });
    });
}

// Interactive My Courses View
function renderMyCourses() {
    const container = document.getElementById('myCoursesList');
    container.innerHTML = '';

    const enrolledList = appData.courses.filter(c => c.enrolled);
    if(enrolledList.length === 0) {
        container.innerHTML = `<div class="card"><p>No courses enrolled. Browse the Course Library to enroll!</p></div>`;
        return;
    }

    enrolledList.forEach(c => {
        const row = document.createElement('div');
        row.className = 'card my-course-row';
        row.innerHTML = `
            <div class="my-course-row-thumb" style="background-image: url('${c.thumbnail}')"></div>
            <div class="my-course-row-info">
                <h2>${c.title}</h2>
                <p class="text-muted">Instructor: ${c.instructor}</p>
                <div class="progress-meta mt-2">
                    <span>Course Completion</span>
                    <span>${c.progress}%</span>
                </div>
                <div class="progress-bar-bg mt-2"><div class="progress-bar-fill" style="width: ${c.progress}%"></div></div>
                
                <h4 class="mt-4">Course Lessons:</h4>
                <ul class="lessons-list">
                    ${c.lessons.map((l, index) => `
                        <li class="lesson-item ${l.completed ? 'completed' : ''}">
                            <span><i class="fa-solid ${l.completed ? 'fa-circle-check text-teal' : 'fa-circle-notch'}"></i> ${l.title}</span>
                            <button class="toggle-lesson-btn" data-course="${c.id}" data-lesson="${index}">
                                ${l.completed ? 'Mark Undone' : 'Mark Complete'}
                            </button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        container.appendChild(row);
    });

    document.querySelectorAll('.toggle-lesson-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseId = e.target.getAttribute('data-course');
            const lessonIdx = parseInt(e.target.getAttribute('data-lesson'));
            const course = appData.courses.find(c => c.id === courseId);

            course.lessons[lessonIdx].completed = !course.lessons[lessonIdx].completed;

            // Recalculate progress percentage
            const completedCount = course.lessons.filter(l => l.completed).length;
            course.progress = Math.round((completedCount / course.lessons.length) * 100);

            saveData();
            renderMyCourses();
            renderDashboard();
            renderProgress();
            showToast("Lesson progress updated!");
        });
    });
}

// Interactive Quiz Engine System
function initQuizEngine() {
    const startBtn = document.getElementById('startQuizBtn');
    const startState = document.getElementById('quizStartState');
    const activeState = document.getElementById('quizActiveState');
    const resultsState = document.getElementById('quizResultsState');
    const nextBtn = document.getElementById('nextQuizBtn');

    let currentQ = 0;
    let score = 0;
    let selectedOption = null;
    let timerInterval = null;
    let timeLeft = 180;

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
            const secs = String(timeLeft % 60).padStart(2, '0');
            document.getElementById('timerDisplay').textContent = `${mins}:${secs}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                finishQuiz();
            }
        }, 1000);
    }

    function loadQuestion() {
        const qData = appData.quizQuestions[currentQ];
        document.getElementById('quizProgressText').textContent = `Question ${currentQ + 1} of ${appData.quizQuestions.length}`;
        document.getElementById('questionTitle').textContent = qData.q;
        
        const optionsList = document.getElementById('quizOptionsList');
        optionsList.innerHTML = '';
        selectedOption = null;
        nextBtn.disabled = true;

        qData.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.quiz-opt-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedOption = idx;
                nextBtn.disabled = false;
            });
            optionsList.appendChild(btn);
        });
    }

    startBtn.addEventListener('click', () => {
        currentQ = 0;
        score = 0;
        timeLeft = 180;
        startState.classList.add('hidden');
        resultsState.classList.add('hidden');
        activeState.classList.remove('hidden');
        loadQuestion();
        startTimer();
    });

    nextBtn.addEventListener('click', () => {
        if (selectedOption === appData.quizQuestions[currentQ].correct) score++;
        currentQ++;
        if (currentQ < appData.quizQuestions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    });

    function finishQuiz() {
        clearInterval(timerInterval);
        activeState.classList.add('hidden');
        resultsState.classList.remove('hidden');

        const percentage = Math.round((score / appData.quizQuestions.length) * 100);
        document.getElementById('resScore').textContent = `${score}/${appData.quizQuestions.length}`;
        document.getElementById('resPercent').textContent = `${percentage}%`;
        document.getElementById('resStatus').textContent = percentage >= 60 ? 'PASSED' : 'FAILED';
        document.getElementById('resStatus').style.color = percentage >= 60 ? '#10B981' : '#EF4444';

        showToast(`Quiz completed! Final Score: ${percentage}%`);
    }

    document.getElementById('restartQuizBtn').addEventListener('click', () => {
        resultsState.classList.add('hidden');
        startState.classList.remove('hidden');
    });
}

// Assignment Submission Handler
function renderAssignments() {
    const tbody = document.getElementById('assignmentsTableBody');
    tbody.innerHTML = '';

    appData.assignments.forEach(a => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${a.title}</strong></td>
            <td>${a.course}</td>
            <td>${a.due}</td>
            <td><span class="badge ${a.status === 'Submitted' ? 'bg-teal-light text-teal' : 'bg-amber-light text-amber'}">${a.status}</span></td>
            <td>
                ${a.status === 'Pending' ? 
                    `<button class="btn btn-primary btn-sm submit-assign-btn" data-id="${a.id}">Submit Work</button>` : 
                    `<span class="text-muted"><i class="fa-solid fa-check-double"></i> Completed</span>`}
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.querySelectorAll('.submit-assign-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const targetAssignment = appData.assignments.find(a => a.id === id);
            targetAssignment.status = 'Submitted';
            saveData();
            renderAssignments();
            showToast("Assignment submitted successfully!");
        });
    });
}

// Analytics and Progress Renderer
function renderProgress() {
    let totalProgress = 0;
    const enrolled = appData.courses.filter(c => c.enrolled);
    enrolled.forEach(c => totalProgress += c.progress);
    const avgProgress = enrolled.length > 0 ? Math.round(totalProgress / enrolled.length) : 0;

    document.getElementById('overallProgressText').textContent = `${avgProgress}%`;
    document.getElementById('overallProgressBar').style.width = `${avgProgress}%`;
}

// Chart.js Visualization Integration
function initChart() {
    const ctx = document.getElementById('activityChart');
    if(!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Study Hours',
                data: [2.5, 3.8, 1.5, 4.2, 2.0, 5.0, 3.2],
                backgroundColor: '#14B8A6',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

// Global Search
function initSearch() {
    const searchInput = document.getElementById('globalSearch');
    const resultsBox = document.getElementById('searchResults');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if(!query) {
            resultsBox.classList.add('hidden');
            return;
        }

        const matches = appData.courses.filter(c => c.title.toLowerCase().includes(query) || c.category.toLowerCase().includes(query));
        
        resultsBox.innerHTML = '';
        if(matches.length === 0) {
            resultsBox.innerHTML = `<div class="search-result-item text-muted">No courses found matching "${query}"</div>`;
        } else {
            matches.forEach(m => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `<strong>${m.title}</strong> <small class="text-muted">(${m.category})</small>`;
                item.addEventListener('click', () => {
                    resultsBox.classList.add('hidden');
                    searchInput.value = '';
                    document.querySelector('.nav-item[data-view="course-library"]').click();
                });
                resultsBox.appendChild(item);
            });
        }
        resultsBox.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
        if(!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
            resultsBox.classList.add('hidden');
        }
    });
}