import React, { useState } from "react";
import { IoStarSharp } from "react-icons/io5";

import "./StarRating.css";

function StarRating(props) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="rating-control" key={props.id}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <IoStarSharp
              className="star-icon"
              size={35}
              color={ratingValue <= (hover || rating) ? "#094067" : "#5f6c7b"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
