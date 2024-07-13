
import React from "react"
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import TimelineSection from "../components/core/HomePage/TimelineSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection "
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
function Home(){
    return(
        <div>
            {/* Section 1 */}
            <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center gap-7
            text-white justify-between">
                <Link to={"/signup"}>
                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                    transition-all duration-200 hover:scale-95 w-fit shadow-md  shadow-[#FFFFFF2E]">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] 
                        transition-all duration-200 group-hover:bg-richblack-900 sha">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
                <div className="flex flex-col">
                    <div className="text-center text-4xl font-semibold mt-7">
                        Empower Your Future with 
                        <HighlightText text={"Coding Skills"} />
                    </div>

                    <div className="mt-4 w-[80%] mx-auto  text-center gap-4 text-richblack-300">
                        <p className="font-serif leading-7">With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
                    </div>
                </div>

                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className="mx-4 my-12 shadow-[-5px_-5px_5px_0px_#118AB2]">
                    <video
                    muted
                    loop
                    autoPlay
                    className=' h-[30rem] shadow-[20px_20px_0px_0px_#F5F5F5]'
                    >
                    <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* Code section 1 */}
                <div>
                    <CodeBlocks
                        position={
                            "lg:flex-row"
                        }
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock Your
                                <HighlightText text={"coding potential"}/>
                                {" "}with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."

                        }
                        ctabtn1={
                            {
                                btnText:"Try it Yourself",
                                linkto:"/signup",
                                active:true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body><h1><a href="/">Header</a>\n</h1>\n<nav>\n<a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
                        codeColor={"text-[#E7BC5B]"}
                        bgGradient={"var(--Gradient-02, linear-gradient(124deg, #8A2BE2 -6.46%, #FFA500 59.04%, #F8F8FF 124.53%))"}
                    />

                    
                </div>

                {/* Code Section 2 */}
                <div>
                    <CodeBlocks
                        position={
                            "lg:flex-row-reverse"
                        }
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock Your
                                <HighlightText text={"coding potential"}/>
                                {" "}with our online courses
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={
                            {
                                btnText:"Continue Lesson",
                                linkto:"/signup",
                                active:true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body><h1><a href="/">Header</a>\n</h1>\n<nav>\n<a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
                        codeColor={"text-[#F37290]"}
                        bgGradient={"var(--Gradient-05, linear-gradient(118deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%))"}
                    />
                </div>
                <ExploreMore/>

            </div>


            {/* section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700 mt-10">
                <div className="homepage_bg h-[310px]">
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center  justify-between gap-5 mx-auto'>
                        <div className="h-[150px]"></div>
                        <div className="flex gap-7 text-white">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-3">
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div> 
                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div> 
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between
                gap-7">
                    <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                        <div className="text-4xl font-semibold w-[45%]">
                            Get the skills you need for a
                            <HighlightText text={"Job that is in demand"}/>
                        </div>

                        <div className="flex flex-col gap w-[40%] items-start">
                            <div className="text-[16px] mb-6 pb-6">
                                The modern StudyNotion is the dictates its own terms.Today ,to be a competative specialist requires more that professional skills
                            </div>
                            <CTAButton active={true} linkto={"/signup"} >
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                    
                    <TimelineSection />
                    <LearningLanguageSection />
                    
                </div>

                
            </div>
            {/* section 3 */}
            <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-center gap-8 bg-richblak-900 text-white '>
                <InstructorSection/>
                <ReviewSlider/>
                
            </div>

            {/* Footer */}
            <Footer/>
        </div>
    )
}

export default Home;