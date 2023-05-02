import React, { useRef, useState } from 'react'

export default function UploadAudio() {
    const hiddenFileInput = useRef();
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

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

        // axios.post("https://run.mocky.io/v3/5b8ecbde-8890-4c1f-af42-13c043503dcb", formData).then((res)=>{
        //   console.log(res);
        // })


        // console.log("DEBUG: submitting request");
        // const fetchData = async () => {
        //   const response = await fetch('/api/processAudio');
        //   const data = await response.json();
        //   console.log(data.message);
        // };
        // fetchData();
    }
  return (
    <div>
        <button className='btn' onClick={(e)=>handleFileUpload(e)}>
            <i className="bi bi-upload fs-1 dashline-btn p-3 px-4">
            </i>
        </button>
        <input className="form-control" type="file" id="formFile" ref={hiddenFileInput} 
        accept=".mp3,.wav,.m4a"
        onChange={handleFileChange} style={{display: "none"}}/>
        {
            isFilePicked ?
            <div>
                <div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
                <button className='btn btn-primary' onClick={handleSubmission}>SUBMIT</button>
            </div>
                
            :
            <></>
        }
    </div>
  )
}
