import React, { useContext, useEffect, useState } from "react";
import "../styles/profile.css";
import { Navbar } from "../components/Navbar";
import { Context } from "../context/Context";
import { Input } from "../components/Input";
import { storage } from "../config/firebase";
import LoadingBar from "react-top-loading-bar";
// import { useNavigate } from "react-router-dom";

function Profile() {
  // const navigate=useNavigate()
  const { currentUser } = useContext(Context);
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [url, setUrl] = useState();
  const [progress, setProgress] = useState(0)
  const[values,setValues]=useState({
    username:"",
    fullname:""
  })

useEffect(()=>{
  alert('double tap on post to delete')
},[])

  const handleChange=e=>{
    setValues({...values,[e.target.name]:e.target.value})
  }

  const handleUpdateInfo=async()=>{
    const{username,fullname}=values
    const res=await fetch('https://instagram12122.herokuapp.com/post/updateUserInfo',{
      method:'PUT',
      body:JSON.stringify({
        username,fullname
      }),
      headers:{
        'Content-Type':'application/json',
        'x-auth-token':localStorage.getItem('token')
      }
    })
  if(res.status===200){
    let modal=document.querySelector(".editProfile")
    modal.classList.remove('active')
  }
  }


  useEffect(() => {
    const modal = document.querySelector(".profileModal");
    const uploadBtn = document.getElementById("uploadBtn");
    const close = document.querySelector(".close");

    uploadBtn.addEventListener("click", () => {
      modal.classList.toggle("active");
    });
    close.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }, []);


const handleDelete=async(id)=>{
  const res=await fetch('https://instagram12122.herokuapp.com/post/removepost',{
    method:"DELETE",
    body:JSON.stringify({
      postId:id
    }),
    headers:{
      'Content-Type':'application/json',
      'x-auth-token':localStorage.getItem('token')
    }
  })
}


  useEffect(() => {
    const fetchPost = async () => {
      fetch("https://instagram12122.herokuapp.com/post/mypost", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => setPosts(data.mypost))
        .catch((e) => console.log(e));
    };
    fetchPost();
  }, [handleDelete]);

  // post functionality
  useEffect(() => {
    const postData = async (e) => {
      const storageRef = storage.ref(file.name);
      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          setUrl(url);
          console.log(url);
        }
      );
    };
    postData();
  }, [file]);

  useEffect(() => {
    const updatePic = async () => {
      if (url) {
        const res = await fetch("https://instagram12122.herokuapp.com/post/updatepic", {
          method: "PUT",
          body: JSON.stringify({
            pic: url,
          }),
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          window.location.reload(false);
        }
        const data = await res.json();
        console.log(data);
      }
    };
    updatePic();
  }, [url]);



  useEffect(()=>{
    let modal=document.querySelector(".editProfile")
    let btn=document.getElementById("editBtn")

    btn.addEventListener('click',()=>{
      modal.classList.toggle('active');
    })
  },[])



  return (
    <>
     <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />

      <div className="profileInfo">
        <div className="profileInfoContainer">
          <div className="profileImage">
            <img
              id="uploadBtn"
              src={currentUser && currentUser.pic}
              alt="user"
            />
          </div>
          <div className="profileInfoCount">
            <div className="top">
              <p>{currentUser && currentUser.username}</p>
              <button id="editBtn">Edit Profile</button>
              <svg
                style={{ marginLeft: "16px", cursor: "pointer" }}
                aria-label="Options"
                class="_8-yf5 "
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <circle
                  cx="12"
                  cy="12"
                  fill="none"
                  r="8.635"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></circle>
                <path
                  d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></path>
              </svg>
            </div>
            <div className="center">
              <p>
                <span>{posts && posts.length}</span>posts
              </p>
              <p>
                <span>{currentUser && currentUser.followers.length}</span>
                followers
              </p>
              <p>
                <span>{currentUser && currentUser.following.length}</span>
                following
              </p>
            </div>
            <div className="bottom">
              <p>{currentUser && currentUser.fullname}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="postTitle">
        <svg
          aria-label=""
          class="_8-yf5 "
          color="#8e8e8e"
          fill="#8e8e8e"
          height="12"
          role="img"
          viewBox="0 0 24 24"
          width="12"
        >
          <rect
            fill="none"
            height="18"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            width="18"
            x="3"
            y="3"
          ></rect>
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="9.015"
            x2="9.015"
            y1="3"
            y2="21"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="14.985"
            x2="14.985"
            y1="3"
            y2="21"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="21"
            x2="3"
            y1="9.015"
            y2="9.015"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="21"
            x2="3"
            y1="14.985"
            y2="14.985"
          ></line>
        </svg>
        <p>Posts</p>
      </div>
      <div className="postsContainer">
        {posts.map((item) => (
          <div onDoubleClick={()=>handleDelete(item._id)} key={item._id} className="post">
            <img src={item.photo} alt="post" />
            <div className="postStats">
              <div className="like">
                <svg
                  width="28px"
                  fill="white"
                  aria-label="Activity Feed"
                  class="_8-yf5 "
                  color="white"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                </svg>
                <p>{item && item.likes.length}</p>
              </div>
              <div className="comment">
                <svg
                  width="28px"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Messenger"
                  class="_8-yf5 "
                  color="white"
                  fill="black"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-miterlimit="10"
                    stroke-width="1.739"
                  ></path>
                  <path
                    d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
                <p>{item && item.comments.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="profileModal">
        <div className="modalTitle">
          <p>Change Profile Photo</p>
        </div>
        <label htmlFor="profilePic" className="label">
          <p>Select Photo</p>
        </label>
        <Input
          type="file"
          id="profilePic"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <p>Remove Current Photo</p>
        <p className="close" id="close">
          Cancel
        </p>
      </div>
      <div className="editProfile">
        <input type="text" placeholder="edit username" name='username' value={values.username} onChange={handleChange}/>
        <input type="text" placeholder="edit fullname" name='fullname' value={values.fullname} onChange={handleChange}/>
        <button onClick={handleUpdateInfo} style={{cursor:!values.fullname&&!values.username&&"not-allowed"}}>Submit</button>
      </div>
    </>
  );
}

export default Profile;
