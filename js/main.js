// Sample mock data
const mockVideos = [
    {
        id: 1,
        title: "Amazing Nature Documentary",
        channel: "National Geographic",
        views: "1.2M",
        uploadedAt: "2 days ago",
        thumbnail: "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=320&h=180&fit=crop",
        category: "nature"
    },
    {
        id: 2,
        title: "Ultimate Gaming Tips 2026",
        channel: "Gamer's Hub",
        views: "500K",
        uploadedAt: "1 week ago",
        thumbnail: "https://images.unsplash.com/photo-1535671066572-26cf07c91c26?w=320&h=180&fit=crop",
        category: "gaming"
    },
    {
        id: 3,
        title: "Latest Music Hits",
        channel: "Music Channel",
        views: "3.2M",
        uploadedAt: "6 hours ago",
        thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=320&h=180&fit=crop",
        category: "music"
    },
    {
        id: 4,
        title: "Tech News This Week",
        channel: "Tech Today",
        views: "890K",
        uploadedAt: "1 day ago",
        thumbnail: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=320&h=180&fit=crop",
        category: "tech"
    },
];

let allVideos = mockVideos; // master data source (can be replaced by fetched data)
let currentCategory = "all"; // Default category
let filteredVideos = allVideos; // Start with all videos

//Sidebar Toggle
document.getElementById("sidebar-toggle").addEventListener("click", function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("-translate-x-full");
});

//Load videos based on category
function renderVideos(videos = mockVideos) {
    const grid = document.getElementById("video-grid");
    grid.innerHTML = ""; // Clear existing videos

    videos.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.className = "bg-zinc-800 rounded-lg overflow-hidden cursor-pointer group hover:scale-105 transition transform";
        videoCard.innerHTML = `
            <div class="aspect-video bg-zinc-700 overflow-hidden relative">
                <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-full object-cover group-hover:brightness-75 transition">
                <span class="absolute bottom-2 right-2 bg-black px-2 py-1 text-xs rounded">12:45</span>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-sm line-clamp-2 group-hover:text-blue-400 transition"> ${video.title} </h3>
                <p class="text-xs text-zinc-400">${video.channel}</p>
                <p class="text-xs text-zinc-400">${video.views} views • ${video.uploadedAt}</p> 
            </div>
        `;
        grid.appendChild(videoCard);
    });

    //Set featured video
    if (videos.length > 0) {
        const featured = videos[0];
        document.getElementById("featured-title").textContent = featured.title;
        document.getElementById("featured-desc").textContent = `${featured.channel} • ${featured.views} views`;
    }
}

//Category Filter
document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        currentCategory = this.dataset.category;

        //Update active state
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("bg-white", "text-black"));
        document.querySelectorAll(".category-btn").forEach(b => b.classList.add("bg-zinc-800"));
        this.classList.remove("bg-zinc-800");
        this.classList.add("bg-white", "text-black");

        // Filter videos
        if (currentCategory === "all") {
            filteredVideos = allVideos;
        } else {
            filteredVideos = allVideos.filter(video => video.category === currentCategory);
        }
        renderVideos(filteredVideos);

    });
});

// Search Functionality
document.getElementById("search-input").addEventListener("input", function (e) {
    const query = e.target.value.toLowerCase();
    const searched = allVideos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.channel.toLowerCase().includes(query)
    );
    renderVideos(searched);
});

// Initial render — try fetching real data, fall back to mock data
if (typeof fetchVideos === 'function') {
    fetchVideos().then(videos => {
        if (videos && videos.length) {
            allVideos = videos;
            filteredVideos = allVideos;
        }
        renderVideos(filteredVideos);
    }).catch(() => renderVideos(filteredVideos));
} else {
    renderVideos(filteredVideos);
}