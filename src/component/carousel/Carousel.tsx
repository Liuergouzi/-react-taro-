import React, { useState, useEffect, ReactElement } from "react";
import style from "./Carousel.module.scss";

/**
 * 轮子哥
 * 手撕轮播图，纯react语法自定义编写
 */

interface CarouselItem {
  children: ReactElement;
  styles?: object;
}

export const CarouselItem: any = React.memo((props: CarouselItem) => {
  return (
    <div
      className={style.carousel_item}
      style={{ ...props.styles }}>
      {props.children}
    </div>
  );
});



interface CarouselInfo {
  image: string,
  title?: string,
  content?: string
}

export const CarouselInfo = React.memo((props: CarouselInfo) => {

  const [isChange, setChange] = useState(false)

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
      <img src={props.image} alt="Jay" className={style.carousel_info_image} />
      <div className={isChange ? style.carousel_info_text : style.carousel_info_text_2}>
        <div className={style.carousel_info_title}>{props.title}</div>
        <div className={style.carousel_info_content}>{props.content}</div>
      </div>
    </div>
  );

});


interface Carousel  {
  children :ReactElement,
  switchingTime : number,
  height ?: string,
  width ?: string,
  dot_max_width ?: string,
  dot_min_width ?: string,
}

const Carousel:any =React.memo( (props:Carousel) => {
  const time = (props.switchingTime % (1000 * 60)) / 1000; // 将毫秒转换为秒
  const [activeIndex, setActiveIndex] = useState(0); // 对应索引
  const [isNewPlay, setIsNewPlay] = useState(true); // 对应索引

  const onUpdateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(props.children) - 1;
    } else if (newIndex >= React.Children.count(props.children)) {
      newIndex = 0;
    }
    setIsNewPlay(!isNewPlay)
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
    }, props.switchingTime);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div className={style.container} style={{ height: props.height, width: props.width }}>
      <div
        className={style.inner}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {React.Children.map(props.children, (child) => {
          return React.cloneElement(child);
        })}
      </div>

      <div className={style.loading}>
        {React.Children.map(props.children, (index: any, child) => {
          return (
            <div
              className={style.indicator_outer}
              style={{
                width: child === activeIndex ? props.dot_max_width : props.dot_min_width,
              }}>
              <div
                className={isNewPlay ? style.indicator_inside : style.indicator_inside_2}
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
});

Carousel.defaultProps ={
  switchingTime : 3000,
  height : "500px",
  width : "800px",
  dot_max_width : "40px",
  dot_min_width : "20px",
}

export default Carousel;

