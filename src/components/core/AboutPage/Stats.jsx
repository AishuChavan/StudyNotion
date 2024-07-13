import React from "react";


const Stats=[
    {count:"5K",label:"Active Students"},
    {count:"10+",label:"Mentors"},
    {count:"200+",label:"Courses"},
    {count:"50+",label:"Awards"},
];

const StatsComponents=()=>
    {
        return(
            <section>
                <div>
                    <div className=' flex w-10/12 mx-auto justify-center items-center'>
                        {
                            Stats.map((data,index)=>
                            {
                                return(
                                    <div key={index} className=' flex flex-col justify-center items-center px-20 py-10 gap-2'>
                                        <h1  className=' text-2xl font-bold'>{data.count}</h1>
                                        <h2 className=' text-sm text-richblack-500 font-semibold'>{data.label}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        )
    }

    
export default StatsComponents;