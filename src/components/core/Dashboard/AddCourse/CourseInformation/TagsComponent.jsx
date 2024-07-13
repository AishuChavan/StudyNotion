import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { IoAddCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';

// Requirement
function TagsComponent({
    name, label,placeholder, register, errors,setValue,getValues
}) {
    const {course,editCourse} = useSelector(state => state.course);
    const [tags,setTags] = useState("");
    const [tagsList,setTagsList] = useState([]);

    useEffect( () => {
        if (editCourse) {
            setTagsList(course?.instructions || []);
        }
        register(
            name, {
                required: true,
                validate: (value) => value.length > 0
            }
        )   
    });

    useEffect( () => {
        setValue(name,tagsList);
    },[tagsList])



    const handleAddTag = () => {
        if(tags){
            setTagsList([...tagsList, tags]);
            setTags("");
        }
    }

    const handleRemoveTag = (index) => {
        const updatedtagsList = [...tagsList];
        updatedtagsList.splice(index,1);
        setTagsList(updatedtagsList);
    }

    return (
        <div>
            <div className=' flex flex-col items-start justify-center gap-1'>
                <label className=' text-richblack-300 text-base'
                    htmlFor={name}>
                    {label} <sup className=' text-destructive'>*</sup>

                    {
                        tagsList.length > 0 &&
                        <div className=' flex gap-2 my-2'>
                            {
                                tagsList.map( (item,i) => (
                                    <div key={i} className=' flex gap-3'>
                                        <p className='flex gap-2 justify-normal items-center py-1 px-2 bg-yellow-100 text-black rounded-full'>
                                            {item}
                                            <span className=' cursor-pointer text-richblack-800 italic'
                                                onClick={ () => handleRemoveTag(i)}
                                            >
                                                <MdClose />
                                            </span>
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </label>
                <div className=' flex w-full gap-2'>
                    <input
                        id={name}
                        name={name}
                        value={tags}
                        placeholder={placeholder}
                        onChange={ (e) => setTags(e.target.value)}
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
                            Please add {name}
                        </span>
                    }

                    <span className=' text-yellow-50 cursor-pointer font-semibold mt-2 text-3xl items-center'
                        onClick={ () => handleAddTag()}
                    >
                        <IoAddCircle />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TagsComponent;