import React from 'react';
import SectionTitle from "../../../SectionTitle/SectionTitle"
import TopicDescription from '../TopicDescription/TopicDescription';
import TopicTitle from '../TopicTitle/TopicTitle';
import classes from "./AboutUsTopics.module.css"

const AboutUsTopics = ({aboutUs,title, handleChangeTitle}) => {

    const topicsTitle = aboutUs.map((topic,index)=>{
        return <TopicTitle 
            key={index} 
            topic={topic}
            title={title} 
            action={handleChangeTitle}
        />
    })

    const topicsDescription = aboutUs.map((topic,index)=>{
        if(title===topic.title){
            return <TopicDescription 
                key={index} 
                topic={topic}
            /> 
        }else{
            return undefined
        }
    })

    return (
        <div className={classes.aboutContainer}>
            <SectionTitle>{title}</SectionTitle>
            <div className={classes.aboutBlock}>
                <div className={classes.topics}>
                    {topicsTitle}
                </div>
                {topicsDescription}
            </div>
        </div>
    );
};

export default AboutUsTopics;