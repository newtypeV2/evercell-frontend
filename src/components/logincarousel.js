import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import evercellCarousel1 from '../assets/evercellCarousel1.png'
import evercellCarousel2 from '../assets/evercellCarousel2.png'
import evercellCarousel3 from '../assets/evercellCarousel3.png'
import evercellCarousel4 from '../assets/evercellCarousel4.png'
 
class LoginCarousel extends Component {
    render() {
        return (
            <Carousel className="carouselcontainer"
                width="60%"
                showArrows={true}
                showStatus={false}
                showIndicators={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                transitionTime={1000}
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
                <div>
                    <img src={evercellCarousel4} alt="page4"/>
                </div>
            </Carousel>
        );
    }
}
 
export default LoginCarousel
// ReactDOM.render(<LoginCarousel />, document.querySelector('.login-carousel'));
 