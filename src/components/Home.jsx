import React, { useEffect, useState } from 'react';

const Home = ({ contract }) => {

  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);

  const getAllFiles = async () => {
    const fileCount = Number(await contract.fileCount());
    const fileArr = [];

    for (let i = 1; i <= fileCount; i++) {
      const files = await contract.Files(i);

      fileArr.push(files);

    }

    setLoading(false);
    setFiles(fileArr);
  }

  useEffect(() => {
    getAllFiles();
  }, [files])


  return (
    <React.Fragment>

      {
        loading ? (<h1 className='text-2xl text-center mt-40'>⌛ Loading Items..</h1>) :

          (
            files.length > 0 ? (<div>
              <h1 className='mb-4 text-xl font-semibold text-gray text-center mt-10'>Below are the all uploaded documents...</h1>
              <table className="w-10/12 p-5 mx-auto mb-10 rounded-md shadow-sm bg-slate-100" >
                <thead className=" bg-gray-700" style={{ 'fontSize': '15px' }}>
                  <tr className="text-white">
                    <th scope="col" style={{ width: '10px' }}>id</th>
                    <th scope="col" style={{ width: '200px' }}>name</th>
                    <th scope="col" style={{ width: '230px' }}>description</th>
                    <th scope="col" style={{ width: '120px' }}>type</th>
                    <th scope="col" style={{ width: '90px' }}>size</th>
                    <th scope="col" style={{ width: '90px' }}>date</th>
                    <th scope="col" style={{ width: '120px' }}>uploader/view</th>
                    <th scope="col" style={{ width: '120px' }}>hash/view/get</th>
                  </tr>
                </thead>

                {files.map((file, key) => {
                  return (
                    <thead key={key}>
                      <tr className='text-black text-l font-semibold text-center'>
                        <td>{Number(file.id)}</td>
                        <td>{file.fileName}</td>
                        <td>{file.fileDescription}</td>
                        <td>{file.fileType}</td>
                        <td>{(Number(file.fileSize) / 1048576).toFixed(2) + " MB"}</td>
                        <td>{new Date(Number(file.uploadTime) * 1000).toLocaleString()}</td>
                        <td>
                          <a className='text-cyan-600'
                            href={"https://etherscan.io/address/" + file.uploader}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.uploader.substring(0, 10)}...
                          </a>
                        </td>
                        <td>
                          <a className='text-cyan-600'
                            href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.fileHash.substring(0, 10)}...
                          </a>
                        </td>
                      </tr>
                    </thead>
                  )
                })}

              </table>
            </div>) :
              (
                <h1 className='text-2xl text-center mt-48 text-gray-700'>There is nothing to show.</h1>
              )
          )
      }
    </React.Fragment>

  )
}
export default Home




