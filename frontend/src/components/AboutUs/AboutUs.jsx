import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-us-content">
        <h1>About Us</h1>
        <p>
          Welcome to [Your Restaurant Name], where we bring you the finest dining experience in [City/Location]. Established in [Year], our restaurant is known for its [mention any special dishes, style of cuisine, or unique features].
        </p>
        <p>
          Our mission is to provide high-quality, delicious food and exceptional service in a warm and inviting atmosphere. We source our ingredients from local farms and ensure that every dish is prepared with the utmost care and attention to detail.
        </p>
        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="/images/chef1.jpg" alt="Chef John Doe" />
              <h3>Chef John Doe</h3>
              <p>Head Chef</p>
              <p>With over 20 years of culinary experience, Chef John Doe leads our kitchen with passion and creativity.</p>
            </div>
            <div className="team-member">
              <img src="/images/manager.jpg" alt="Jane Smith" />
              <h3>Jane Smith</h3>
              <p>Restaurant Manager</p>
              <p>Jane ensures that every guest has a memorable experience, overseeing all aspects of our restaurant’s operations.</p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
