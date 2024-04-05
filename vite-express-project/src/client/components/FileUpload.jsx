import React, {useState, useEffect, useRef} from "react";
import axios from "axios";

/**
 * File upload form.
 */


function FileUpload() {
    const [file, setFile] = useState()
    const [imageName, setImageName] = useState()
    const [dragActive, setDragActive] = React.useState(false);
    const [redirLink, setRedirLink] = useState()

    //Way to customize <input> appearance: hidden input and div click reffed to that input
    const hiddenFileInput = useRef(null);
    const handleDropzoneClick = () => {
        hiddenFileInput.current.click();
    };

    //Way to load picture right away, without pressing "Submit"
    // useEffect(() => {
    //     if (file != undefined) submit(); else console.log(file)
    // }, [file]);

    //Submit form with file, uploaded with drag and drop or with "choose file"
    const submit = async event => {
        if (event) event.preventDefault()

        const formData = new FormData()
        formData.append("image", file)

        const result = await axios.post('/api/images', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        setImageName(result.data.imageName)
        console.log(result.data.redirectUrl)
        setRedirLink(result.data.redirectUrl)
    }

    //Handlers that serving drag and drop function
    const dropHandler = async function (e) {
        console.log(e)
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0])
        }
    };

    const dragHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("dragHandler!")
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div className="App">
            <h1>Image upload</h1>
            <form onSubmit={submit}>

                <br/>
                <div id="drop_area">
                    <div
                        id="drop_zone"
                        onClick={handleDropzoneClick}
                        onDrop={event => dropHandler(event)}
                        onDragOver={event => dragHandler(event)}>
                        {file !== undefined ? <p>File was uploaded!</p> :
                            <div id="uploadLabel">
                                <p>Drag image to this <i>drop zone</i><br/> or click here to choose file</p>
                                <input
                                    filename={file}
                                    onChange={e => setFile(e.target.files[0])}
                                    type="file"
                                    accept="image/*"
                                    style={{display:'none'}}
                                    ref={hiddenFileInput}
                                ></input>


                            </div>}
                    </div>
                    {dragActive && <div id="drag-file-element" onDragEnter={dragHandler} onDragLeave={dragHandler}
                                        onDragOver={dragHandler} onDrop={dropHandler}></div>}
                </div>
                <br/>

                <button type="submit" disabled={file !== undefined ? false : true}
                        className={file !== undefined ? "button1" : "button1 button_disabled"}>Submit
                </button>
            </form>
            {imageName}
            {redirLink && <div>
                <img id="uploadedImage" src={redirLink} alt="your uploaded image"/>
                <a href={redirLink}><br/>
                    <button className="button1">Go to picture (fullscreen)</button>
                </a>
            </div>
            }
        </div>
    )
};

export default FileUpload