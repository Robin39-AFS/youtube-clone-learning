async function fetchVideos() {
    try {
        const API_KEY = "AIzaSyCOzRofQ5d6pfYgK77Qa_Ub4awmNlVc2yU";
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=10&q=technology`);
        const data = await response.json();

        return data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.medium.url,
            category: "tech",
            views: "N/A", // Placeholder, as YouTube API v3 search does not provide view count
            uploadedAt: item.snippet.publishedAt
        }));
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];

    }
}