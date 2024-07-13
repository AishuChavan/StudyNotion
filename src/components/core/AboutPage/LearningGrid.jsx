import React from "react";
import CTAButton from "../HomePage/Button"
import HighlightText from "../HomePage/HighlightText";
const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "The learning process uses the namely online and offline.",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
];
const LearningGrid=()=>
    {
        return (
            <div className=' grid grid-cols-1 lg:grid-cols-4 mx-auto mb-10 w-9/12 mt-20'>
              {
                LearningGridArray.map((card,index)=>
                {
                  return(
                    <div
                    key={index}
                    className={`${index === 0  && "lg:col-span-2 mb-8 lg:mb-0 lg:mr-8 bg-richblack-900" }
                    ${
                      card.order%2 === 1 ? "bg-richblack-700" : "bg-richblack-800"
                    }
                    ${card.order === 3 && "lg:col-start-2"}
                    flex-col lg:h-64
                    `
                    }
                    >
                      {
                        card.order<0 ? 
                        (
                          <div className=' flex flex-col gap-10 items-start'>
                            <div className=' gap-4 flex flex-col'>
                              <h1 className=' text-4xl font-semibold'>
                              {card.heading}
                              <HighlightText text={card.highlightText} />
                              </h1>
                            
                              <p className=' text-richblack-300 text-base'>
                                {card.description}
                              </p>
                            </div>
                            <div>
                              <CTAButton active={true} linkto={card.BtnLink}>
                                {card.BtnText}
                              </CTAButton>
                            </div>
                          </div>
                        )

                        :
                        (
                          <div className=' flex flex-col items-start justify-start gap-6 p-8'>
                            <div >
                              <h1 className=' text-richblack-5 text-lg font-semibold'>{card.heading}</h1>
                            </div>
                            <div>
                              <p  className=' text-richblack-100 text-sm '>{card.description}</p>
                            </div>
                          </div>
                        )
                      }

                    </div>
                  )

                })
              }
            </div>
        )
    }

export default LearningGrid;