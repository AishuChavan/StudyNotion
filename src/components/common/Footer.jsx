import React from 'react';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import FooterBlocks from './FooterBlocks';
import { FooterLink2 } from "../../data/footer-links";
import { Link } from 'react-router-dom';


function Footer() {

    const Resources = ["Articles","Blog","Chart Sheet","Code challenges","Docs","Projects","Videos","Workspaces"];
    const Plans = ["Paid memberships", "For students", "Business solutions"];
    const Community = ["Forums", "Chapters", "Events"];
    const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
    return (
        <div className=' bg-richblack-800'>
            {/* Upper Part  */}
            <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
                <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
                    {/* Section 1  */}
                    <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
                        <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
                            <img src={Logo} alt="Company Logo" />
                            <FooterBlocks heading={"Company"} array={["About", "Careers", "Affiliates"]}/>
                            <div className="flex gap-3 text-lg">
                                <FaFacebook />
                                <FaGoogle />
                                <FaTwitter />
                                <FaYoutube />
                            </div>
                        </div>
                        
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                            <FooterBlocks heading={"Resources"} array={Resources}/>
                            <FooterBlocks heading={"Support"} array={["Help Center"]}/>
                        </div>
                        
                        <div className=' w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
                            <FooterBlocks heading={"Plans"} array={Plans}/>
                            <FooterBlocks heading={"Community"} array={Community}/>
                        </div>
                    </div>
               

                    {/* Section 2  */}
                    <div className=' lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3'>
                        {
                            FooterLink2.map( (ele,i) => (
                                <div
                                    key={i}
                                    className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'
                                >
                                    <h1 className=' text-richblack-50 font-semibold text-[16px]'>
                                        {ele.title}
                                    </h1>

                                    <div className='flex flex-col gap-2 mt-2'>
                                        {
                                            ele.links.map( (link,i) => (
                                                <div
                                                    key={i}
                                                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                                >
                                                    <Link to={link.link}>{link.title}</Link>
                                                </div>
                                            ))
                                        }
                                    </div>


                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </div>
            
            {/* Lower Part  */}
            <div className=' flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm'>
                <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
                    <div className="flex flex-row">
                        {
                            BottomFooter.map( (ele,i) => (
                                <div
                                    key={i}
                                    className={`cursor-pointer hover:text-richblack-50 transition-all duration-200 px-3
                                                ${BottomFooter.length - 1 !== i && "border-r border-richblack-700 "}`}
                                >
                                    <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                                        {ele}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className=' text-center'>
                        <p>Made with ❤️ A&C © 2024 Studynotion</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;