import React from 'react';
import '../css/about.css';
import image from '../Assets/africans.png';
import Navbar from './navbar';
import Footer from './footer';

function About() {
    return (
        <>
            {/* <Navbar /> */}
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">
                        <div className='text-container'>
                            <h1 className='heading'>Our Story</h1>
                            <p>
                            Our journey began with a simple idea: to create a seamless and enjoyable shopping experience for everyone. Frustrated by the complexity and inefficiency of existing platforms, we set out to build a solution that not only simplifies online shopping but also makes it enjoyable.
                            </p>
                            <p>
                            What started as a small project quickly evolved into a passionate mission. Our team, driven by a shared vision of streamlining online shopping, developed SysCart with a focus on user-friendly design, intuitive navigation, and exceptional customer service.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">
                        <div className="photo">
                            <img src={image} alt="Our Story" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default About;
