import React from 'react';
import Slider from "react-slick";
import FeedbackDisplay from "../../Feedbacks/FeedbackDisplay/FeedbackDisplay"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./UsersFeedbacks.module.css"
import SectionTitle from '../../../SectionTitle/SectionTitle';
const UsersFeedbacks = ({feedbacks}) => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: classes.slicker,

    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
            infinite: true,
          dots: true
        }
      },
    ]
  }

  const userFeedbacks = feedbacks.sort((feedback, feedback2)=> feedback.date < feedback2.date ? 1 : -1 ).map((feedback, index)=>{
    return (<FeedbackDisplay 
      key={index} 
      feedback={feedback} 
      cName={{cName : "homeFeedback"}}
      />)
  })

    return (
      <div className={classes.feedbacksContainer}>
        <SectionTitle>Atsiliepimai</SectionTitle>
          <Slider {...settings}>
            {userFeedbacks}
          </Slider>
    </div>
    );
};

export default UsersFeedbacks;