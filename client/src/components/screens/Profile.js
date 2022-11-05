import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';

const Profile = () => {
  const [mypics, setMypics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");


  // Used for populating posts
  useEffect(() => {
    fetch('/mypost', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        setMypics(result.mypost)
      })
  }, []);

  // Update profile pic
  useEffect(() => {
    if (image) {
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "insta-clone")
      data.append("cloud_name", "dji1pwzqq")
      fetch("https://api.cloudinary.com/v1_1/dji1pwzqq/image/upload", {
        method: "post",
        body: data
      })
        .then(res => res.json())
        .then(data => {


          fetch('/updatepic', {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              pic: data.url
            })
          }).then(res => res.json())
            .then(result => {
              // console.log(result)
              localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))   // local storage update pic
              dispatch({ type: "UPDATEPIC", payload: result.pic })

            })

        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  }

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div style={{
        margin: "18px 0px",
        borderBottom: "1px solid grey"
      }}>


        <div style={{
          display: "flex",
          justifyContent: "space-around",

        }}>
          <div>
            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.pic : ""}
              alt="Profile_Picture"
            />

          </div>
          <div>
            <h4>{state ? state.name : "Loading"}</h4>
            <h5>{state ? state.email : "Loading"}</h5>
            <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
              <h6>{mypics.length} posts</h6>
              <h6>100 followers</h6>
              <h6>50 following</h6>
            </div>

          </div>
        </div>

        <div className="file-field input-field" style={{ margin: "10px" }}>
          <div className="btn #64b5f6 blue darken-1">
            <span>Update pic</span>
            <input
              type="file"
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>

      <div className="gallery">
        {
          mypics.map(item => {
            return (
              <img className="item"
                src={item.photo}
                alt={item.title}
                key={item._id}
              />
            )
          })
        }

      </div>
    </div>
  )
}

export default Profile
