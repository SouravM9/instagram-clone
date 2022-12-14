import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch('/allpost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        setData(result.posts);
      })
  }, []);

  // Like a Post Functionality
  const likePost = (id) => {
    fetch('/like', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id            // Stores the id of the post
      })
    }).then(res => res.json())
      .then(result => {
        // console.log(result)
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })
  }
  const unlikePost = (id) => {
    fetch('/unlike', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => {
        //   console.log(result)
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })
  }

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res => res.json())
      .then(result => {
        // console.log(result)
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })

    setComment('');  // Clear the comment
  }

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        // console.log(result)
        // Filtering the data & not including the deleted one
        const newData = data.filter(item => {
          return item._id !== result._id
        })
        setData(newData)
      })
  }

  return (
    <div className="home">
      {
        data.map(item => {
          return (
            <div className="card home-card" key={item._id}>
              <div style={{ display: "flex", alignItems: "center", padding: "0 5px" }}>
                <img
                  className='avatarImage'
                  src={item.postedBy.pic}
                  alt={item.postedBy.name}
                />
                <h5 style={{ padding: "5px", flex: "0.9" }}>
                  <Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>
                    {item.postedBy.name}
                  </Link>
                </h5>
                {item.postedBy._id == state._id
                  && <i className="material-icons" style={{
                  }}
                    onClick={() => deletePost(item._id)}
                  >delete</i>

                }
              </div>

              <div className="card-image">
                <img src={item.photo} alt={item.title} />
              </div>
              <div className="card-content">

                {item.likes.includes(state._id)       // Checks if the person is present in likes array, i.e., already liked the post
                  ?
                  <i className="material-icons"
                    onClick={() => { unlikePost(item._id) }}
                  >thumb_down</i>
                  :
                  <i className="material-icons"
                    onClick={() => { likePost(item._id) }}   // item._id is sending the selected Post Item
                  >thumb_up</i>
                }


                <h6>{item.likes.length} likes</h6>

                <h6>{item.title}</h6>
                <p>{item.body}</p>
                {
                  item.comments.map(record => {
                    return (
                      <h6 key={record._id}><span style={{ fontWeight: "500" }}>{record.postedBy.name}</span> {record.text}</h6>
                    )
                  })
                }
                <form onSubmit={(e) => {
                  e.preventDefault();        // Restrict page from getting refreshed
                  makeComment(e.target[0].value, item._id);
                }}>
                  <input
                    id="comment"
                    type="text"
                    placeholder="add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </form>
              </div>
            </div>
          )
        })

      }

    </div>
  )
}

export default Home
