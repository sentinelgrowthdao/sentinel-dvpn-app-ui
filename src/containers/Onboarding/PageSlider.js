import React from "react";
import Button, { variants } from "../../components/Button";
import styles from "./page-slider.module.scss";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import SlideThree from "./SlideThree";

const slides = [SlideOne, SlideTwo, SlideThree];

const PageSlider = ({ navigateTo, currentSlide, goToNextSlide }) => {
  return (
    <div className={styles.root}>
      {currentSlide === 0 && <SlideOne />}
      {currentSlide === 1 && <SlideTwo />}
      {currentSlide === 2 && <SlideThree />}

      <section className={styles.bottom}>
        {slides.length - 1 === currentSlide ? (
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
