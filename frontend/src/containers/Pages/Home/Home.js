import React, { useEffect, useState } from "react";
import axios from "axios";
import rateLimit from "axios-rate-limit";
import HomeAbout from "../../../components/Pages/Home/HomeAbout/HomeAbout";
import HomeCover from "../../../components/Pages/Home/HomeCover/HomeCover";
import HomeMeniu from "../../../components/Pages/Home/HomeMeniu/HomeMeniu";
import UsersFeedbacks from "../../../components/Pages/Home/UsersFeedbacks/UserFeedbacks";
import classes from "./Home.module.css";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
export const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const http = rateLimit(axios.create(), {
      maxRequests: 2,
      perMilliseconds: 1000,
    });
    const getData = async () => {
      setLoading(true);
      console.log("CIA");
      try {
        await http.get("http://localhost:5000/feedbacks/home").then((resp) => {
          console.log(resp.data);
          setFeedbacks(resp.data);
        });
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className={classes.homeContainer}>
      {loading ? (
        <LoadingScreen loading={loading} />
      ) : (
        <>
          <HomeCover />
          <HomeMeniu />
          <HomeAbout />
          {feedbacks.length && <UsersFeedbacks feedbacks={feedbacks} />}
        </>
      )}
    </div>
  );
};
