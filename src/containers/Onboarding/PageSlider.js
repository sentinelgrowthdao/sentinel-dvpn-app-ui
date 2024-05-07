import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button, { variants } from "../../components/Button";
import styles from "./page-slider.module.scss";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import SlideThree from "./SlideThree";

const slides = [SlideOne, SlideTwo, SlideThree];

const settings = {
  dots: false,
  arrows: false,
  infinite: false,
  draggable: false,
  swipe: false,
  touchMove: false,
  speed: 0,
  slidesToShow: 1,
  slidesToScroll: 1,
  onSwipe: () => {},
  adaptiveHeight: true,
};

const PageSlider = ({ navigateTo }) => {
  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = React.useState(1);
  const goToNextSlide = () => {
    if (sliderRef && sliderRef.current) {
      sliderRef.current.slickNext();
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className={styles.root}>
      <Slider className={styles.slider} ref={sliderRef} {...settings}>
        {slides.map((Slide, index) => (
          <Slide key={`slide-${index}`} />
        ))}
      </Slider>
      <section className={styles.bottom}>
        {slides.length === currentSlide ? (
          <Button
            className={styles.btn}
            variant={variants.PRIMARY}
            title={"Continue"}
            onClick={() => navigateTo("/import")}
          />
        ) : (
          <Button
            className={styles.btn}
            variant={variants.PRIMARY}
            title={"Next"}
            onClick={goToNextSlide}
          />
        )}
      </section>
    </div>
  );
};

export default PageSlider;
