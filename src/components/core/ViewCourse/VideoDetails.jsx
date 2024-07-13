import { markLectureAsComplete } from '../../../services/operations/courseDetailsApis';
import { setVideoEnded, updateCompletedLectures } from '../../../slices/viewCourseSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; 

function VideoDetails(props) {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const playerRef = useRef(null);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, courseEntireData, completedLectures, loading: viewCourseLoading, videoEnded} =
        useSelector((state) => state.viewCourse);

    const [videoData, setVideoData] = useState([]);
    const [previewSource, setPreviewSource] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!courseSectionData?.length)
            return;
        else if (!courseId || !sectionId || !subSectionId) {
            navigate("/dashboard/enrolled-courses");
            return;
        }
        else {
            const filteredData = courseSectionData.filter(
                (section) => section._id === sectionId
            );
            const filtereVideodData = filteredData?.[0]?.subSection?.filter(
                (subSection) => subSection._id === subSectionId
            );
            setVideoData(filtereVideodData?.[0]);
            setPreviewSource(courseEntireData?.thumbnail)
            dispatch(setVideoEnded(false));
        }
    }, [courseSectionData, courseEntireData, location.pathname]);

    const isFirstVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const currentSubSectionIndx = courseSectionData[currentSectionIndx]
            .subSection.findIndex((data) => data._id === subSectionId)

        if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
            return true
        } else {
            return false
        }
    }

    const isLastVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubsections =
            courseSectionData[currentSectionIndx].subSection.length

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)

        if (
            currentSectionIndx === courseSectionData.length - 1 &&
            currentSubSectionIndx === noOfSubsections - 1
        ) {
            return true
        } else {
            return false
        }
    };

    const goToNextVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubsections =
            courseSectionData[currentSectionIndx].subSection.length

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)

        if (currentSubSectionIndx !== noOfSubsections - 1) {
            const nextSubSectionId =
                courseSectionData[currentSectionIndx].subSection[
                    currentSubSectionIndx + 1
                ]._id
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            )
        } else {
            const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
            const nextSubSectionId =
                courseSectionData[currentSectionIndx + 1].subSection[0]._id
            navigate(
                `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            )
        }
    };

    const goToPrevVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)

        if (currentSubSectionIndx !== 0) {
            const prevSubSectionId =
                courseSectionData[currentSectionIndx].subSection[
                    currentSubSectionIndx - 1
                ]._id
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            )
        } else {
            const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
            const prevSubSectionLength =
                courseSectionData[currentSectionIndx - 1].subSection.length
            const prevSubSectionId =
                courseSectionData[currentSectionIndx - 1].subSection[
                    prevSubSectionLength - 1
                ]._id
            navigate(
                `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            )
        }
    }
    
    const handleLectureCompletion = async () => {
        setLoading(true)
        const res = await markLectureAsComplete(
          { courseId: courseId, subsectionId: subSectionId },
          token
        )
        if (res) {
          dispatch(updateCompletedLectures(subSectionId))
        }
        setLoading(false)
    }

    const handleRewatch = () => {
        if(playerRef?.current){
            playerRef?.current?.seek(0);
            dispatch(setVideoEnded(false));
        }
    }
    
    return (
        <div className=' flex flex-col gap-5 text-white '>
            {
                !videoData ?  
                <img
                    src={previewSource}
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                />
                :
                (
                    <div className=' relative'>
                        <Player
                            ref={playerRef}
                            src={videoData?.videoUrl}          
                            playsInline
                            aspectRatio='16:9'   
                            onEnded={ () => dispatch(setVideoEnded(true))}      
                        />

                        {
                            videoEnded &&
                            <div
                                style={{
                                    backgroundImage:
                                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                                }}
                                className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                            > 
                                <div className='mt-10 flex flex-col min-w-[250px] items-center justify-center gap-x-4 text-xl'> 
                                    {
                                        !completedLectures.includes(subSectionId) &&
                                        <button className=' yellowButton mb-2 w-fit'
                                            onClick={ () => handleLectureCompletion()}
                                        >
                                            {
                                                loading ? "loading..." : "Mark as Completed"
                                            }
                                        </button>
                                    }

                                    <button className=' yellowButton w-fit' onClick={() => handleRewatch()}>
                                        Rewatch
                                    </button>
                                </div>


                                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">      
                                    {
                                        !isFirstVideo() &&
                                        <button 
                                            className=' blackButton'
                                            onClick={goToPrevVideo}
                                            
                                        >
                                            Prev
                                        </button> 
                                    }
                                    {
                                        !isLastVideo() &&
                                        <button 
                                            className=' blackButton'
                                            onClick={goToNextVideo}
                                        >
                                            Next
                                        </button> 
                                    }
                                </div>

                            </div>
                        } 
                    </div>
                )
            }

            <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
            <p className="pt-2 pb-6">{videoData?.description}</p>
        </div>
    );
}

export default VideoDetails;