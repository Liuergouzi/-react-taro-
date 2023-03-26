import React, { useState, useEffect } from "react";
import style from "../style/Carousel.module.scss";

/**
 * 轮子哥
 * 手撕轮播图，纯react语法自定义编写
 */

export const CarouselItem: any = ({
  children = React.createElement("div"),
  styles = {},
}) => {
  return (
    <div
      className={style.carousel_item}
      style={{ ...styles }}>
      {children}
    </div>
  );
};

export const CarouselInfo: any = ({ image = "", title = "", content = "" }) => {

  const [isChange,setChange]=useState(false)

  
  useEffect(() => {
    const interval = setInterval(() => {
      setChange(!isChange);
    }, 5000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div className={style.carousel_info}>
      <img src={image} alt="Jay" className={style.carousel_info_image} />
      <div className={isChange? style.carousel_info_text:style.carousel_info_text_2}>
        <div className={style.carousel_info_title}>{title}</div>
        <div className={style.carousel_info_content}>{content}</div>
      </div>
    </div>
  );
  
};


const Carousel: any = ({
  children = React.createElement("div"),
  switchingTime = 3000,
  height = "500px",
  width = "800px",
  dot_max_width = "40px",
  dot_min_width = "20px",
}) => {
  const time = switchingTime/1000; // 将毫秒转换为秒
  const [activeIndex, setActiveIndex] = useState(0); // 对应索引
  const [isNewPlay, setIsNewPlay] = useState(true); // 对应索引

  const onUpdateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
    //replayAnimations();
  };

  // const replayAnimations = () => {
  //   document.getAnimations().forEach((anim) => {
  //     anim.cancel();
  //     anim.play();
  //   });
  // };

  const onClickCarouselIndex = (index) => {
    onUpdateIndex(index);
    setIsNewPlay(!isNewPlay)
    //replayAnimations();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      onUpdateIndex(activeIndex + 1);
    }, switchingTime);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div className={style.container} style={{ height: height, width: width }}>
      <div
        className={style.inner}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child);
        })}
      </div>

      <div className={style.loading}>
        {React.Children.map(children, (index: any, child) => {
          return (
            <div
              className={style.indicator_outer}
              style={{
                width: child === activeIndex ? dot_max_width : dot_min_width,
              }}>
              <div
                className={ isNewPlay?style.indicator_inside:style.indicator_inside_2}
                onClick={() => onClickCarouselIndex(child)}
                style={{
                  animationDuration: child === activeIndex ? `${time}s` : "0s",
                  backgroundColor: child === activeIndex ? "#FFFFFF" : "",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;

