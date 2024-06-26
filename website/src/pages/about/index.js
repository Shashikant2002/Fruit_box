import LayoutFour from "../../components/Layout/LayoutOne";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import IntroductionOne from "../../components/Sections/Introduction/IntroductionOne";
import IntroductionEleven from "../../components/Sections/Introduction/IntroductionEleven";
import introductionOneData from "../../data/introduction/introductionOne.json";
// import IntroductionTwo from "../../components/Sections/Introduction/IntroductionTwo";
// import introductionTwoData from "../../data/pages/about.json";
// import TestimonialOne from "../../components/Sections/Testimonial/TestimonialOne";
// import testimonialOneData from "../../data/testimonial/data.json";
// import Benefits from "../../components/Other/Benefits";
// import IntroductionNine from "../../components/Sections/Introduction/IntroductionNine";
// import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";

export default function () {
  return (
    <LayoutFour title="About us">
      <Breadcrumb title="About us">
        <BreadcrumbItem name="Home" path={"/"} />
        <BreadcrumbItem name="About us" current />
      </Breadcrumb>
      {/* <IntroductionOne data={introductionOneData} /> */}
      <IntroductionEleven />

      

      {/* <IntroductionTwo data={introductionTwoData} style={{ marginBottom: 0 }} /> */}
      {/* <TestimonialOne
        data={testimonialOneData}
        style={{ backgroundColor: "#fff", marginBottom: 0 }}
      /> */}
      {/* <IntroductionNine /> */}
      {/* <Benefits /> */}
      {/* <InstagramTwo /> */}
    </LayoutFour>
  );
}
