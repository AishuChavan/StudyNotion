import React from 'react';
import { Link } from 'react-router-dom';

function FooterBlocks({heading, array}) {
    return (
        <div className='mb-7 lg:pl-0'>
            <h1 className="text-richblack-50 font-semibold text-[16px] mb-2">
                {heading}
            </h1>
            <div className=' flex flex-col gap-2'>
                {
                    array.map( (ele,i) => (
                        <div
                            key={i}
                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                            <Link to={`${ele.split(" ").join("-").toLowerCase()}`}>
                                {ele}
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default FooterBlocks;