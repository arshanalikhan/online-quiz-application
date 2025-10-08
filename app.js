// Quiz Application JavaScript

class QuizApp {
    constructor() {
        // Quiz data from provided JSON
        this.questions = [
            {
                "id": 1,
                "category": "Science",
                "question": "What is the chemical symbol for gold?",
                "options": ["Go", "Gd", "Au", "Ag"],
                "correct": 2,
                "explanation": "Gold's chemical symbol is Au, from the Latin word 'aurum'."
            },
            {
                "id": 2,
                "category": "Technology",
                "question": "Which programming language is primarily used for web development?",
                "options": ["Python", "JavaScript", "C++", "Java"],
                "correct": 1,
                "explanation": "JavaScript is the primary language for client-side web development."
            },
            {
                "id": 3,
                "category": "History",
                "question": "In which year did World War II end?",
                "options": ["1943", "1944", "1945", "1946"],
                "correct": 2,
                "explanation": "World War II ended in 1945 with the surrender of Japan."
            },
            {
                "id": 4,
                "category": "Geography",
                "question": "What is the capital of Australia?",
                "options": ["Sydney", "Melbourne", "Canberra", "Brisbane"],
                "correct": 2,
                "explanation": "Canberra is the capital city of Australia, not Sydney or Melbourne."
            },
            {
                "id": 5,
                "category": "Science",
                "question": "What is the speed of light in vacuum?",
                "options": ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
                "correct": 0,
                "explanation": "Light travels at approximately 300,000 kilometers per second in vacuum."
            },
            {
                "id": 6,
                "category": "Literature",
                "question": "Who wrote the novel '1984'?",
                "options": ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Isaac Asimov"],
                "correct": 1,
                "explanation": "George Orwell wrote the dystopian novel '1984' published in 1949."
            },
            {
                "id": 7,
                "category": "Mathematics",
                "question": "What is the value of π (pi) approximately?",
                "options": ["3.14159", "2.71828", "1.41421", "0.57721"],
                "correct": 0,
                "explanation": "Pi (π) is approximately 3.14159, the ratio of circumference to diameter."
            },
            {
                "id": 8,
                "category": "Biology",
                "question": "What is the powerhouse of the cell?",
                "options": ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
                "correct": 2,
                "explanation": "Mitochondria are called the powerhouse of the cell as they produce ATP energy."
            },
            {
                "id": 9,
                "category": "Physics",
                "question": "Who proposed the theory of relativity?",
                "options": ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Max Planck"],
                "correct": 1,
                "explanation": "Albert Einstein proposed both special and general theories of relativity."
            },
            {
                "id": 10,
                "category": "Chemistry",
                "question": "What is the most abundant gas in Earth's atmosphere?",
                "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                "correct": 2,
                "explanation": "Nitrogen makes up about 78% of Earth's atmosphere."
            },
            {
                "id": 11,
                "category": "Computer Science",
                "question": "What does HTML stand for?",
                "options": ["Hyperlink Text Markup Language", "HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language"],
                "correct": 1,
                "explanation": "HTML stands for HyperText Markup Language, used for web pages."
            },
            {
                "id": 12,
                "category": "Astronomy",
                "question": "Which planet is known as the Red Planet?",
                "options": ["Venus", "Jupiter", "Mars", "Saturn"],
                "correct": 2,
                "explanation": "Mars is called the Red Planet due to iron oxide on its surface."
            },
            {
                "id": 13,
                "category": "Art",
                "question": "Who painted the Mona Lisa?",
                "options": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                "correct": 2,
                "explanation": "Leonardo da Vinci painted the famous Mona Lisa during the Renaissance."
            },
            {
                "id": 14,
                "category": "Sports",
                "question": "How many players are on a basketball team on the court at one time?",
                "options": ["4", "5", "6", "7"],
                "correct": 1,
                "explanation": "Basketball teams have 5 players on the court at any given time."
            },
            {
                "id": 15,
                "category": "Music",
                "question": "How many strings does a standard guitar have?",
                "options": ["4", "5", "6", "7"],
                "correct": 2,
                "explanation": "A standard acoustic or electric guitar has 6 strings."
            }
        ];

        // Quiz settings
        this.settings = {
            totalTime: 600, // 10 minutes
            questionTime: 30, // 30 seconds per question
            passingScore: 70,
            questionCount: 10
        };

        // Quiz state
        this.currentQuestionIndex = 0;
        this.selectedQuestions = [];
        this.userAnswers = [];
        this.startTime = null;
        this.endTime = null;
        this.totalTimer = null;
        this.questionTimer = null;
        this.questionStartTime = null;

        // DOM elements
        this.screens = {
            welcome: document.getElementById('welcome-screen'),
            quiz: document.getElementById('quiz-screen'),
            results: document.getElementById('results-screen'),
            review: document.getElementById('review-screen')
        };

        this.elements = {
            startBtn: document.getElementById('start-quiz-btn'),
            questionCounter: document.getElementById('question-counter'),
            overallTimer: document.getElementById('overall-timer'),
            progressBar: document.getElementById('progress-bar'),
            questionCategory: document.getElementById('question-category'),
            questionTimer: document.getElementById('question-timer'),
            questionText: document.getElementById('question-text'),
            optionsContainer: document.getElementById('options-container'),
            skipBtn: document.getElementById('skip-btn'),
            feedbackModal: document.getElementById('feedback-modal'),
            feedbackContent: document.getElementById('feedback-content'),
            nextQuestionBtn: document.getElementById('next-question-btn'),
            scorePercentage: document.getElementById('score-percentage'),
            scoreFraction: document.getElementById('score-fraction'),
            performanceMessage: document.getElementById('performance-message'),
            timeTaken: document.getElementById('time-taken'),
            correctAnswers: document.getElementById('correct-answers'),
            incorrectAnswers: document.getElementById('incorrect-answers'),
            skippedQuestions: document.getElementById('skipped-questions'),
            bonusPoints: document.getElementById('bonus-points'),
            reviewAnswersBtn: document.getElementById('review-answers-btn'),
            retryQuizBtn: document.getElementById('retry-quiz-btn'),
            reviewContent: document.getElementById('review-content'),
            backToResultsBtn: document.getElementById('back-to-results-btn')
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('welcome');
    }

    bindEvents() {
        this.elements.startBtn.addEventListener('click', () => this.startQuiz());
        this.elements.skipBtn.addEventListener('click', () => this.skipQuestion());
        this.elements.nextQuestionBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.reviewAnswersBtn.addEventListener('click', () => this.showReview());
        this.elements.retryQuizBtn.addEventListener('click', () => this.resetQuiz());
        this.elements.backToResultsBtn.addEventListener('click', () => this.showScreen('results'));
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.add('hidden'));
        this.screens[screenName].classList.remove('hidden');
    }

    startQuiz() {
        this.resetQuizState();
        this.selectedQuestions = this.selectRandomQuestions();
        this.startTime = Date.now();
        this.showScreen('quiz');
        this.startTotalTimer();
        this.displayQuestion();
    }

    resetQuizState() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = null;
        this.endTime = null;
        this.clearTimers();
    }

    selectRandomQuestions() {
        const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, this.settings.questionCount);
    }

    startTotalTimer() {
        let timeLeft = this.settings.totalTime;
        this.updateTotalTimerDisplay(timeLeft);

        this.totalTimer = setInterval(() => {
            timeLeft--;
            this.updateTotalTimerDisplay(timeLeft);

            if (timeLeft <= 0) {
                this.endQuiz();
            }
        }, 1000);
    }

    updateTotalTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const timeString = `${minutes}:${secs.toString().padStart(2, '0')}`;
        this.elements.overallTimer.textContent = timeString;

        // Add warning classes
        const timerElement = this.elements.overallTimer;
        timerElement.classList.remove('warning', 'danger');
        
        if (seconds <= 60) {
            timerElement.classList.add('danger');
        } else if (seconds <= 120) {
            timerElement.classList.add('warning');
        }
    }

    startQuestionTimer() {
        let timeLeft = this.settings.questionTime;
        this.questionStartTime = Date.now();
        this.updateQuestionTimerDisplay(timeLeft);

        this.questionTimer = setInterval(() => {
            timeLeft--;
            this.updateQuestionTimerDisplay(timeLeft);

            if (timeLeft <= 0) {
                this.skipQuestion();
            }
        }, 1000);
    }

    updateQuestionTimerDisplay(seconds) {
        this.elements.questionTimer.textContent = seconds;

        // Add warning classes
        const timerElement = this.elements.questionTimer;
        timerElement.classList.remove('warning', 'danger');
        
        if (seconds <= 5) {
            timerElement.classList.add('danger');
        } else if (seconds <= 10) {
            timerElement.classList.add('warning');
        }
    }

    clearTimers() {
        if (this.totalTimer) {
            clearInterval(this.totalTimer);
            this.totalTimer = null;
        }
        if (this.questionTimer) {
            clearInterval(this.questionTimer);
            this.questionTimer = null;
        }
    }

    displayQuestion() {
        const question = this.selectedQuestions[this.currentQuestionIndex];
        
        // Update question counter and progress
        this.elements.questionCounter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.settings.questionCount}`;
        const progress = ((this.currentQuestionIndex + 1) / this.settings.questionCount) * 100;
        this.elements.progressBar.style.width = `${progress}%`;

        // Display question details
        this.elements.questionCategory.textContent = question.category;
        this.elements.questionText.textContent = question.question;

        // Create option buttons
        this.elements.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = this.createOptionButton(option, index);
            this.elements.optionsContainer.appendChild(button);
        });

        // Start question timer
        this.startQuestionTimer();
    }

    createOptionButton(text, index) {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.innerHTML = `
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${text}</span>
        `;
        
        button.addEventListener('click', () => this.selectAnswer(index));
        return button;
    }

    selectAnswer(selectedIndex) {
        const question = this.selectedQuestions[this.currentQuestionIndex];
        const responseTime = Date.now() - this.questionStartTime;
        const isCorrect = selectedIndex === question.correct;
        const isQuickAnswer = responseTime <= 15000; // 15 seconds

        // Record answer
        this.userAnswers.push({
            questionId: question.id,
            selectedIndex,
            isCorrect,
            responseTime,
            isQuickAnswer,
            skipped: false
        });

        // Stop question timer
        if (this.questionTimer) {
            clearInterval(this.questionTimer);
            this.questionTimer = null;
        }

        // Update option buttons visual state
        this.updateOptionButtons(selectedIndex, question.correct);

        // Show feedback
        this.showFeedback(isCorrect, question.explanation, isQuickAnswer);
    }

    updateOptionButtons(selectedIndex, correctIndex) {
        const buttons = this.elements.optionsContainer.querySelectorAll('.option-button');
        buttons.forEach((button, index) => {
            button.disabled = true;
            
            if (index === selectedIndex) {
                button.classList.add('selected');
                if (index !== correctIndex) {
                    button.classList.add('incorrect');
                }
            }
            
            if (index === correctIndex) {
                button.classList.add('correct');
            }
        });
    }

    showFeedback(isCorrect, explanation, isQuickAnswer) {
        let feedbackHTML = `
            <div class="feedback-status ${isCorrect ? 'correct' : 'incorrect'}">
                ${isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
            </div>
            <div class="feedback-explanation">${explanation}</div>
        `;

        if (isCorrect && isQuickAnswer) {
            feedbackHTML += `<div class="bonus-points">⚡ Quick Answer Bonus: +2 points!</div>`;
        }

        this.elements.feedbackContent.innerHTML = feedbackHTML;
        this.elements.feedbackModal.classList.remove('hidden');
    }

    nextQuestion() {
        this.elements.feedbackModal.classList.add('hidden');
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex >= this.settings.questionCount) {
            this.endQuiz();
        } else {
            this.displayQuestion();
        }
    }

    skipQuestion() {
        const question = this.selectedQuestions[this.currentQuestionIndex];
        
        // Record skipped answer
        this.userAnswers.push({
            questionId: question.id,
            selectedIndex: -1,
            isCorrect: false,
            responseTime: this.settings.questionTime * 1000,
            isQuickAnswer: false,
            skipped: true
        });

        // Stop question timer
        if (this.questionTimer) {
            clearInterval(this.questionTimer);
            this.questionTimer = null;
        }

        // Show correct answer
        this.updateOptionButtons(-1, question.correct);
        this.showFeedback(false, question.explanation, false);
    }

    endQuiz() {
        this.endTime = Date.now();
        this.clearTimers();
        this.calculateResults();
        this.showScreen('results');
    }

    calculateResults() {
        const correctAnswers = this.userAnswers.filter(answer => answer.isCorrect).length;
        const incorrectAnswers = this.userAnswers.filter(answer => !answer.isCorrect && !answer.skipped).length;
        const skippedAnswers = this.userAnswers.filter(answer => answer.skipped).length;
        const bonusPoints = this.userAnswers.filter(answer => answer.isCorrect && answer.isQuickAnswer).length * 2;
        
        const baseScore = (correctAnswers / this.settings.questionCount) * 100;
        const finalScore = Math.min(100, baseScore + bonusPoints);
        const timeTaken = Math.floor((this.endTime - this.startTime) / 1000);

        // Update results display
        this.elements.scorePercentage.textContent = `${Math.round(finalScore)}%`;
        this.elements.scoreFraction.textContent = `(${correctAnswers}/${this.settings.questionCount})`;
        this.elements.timeTaken.textContent = this.formatTime(timeTaken);
        this.elements.correctAnswers.textContent = correctAnswers;
        this.elements.incorrectAnswers.textContent = incorrectAnswers;
        this.elements.skippedQuestions.textContent = skippedAnswers;
        this.elements.bonusPoints.textContent = bonusPoints;

        // Performance message
        const performanceMessage = this.getPerformanceMessage(finalScore);
        this.elements.performanceMessage.textContent = performanceMessage.text;
        this.elements.performanceMessage.className = `performance-message ${performanceMessage.class}`;
    }

    getPerformanceMessage(score) {
        if (score >= 90) {
            return { text: "🌟 Excellent! Outstanding performance!", class: "excellent" };
        } else if (score >= 80) {
            return { text: "🎉 Great job! Very good results!", class: "good" };
        } else if (score >= 70) {
            return { text: "👍 Good work! You passed the quiz!", class: "good" };
        } else if (score >= 50) {
            return { text: "📚 Not bad, but there's room for improvement.", class: "average" };
        } else {
            return { text: "💪 Keep practicing! You'll do better next time.", class: "poor" };
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    showReview() {
        this.elements.reviewContent.innerHTML = '';
        
        this.userAnswers.forEach((answer, index) => {
            const question = this.selectedQuestions[index];
            const reviewItem = this.createReviewItem(question, answer, index);
            this.elements.reviewContent.appendChild(reviewItem);
        });

        this.showScreen('review');
    }

    createReviewItem(question, answer, index) {
        const div = document.createElement('div');
        const statusClass = answer.skipped ? 'skipped' : (answer.isCorrect ? 'correct' : 'incorrect');
        div.className = `review-item ${statusClass}`;

        let userAnswerText = '';
        let statusIcon = '';
        
        if (answer.skipped) {
            userAnswerText = 'Skipped';
            statusIcon = '⏭️';
        } else {
            userAnswerText = question.options[answer.selectedIndex];
            statusIcon = answer.isCorrect ? '✅' : '❌';
        }

        const bonusText = answer.isCorrect && answer.isQuickAnswer ? 
            '<span class="bonus-points">⚡ Quick Answer Bonus</span>' : '';

        div.innerHTML = `
            <div class="review-question-header">
                <span class="review-question-number">${statusIcon} Question ${index + 1}</span>
                <span class="review-question-category">${question.category}</span>
            </div>
            <div class="review-question-text">${question.question}</div>
            <div class="review-answers">
                <div class="review-answer user-answer ${answer.isCorrect ? '' : 'incorrect'}">
                    Your answer: ${userAnswerText}
                </div>
                <div class="review-answer correct-answer">
                    Correct answer: ${question.options[question.correct]}
                </div>
            </div>
            <div class="review-explanation">${question.explanation}</div>
            ${bonusText}
        `;

        return div;
    }

    resetQuiz() {
        this.showScreen('welcome');
    }
}

// Initialize the quiz application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});