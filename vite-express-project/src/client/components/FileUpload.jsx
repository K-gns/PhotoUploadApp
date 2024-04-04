import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
    const [file, setFile] = useState()
    const [description, setDescription] = useState("")
    const [imageName, setImageName] = useState()
    const [redirLink, setRedirLink] = useState()

    const submit = async event => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("image", file)
        formData.append("description", description)

        const result = await axios.post('/api/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        setImageName(result.data.imageName)
        console.log(result.data.redirectUrl)
        setRedirLink(result.data.redirectUrl)
    }

    return (
        <div className="App">
            <form onSubmit={submit}>
                <input
                    filename={file}
                    onChange={e => setFile(e.target.files[0])}
                    type="file"
                    accept="image/*"
                ></input>
                <input
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                ></input>
                <button type="submit">Submit</button>
            </form>
            { imageName }
            {redirLink && <div>
                <img id="uploadedImage" src={redirLink}/>
                <a href={redirLink}><br/>
            <button>Go to picture (fullscreen)</button></a>
        </div>
}
</div>
    )

};

export default FileUpload