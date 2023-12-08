import React, {useEffect} from 'react';
import CarouselImage from "../components/main/home/CarouselImage";
import Find from "../components/main/home/Find";
import Counter from "../components/main/home/Counter";
import FAQ from "../components/main/home/FAQ";
import Testimonials from "../components/main/home/Testimonials";
import Feedback from "../components/main/home/Feedback";


const HomePage = () => {
        useEffect(() => {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        })
    return (
        <div>
            <CarouselImage/>
            <Find/>
            <Counter/>
            <FAQ/>
            <Testimonials/>
            <Feedback/>
        </div>
    );
};

export default HomePage;