import "../styles/About.css";

function About() {
  return (
    <section className="about-section" id="about">

      <div className="about-container">

        <div className="about-content">

          <span className="about-tag">
            ABOUT OUR APP
          </span>

          <h2>
            Discover the Joy of
            <span> Cooking</span>
          </h2>

          <p>
            Welcome to Food Recipe App, your perfect
            destination for discovering delicious recipes
            from around the world.
          </p>

          <p>
            Whether you love traditional Indian dishes,
            healthy meals, tasty snacks, or delicious
            desserts, we have something special for you.
          </p>

          <p>
            Explore recipes, discover new flavors,
            save your favorite dishes, and make
            every meal memorable.
          </p>

          <div className="about-features">

            <div className="about-feature">
              <span>🍽️</span>
              <h4>Easy Recipes</h4>
              <p>Simple steps for everyone.</p>
            </div>

            <div className="about-feature">
              <span>❤️</span>
              <h4>Your Favorites</h4>
              <p>Like and save recipes.</p>
            </div>

            <div className="about-feature">
              <span>🌍</span>
              <h4>Explore Flavors</h4>
              <p>Discover different cuisines.</p>
            </div>

          </div>

        </div>

        <div className="about-image">

          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=900"
            alt="Delicious food served on a table"
          />

          <div className="about-image-text">
            <h3>Made with Love ❤️</h3>
            <p>Good food brings everyone together.</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;