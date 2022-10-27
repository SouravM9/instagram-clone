import React from 'react'

const Profile = () => {
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
              src="https://media-exp1.licdn.com/dms/image/D5635AQE7ccYr1HBVAg/profile-framedphoto-shrink_400_400/0/1664137707379?e=1667494800&v=beta&t=FtfvfxZs_xBn5sh4ke8No25DloypHyVcwUv2l-KJSu4"
            alt="profilepic"

            />

          </div>
          <div>
            <h4>Sourav</h4>
            <h5>sourav@gmail.com</h5>
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

        <img className="item" src="https://images.pexels.com/photos/3136403/pexels-photo-3136403.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Mountains" />
        <img className="item" src="https://images.pexels.com/photos/3136403/pexels-photo-3136403.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Mountains" />
        <img className="item" src="https://images.pexels.com/photos/3136403/pexels-photo-3136403.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Mountains" />
        <img className="item" src="https://images.pexels.com/photos/3136403/pexels-photo-3136403.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Mountains" />
        <img className="item" src="https://images.pexels.com/photos/3136403/pexels-photo-3136403.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Mountains" />
        <img className="item" src="https://images.pexels.com/photos/3136403/pexels-photo-3136403.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Mountains" />
      </div>
    </div>
  )
}

export default Profile
