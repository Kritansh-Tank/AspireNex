const movies = [
  { title: "Mad Max: Fury Road", genres: ["Action", "Sci-Fi"] },
  { title: "The Big Sick", genres: ["Comedy", "Romance"] },
  { title: "The Shawshank Redemption", genres: ["Drama"] },
  { title: "Get Out", genres: ["Horror", "Thriller"] },
  { title: "Titanic", genres: ["Drama", "Romance"] },
  { title: "Interstellar", genres: ["Sci-Fi", "Drama"] },
  { title: "Inception", genres: ["Action", "Sci-Fi", "Thriller"] },
  { title: "The Dark Knight", genres: ["Action", "Drama"] },
  { title: "Joker", genres: ["Drama", "Thriller"] },
  { title: "Toy Story", genres: ["Animation", "Comedy", "Family"] },
  { title: "The Lion King", genres: ["Animation", "Drama", "Family"] },
  { title: "Pulp Fiction", genres: ["Crime", "Drama"] },
  { title: "Parasite", genres: ["Thriller", "Drama"] },
  {
    title: "Spider-Man: Into the Spider-Verse",
    genres: ["Animation", "Action", "Adventure"],
  },
  { title: "The Godfather", genres: ["Crime", "Drama"] },
  { title: "Forrest Gump", genres: ["Drama", "Romance"] },
  { title: "Guardians of the Galaxy", genres: ["Action", "Sci-Fi", "Comedy"] },
  { title: "Frozen", genres: ["Animation", "Family", "Adventure"] },
  { title: "A Quiet Place", genres: ["Horror", "Drama", "Sci-Fi"] },
  { title: "The Matrix", genres: ["Action", "Sci-Fi"] },
];

const genres = [...new Set(movies.flatMap((movie) => movie.genres))];

const genreList = document.getElementById("genreList");
const recommendButton = document.getElementById("recommendButton");
const recommendationList = document.getElementById("recommendationList");

const userPreferences = {};

// Populate the genre list for user selection
genres.forEach((genre) => {
  const genreItem = document.createElement("div");
  genreItem.innerHTML = `
        <label>
            <input type="checkbox" class="genre" value="${genre}">
            ${genre}
        </label>
    `;
  genreList.appendChild(genreItem);
});

// Update user preferences based on selected genres
document.querySelectorAll(".genre").forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    const genre = event.target.value;
    if (event.target.checked) {
      userPreferences[genre] = true;
    } else {
      delete userPreferences[genre];
    }
  });
});

// Recommend movies when the button is clicked
recommendButton.addEventListener("click", () => {
  const recommendedMovies = getRecommendations(userPreferences);
  displayRecommendations(recommendedMovies);
});

// Get movie recommendations based on user preferences
function getRecommendations(preferences) {
  return movies.filter((movie) =>
    movie.genres.some((genre) => preferences[genre])
  );
}

// Display the recommended movies
function displayRecommendations(recommendedMovies) {
  recommendationList.innerHTML = "";
  recommendedMovies.forEach((movie) => {
    const listItem = document.createElement("li");
    listItem.textContent = movie.title;
    recommendationList.appendChild(listItem);
  });
}
