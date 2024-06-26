import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { PrevArrow, NextArrow } from "../../Other/SliderArrow";
import ImageGallery from "react-image-gallery";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconButton } from "@mui/material";

export default function ProductDetailSlideTwo({ data, product_images }) {
  const slider1Settings = {
    arrows: false,
    swipe: false,
    slidesToShow: 1,
  };

  const slider2Setting = {
    arrows: true,
    focusOnSelect: true,
    slidesToShow: 2,
    arrows: true,
    centerMode: true,
    centerPadding: "80px",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerPadding: "50px",
        },
      },
    ],
  };
  // console.log(data.images);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  // const productImages = data.images
  // console.log("productImages",productImages)
  // const imageData =[
  //   {id:0,image_url:'https://firebasestorage.googleapis.com/v0/b/kozmo-cloud.appspot.com/o/kozmocloud%2Fproducts%2Fvesca220ch%2FMon%2C%2014%20Aug%202023%2007%3A25%3A30%20GMT--3943-1-1000.jpg?alt=media&token=75724c5d-ef48-45d2-a4ed-9fa5d182c63b'},
  //   {id:2,image_url:'https://firebasestorage.googleapis.com/v0/b/kozmo-cloud.appspot.com/o/kozmocloud%2Fproducts%2Fvesca220ch%2FMon%2C%2014%20Aug%202023%2007%3A25%3A30%20GMT--3943-1-1000.jpg?alt=media&token=75724c5d-ef48-45d2-a4ed-9fa5d182c63b'},
  //   {id:3,image_url:'https://firebasestorage.googleapis.com/v0/b/kozmo-cloud.appspot.com/o/kozmocloud%2Fproducts%2Fvesca220ch%2FMon%2C%2014%20Aug%202023%2007%3A25%3A30%20GMT--3943-1-1000.jpg?alt=media&token=75724c5d-ef48-45d2-a4ed-9fa5d182c63b'},
  //   {id:4,image_url:'https://firebasestorage.googleapis.com/v0/b/kozmo-cloud.appspot.com/o/kozmocloud%2Fproducts%2Fvesca220ch%2FMon%2C%2014%20Aug%202023%2007%3A25%3A30%20GMT--3943-1-1000.jpg?alt=media&token=75724c5d-ef48-45d2-a4ed-9fa5d182c63b'},
  //   {id:5,image_url:'https://firebasestorage.googleapis.com/v0/b/kozmo-cloud.appspot.com/o/kozmocloud%2Fproducts%2Fvesca220ch%2FMon%2C%2014%20Aug%202023%2007%3A25%3A30%20GMT--3943-1-1000.jpg?alt=media&token=75724c5d-ef48-45d2-a4ed-9fa5d182c63b'},
  //   {id:6,image_url:'https://firebasestorage.googleapis.com/v0/b/kozmo-cloud.appspot.com/o/kozmocloud%2Fproducts%2Fvesca220ch%2FMon%2C%2014%20Aug%202023%2007%3A25%3A30%20GMT--3943-1-1000.jpg?alt=media&token=75724c5d-ef48-45d2-a4ed-9fa5d182c63b'},

  // ]

  // console.log("imageDataimageData=",imageData)

  const [images, setImages] = useState([]);
  console.log("product_images", product_images);

  useEffect(() => {
    let images__ = [...images];
    for (let element of product_images) {
      images__.push({
        original: element?.image_url,
        thumbnail: element?.image_url,
      });
    }
    setImages(images__);
  }, []);

  // const images = [
  //   {
  //     original: "https://picsum.photos/id/1018/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1018/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  // ];

  console.log("images", images);

  return (
    <div className="product-detail__slide-two main_slider">
      {images.length <= 1 ? (
        <>
          <div className="slider__item">
            <img src={images[0]?.original} alt="Product image" />
          </div>
        </>
      ) : (
        <ImageGallery
          showFullscreenButton={false}
          renderRightNav={(onClick, disabled) => (
            <div className="rightNavDetailPage">
              <IconButton onClick={onClick} disabled={disabled}>
                <FaChevronRight />
              </IconButton>
            </div>
          )}
          renderLeftNav={(onClick, disabled) => (
            <div className="leftNavDetailPage">
              <IconButton onClick={onClick} disabled={disabled}>
                <FaChevronLeft />
              </IconButton>
            </div>
          )}
          items={images}
          showPlayButton={false}
        />
      )}

      {/* <div className="product-detail__slide-two__big">
        <Slider asNavFor={nav2} ref={(c) => setNav1(c)} {...slider1Settings}>
          {data?.images?.map((img, index) => (
            <div key={index} className="slider__item">
              <img src={img?.image_url} alt="Product image" />
            </div>
          ))}
        </Slider>
      </div> */}
      {/* <div className="product-detail__slide-two__small">
        {data.images.length !== 1 ? (
          <Slider asNavFor={nav1} ref={(c) => setNav2(c)} {...slider2Setting}>
            {data?.images?.map((val, index) => (
              <div
                key={index}
                className="slider__item"
                style={{ Width: "100px" }}
              >
                <img
                  style={{ height: "100%", width: "100%" }}
                  key={index}
                  src={val?.image_url}
                  alt="Product image"
                />
              </div>
            ))}
          </Slider>
        ) : (
          ""
        )}
      </div> */}
    </div>
  );
}
