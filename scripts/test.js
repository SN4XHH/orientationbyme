// Test JavaScript - Gestion du test de personnalité
// Test de Personnalité Professionnelle - Version Simplifiée (20 questions)

class PersonalityTest {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.totalQuestions = 20;
        this.testData = this.initializeTestData();
        
        this.init();
    }

    init() {
        // TOUJOURS recommencer depuis la première question
        this.currentQuestion = 0;
        this.answers = {};
        App.clearLocalStorage('personalityTestProgress'); // Supprimer toute sauvegarde
        
        this.setupEventListeners();
        this.loadQuestion();
        this.updateProgress();
    }

    // Initialisation des données du test - Version simplifiée (20 questions)
    initializeTestData() {
        return {
            questions: [
                // Questions 1-4: Leadership & Management
                {
                    id: 1,
                    category: 'leadership',
                    text: "Ton équipe fait face à un problème urgent. Que fais-tu ?",
                    dimension: 'extraversion',
                    options: [
                        "Je prends les devants et organise rapidement les tâches",
                        "Je propose une idée originale pour résoudre le problème",
                        "J'encourage les autres à garder leur calme et à communiquer",
                        "J'analyse les causes avant d'agir"
                    ]
                },
                {
                    id: 2,
                    category: 'leadership',
                    text: "Tu dois prendre une décision importante qui affecte toute l'équipe. Comment procèdes-tu ?",
                    dimension: 'conscientiousness',
                    options: [
                        "Je consulte rapidement l'équipe puis je décide",
                        "Je prends la décision seule et j'assume les conséquences",
                        "J'organise une réunion pour discuter avec tout le monde",
                        "J'étudie tous les détails avant de choisir"
                    ]
                },
                {
                    id: 3,
                    category: 'leadership',
                    text: "Deux membres de ton équipe sont en conflit. Comment gères-tu la situation ?",
                    dimension: 'agreeableness',
                    options: [
                        "Je prends une décision rapide pour mettre fin au conflit",
                        "Je propose une solution créative qui satisfait les deux parties",
                        "J'organise une médiation pour comprendre les deux points de vue",
                        "J'analyse les causes du conflit avant d'intervenir"
                    ]
                },
                {
                    id: 4,
                    category: 'leadership',
                    text: "Une opportunité risquée mais prometteuse se présente. Que fais-tu ?",
                    dimension: 'openness',
                    options: [
                        "Je saisis l'opportunité immédiatement, quitte à ajuster après",
                        "Je propose une approche innovante pour minimiser les risques",
                        "Je consulte l'équipe pour voir qui est prêt à prendre le risque",
                        "J'évalue soigneusement tous les risques avant de décider"
                    ]
                },

                // Questions 5-8: Analyse & Résolution de Problèmes
                {
                    id: 5,
                    category: 'analytical',
                    text: "Tu reçois un rapport avec des données complexes. Comment procèdes-tu ?",
                    dimension: 'conscientiousness',
                    options: [
                        "Je commence par identifier les points clés",
                        "Je cherche des patterns et des connexions inattendues",
                        "Je partage mes premières impressions avec l'équipe",
                        "Je lis méthodiquement chaque section dans l'ordre"
                    ]
                },
                {
                    id: 6,
                    category: 'analytical',
                    text: "Un problème récurrent apparaît dans ton travail. Comment l'abordes-tu ?",
                    dimension: 'openness',
                    options: [
                        "Je cherche immédiatement une solution définitive",
                        "Je propose une approche complètement nouvelle",
                        "Je demande l'avis de mes collègues sur le problème",
                        "J'analyse les causes profondes avant d'agir"
                    ]
                },
                {
                    id: 7,
                    category: 'analytical',
                    text: "Tu dois apprendre une nouvelle technologie complexe. Quelle est ta approche ?",
                    dimension: 'conscientiousness',
                    options: [
                        "Je suis les tutoriels étape par étape",
                        "Je teste directement pour comprendre par moi-même",
                        "Je trouve quelqu'un qui peut m'expliquer",
                        "Je commence par comprendre la théorie avant la pratique"
                    ]
                },
                {
                    id: 8,
                    category: 'analytical',
                    text: "Tu dois organiser une grande quantité d'informations. Quelle est ta stratégie ?",
                    dimension: 'conscientiousness',
                    options: [
                        "Je crée immédiatement une structure claire",
                        "Je cherche des liens créatifs entre les informations",
                        "Je demande à l'équipe comment elle préfère organiser",
                        "Je commence par catégoriser logiquement les informations"
                    ]
                },

                // Questions 9-12: Créativité & Innovation
                {
                    id: 9,
                    category: 'creative',
                    text: "Tu dois proposer une idée pour un nouveau projet. Comment procèdes-tu ?",
                    dimension: 'openness',
                    options: [
                        "Je propose plusieurs idées originales et audacieuses",
                        "Je cherche l'inspiration dans des domaines différents",
                        "Je consulte l'équipe pour des idées collaboratives",
                        "J'analyse les besoins avant de proposer des solutions"
                    ]
                },
                {
                    id: 10,
                    category: 'creative',
                    text: "Une approche traditionnelle ne fonctionne plus. Que fais-tu ?",
                    dimension: 'openness',
                    options: [
                        "J'essaie immédiatement une approche complètement différente",
                        "Je combine plusieurs approches de manière innovante",
                        "Je demande à l'équipe de brainstormer ensemble",
                        "J'analyse pourquoi l'approche traditionnelle échoue"
                    ]
                },
                {
                    id: 11,
                    category: 'creative',
                    text: "Tu dois créer quelque chose de nouveau pour ton équipe. Comment t'y prends-tu ?",
                    dimension: 'openness',
                    options: [
                        "Je crée quelque chose de complètement original",
                        "Je mélange des éléments existants de manière créative",
                        "Je collabore avec l'équipe pour créer ensemble",
                        "Je m'inspire de ce qui fonctionne déjà ailleurs"
                    ]
                },
                {
                    id: 12,
                    category: 'creative',
                    text: "Tu dois améliorer un processus existant. Quelle est ta stratégie ?",
                    dimension: 'openness',
                    options: [
                        "Je propose des améliorations créatives et innovantes",
                        "Je cherche l'inspiration dans d'autres domaines",
                        "Je consulte l'équipe pour des idées d'amélioration",
                        "J'analyse le processus actuel pour identifier les faiblesses"
                    ]
                },

                // Questions 13-16: Communication & Travail d'Équipe
                {
                    id: 13,
                    category: 'communication',
                    text: "Tu dois expliquer un concept complexe à ton équipe. Comment t'y prends-tu ?",
                    dimension: 'extraversion',
                    options: [
                        "Je donne des exemples concrets et pratiques",
                        "Je trouve des métaphores créatives pour expliquer",
                        "J'encourage les questions et les discussions",
                        "Je structure mon explication de manière logique"
                    ]
                },
                {
                    id: 14,
                    category: 'communication',
                    text: "Tu dois donner un feedback difficile à un collègue. Comment procèdes-tu ?",
                    dimension: 'agreeableness',
                    options: [
                        "Je suis direct et je vais droit au but",
                        "Je trouve des moyens créatifs de faire passer le message",
                        "Je choisis mes mots avec soin pour être constructif",
                        "Je prépare mon feedback avec des exemples concrets"
                    ]
                },
                {
                    id: 15,
                    category: 'communication',
                    text: "Tu dois organiser une réunion productive. Comment procèdes-tu ?",
                    dimension: 'extraversion',
                    options: [
                        "Je prépare un agenda clair et je le respecte",
                        "Je trouve des moyens créatifs d'engager les participants",
                        "J'encourage la participation de tous",
                        "Je structure la réunion de manière logique"
                    ]
                },
                {
                    id: 16,
                    category: 'communication',
                    text: "Tu dois former un nouveau collègue. Comment t'y prends-tu ?",
                    dimension: 'extraversion',
                    options: [
                        "Je lui donne des instructions claires et structurées",
                        "Je trouve des moyens créatifs de lui expliquer les choses",
                        "J'encourage ses questions et je suis patient",
                        "Je prépare un plan de formation méthodique"
                    ]
                },

                // Questions 17-20: Gestion du Stress & Adaptabilité
                {
                    id: 17,
                    category: 'stress',
                    text: "Tu dois travailler dans un environnement bruyant. Comment gères-tu la situation ?",
                    dimension: 'neuroticism',
                    options: [
                        "Je m'adapte rapidement et je me concentre sur mon travail",
                        "Je trouve des moyens créatifs de me concentrer",
                        "Je demande un environnement plus calme",
                        "J'analyse comment minimiser les distractions"
                    ]
                },
                {
                    id: 18,
                    category: 'stress',
                    text: "Tu as plusieurs projets urgents à gérer en même temps. Comment organises-tu ton travail ?",
                    dimension: 'conscientiousness',
                    options: [
                        "Je priorise et je traite les tâches une par une",
                        "Je trouve des moyens créatifs de combiner les projets",
                        "Je demande de l'aide à l'équipe",
                        "J'analyse chaque projet pour optimiser mon temps"
                    ]
                },
                {
                    id: 19,
                    category: 'stress',
                    text: "Une nouvelle méthode de travail est introduite. Comment réagis-tu ?",
                    dimension: 'openness',
                    options: [
                        "J'apprends rapidement la nouvelle méthode",
                        "Je cherche des moyens d'améliorer cette méthode",
                        "Je demande pourquoi cette méthode est meilleure",
                        "Je compare cette méthode avec l'ancienne"
                    ]
                },
                {
                    id: 20,
                    category: 'stress',
                    text: "Tu dois faire une présentation importante devant des dirigeants. Comment te prépares-tu ?",
                    dimension: 'neuroticism',
                    options: [
                        "Je me concentre sur les données et les résultats",
                        "Je prépare des éléments visuels créatifs",
                        "Je pratique pour être à l'aise et confiant",
                        "Je structure ma présentation de manière logique et claire"
                    ]
                }
            ]
        };
    }

    // Configuration des événements
    setupEventListeners() {
        document.getElementById('nextQuestion')?.addEventListener('click', () => this.nextQuestion());
        document.getElementById('prevQuestion')?.addEventListener('click', () => this.prevQuestion());
    }

    // Chargement d'une question
    loadQuestion() {
        const question = this.testData.questions[this.currentQuestion];
        const container = document.getElementById('questionContainer');
        
        if (!question || !container) return;

        container.innerHTML = `
            <div class="question-title">${question.text}</div>
            <div class="question-options">
                ${this.generateOptions(question)}
            </div>
        `;

        // Ajouter les événements aux options
        container.querySelectorAll('.option-card').forEach((option, index) => {
            option.addEventListener('click', () => this.selectAnswer(index + 1));
        });

        // Restaurer la réponse si elle existe
        if (this.answers[question.id]) {
            const selectedOption = container.querySelector(`[data-value="${this.answers[question.id]}"]`);
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }

        this.updateNavigation();
    }

    // Génération des options de réponse
    generateOptions(question) {
        return question.options.map((option, index) => `
            <div class="option-card" data-value="${index + 1}">
                <div class="option-number">${index + 1}</div>
                <div class="option-content">
                    <div class="option-text">${option}</div>
                </div>
                <div class="option-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                </div>
            </div>
        `).join('');
    }

    // Sélection d'une réponse
    selectAnswer(value) {
        const question = this.testData.questions[this.currentQuestion];
        this.answers[question.id] = value;
        
        // Mettre à jour l'affichage
        document.querySelectorAll('.option-card').forEach(option => {
            option.classList.remove('selected');
        });
        
        const selectedOption = document.querySelector(`[data-value="${value}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        this.updateNavigation();
    }

    // Question suivante
    nextQuestion() {
        const question = this.testData.questions[this.currentQuestion];
        
        // Vérifier si la question actuelle est répondue
        if (!this.answers[question.id]) {
            App.showAlert('Veuillez répondre à cette question avant de continuer.', 'warning');
            return;
        }

        if (this.currentQuestion < this.totalQuestions - 1) {
            this.currentQuestion++;
            this.loadQuestion();
            this.updateProgress();
        } else {
            this.completeTest();
        }
    }

    // Question précédente
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.loadQuestion();
            this.updateProgress();
        }
    }

    // Mise à jour de la navigation
    updateNavigation() {
        const nextBtn = document.getElementById('nextQuestion');
        const prevBtn = document.getElementById('prevQuestion');
        
        if (nextBtn) {
            const question = this.testData.questions[this.currentQuestion];
            nextBtn.disabled = !this.answers[question.id];
            
            if (this.currentQuestion === this.totalQuestions - 1) {
                nextBtn.innerHTML = 'Terminer le test <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            } else {
                nextBtn.innerHTML = 'Suivant <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            }
        }
        
        if (prevBtn) {
            prevBtn.disabled = this.currentQuestion === 0;
        }
    }

    // Mise à jour de la progression
    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            const progress = ((this.currentQuestion + 1) / this.totalQuestions) * 100;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `Question ${this.currentQuestion + 1} sur ${this.totalQuestions}`;
        }
    }

    // Terminer le test
    completeTest() {
        // Vérifier que toutes les questions sont répondues
        const unansweredQuestions = this.testData.questions.filter(q => !this.answers[q.id]);
        
        if (unansweredQuestions.length > 0) {
            App.showAlert(`Veuillez répondre à toutes les questions avant de terminer le test. Il reste ${unansweredQuestions.length} question(s) sans réponse.`, 'error');
            return;
        }

        // Afficher l'écran de chargement
        this.showLoadingScreen();
        
        // Simuler l'analyse pendant 3 secondes
        setTimeout(() => {
            // Calculer le résultat final (nombre entre 1 et 8)
            const result = this.calculateFinalResult();
            
            // Sauvegarder les résultats
            App.saveToLocalStorage('personalityTestResults', {
                answers: this.answers,
                result: result,
                completedAt: new Date().toISOString()
            });
            
            // Nettoyer la progression pour le prochain test
            App.clearLocalStorage('personalityTestProgress');
            
            // Rediriger vers la page de résultats
            window.location.href = 'results.html';
        }, 3000);
    }

    // Calcul du résultat final (nombre entre 1 et 8)
    calculateFinalResult() {
        // Logique simplifiée pour déterminer le profil
        // Compter les réponses par type
        let leadershipScore = 0;    // 1 - DG
        let financeScore = 0;       // 2 - Financier
        let hrScore = 0;            // 3 - RH
        let salesScore = 0;         // 4 - Commercial
        let marketingScore = 0;     // 5 - Marketing
        let operationsScore = 0;    // 6 - Production
        let itScore = 0;            // 7 - IT
        let adminScore = 0;         // 8 - Admin
        
        // Analyser les réponses (logique simplifiée basée sur les questions)
        Object.entries(this.answers).forEach(([questionId, answer]) => {
            const qId = parseInt(questionId);
            
            // Questions de leadership (1, 3, 6, 31, 40)
            if ([1, 3, 6, 31, 40].includes(qId)) {
                leadershipScore += answer;
            }
            // Questions financières (2, 11, 14, 18, 19)
            else if ([2, 11, 14, 18, 19].includes(qId)) {
                financeScore += answer;
            }
            // Questions RH (8, 9, 33, 34, 39)
            else if ([8, 9, 33, 34, 39].includes(qId)) {
                hrScore += answer;
            }
            // Questions commerciales (4, 28, 32, 37, 38)
            else if ([4, 28, 32, 37, 38].includes(qId)) {
                salesScore += answer;
            }
            // Questions marketing (5, 21, 22, 23, 29)
            else if ([5, 21, 22, 23, 29].includes(qId)) {
                marketingScore += answer;
            }
            // Questions production (7, 12, 15, 16, 20)
            else if ([7, 12, 15, 16, 20].includes(qId)) {
                operationsScore += answer;
            }
            // Questions IT (10, 13, 17, 24, 30)
            else if ([10, 13, 17, 24, 30].includes(qId)) {
                itScore += answer;
            }
            // Questions administratives (25, 26, 27, 35, 36)
            else if ([25, 26, 27, 35, 36].includes(qId)) {
                adminScore += answer;
            }
        });
        
        // Déterminer le score maximum
        const scores = [
            leadershipScore, financeScore, hrScore, salesScore, 
            marketingScore, operationsScore, itScore, adminScore
        ];
        
        const maxScore = Math.max(...scores);
        const result = scores.indexOf(maxScore) + 1; // +1 car les indices commencent à 0
        
        return result;
    }

    // Affichage de l'écran de chargement
    showLoadingScreen() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
            this.animateLoadingProgress();
        }
    }

    // Animation de la barre de progression
    animateLoadingProgress() {
        const loadingFill = document.getElementById('loadingFill');
        const loadingText = document.getElementById('loadingText');
        
        if (!loadingFill || !loadingText) return;

        const messages = [
            'Analyse des réponses...',
            'Calcul du profil...',
            'Finalisation...'
        ];

        let progress = 0;
        let messageIndex = 0;

        const interval = setInterval(() => {
            progress += 33;
            loadingFill.style.width = `${progress}%`;
            
            if (messageIndex < messages.length) {
                loadingText.textContent = messages[messageIndex];
                messageIndex++;
            }

            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 1000);
    }
}

// Initialiser le test quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('test.html')) {
        new PersonalityTest();
    }
});

// Export pour utilisation dans d'autres modules
window.PersonalityTest = PersonalityTest;