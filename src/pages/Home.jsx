import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";
import { Context } from "../context/Context";
import LoadingBar from 'react-top-loading-bar'

function Home() {
  const{currentUser}=useContext(Context)
  const [posts, setPosts] = useState([]);
  const [comment,setComment]=useState();
  const[isLiked,setIsLiked]=useState(false)
  const [progress, setProgress] = useState(0)



  const handleLike=async(post)=>{
    const heart=document.querySelector('.heart');
    setIsLiked(true)
    if(!isLiked){
      heart.classList.toggle('active');
      const res=await fetch('https://instagram12122.herokuapp.com/post/like',{
        method:'PUT',
        body:JSON.stringify({
          postId:post._id
        }),
        headers:{
          'Content-Type':'application/json',
          'x-auth-token':localStorage.getItem('token')
        }
      })
      const data=await res.json()
      setIsLiked(true)
    }else if(isLiked){
      const res=await fetch('https://instagram12122.herokuapp.com/post/unlike',{
        method:'PUT',
        body:JSON.stringify({
          postId:post._id
        }),
        headers:{
          'Content-Type':'application/json',
          'x-auth-token':localStorage.getItem('token')
        }
      })
      const data=await res.json()
      setIsLiked(false)
    }

  }



  const handleComment=async(id)=>{
  if(comment){
    const res=await fetch('https://instagram12122.herokuapp.com/post/comment',{
      method:"PUT",
      body:JSON.stringify({
       "text":comment,
        "postId":id,
      }),
      headers:({
        'Content-Type':'application/json',
        'x-auth-token':localStorage.getItem('token')
      })
    })
   const data=await res.json();
  
  //  console.log(data)
  }
   
    
   }

  useEffect(() => {
    const fetchPost =  () => {
      fetch("https://instagram12122.herokuapp.com/post/allpost")
        .then((res) => res.json())
        .then((data) => setPosts(data.posts.reverse()))
        .catch((e) => console.log(e));
    };
    fetchPost();
  }, [handleComment,handleLike]);






  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar setProgress={setProgress}/>
      <main className="main">
        <div className="container">
          <div className="grid1">
            <div className="statusBar">
              <div className="status">
                <img
                  src="https://images.unsplash.com/photo-1648318579627-551172875266?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
              </div>
            </div>
            <div className="postContainer">
              <div className="cardContainer">
                {posts.map(post=><Card key={post._id}  post={post} photo={post.photo} username={post.postedBy.username} caption={post.title} likes={post.likes.length} profilePic={post.postedBy.pic} handleLike={handleLike}  handleChange={(e)=>setComment(e.target.value)} handleComment={handleComment} comments={post.comments}/>)}
                
              </div>
            </div>
          </div>
          <div className="grid2">
            <div className="top">
              <div className="topImage">
                <img
                  src={currentUser&&currentUser.pic}
                  alt="user"
                />
                <p>{currentUser&&currentUser.username}</p>
              </div>

              <p>switch</p>
            </div>
            <div className="center">
              <p>Suggestions for you</p>
              <p>See all</p>
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
