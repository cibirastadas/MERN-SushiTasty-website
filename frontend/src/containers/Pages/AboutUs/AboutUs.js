import React, { useState } from 'react'
import {aboutUs} from "../../../components/Pages/AboutUs/AboutUsData/AboutUsData"
import PageCovers from '../../../components/PageCovers/PageCovers'
import AboutUsTopics from '../../../components/Pages/AboutUs/AboutUsTopics/AboutUsTopics'

const AboutUs=()=> {
    const [title, setTitle] = useState("Apie mus")

    const handleChangeTitle = (newTitle)=>{
        setTitle(newTitle)
    }

    return (
        <div>
            <PageCovers cName={{coverImg: "coverAbout"}}>Apie mus</PageCovers>
        <AboutUsTopics
                aboutUs={aboutUs}
                title={title}
                handleChangeTitle={handleChangeTitle}
            />
        </div>
    )
}
export default AboutUs