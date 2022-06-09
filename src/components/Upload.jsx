import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { create as ipfsHttpClient } from 'ipfs-http-client';
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');


const Upload = ({ contract }) => {

  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [description, setDescription] = useState();

  const uploadToIPFS = async (e) => {
    e.preventDefault();

    const currentfile = e.target.files[0];
    if (typeof currentfile !== undefined) {
      try {
        const result = await client.add(currentfile);
        const files = {
          name: currentfile.name,
          type: currentfile.type,
          size: currentfile.size,
          hash: result.path
        }

        setFile(files);
      } catch (error) {
        console.log("error while uploading image to ipfs", error);
      }
    }

  }

  const uploadToBlockchain = async () => {
    await (await contract.upload(file.hash, file.size, file.type, description, file.name)).wait();
    navigate("/my-uploaded-items");
  }

  return (
    <React.Fragment>

      <div className="container mx-auto">
        <div className="max-w-xl p-3 mx-auto my-10 bg-gray-700 rounded-md shadow-sm">
          <div className="text-center">
            <h1 className="mb-4 text-xl font-semibold text-white">Upload Your File Here</h1>
          </div>

          <div>

            <div className="mb-4">
              <input
                type="file"
                name="image"
                required
                className="w-full px-2 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                onChange={uploadToIPFS}
              />
            </div>
            <div className="mb-4">
              <textarea
                rows="5"
                name="description"
                placeholder="Description"
                className="w-full px-2 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                required
                onChange={(e) => { setDescription(e.target.value) }}
                value={description}
              ></textarea>
            </div>

            <div className="mb-4">
              <button
                // type='submit'
                className="w-full px-2 py-4 text-white font-semibold bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                onClick={uploadToBlockchain}
              >
                Upload
              </button>
            </div>

          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Upload

