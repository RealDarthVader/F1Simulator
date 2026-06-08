/* ===================================================
   F1 LEGENDS SIMULATOR — APPLICATION LOGIC
   Mirrors the Python backend simulation engine
   =================================================== */

// ========================
// DATA — Mirrors f1sim.py
// ========================

const drivers = {
  "Max Verstappen":      { Pace: 100, Racecraft: 98,  Experience: 97,  Awareness: 99,  Quali: 99,  Wet: 100 },
  "Lewis Hamilton":      { Pace: 99,  Racecraft: 97,  Experience: 98,  Awareness: 98,  Quali: 96,  Wet: 97  },
  "Charles Leclerc":     { Pace: 98,  Racecraft: 95,  Experience: 96,  Awareness: 97,  Quali: 100, Wet: 96  },
  "Sergio Perez":        { Pace: 90,  Racecraft: 94,  Experience: 95,  Awareness: 96,  Quali: 90,  Wet: 94  },
  "Lando Norris":        { Pace: 90,  Racecraft: 92,  Experience: 94,  Awareness: 95,  Quali: 91,  Wet: 94  },
  "Michael Schumacher":  { Pace: 99,  Racecraft: 99,  Experience: 100, Awareness: 100, Quali: 95,  Wet: 99  },
  "Ayrton Senna":        { Pace: 99,  Racecraft: 99,  Experience: 99,  Awareness: 99,  Quali: 100, Wet: 100 },
  "Sebastian Vettel":    { Pace: 98,  Racecraft: 93,  Experience: 94,  Awareness: 95,  Quali: 96,  Wet: 97  },
  "Fernando Alonso":     { Pace: 99,  Racecraft: 91,  Experience: 93,  Awareness: 94,  Quali: 98,  Wet: 99  },
  "Valtteri Bottas":     { Pace: 87,  Racecraft: 90,  Experience: 92,  Awareness: 93,  Quali: 87,  Wet: 92  },
  "Nico Rosberg":        { Pace: 92,  Racecraft: 89,  Experience: 91,  Awareness: 92,  Quali: 93,  Wet: 94  },
  "Kimi Raikkonen":      { Pace: 93,  Racecraft: 88,  Experience: 90,  Awareness: 91,  Quali: 92,  Wet: 99  },
  "Daniel Ricciardo":    { Pace: 91,  Racecraft: 87,  Experience: 89,  Awareness: 90,  Quali: 90,  Wet: 92  },
  "Oscar Piastri":       { Pace: 90,  Racecraft: 86,  Experience: 88,  Awareness: 89,  Quali: 90,  Wet: 93  },
  "George Russell":      { Pace: 88,  Racecraft: 85,  Experience: 87,  Awareness: 88,  Quali: 90,  Wet: 92  },
  "Carlos Sainz":        { Pace: 88,  Racecraft: 84,  Experience: 86,  Awareness: 87,  Quali: 89,  Wet: 93  },
  "Alan Prost":          { Pace: 95,  Racecraft: 98,  Experience: 99,  Awareness: 99,  Quali: 93,  Wet: 95  },
  "Niki Lauda":          { Pace: 99,  Racecraft: 97,  Experience: 98,  Awareness: 98,  Quali: 95,  Wet: 95  },
  "James Hunt":          { Pace: 95,  Racecraft: 95,  Experience: 96,  Awareness: 97,  Quali: 91,  Wet: 93  },
};

const calendar = [
  "Australian Grand Prix", "Bahrain Grand Prix", "Chinese Grand Prix",
  "Azerbaijan Grand Prix", "Spanish Grand Prix", "Monaco Grand Prix",
  "Canadian Grand Prix", "French Grand Prix", "Austrian Grand Prix",
  "British Grand Prix", "Hungarian Grand Prix", "Belgian Grand Prix",
  "Italian Grand Prix", "Singapore Grand Prix", "Russian Grand Prix",
  "Japanese Grand Prix", "United States Grand Prix", "Mexico City Grand Prix",
  "Brazilian Grand Prix", "Abu Dhabi Grand Prix"
];

const tracks = {
  "Monaco Grand Prix":   { pace: 0.8, racecraft: 1.0, awareness: 1.4 },
  "Italian Grand Prix":  { pace: 1.4, racecraft: 0.8, awareness: 1.0 },
  "Japanese Grand Prix": { pace: 1.2, racecraft: 1.0, awareness: 1.2 },
  "British Grand Prix":  { pace: 1.2, racecraft: 1.1, awareness: 1.1 },
};

const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

// Country flag emoji map for Grand Prix names
const gpFlags = {
  "Australian":   "🇦🇺", "Bahrain":       "🇧🇭", "Chinese":       "🇨🇳",
  "Azerbaijan":   "🇦🇿", "Spanish":       "🇪🇸", "Monaco":        "🇲🇨",
  "Canadian":     "🇨🇦", "French":        "🇫🇷", "Austrian":      "🇦🇹",
  "British":      "🇬🇧", "Hungarian":     "🇭🇺", "Belgian":       "🇧🇪",
  "Italian":      "🇮🇹", "Singapore":     "🇸🇬", "Russian":       "🇷🇺",
  "Japanese":     "🇯🇵", "United States": "🇺🇸", "Mexico City":   "🇲🇽",
  "Brazilian":    "🇧🇷", "Abu Dhabi":     "🇦🇪"
};

// ========================
// SIMULATION ENGINE
// (mirrors f1sim.py logic)
// ========================

function randomUniform(min, max) {
  return Math.random() * (max - min) + min;
}

function simulateQuali() {
  const results = [];
  for (const [driver, stats] of Object.entries(drivers)) {
    const score =
      stats.Quali      * 0.8 +
      stats.Pace       * 0.7 +
      stats.Awareness  * 0.2 +
      stats.Experience * 0.1 +
      stats.Racecraft  * 0.3 +
      randomUniform(-10, 10);
    results.push({ driver, score });
  }
  results.sort((a, b) => b.score - a.score);
  return results;
}

function simulateRace(qualiResults, raceName, weather) {
  const track = tracks[raceName] || { pace: 1.0, racecraft: 1.0, awareness: 1.0 };
  const raceResults = [];

  for (let i = 0; i < qualiResults.length; i++) {
    const { driver } = qualiResults[i];
    const stats = drivers[driver];

    let raceScore =
      stats.Pace       * track.pace      * 0.35 +
      stats.Racecraft  * track.racecraft  * 0.30 +
      stats.Experience                    * 0.20 +
      stats.Awareness  * track.awareness  * 0.15;

    // Wet weather bonus
    if (weather === "Wet") {
      raceScore += stats.Wet * 0.15;
    }

    const startingBonus = (20 - i) * 0.2;
    const randomness = randomUniform(-5, 5);
    const finalScore = raceScore + startingBonus + randomness;

    raceResults.push({ driver, score: finalScore });
  }

  raceResults.sort((a, b) => b.score - a.score);
  return raceResults;
}

function simulateSeason() {
  const championship = {};
  const seasonResults = [];
  const driverStats = {};

  // Initialize
  for (const driver of Object.keys(drivers)) {
    championship[driver] = 0;
    driverStats[driver] = { wins: 0, podiums: 0, finishes: [] };
  }

  for (let r = 0; r < calendar.length; r++) {
    const raceName = calendar[r];
    const weather = Math.random() < 0.3 ? "Wet" : "Dry";
    const quali = simulateQuali();
    const race = simulateRace(quali, raceName, weather);

    // Award points
    for (let pos = 0; pos < race.length; pos++) {
      const driverName = race[pos].driver;
      if (pos < pointsSystem.length) {
        championship[driverName] += pointsSystem[pos];
      }
      driverStats[driverName].finishes.push(pos + 1);
      if (pos === 0) driverStats[driverName].wins++;
      if (pos < 3) driverStats[driverName].podiums++;
    }

    seasonResults.push({
      round: r + 1,
      name: raceName,
      weather,
      podium: race.slice(0, 3).map(r => r.driver),
      fullResults: race.map(r => r.driver),
    });
  }

  // Sort standings
  const sortedStandings = Object.entries(championship)
    .sort((a, b) => b[1] - a[1])
    .map(([driver, points], i) => ({ position: i + 1, driver, points }));

  return { seasonResults, sortedStandings, driverStats };
}

// ========================
// STATE
// ========================
let seasonData = null;
let chartInstances = {};

// ========================
// DOM REFERENCES
// ========================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const DOM = {
  nav:              $('#main-nav'),
  navLinks:         $$('.nav__link'),
  mobileBtn:        $('#mobile-menu-btn'),
  navMenu:          $('.nav__links'),
  simulateBtn:      $('#simulate-btn'),
  driverGrid:       $('#driver-grid'),
  driverSearch:     $('#driver-search'),
  driverSort:       $('#driver-sort'),
  raceResults:      $('#race-results'),
  racePlaceholder:  $('#race-results-placeholder'),
  standingsTable:   $('#standings-table-wrapper'),
  standingsBody:    $('#standings-body'),
  standingsPlaceholder: $('#standings-placeholder'),
  statsContent:     $('#stats-content'),
  statsPlaceholder: $('#stats-placeholder'),
  statsSummary:     $('#stats-summary'),
  loadingOverlay:   $('#loading-overlay'),
  loadingRace:      $('#loading-race'),
  heroParticles:    $('#hero-particles'),
};

// ========================
// INITIALIZATION
// ========================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderDriverGrid();
  initNavigation();
  initEventListeners();
  initScrollAnimations();
});

// ========================
// HERO PARTICLES
// ========================
function initParticles() {
  const container = DOM.heroParticles;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = (60 + Math.random() * 40) + '%';
    p.style.width = (1 + Math.random() * 2) + 'px';
    p.style.height = p.style.width;
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = Math.random() * 8 + 's';
    container.appendChild(p);
  }
}

// ========================
// NAVIGATION
// ========================
function initNavigation() {
  // Scroll spy
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Nav background
    DOM.nav.classList.toggle('scrolled', scrollY > 60);

    // Active link
    const sections = ['hero', 'drivers', 'races', 'standings', 'statistics'];
    for (const id of sections.reverse()) {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop - 200) {
        DOM.navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav__link[href="#${id}"]`);
        if (active) active.classList.add('active');
        break;
      }
    }
  });

  // Mobile menu
  DOM.mobileBtn.addEventListener('click', () => {
    DOM.mobileBtn.classList.toggle('open');
    DOM.navMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  DOM.navLinks.forEach(link => {
    link.addEventListener('click', () => {
      DOM.mobileBtn.classList.remove('open');
      DOM.navMenu.classList.remove('open');
    });
  });
}

// ========================
// EVENT LISTENERS
// ========================
function initEventListeners() {
  DOM.simulateBtn.addEventListener('click', runSimulation);
  DOM.driverSearch.addEventListener('input', filterDrivers);
  DOM.driverSort.addEventListener('change', sortDrivers);
}

// ========================
// DRIVER GRID
// ========================
function getOverall(stats) {
  return Math.round(
    (stats.Pace + stats.Racecraft + stats.Experience + stats.Awareness + stats.Quali + stats.Wet) / 6
  );
}

function renderDriverGrid(driverList = null) {
  const list = driverList || Object.entries(drivers).map(([name, stats]) => ({ name, stats }));
  const grid = DOM.driverGrid;
  grid.innerHTML = '';

  list.forEach((d, i) => {
    const overall = getOverall(d.stats);
    const card = document.createElement('div');
    card.classList.add('driver-card');
    card.style.animationDelay = `${i * 0.05}s`;
    card.setAttribute('data-driver', d.name.toLowerCase());

    const statEntries = [
      { label: 'Pace',       value: d.stats.Pace },
      { label: 'Racecraft',  value: d.stats.Racecraft },
      { label: 'Experience', value: d.stats.Experience },
      { label: 'Awareness',  value: d.stats.Awareness },
      { label: 'Wet',        value: d.stats.Wet },
      { label: 'Qualifying', value: d.stats.Quali },
    ];

    card.innerHTML = `
      <div class="driver-card__number">${String(i + 1).padStart(2, '0')}</div>
      <div class="driver-card__name">${d.name}</div>
      <div class="driver-card__overall">◆ OVR ${overall}</div>
      <div class="driver-card__stats">
        ${statEntries.map(s => `
          <div class="stat-row">
            <span class="stat-row__label">${s.label}</span>
            <div class="stat-row__bar-track">
              <div class="stat-row__bar-fill" style="width: 0%" data-width="${s.value}%"></div>
            </div>
            <span class="stat-row__value">${s.value}</span>
          </div>
        `).join('')}
      </div>
    `;

    grid.appendChild(card);
  });

  // Animate stat bars after a short delay
  requestAnimationFrame(() => {
    setTimeout(() => {
      grid.querySelectorAll('.stat-row__bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 100);
  });
}

function filterDrivers() {
  const query = DOM.driverSearch.value.toLowerCase().trim();
  const sorted = getCurrentSortedDrivers();
  const filtered = sorted.filter(d => d.name.toLowerCase().includes(query));
  renderDriverGrid(filtered);
}

function sortDrivers() {
  const sorted = getCurrentSortedDrivers();
  renderDriverGrid(sorted);
}

function getCurrentSortedDrivers() {
  const sortBy = DOM.driverSort.value;
  const query = DOM.driverSearch.value.toLowerCase().trim();

  let list = Object.entries(drivers).map(([name, stats]) => ({ name, stats }));

  if (query) {
    list = list.filter(d => d.name.toLowerCase().includes(query));
  }

  if (sortBy === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'overall') {
    list.sort((a, b) => getOverall(b.stats) - getOverall(a.stats));
  } else {
    list.sort((a, b) => b.stats[sortBy] - a.stats[sortBy]);
  }

  return list;
}

// ========================
// SIMULATION
// ========================
async function runSimulation() {
  DOM.loadingOverlay.style.display = 'flex';

  // Animate loading text through race names
  let raceIndex = 0;
  const loadingInterval = setInterval(() => {
    if (raceIndex < calendar.length) {
      DOM.loadingRace.textContent = calendar[raceIndex];
      raceIndex++;
    }
  }, 120);

  // Small delay to let the UI breathe
  await new Promise(r => setTimeout(r, calendar.length * 120 + 400));
  clearInterval(loadingInterval);

  seasonData = simulateSeason();

  renderRaceResults();
  renderStandings();
  renderStatistics();

  DOM.loadingOverlay.style.display = 'none';

  // Scroll to race results
  document.getElementById('races').scrollIntoView({ behavior: 'smooth' });
}

// ========================
// RACE RESULTS
// ========================
function getFlag(raceName) {
  for (const [key, flag] of Object.entries(gpFlags)) {
    if (raceName.includes(key)) return flag;
  }
  return '🏁';
}

function renderRaceResults() {
  DOM.racePlaceholder.style.display = 'none';
  DOM.raceResults.innerHTML = '';

  seasonData.seasonResults.forEach((race, i) => {
    const card = document.createElement('div');
    card.classList.add('race-card');
    card.style.animationDelay = `${i * 0.06}s`;

    const flag = getFlag(race.name);
    const weatherClass = race.weather === 'Wet' ? 'weather--wet' : 'weather--dry';
    const weatherIcon = race.weather === 'Wet' ? '🌧️' : '☀️';

    card.innerHTML = `
      <div class="race-card__header">
        <div>
          <div class="race-card__name">${flag} ${race.name}</div>
          <div class="race-card__round">Round ${race.round}</div>
        </div>
        <span class="race-card__weather ${weatherClass}">${weatherIcon} ${race.weather}</span>
      </div>
      <div class="race-card__podium">
        ${race.podium.map((driver, pos) => `
          <div class="podium-entry">
            <span class="podium-pos podium-pos--${pos + 1}">${pos + 1}</span>
            <span class="podium-name">${driver}</span>
          </div>
        `).join('')}
      </div>
    `;

    DOM.raceResults.appendChild(card);
  });
}

// ========================
// CHAMPIONSHIP STANDINGS
// ========================
function renderStandings() {
  DOM.standingsPlaceholder.style.display = 'none';
  DOM.standingsTable.style.display = 'block';
  DOM.standingsBody.innerHTML = '';

  const maxPoints = seasonData.sortedStandings[0].points;

  seasonData.sortedStandings.forEach((entry, i) => {
    const tr = document.createElement('tr');
    tr.style.animationDelay = `${i * 0.04}s`;

    if (i < 3) {
      tr.classList.add(`top-${i + 1}`);
    }

    const badgeClass = i < 3 ? `pos-badge--${i + 1}` : 'pos-badge--other';
    const barWidth = maxPoints > 0 ? (entry.points / maxPoints * 100) : 0;

    tr.innerHTML = `
      <td><span class="pos-badge ${badgeClass}">${entry.position}</span></td>
      <td style="font-weight:700;">${entry.driver}</td>
      <td><span class="standings-points">${entry.points}</span> pts</td>
      <td class="points-bar-cell">
        <div class="points-bar-track">
          <div class="points-bar-fill" style="width: 0%" data-width="${barWidth}%"></div>
        </div>
      </td>
    `;

    DOM.standingsBody.appendChild(tr);
  });

  // Animate bars
  requestAnimationFrame(() => {
    setTimeout(() => {
      DOM.standingsBody.querySelectorAll('.points-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 200);
  });
}

// ========================
// STATISTICS
// ========================
function renderStatistics() {
  DOM.statsPlaceholder.style.display = 'none';
  DOM.statsContent.style.display = 'block';

  const { sortedStandings, driverStats } = seasonData;
  const champion = sortedStandings[0];
  const stats = driverStats[champion.driver];

  // Find max wins and podiums drivers
  let maxWins = 0, maxWinsDriver = '';
  let maxPodiums = 0, maxPodiumsDriver = '';
  for (const [driver, s] of Object.entries(driverStats)) {
    if (s.wins > maxWins) { maxWins = s.wins; maxWinsDriver = driver; }
    if (s.podiums > maxPodiums) { maxPodiums = s.podiums; maxPodiumsDriver = driver; }
  }

  // Summary cards
  DOM.statsSummary.innerHTML = `
    <div class="stat-card">
      <div class="stat-card__label">Champion</div>
      <div class="stat-card__value" style="font-size:20px;">${champion.driver}</div>
      <div class="stat-card__detail">${champion.points} pts</div>
    </div>
    <div class="stat-card">
      <div class="stat-card__label">Most Wins</div>
      <div class="stat-card__value">${maxWins}</div>
      <div class="stat-card__detail">${maxWinsDriver}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card__label">Most Podiums</div>
      <div class="stat-card__value">${maxPodiums}</div>
      <div class="stat-card__detail">${maxPodiumsDriver}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card__label">Races</div>
      <div class="stat-card__value">${calendar.length}</div>
      <div class="stat-card__detail">Full Season</div>
    </div>
  `;

  renderCharts();
}

function renderCharts() {
  // Destroy existing charts
  Object.values(chartInstances).forEach(c => c.destroy());
  chartInstances = {};

  const { sortedStandings, driverStats } = seasonData;

  // Top 10 for charts
  const top10 = sortedStandings.slice(0, 10);
  const labels = top10.map(s => s.driver.split(' ').pop()); // Last name only
  const fullLabels = top10.map(s => s.driver);

  // Shared chart options
  const sharedOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(22, 22, 31, 0.95)',
        titleColor: '#f0f0f5',
        bodyColor: '#9898a8',
        borderColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: { family: "'Outfit', sans-serif", weight: '700', size: 13 },
        bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
        callbacks: {
          title: function(items) {
            return fullLabels[items[0].dataIndex];
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.03)' },
        ticks: {
          color: '#606072',
          font: { family: "'Outfit', sans-serif", size: 11, weight: '600' },
          maxRotation: 45,
        },
        border: { color: 'rgba(255,255,255,0.06)' }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.03)' },
        ticks: {
          color: '#606072',
          font: { family: "'JetBrains Mono', monospace", size: 11 },
        },
        border: { color: 'rgba(255,255,255,0.06)' },
        beginAtZero: true,
      }
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    }
  };

  // Gradient helper
  function createGradient(ctx, r, g, b) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 360);
    gradient.addColorStop(0, `rgba(${r},${g},${b}, 0.8)`);
    gradient.addColorStop(1, `rgba(${r},${g},${b}, 0.15)`);
    return gradient;
  }

  // 1. Championship Points — Bar Chart
  const ctx1 = document.getElementById('chart-points').getContext('2d');
  chartInstances.points = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: top10.map(s => s.points),
        backgroundColor: top10.map((_, i) => {
          if (i === 0) return 'rgba(255, 215, 0, 0.7)';
          if (i === 1) return 'rgba(192, 192, 192, 0.6)';
          if (i === 2) return 'rgba(205, 127, 50, 0.6)';
          return 'rgba(225, 6, 0, 0.5)';
        }),
        borderColor: top10.map((_, i) => {
          if (i === 0) return 'rgba(255, 215, 0, 1)';
          if (i === 1) return 'rgba(192, 192, 192, 1)';
          if (i === 2) return 'rgba(205, 127, 50, 1)';
          return 'rgba(225, 6, 0, 0.8)';
        }),
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      ...sharedOpts,
      plugins: {
        ...sharedOpts.plugins,
        tooltip: {
          ...sharedOpts.plugins.tooltip,
          callbacks: {
            ...sharedOpts.plugins.tooltip.callbacks,
            label: (item) => `${item.raw} points`
          }
        }
      }
    }
  });

  // 2. Wins — Doughnut Chart
  const ctx2 = document.getElementById('chart-wins').getContext('2d');
  const winsData = top10.map(s => driverStats[s.driver].wins);

  // Generate colors for doughnut
  const doughnutColors = [
    '#e10600', '#ff4136', '#ff6b5e', '#ff9a8b',
    '#ffc107', '#c0c0c0', '#64b5f6', '#81c784',
    '#ba68c8', '#ffb74d'
  ];

  chartInstances.wins = new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: fullLabels,
      datasets: [{
        data: winsData,
        backgroundColor: doughnutColors.map(c => c + 'cc'),
        borderColor: doughnutColors,
        borderWidth: 2,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#9898a8',
            font: { family: "'Outfit', sans-serif", size: 11, weight: '500' },
            padding: 12,
            usePointStyle: true,
            pointStyleWidth: 10,
          }
        },
        tooltip: {
          ...sharedOpts.plugins.tooltip,
          callbacks: {
            label: (item) => ` ${item.raw} wins`
          }
        }
      },
      animation: {
        animateRotate: true,
        duration: 1400,
        easing: 'easeOutQuart',
      }
    }
  });

  // 3. Podiums — Horizontal Bar
  const ctx3 = document.getElementById('chart-podiums').getContext('2d');
  const podiumData = top10.map(s => driverStats[s.driver].podiums);

  chartInstances.podiums = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: podiumData,
        backgroundColor: createGradient(ctx3, 225, 6, 0),
        borderColor: 'rgba(225, 6, 0, 0.8)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      ...sharedOpts,
      indexAxis: 'y',
      plugins: {
        ...sharedOpts.plugins,
        tooltip: {
          ...sharedOpts.plugins.tooltip,
          callbacks: {
            ...sharedOpts.plugins.tooltip.callbacks,
            label: (item) => `${item.raw} podiums`
          }
        }
      },
      scales: {
        x: {
          ...sharedOpts.scales.y,
          beginAtZero: true,
        },
        y: {
          ...sharedOpts.scales.x,
          grid: { display: false },
        }
      }
    }
  });
}

// ========================
// SCROLL ANIMATIONS
// ========================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Re-trigger stat bar animations for driver cards
        if (entry.target.classList.contains('driver-grid')) {
          entry.target.querySelectorAll('.stat-row__bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width;
          });
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  observer.observe(DOM.driverGrid);
}
