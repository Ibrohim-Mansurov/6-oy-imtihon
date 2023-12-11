import home__img from "../../images/home.svg";
import { useState, useEffect } from "react";
import { instance } from "../../api";
import { Link } from "react-router-dom";

// import { Swiper, SwiperSlide } from "swiper/react";

// import { Autoplay, Pagination, Navigation } from "swiper/modules";
const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    instance("/api/posts")
      .then((response) => setArticles(response.data.data))
      .catch((error) => console.log(error));
  }, []);
  console.log(articles);

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 13) {
      return words.slice(0, 13).join(" ") + "...";
    }
    return description;
  };

  return (
    <>
      <img className="home__img" src={home__img} alt="" />
      <div className="home__item">
        <h2 className="home__title">All articles</h2>
        <div className="home__articles">
          {articles.map((article) => (
            <Link
              to={`/product-view/${article._id}`}
              className="home__article"
              key={article._id}
            >
              <img className="home__article-img" src={article.image} alt="" />
              <h3 className="home__article-title">{article.title}</h3>
              <p className="home__article-description">
                {truncateDescription(article.description)}
              </p>
            </Link>
          ))}
          {/* <Swiper
            slidesPerView={3}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper> */}
        </div>
      </div>
    </>
  );
};

export default Home;
