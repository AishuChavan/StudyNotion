import React, { useEffect, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiConnector } from '../../services/apiconnector';
import { categoryEndpoints } from '../../services/apis';
import { BsChevronDown } from 'react-icons/bs';


function CatalogDropDown({ link }) {
    const [subCategories, setSubCategories] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const matchRoute = (route) => {
        return matchPath( {path: route}, location.pathname);
    }

    const fetchCategories = async () => {
        try {
            const result = await apiConnector("GET", categoryEndpoints.GET_ALL_CATEGORIES_API);
            //console.log("result is ",result);
            //console.log("data is ",result?.data?.data);
            setSubCategories(result?.data?.data);
            
        } catch (error) {
            console.log(error.message);
            toast.error("Error in fetching subcategories");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <div
                className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
            >
                <p>{link.title}</p>
                <BsChevronDown />
                <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                    <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                    {loading ? (
                        <p className="text-center">Loading...</p>
                    ) : subCategories?.length ? (
                        <>
                            {subCategories
                                ?.map((subLink, i) => (
                                    <Link
                                        to={`/catalog/${subLink.name
                                            .split(" ")
                                            .join("-")
                                            .toLowerCase()}`}
                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                        key={i}
                                    >
                                        <p>{subLink.name}</p>
                                    </Link>
                                ))}
                        </>
                    ) : (
                        <p className="text-center">No Courses Found</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default CatalogDropDown;