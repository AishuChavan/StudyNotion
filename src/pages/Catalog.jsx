import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer"
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import {categoryEndpoints} from "../services/apis"
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_Card";
import toast from "react-hot-toast";
function Catalog(props)
{
    const {catalog}=useParams();
    //console.log("catalog nam ei s",catalog);
    const [catalogPageData,setCatalogPageData]=useState("");
    const [categoryId,setCategoryId]=useState("");
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(1);
    //fetch all categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const result = await apiConnector("GET", categoryEndpoints.GET_ALL_CATEGORIES_API);
            const category_Id = result?.data?.data
                .filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalog)[0]._id;
            
                //console.log("all categories is ",result?.data?.data);

                //console.log("categoru id is ",category_Id);
            setCategoryId(category_Id);
        } catch (error) {
            console.log(error.message);
            toast.error("Error in fetching categories");
        }
        setLoading(false);
    }

    const fetchCategoryDetails = async () => {
        setLoading(true);
        try {
            const result = await getCatalogaPageData(categoryId);
            setCatalogPageData(result?.data);

        } catch (error) {
            console.log(error.message);
            toast.error("Error in fetching category details");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCategories();
    }, [catalog]);

    useEffect(() => {
        if(categoryId)
            fetchCategoryDetails();
        
    }, [categoryId]);
    


    if (loading) {
        return <div className=' w-full min-h-[calc(100%-3.5rem)] flex justify-center items-center m-auto'>
            <div className=' loader'>
            </div>
        </div>
    }


    return (
        <>
            {
                !catalogPageData  ? 
                <div className=' flex w-full h-full justify-center items-center text-xl font-semibold text-richblack-100 mt-10'>
                    No courses found for the selected category.
                </div> 
                :
                <>
                    
                    {/* Hero Section */}
                    <div className=" box-content bg-richblack-800 px-4">
                        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                            <p className="text-sm text-richblack-300">
                                {`Home / Catalog / `}
                                <span className="text-yellow-25">
                                    {catalogPageData?.selectedCategory?.name}
                                </span>
                            </p>
                            <p className="text-3xl text-richblack-5">
                                {catalogPageData?.selectedCategory?.name}
                            </p>
                            <p className="max-w-[870px] text-richblack-200">
                                {catalogPageData?.selectedCategory?.description}
                            </p>
                        </div>
                    </div>

                    {/* Section 1 */}
                    <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                        <div className="text-2xl font-bold text-richblack-5 lg:text-4xl">Courses to get you started</div>
                        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                            <p
                                className={`px-4 py-2 ${active === 1
                                        ? "border-b border-b-yellow-25 text-yellow-25"
                                        : "text-richblack-50"
                                    } cursor-pointer`}
                                onClick={() => setActive(1)}
                            >
                                Most Popular
                            </p>
                            <p
                                className={`px-4 py-2 ${active === 2
                                        ? "border-b border-b-yellow-25 text-yellow-25"
                                        : "text-richblack-50"
                                    } cursor-pointer`}
                                onClick={() => setActive(2)}
                            >
                                New
                            </p>
                        </div>
                        <div>
                            <CourseSlider
                                Courses={catalogPageData?.selectedCategory?.courses}
                            />
                        </div>
                    </div>
                    {/* Section 2 */}
                    <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                        <div className="text-2xl font-bold text-richblack-5 lg:text-4xl">
                            Top courses in {catalogPageData?.differentCategory?.name}
                        </div>
                        <div className="py-8">
                            <CourseSlider
                                Courses={catalogPageData?.differentCategory?.courses}
                            />
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                        <div className="text-2xl font-bold text-richblack-5 lg:text-4xl">Frequently Bought</div>
                        <div className="py-8">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {catalogPageData?.mostSellingCourses
                                    ?.slice(0, 4)
                                    .map((course, i) => (
                                        <Course_Card course={course} key={i} Height={"h-[400px]"} />
                                    ))}
                            </div>
                        </div>
                    </div>

                    <Footer />
                </>
            }       
        </>
    )
}

export default Catalog;