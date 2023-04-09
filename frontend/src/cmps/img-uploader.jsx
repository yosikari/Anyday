import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import { userService } from '../services/user.service.js'
import { updateUserImg } from '../store/user.actions.js'

export function ImgUploader({ onUploaded = null, setImgSrc }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
    setUserImg(secure_url)
    updateUserImg(secure_url)
    setImgSrc(secure_url)
  }

  async function setUserImg(img) {
    try {
        userService.changeImage(img)
    }
    catch (err) {
        console.error(err)
    }
}

  return (
    <div className="upload-preview">
      <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
    </div>
  )
}