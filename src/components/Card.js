import "../styles/home.css";

export const Card = ({post,photo,username,caption,likes,profilePic,handleLike,handleChange,handleComment,comments}) => {



  return (
    <>
    <div  className="card">
      <div className="cardTop">
        <div className="topLeft">
          <img
            src={profilePic}
            alt="user "
          />
          <p>{username}</p>
        </div>
        <div className="topRight">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      <img
        src={photo}
        alt="post"
      />
      <div className="cardBottom">
        <div className="cardIcons">
          <div className="iconLeft">
          <svg  style={{marginRight:'12px',cursor:"pointer"}} width="24" height="24" viewBox="0 0 24 24">
<g clip-path="url(#clip0_4_11)">
<path onClick={()=>handleLike(post)} className="heart" d="M22.2 4.1C24.9 6.8 24.6 11 21.8 13.6L13.4 21.5C12.6 22.2 11.3 22.2 10.5 21.5L2.1 13.6C-0.599996 11 -0.899996 6.8 1.7 4.1C4.6 1.4 9.2 1.3 12 4C14.8 1.3 19.4 1.4 22.2 4.1Z" fill="red"/>
</g>
<defs>
<clipPath id="clip0_4_11">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

          
          <svg 
           style={{marginRight:'12px',cursor:"pointer"}}
          aria-label="Comment" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>

          
          </div>
          <div className="iconRight">
          <svg 
           style={{cursor:"pointer"}}
          aria-label="Save" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
          
          </div>
          
        </div>
        <p className="likesCount">{likes} likes</p>
        <div className="postTitles">
          <p className="username">
            {username} <span>{caption}</span>
          </p>
        </div>
        <div className="commentsContainer">
          <p>total {comments.length} comments</p>
          {comments.map(comment=><p key={comment._id} className="username">
          {comment.postedBy.username}<span>{comment.text}</span>
          </p>)}
          
        </div>
        <div className="addComment">
          <input type="text" placeholder="add a comment" onChange={handleChange}/>
          <button  className="commentBtn" onClick={()=>handleComment(post._id)}>Post</button>
        </div>
      </div>
    </div>
   
    </>
  );
};
