import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';

const Profile = () => {
  const [mypics, setMypics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

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
              alt="Profile Picture"

            />

          </div>
          <div>
            <h4>{state ? state.name : "Loading"}</h4>
            <h5>{state ? state.email : "Loading"}</h5>
            <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
              <h6>10 posts</h6>
              <h6>100 followers</h6>
              <h6>50 following</h6>
            </div>

          </div>
        </div>

        <div className="file-field input-field" style={{ margin: "10px" }}>
          <div className="btn #64b5f6 blue darken-1">
            <span>Update pic</span>

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
