
import React, { useState, useEffect, useMemo, useRef } from 'react'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import './Dashboard.css'
import Swal from 'sweetalert2'

const tempDB = [
    {
        email: "N/A",
        first_name: "N/A",
        gender: "N/A",
        int_gender: "N/A",
        int_vaxx_status: "N/A",
        interests: "N/A",
        likes: null,
        password: "N/A",
        postcode: 0,
        surname: "",
        url: "",
        user_id: "",
        vaxx_status: ""
    },
    {
        email: "N/A",
        first_name: "N/A",
        gender: "N/A",
        int_gender: "N/A",
        int_vaxx_status: "N/A",
        interests: "N/A",
        likes: null,
        password: "N/A",
        postcode: 0,
        surname: "",
        url: "",
        user_id: "",
        vaxx_status: ""
    },
    {
        email: "N/A",
        first_name: "N/A",
        gender: "N/A",
        int_gender: "N/A",
        int_vaxx_status: "N/A",
        interests: "N/A",
        likes: null,
        password: "N/A",
        postcode: 0,
        surname: "",
        url: "",
        user_id: "",
        vaxx_status: ""
    }
]


const MatchingDashboard = () => {
    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [targetUsers, setTargetUsers] = useState(null)

    const userId = cookies.UserId

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:3001/dashboard/user', {
                params: {userId}
            })
            setUser(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    const getTargetUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/dashboard/targetusers', {
                params: {
                    int_gender: user?.int_gender,
                    int_vaxx_status: user?.int_vaxx_status,
                    postcode: user?.postcode,
                    user_id: userId
                }
            })

            setTargetUsers(response.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (user) {
            getTargetUsers()
        }
    }, [user])

    if (!Array.isArray(targetUsers)) {
        return <MatchingDashboardInner targetUsers={tempDB} user={user} user_id={userId} getUser={getUser} />
    }
    
    // if(user.likes != null) {
    //     const LikedUserIds = user?.likes.concat(userId)
    //     const filteredTargetUsers = targetUsers?.filter(targetUser => !LikedUserIds?.includes(targetUser.user_id))
    //     setTargetUsers(filteredTargetUsers)
    // }
        // console.log(userId)
        // console.log(filteredTargetUsers)

    // const LikedUserIds = user.likes.concat(userId)
    // const filteredTargetUsers = targetUsers?.filter(targetUser => !LikedUserIds.includes(targetUser.user_id))

    return <MatchingDashboardInner targetUsers={targetUsers} user={user} user_id={userId} getUser={getUser} />
}

const MatchingDashboardInner = ({ targetUsers, user, user_id, getUser }) => {

    const [currentIndex, setCurrentIndex] = useState(targetUsers.length - 1)
    const [lastDirection, setLastDirection] = useState()
    const [lastProfileId, setLastProfileId] = useState()

    const addLike = async (liked_user_id, swipedLikes) => {
        try {
            const response = await axios.put('http://localhost:3001/dashboard/addlike', {
                user_id,
                liked_user_id
            })

            const success = response.status === 200

            if (success) {
                console.log(liked_user_id, 'is ADDED')
                getUser()
                if (swipedLikes != null) {
                    checkMatch(liked_user_id, swipedLikes)
                }
            } else {
                console.log(liked_user_id, 'is NOT ADDED')
            }

        } catch (err) {
            console.log(err)
        }
    }

    const addMatch = async (liked_user_id) => {
        try {
            const response = await axios.post('http://localhost:3001/dashboard/addmatch', {
                user_id,
                liked_user_id
            })
            const success = response.status === 200

            if (success) {
                console.log("MATCH ADDED:", response.data)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Matched !!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                getUser()
            }

        } catch (err) {
            console.log(err)
        }
    }

    const checkMatch = async (liked_user_id, swipedLikes) => {
        try {
            console.log(swipedLikes.includes(user_id))

            if(swipedLikes.includes(user_id)) {

                const response = await axios.get('http://localhost:3001/dashboard/checkmatch', {
                    params: {
                        user_id: user_id,
                        liked_user_id: liked_user_id
                    }
                })

                // console.log(response.data)
                const success = response.status === 200

                if (success) {
                    if (response.data === 0) {
                        addMatch(liked_user_id)
                        console.log("Matched !!")
                    } else {
                        console.log("Already Matched !!")
                    }
                }
            } else {
                console.log("Not Matched Yet")
            }

        } catch (err) {
            console.log(err)
        }
    }

    // const removeLike = async (removed_user_id) => {
    //     try {
    //         const response = await axios.put('http://localhost:3001/dashboard/removelike', {
    //             user_id,
    //             removed_user_id
    //         })
    //         const success = response.status === 200

    //         if (success) {
    //             console.log(response)
    //             getUser()
    //         }

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    
    const currentIndexRef = useRef(currentIndex)
  
    const childRefs = useMemo(
      () =>
        Array(targetUsers.length)  
          .fill(0)
          .map((i) => React.createRef()),
      []
    )
  
    const updateCurrentIndex = (val) => {
      setCurrentIndex(val)
      currentIndexRef.current = val
    }
  
    // const canGoBack = currentIndex < targetUsers.length - 1
  
    // const canSwipe = currentIndex >= 0
  
    const swiped = (direction, index, liked_user_id, swipedLikes) => {
        if (direction === 'right') {
            addLike(liked_user_id, swipedLikes)
            // checkMatch(liked_user_id, swipedLikes)
        }
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }
  
    const outOfFrame = (name, idx) => {
      console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
      currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }
  
    // const swipe = async (direction) => {
    //   if (canSwipe && currentIndex < targetUsers.length) {
    //     await childRefs[currentIndex].current.swipe(direction)
    //   }
    // }
  
    // const goBack = async () => {
    //     if (!canGoBack) return
    //     const newIndex = currentIndex + 1
    //     updateCurrentIndex(newIndex)
    //     await childRefs[newIndex].current.restoreCard()
    //     // if (lastDirection === 'right') {
    //     //     removeLike(lastProfileId)
    //     // }
    // }

    const age = (birthday) => {   
        let today = new Date(),  
        dob = new Date(birthday),
        diff = today.getTime() - dob.getTime(),
        years = Math.floor(diff / 31556736000)
        return `${years}`
    }

  
    return (
        <>
        {user &&
            <div className='matchingDashboard'>
                <div className='matchingProfile'>
                    {targetUsers?.map((character, index) => (
                        <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        key={character.user_id}
                        onSwipe={(dir) => swiped(dir, index, character.user_id, character.likes)}
                        onCardLeftScreen={() => outOfFrame(character.first_name, index)}>
                        <div className='targetMatching'>
                            <div
                                style={{ backgroundImage: 'url(' + character.url + ')' }}
                                className='card'>
                            </div>

                        </div>

                        <div className='targetMatching'>
                            <div className='targetInfo'>
                                <h1>Profile</h1>
                                <div className="col-md-10">
                                    <div className="profile">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <h6 className="mb-0">Full Name</h6>
                                                </div>
                                                <div className="col-sm-25 text-secondary">
                                                    {character.first_name} {character.surname}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <h6 className="mb-0">Gender</h6> {}
                                                </div>
                                                <div className="col-sm-25 text-secondary">
                                                    {character.gender}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <h6 className="mb-0">Age</h6>
                                                </div>
                                                <div className="col-sm-25 text-secondary">
                                                    {age(character.dob)}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <h6 className="mb-0">Vaccination Status</h6>
                                                </div>
                                                <div className="col-sm-25 text-secondary">
                                                    {character.vaxx_status}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <h6 className="mb-0">Address</h6>
                                                </div>
                                                <div className="col-sm-25 text-secondary">
                                                    {character.postcode}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <h6 className="mb-0">Interests</h6>
                                                </div>
                                                <div className="col-sm-25 text-secondary">
                                                    {character.interests}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <h6 className="mb-0">User ID</h6>
                                                </div>
                                                <div className="col-sm-25 text-secondary">
                                                    {character.user_id}
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        </TinderCard>
                    ))}

                    </div>


                    {/* <div className='buttons'>
                        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>No</button>
                        <button style={{ backgroundColor: '#c3c4d3' }} onClick={() => goBack()}>Undo</button>
                        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Yes</button>
                    </div> */}


            </div>
        }
        </>
    )
}

export default MatchingDashboard
