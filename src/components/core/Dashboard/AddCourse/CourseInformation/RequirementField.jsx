import React, { useEffect } from "react"
import { useState } from "react";
import { useSelector } from "react-redux";
function RequirementField({
    name, label,placeholder, register, errors,setValue,getValues
}) {
    const {course,editCourse} = useSelector(state => state.course);
    const [requirement,setRequirement] = useState("");
    const [requirementList,setRequirementList] = useState([]);

    useEffect( () => {
        if (editCourse) {
            setRequirementList(course?.instructions || []);
        }
        register(
            name, {
                required: true,
                validate: (value) => value.length > 0
            }
        )   
    });

    useEffect( () => {
        setValue(name,requirementList);
    },[requirementList])



    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
    }

    return (
        <div>
            <div className=' flex flex-col items-start justify-center gap-1'>
                <label className=' text-richblack-300 text-base'
                    htmlFor={name}>
                    {label} <sup className=' text-destructive'>*</sup>
                </label>
                <input
                    id={name}
                    name={name}
                    value={requirement}
                    placeholder={placeholder}
                    onChange={ (e) => setRequirement(e.target.value)}
                    className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                    style={
                        {
                            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                        }
                    }
                />
                {
                    errors[name] && 
                    <span className='mt-2 text-sm text-destructive' >
                        Please enter {name}
                    </span>
                }

                <span className=' text-yellow-50 cursor-pointer font-semibold mt-2'
                    onClick={ () => handleAddRequirement()}
                >
                    Add
                </span>
                
                {
                    requirementList.length > 0 &&
                    <div className=' flex flex-col gap-2 mt-2'>
                        {
                            requirementList.map( (item,i) => (
                                <div key={i} className=' flex gap-3'>
                                    <p className=' text-richblack-5'>{item}</p>
                                    <span className=' cursor-pointer text-pure-greys-300 italic'
                                        onClick={ () => handleRemoveRequirement(i)}
                                    >
                                        clear
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default RequirementField;