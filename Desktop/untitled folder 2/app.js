// STATE CORE CONTROL ENGINE
let currentUniversityFilter = 'ALL';

document.addEventListener('DOMContentLoaded', () => {
    // Event Hooking Setup
    setupFilterListeners();
    document.getElementById('directorySearch').addEventListener('keyup', executeCombinedFilter);
    document.getElementById('intakeForm').addEventListener('submit', handleFormSubmission);
    
    // Fire Countdowns
    runCountdownEngine();
});

// MULTI-FILTER SETUP HUB
function setupFilterListeners() {
    const buttons = ['ALL', 'MDX', 'UOWD', 'HWU'];
    buttons.forEach(btn => {
        document.getElementById(`btn-${btn}`).addEventListener('click', () => {
            currentUniversityFilter = btn;
            buttons.forEach(b => {
                const target = document.getElementById(`btn-${b}`);
                if (b === btn) {
                    target.className = "filter-btn bg-matcha text-espresso font-extrabold p-4 brutal-border text-center tracking-wider text-sm transition-all brutal-shadow";
                } else {
                    target.className = "filter-btn bg-roast text-cream font-extrabold p-4 brutal-border text-center tracking-wider text-sm hover:bg-cream hover:text-espresso transition-all";
                }
            });
            executeCombinedFilter();
        });
    });
}

// MATRIX COMBINED SEARCH ENGINE EVALUATION
function executeCombinedFilter() {
    const searchVal = document.getElementById('directorySearch').value.toLowerCase();
    const cards = document.querySelectorAll('.student-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const cardUni = card.getAttribute('data-uni');
        const nameText = card.querySelector('.name-field').innerText.toLowerCase();
        const majorText = card.querySelector('.major-field').innerText.toLowerCase();
        
        let tagsText = "";
        card.querySelectorAll('.interest-tag').forEach(tag => {
            tagsText += tag.innerText.toLowerCase() + " ";
        });

        const matchesUni = (currentUniversityFilter === 'ALL' || cardUni === currentUniversityFilter);
        const matchesSearch = (nameText.includes(searchVal) || majorText.includes(searchVal) || tagsText.includes(searchVal));

        if (matchesUni && matchesSearch) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    const emptyState = document.getElementById('empty-state');
    if (cards.length === 0 || visibleCount === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}

// INTAKE INTERCEPTOR ENGINE
function handleFormSubmission(e) {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const handle = document.getElementById('form-handle').value.trim();
    const uni = document.getElementById('form-uni').value;
    const course = document.getElementById('form-course').value.trim();
    const year = document.getElementById('form-year').value;
    const interestsRaw = document.getElementById('form-interests').value.trim();

    const grid = document.getElementById('directory-grid');
    grid.classList.remove('hidden');

    const interestsArray = interestsRaw ? interestsRaw.split(',') : ['Coffee', 'Raves'];
    let tagsHtml = '';
    interestsArray.forEach(interest => {
        tagsHtml += `<span class="interest-tag text-[10px] bg-espresso px-2 py-0.5 rounded-full border border-gray-600">${interest.trim()}</span> `;
    });

    const uniLabels = { 'MDX': 'MDX DUBAI', 'UOWD': 'UOWD', 'HWU': 'HERIOT-WATT' };

    const card = document.createElement('div');
    card.className = "student-card bg-roast brutal-border p-6 flex flex-col justify-between";
    
    // Inject distinct offset vectors on the new card element so they move out of lockstep syncing
    const randomDelay = (Math.random() * -6).toFixed(2);
    const randomDuration = (6 + Math.random() * 3).toFixed(2);
    card.style.animationDelay = `${randomDelay}s`;
    card.style.animationDuration = `${randomDuration}s`;
    
    card.setAttribute('data-uni', uni);
    card.innerHTML = `
        <div>
            <div class="flex justify-between items-start">
                <span class="text-[10px] font-bold bg-espresso text-matcha px-2 py-0.5 brutal-border">${uniLabels[uni]}</span>
                <span class="text-xs text-gray-400">${year}</span>
            </div>
            <h4 class="text-xl font-bold mt-4 name-field">${name}</h4>
            <p class="text-xs text-gray-400 major-field">${course}</p>
            <div class="flex flex-wrap gap-1.5 mt-4 interests-container">
                ${tagsHtml}
            </div>
        </div>
        <a href="https://instagram.com/${handle.replace('@','')}" target="_blank" class="mt-6 text-sm font-bold text-matcha hover:underline">${handle.startsWith('@') ? handle : '@' + handle} ↗</a>
    `;

    grid.appendChild(card);
    executeCombinedFilter();

    // Reset layout fields
    document.getElementById('intakeForm').reset();
    
    // Relocate viewport position confirmation directly over matrix elements
    document.getElementById('directory').scrollIntoView({ behavior: 'smooth' });
}

// AUTOMATED TIMING CALCULATOR
function runCountdownEngine() {
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + ((4 + 7 - eventDate.getDay()) % 7 || 7));
    eventDate.setHours(21, 0, 0, 0);

    function updateMetrics() {
        const now = new Date().getTime();
        const difference = eventDate - now;

        if (difference > 0) {
            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('daysBox').innerText = d.toString().padStart(2, '0');
            document.getElementById('hoursBox').innerText = h.toString().padStart(2, '0');
            document.getElementById('minsBox').innerText = m.toString().padStart(2, '0');
            document.getElementById('secsBox').innerText = s.toString().padStart(2, '0');
        }
    }
    setInterval(updateMetrics, 1000);
    updateMetrics();
}