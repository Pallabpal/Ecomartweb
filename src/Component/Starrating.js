import React from 'react';
const StarRating = ({ rating }) => {
  // Calculate the number of full and half stars
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  const stars = [];
  
  // Fill full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} className="fas fa-star"></i>);
  }
  
  // Fill half star, if necessary
  if (halfStar) {
    stars.push(<i class="fa-solid fa-star-half-stroke" ></i>);
  }

  // Fill remaining stars with empty stars
  for (let i = stars.length; i < 5; i++) {
    stars.push(<i key={i} className="far fa-star"></i>);
  }

  return (
  <span className="star-rating" style={{color:"#FFC600", fontSize:"13px"}}>{stars}</span>
  );
};

export default StarRating;