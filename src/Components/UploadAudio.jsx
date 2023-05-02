import React, { useRef, useState } from 'react'

export default function UploadAudio() {
    const hiddenFileInput = useRef();
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [htmlNote, setHtmlNote] = useState();

    function handleFileUpload(e){
        e.preventDefault();
        hiddenFileInput.current.click();
    }

    function handleFileChange(e){
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    }

    const fetchData = async (file) => {
        const formData = new FormData();
        formData.append("audio", file);
      
        try {
          const response = await fetch("/api/processAudio", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log(data.message);
          console.log(data.htmlNote);
          
          setHtmlNote(data.htmlNote);
        } catch (error) {
          console.error("Error:", error);
        }
      };

    function handleSubmission(e){
        e.preventDefault();

        if (selectedFile) {
            fetchData(selectedFile);
        } else {
            console.log("DEBUG: File is not selected");
        }
    }

  return (
    <>
        {
            htmlNote 
                ?

                <iframe style={{ width: "100%", height: "100%" }} srcDoc={htmlNote}/>
                // <iframe style={{ width: "100%", height: "100%" }} srcDoc={`<!DOCTYPE html>
                // <html>
                //   <head>
                //     <title>Sample HTML Page</title>
                //   </head>
                //   <body>
                //     <h1>Welcome to my Sample HTML Page</h1>
                //     <p>Here's some content for this page:</p>
                //     <ul>
                //       <li>Item 1</li>
                //       <li>Item 2</li>
                //       <li>Item 3</li>
                //     </ul>
                //     <p>This is a paragraph with some text.</p>
                //     <p>And this is another paragraph with some more text.</p>
                //   </body>
                // </html>
                // `}></iframe>

                :
            (

                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <button className='btn' onClick={(e)=>handleFileUpload(e)}>
                        <i className="bi bi-upload fs-1 dashline-btn p-3 px-4">
                        </i>
                    </button>
                    <input className="form-control" type="file" id="formFile" ref={hiddenFileInput} 
                    accept=".mp3,.wav,.m4a"
                    onChange={handleFileChange} style={{display: "none"}}/>
                    {
                        isFilePicked ?
                        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
                            <div>
                                <p>{selectedFile.name}</p>
                            </div>
                            <button className='btn btn-primary' onClick={handleSubmission}>SUBMIT</button>
                        </div>
                        :
                        <></>
                    }
                </div>
            )
        }
    </>

  )
}
