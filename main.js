const movieData = [
    {
        "id": 1,
        "title": "B.A. PASS 2",
        "language": "Hindi",
        "category": "Trending",
        "genre": "Drama/Betrayal",
        "poster": "https://images.unsplash.com/photo-1542204172-356399558651?q=80&w=1974&auto=format&fit=crop",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "description": "Going against her family's wishes, dreamy-eyed Neha ventures out to chase her dreams. But a series of wrong decisions brings chaos into her life!",
        "year": "2017",
        "rating": "U/A 16+",
        "duration": "2h 6m"
    },
    {
        "id": 2,
        "title": "Kabir Singh",
        "language": "Hindi",
        "category": "Popular",
        "genre": "Action/Romance",
        "poster": "https://images.unsplash.com/photo-1621685123223-2eb91df33f63?q=80&w=2070&auto=format&fit=crop",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        "description": "Kabir Singh, a senior medical student with a passion for football and a quick temper, falls in love with Preeti.",
        "year": "2019",
        "rating": "A",
        "duration": "2h 52m"
    },
    {
        "id": 3,
        "title": "Singham Returns",
        "language": "Hindi",
        "category": "Action Movies",
        "genre": "Action/Crime",
        "poster": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        "description": "Bajirao Singham returns as the Deputy Commissioner of Police in Mumbai.",
        "year": "2014",
        "rating": "U/A",
        "duration": "2h 22m"
    },
    {
        "id": 4,
        "title": "Marakkar",
        "language": "Malayalam",
        "category": "Action Movies",
        "genre": "Epic/Action",
        "poster": "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2070&auto=format&fit=crop",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "description": "The story of Kunjali Marakkar IV, the naval chieftain of the Zamorin of Calicut.",
        "year": "2021",
        "rating": "U/A",
        "duration": "3h 1min"
    },
    {
        "id": 5,
        "title": "Chhichhore",
        "language": "Hindi",
        "category": "Drama Movies",
        "genre": "Drama/Comedy",
        "poster": "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        "description": "A group of friends reunite for a nostalgic trip down memory lane.",
        "year": "2019",
        "rating": "U/A",
        "duration": "2h 23m"
    },
    {
        "id": 6,
        "title": "Pushpa: The Rise",
        "language": "Telugu",
        "category": "Trending",
        "genre": "Action/Crime",
        "poster": "https://img.viva.com.vn/2021/11/17/poster-phim-pushpa-the-rise.jpg",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        "description": "A laborer rises through the ranks of a red sandal smuggling syndicate.",
        "year": "2021",
        "rating": "U/A",
        "duration": "2h 59m"
    },
    {
        "id": 7,
        "title": "Aavesham",
        "language": "Malayalam",
        "category": "Action Movies",
        "genre": "Action/Comedy",
        "poster": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        "description": "Three teenagers come to Bangalore for their engineering education and get involved in a brawl.",
        "year": "2024",
        "rating": "U/A",
        "duration": "2h 38m"
    }
];

let allMovies = movieData;
let selectedLanguages = JSON.parse(localStorage.getItem('moviehub_selected_langs')) || ["Telugu", "Hindi", "English", "Tamil", "Malayalam", "Kannada"];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize checkboxes
    const checkboxes = document.querySelectorAll('.lang-checkbox input');

    checkboxes.forEach(cb => {
        cb.checked = selectedLanguages.includes(cb.value);
        cb.addEventListener('change', () => {
            updateSelectedLanguages();
        });
    });

    // Immediate render
    renderAllSections();

    // Search Functionality
    const searchInput = document.getElementById('movieSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length > 0) {
                renderSearchResults(query);
            } else {
                renderAllSections();
            }
        });
    }

    // Hero Play Button
    const heroPlayBtn = document.getElementById('heroPlayBtn');
    if (heroPlayBtn) {
        heroPlayBtn.onclick = () => {
            const currentHeroTitle = document.getElementById('heroTitle').textContent;
            const movie = allMovies.find(m => m.title === currentHeroTitle);
            if (movie) openMoviePlayer(movie.id);
        };
    }
});

function updateSelectedLanguages() {
    const checkboxes = document.querySelectorAll('.lang-checkbox input');
    selectedLanguages = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    localStorage.setItem('moviehub_selected_langs', JSON.stringify(selectedLanguages));
    renderAllSections();
}

function filterMovies(movies) {
    if (selectedLanguages.length === 0) return [];
    return movies.filter(movie => selectedLanguages.includes(movie.language));
}

function renderAllSections() {
    const movieRowsContainer = document.getElementById('movieRows');
    if (!movieRowsContainer) return;

    movieRowsContainer.innerHTML = '';

    const moviesToRender = filterMovies(allMovies);

    if (moviesToRender.length === 0) {
        movieRowsContainer.innerHTML = `
            <div style="padding: 100px 4%; text-align: center;">
                <h2 style="color: var(--text-dim);">No languages selected.</h2>
                <p style="color: var(--text-dim); margin-top: 10px;">Please select at least one language from the top menu.</p>
            </div>`;
        return;
    }

    // Reference categories from the provided image
    const customCategories = ['Action Movies', 'Drama Movies', 'Trending', 'Popular'];

    customCategories.forEach(cat => {
        const catMovies = moviesToRender.filter(m => m.category === cat);
        if (catMovies.length > 0) {
            renderRow(cat, catMovies);
        }
    });

    const recommended = [...moviesToRender].sort(() => 0.5 - Math.random()).slice(0, 6);
    if (recommended.length > 0) {
        renderRow("Recommended for You", recommended);
    }

    // Set Hero specifically to B.A. PASS 2 as in reference
    const heroMovie = allMovies.find(m => m.title === 'B.A. PASS 2') || moviesToRender[0];
    if (heroMovie) {
        updateHero(heroMovie);
    }
}

function renderRow(title, movies) {
    const movieRowsContainer = document.getElementById('movieRows');
    if (!movieRowsContainer) return;

    const rowEl = document.createElement('section');
    rowEl.className = 'movie-row';

    let movieCardsHtml = movies.map(movie => `
        <div class="movie-card" onclick="openMoviePlayer(${movie.id})">
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <div class="movie-hover-info">
                <div class="hover-content">
                    <button class="card-play-btn"><i class="fas fa-play"></i> Watch Now</button>
                    <div class="card-meta">
                        <span class="card-title">${movie.title}</span>
                        <div class="card-sub-meta">
                            <span>${movie.year} • ${movie.rating}</span>
                            <span>${movie.language} • ${movie.genre}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    rowEl.innerHTML = `
        <h2 class="row-header">${title}</h2>
        <div class="movie-container">
            ${movieCardsHtml}
        </div>
    `;

    movieRowsContainer.appendChild(rowEl);
}

function renderSearchResults(query) {
    const movieRowsContainer = document.getElementById('movieRows');
    movieRowsContainer.innerHTML = '';

    const results = allMovies.filter(movie =>
        (movie.title.toLowerCase().includes(query) ||
            movie.genre.toLowerCase().includes(query)) &&
        selectedLanguages.includes(movie.language)
    );

    if (results.length > 0) {
        renderRow(`Search Results for "${query}"`, results);
    } else {
        movieRowsContainer.innerHTML = `<p style="padding: 4%; text-align: center; color: var(--text-dim);">No matching results found.</p>`;
    }
}

function updateHero(movie) {
    const heroSection = document.getElementById('heroSection');
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');
    const heroMeta = document.getElementById('heroMeta');

    if (heroSection && movie) {
        heroSection.style.backgroundImage = `linear-gradient(to right, #0a0b14 30%, transparent), url('${movie.poster}')`;
        heroTitle.textContent = movie.title;
        heroDesc.textContent = movie.description;

        if (heroMeta) {
            heroMeta.innerHTML = `
                <span>${movie.year}</span> • <span>${movie.rating}</span> • <span>${movie.duration}</span> • <span>${movie.language}</span>
            `;
        }
    }
}

function openMoviePlayer(id) {
    window.open(`watch.html?id=${id}`, '_blank');
}
