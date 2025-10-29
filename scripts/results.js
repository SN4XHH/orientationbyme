// Results Analysis - Test de Personnalité Professionnelle
// Analyse les réponses sauvegardées et détermine le profil dominant

class ResultsAnalyzer {
    constructor() {
        this.profiles = {
            1: "Directeur général (DG) / Chef d'entreprise",
            2: "Responsable financier / Comptable", 
            3: "Responsable des ressources humaines (RH)",
            4: "Responsable commercial / Chef des ventes",
            5: "Responsable marketing / Communication",
            6: "Responsable de la production / des opérations",
            7: "Responsable informatique / Technicien IT",
            8: "Assistant administratif / Secrétaire"
        };
        
        this.init();
    }

    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.analyzeResults());
        } else {
            this.analyzeResults();
        }
    }

    /**
     * Analyse les résultats sauvegardés dans localStorage
     */
    analyzeResults() {
        try {
            // Afficher l'état de chargement
            this.showLoadingState();

            // Simuler un délai d'analyse pour l'effet visuel
            setTimeout(() => {
                const savedData = this.loadAnswersFromStorage();
                
                if (!savedData || !savedData.answers || savedData.answers.length === 0) {
                    this.showNoResultsState();
                    return;
                }

                // Analyser les réponses
                const analysis = this.performAnalysis(savedData.answers);
                
                // Afficher les résultats
                this.displayResults(analysis);
                
            }, 2000); // 2 secondes de délai pour l'effet

        } catch (error) {
            console.error('Erreur lors de l\'analyse des résultats:', error);
            this.showNoResultsState();
        }
    }

    /**
     * Charge les réponses depuis localStorage
     */
    loadAnswersFromStorage() {
        try {
            // Essayer d'abord la nouvelle structure
            let data = localStorage.getItem('testAnswers');
            if (data) {
                const parsedData = JSON.parse(data);
                console.log('Données chargées depuis localStorage (nouvelle structure):', parsedData);
                return parsedData;
            }

            // Essayer l'ancienne structure
            data = localStorage.getItem('personalityTestResults');
            if (data) {
                const parsedData = JSON.parse(data);
                console.log('Données chargées depuis localStorage (ancienne structure):', parsedData);
                
                // Convertir l'ancienne structure vers la nouvelle
                if (parsedData.answers) {
                    const convertedData = {
                        answers: Object.entries(parsedData.answers).map(([questionId, type]) => ({
                            questionId: parseInt(questionId),
                            type: type.toString()
                        }))
                    };
                    console.log('Données converties:', convertedData);
                    return convertedData;
                }
            }

            console.log('Aucune donnée trouvée dans localStorage');
            return null;

        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            return null;
        }
    }

    /**
     * Effectue l'analyse des réponses pour déterminer le profil dominant
     */
    performAnalysis(answers) {
        console.log('Analyse des réponses:', answers);

        // Compter les occurrences de chaque type
        const typeCounts = {};
        
        // Initialiser les compteurs
        for (let i = 1; i <= 8; i++) {
            typeCounts[i] = 0;
        }

        // Compter les réponses par type
        answers.forEach(answer => {
            const type = parseInt(answer.type);
            if (type >= 1 && type <= 8) {
                typeCounts[type]++;
            }
        });

        console.log('Comptage par type:', typeCounts);

        // Trouver le type le plus fréquent
        let dominantType = 1;
        let maxCount = typeCounts[1];

        for (let i = 2; i <= 8; i++) {
            if (typeCounts[i] > maxCount) {
                maxCount = typeCounts[i];
                dominantType = i;
            }
        }

        // Calculer les pourcentages
        const totalAnswers = answers.length;
        const percentages = {};
        
        for (let i = 1; i <= 8; i++) {
            percentages[i] = totalAnswers > 0 ? (typeCounts[i] / totalAnswers) * 100 : 0;
        }

        const analysis = {
            dominantType: dominantType,
            dominantCount: maxCount,
            totalAnswers: totalAnswers,
            typeCounts: typeCounts,
            percentages: percentages,
            profileName: this.profiles[dominantType]
        };

        console.log('Analyse finale:', analysis);
        return analysis;
    }

    /**
     * Affiche l'état de chargement
     */
    showLoadingState() {
        const loadingState = document.getElementById('loadingState');
        const noResultsState = document.getElementById('noResultsState');
        const resultsState = document.getElementById('resultsState');

        if (loadingState) loadingState.style.display = 'flex';
        if (noResultsState) noResultsState.style.display = 'none';
        if (resultsState) resultsState.style.display = 'none';
        
        // Animer la barre de progression
        this.animateLoadingProgress();
    }

    /**
     * Affiche l'état "aucun résultat"
     */
    showNoResultsState() {
        const loadingState = document.getElementById('loadingState');
        const noResultsState = document.getElementById('noResultsState');
        const resultsState = document.getElementById('resultsState');

        if (loadingState) loadingState.style.display = 'none';
        if (noResultsState) noResultsState.style.display = 'block';
        if (resultsState) resultsState.style.display = 'none';
    }

    /**
     * Affiche les résultats de l'analyse
     */
    displayResults(analysis) {
        const loadingState = document.getElementById('loadingState');
        const noResultsState = document.getElementById('noResultsState');
        const resultsState = document.getElementById('resultsState');

        if (loadingState) loadingState.style.display = 'none';
        if (noResultsState) noResultsState.style.display = 'none';
        if (resultsState) resultsState.style.display = 'block';

        // Afficher le nombre du profil dominant
        const resultNumber = document.getElementById('resultNumber');
        if (resultNumber) {
            resultNumber.textContent = analysis.dominantType;
        }

        // Afficher le détail de l'analyse
        this.displayAnalysisBreakdown(analysis);

        // Animation d'apparition du résultat
        this.animateResult();
    }

    /**
     * Affiche le détail de l'analyse
     */
    displayAnalysisBreakdown(analysis) {
        const breakdownContainer = document.getElementById('analysisBreakdown');
        if (!breakdownContainer) return;

        // Créer le HTML pour l'analyse détaillée
        let breakdownHTML = `
            <div class="breakdown-summary">
                <div class="summary-item">
                    <span class="summary-label">Profil dominant :</span>
                    <span class="summary-value">Type ${analysis.dominantType}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Occurrences :</span>
                    <span class="summary-value">${analysis.dominantCount} sur ${analysis.totalAnswers}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Pourcentage :</span>
                    <span class="summary-value">${analysis.percentages[analysis.dominantType].toFixed(1)}%</span>
                </div>
            </div>
        `;

        // Ajouter le détail par type
        breakdownHTML += '<div class="breakdown-details">';
        breakdownHTML += '<h4>Répartition par type :</h4>';
        breakdownHTML += '<div class="type-breakdown">';

        for (let i = 1; i <= 8; i++) {
            const count = analysis.typeCounts[i];
            const percentage = analysis.percentages[i];
            const isDominant = i === analysis.dominantType;
            
            breakdownHTML += `
                <div class="type-item ${isDominant ? 'dominant' : ''}">
                    <div class="type-header">
                        <span class="type-number">${i}</span>
                        <span class="type-name">${this.profiles[i]}</span>
                        <span class="type-count">${count}</span>
                    </div>
                    <div class="type-bar">
                        <div class="type-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="type-percentage">${percentage.toFixed(1)}%</div>
                </div>
            `;
        }

        breakdownHTML += '</div></div>';
        breakdownContainer.innerHTML = breakdownHTML;
    }

    /**
     * Anime l'apparition du résultat
     */
    animateResult() {
        const resultNumber = document.getElementById('resultNumber');
        const resultCircle = document.querySelector('.result-circle');
        
        if (resultNumber && resultCircle) {
            // Animation du cercle
            resultCircle.style.transform = 'scale(0)';
            resultCircle.style.opacity = '0';
            
            setTimeout(() => {
                resultCircle.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                resultCircle.style.transform = 'scale(1)';
                resultCircle.style.opacity = '1';
            }, 300);

            // Animation du nombre
            resultNumber.style.transform = 'scale(0)';
            resultNumber.style.opacity = '0';
            
            setTimeout(() => {
                resultNumber.style.transition = 'all 0.6s ease-out';
                resultNumber.style.transform = 'scale(1)';
                resultNumber.style.opacity = '1';
            }, 800);
        }
    }

    /**
     * Efface les données du test (pour recommencer)
     */
    clearTestData() {
        try {
            localStorage.removeItem('testAnswers');
            localStorage.removeItem('testProgress');
            localStorage.removeItem('currentQuestion');
            console.log('Données du test effacées');
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'effacement des données:', error);
            return false;
        }
    }

    /**
     * Anime la barre de progression du chargement
     */
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

    /**
     * Génère un rapport détaillé (pour debug)
     */
    generateDetailedReport(analysis) {
        const report = {
            timestamp: new Date().toISOString(),
            analysis: analysis,
            rawData: this.loadAnswersFromStorage()
        };
        
        console.log('Rapport détaillé:', report);
        return report;
    }
}

// Fonctions utilitaires globales
window.ResultsAnalyzer = ResultsAnalyzer;

// Fonction pour effacer les données et recommencer
window.clearTestAndRestart = function() {
    const analyzer = new ResultsAnalyzer();
    analyzer.clearTestData();
    window.location.href = 'test.html';
};

// Fonction pour retourner à l'accueil
window.goToHome = function() {
    window.location.href = 'index.html';
};

// Initialiser l'analyseur quand le script est chargé
document.addEventListener('DOMContentLoaded', () => {
    new ResultsAnalyzer();
});

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
    console.error('Erreur JavaScript:', event.error);
    
    // Afficher un message d'erreur à l'utilisateur si nécessaire
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
        <div class="error-content">
            <h3>Une erreur est survenue</h3>
            <p>Veuillez recharger la page ou recommencer le test.</p>
            <div class="error-actions">
                <button onclick="window.location.reload()" class="btn btn-primary">Recharger</button>
                <button onclick="clearTestAndRestart()" class="btn btn-secondary">Recommencer</button>
            </div>
        </div>
    `;
    
    // Ajouter les styles pour le message d'erreur
    errorMessage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
    `;
    
    // Ne pas afficher automatiquement l'erreur pour éviter de perturber l'utilisateur
    // document.body.appendChild(errorMessage);
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResultsAnalyzer;
}