import React from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { ImTree } from "react-icons/im";
const CourseCard=({cardData,currentCard,setCurrentCard})=>
{
    return(
        <div>
            <div className={`flex flex-col h-[300px] w-[341.33px]
                  ${cardData.heading===currentCard
                  ?" bg-[#FFFFFF]  "

                  :" bg-[#161D29]"}
            `}>
                <div className={`flex flex-col h-[244px] gap-3 pt-[32px] pb-[54px] px-[24px] 
                ${cardData.heading===currentCard}
                ?  
                `}>
                    <p className={`text-xl font-semibold leading-7  
                     ${cardData.heading===currentCard
                        ?" text-[#161D29] "
      
                        :" text-[#FFFFFF]"}
                      object-cover`}>{cardData.heading}</p>
                    <p className="font-normal leading-6 text-[#585D69]">{cardData.description}</p>
                </div>

                <div className=" flex flex-row justify-between items-center px-[16px] py-[24px] gap-x-5 border-t border-dashed border-[#C5C7D4]">
                    <div className="h-[24px] w-[97px] gap-2 flex flex-row">
                        <div className="h-[20px] w-[20px] text-[#0A5A72]">
                            <HiMiniUsers />
                        </div>
                        <div className="h-[24px] w-[69px]">
                            <p className="text-[#0A5A72] font-medium font-serif size-4 flex items-center leading-6">{cardData.level}</p>
                        </div>
                    </div>
                    <div className=" h-[24px] gap-2 flex flex-row items-center"> 
                        <div className="h-[20px] w-[20px] text-[#0A5A72]">
                            <ImTree />
                        </div>
                        <div className="h-[24px]  flex flex-row">
                            <p className="text-[#0A5A72] font-medium font-serif  leading-6">{cardData.lessionNumber} Lessons</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CourseCard;