import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import evercellCarousel1 from '../assets/evercellCarousel1.png'
import evercellCarousel2 from '../assets/evercellCarousel2.png'
import evercellCarousel3 from '../assets/evercellCarousel3.png'
 
class LoginCarousel extends Component {
    render() {
        return (
            <Carousel className="carouselcontainer"
                width="30%"
                showArrows={false}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={7000}
                transitionTime={900}
                swipeable={false}
            >
                <div>
                    <img src={evercellCarousel1} alt="page1"/>
                </div>
                <div>
                    <img src={evercellCarousel2} alt="page2"/>
                </div>
                <div>
                    <img src={evercellCarousel3} alt="page3"/>
                </div>
            </Carousel>
        );
    }
}
 
export default LoginCarousel
// ReactDOM.render(<LoginCarousel />, document.querySelector('.login-carousel'));
 