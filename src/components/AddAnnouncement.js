import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AddAnnouncement = () => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petInfo, setPetInfo] = useState('');

  const [imagePreview, setImagePreview] = useState([]);
  
  const [petGender, setPetGender] = useState('male');
  const [petColor, setPetColor] = useState('');
  const [petAge, setPetAge] = useState('');
  const [vaccinationStatus, setVaccinationStatus] = useState('upToDate');

  const handleImageChange = (e) => {
    const files = e.target.files;
    const previewImages = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previewImages.push({ url: event.target.result, file: files[i] });
        if (i === files.length - 1) {
          setImagePreview([...imagePreview, ...previewImages]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...imagePreview];
    updatedImages.splice(index, 1);
    setImagePreview(updatedImages);
  };

  
  const clearForm = () => {
    setPetName('');
    setPetType('');
    setPetInfo('');
    setImagePreview('');
    setPetGender('');
    setPetColor('');
    setPetAge('');
    setVaccinationStatus('');

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('petName', petName);
    formData.append('petType', petType);
    formData.append('petInfo', petInfo);
    formData.append('petGender', petGender);
    formData.append('petColor', petColor);
    formData.append('petAge', petAge);
    formData.append('vaccinationStatus', vaccinationStatus);

    for (let i = 0; i < imagePreview.length; i++) {
      formData.append('images', imagePreview[i].file);
    }
   clearForm();
    try {
      const response = await axios.post('http://localhost:3000/create-announcement', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Announcement added successfully');
        // İlan eklemesi başarılı olduysa başka bir işlem gerçekleştirebilirsiniz, örneğin sayfayı yenileyebilirsiniz.
      } else {
        console.error('Error adding announcement');
        // Hata durumunda gerekli işlemleri gerçekleştirebilirsiniz.
      }
    } catch (error) {
      console.error('Error:', error);
      console.log("hata burada amk");
      // Hata durumunda gerekli işlemleri gerçekleştirebilirsiniz.
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl p-6 bg-white rounded-md shadow-md w-full mt-8 mb-8 ">
        <h1 className="text-3xl font-semibold mb-6 text-center">Evcil Hayvan İlanı Oluştur</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4" >
          <div className="mb-4">
            <label htmlFor="petName" className="block text-sm font-medium text-gray-600">
              Adı:
            </label>
            <input
              type="text"
              id="petName"
              name="petName"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="petType" className="block text-sm font-medium text-gray-600">
              Türü:
            </label>
            <input
              type="text"
              id="petType"
              name="petType"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="petInfo" className="block text-sm font-medium text-gray-600">
              Tür Bilgisi:
            </label>
            <input
              type="text"
              id="petInfo"
              name="petInfo"
              value={petInfo}
              onChange={(e) => setPetInfo(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="petImages" className="block text-sm font-medium text-gray-600">
              Hayvan Resimleri:
            </label>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="petImages"
                className="flex items-center justify-center p-2 border rounded-md cursor-pointer bg-gray-200"
              >
                <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
                Choose file
              </label>
              <input
                type="file"
                id="petImages"
                name="petImages"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                required
              />
            </div>
            {imagePreview.length > 0 && (
              <div className="mt-2 flex space-x-2">
                {imagePreview.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview.url}
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 p-2 bg-red-500 rounded-full text-white"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="petGender" className="block text-sm font-medium text-gray-600">
              Cinsiyet:
            </label>
            <select
              id="petGender"
              name="petGender"
              value={petGender}
              onChange={(e) => setPetGender(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="male">Erkek</option>
              <option value="female">Dişi</option>
              <option value="neutered">Sterilize Edilmiş</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="petColor" className="block text-sm font-medium text-gray-600">
              Renk:
            </label>
            <input
              type="text"
              id="petColor"
              name="petColor"
              value={petColor}
              onChange={(e) => setPetColor(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="petAge" className="block text-sm font-medium text-gray-600">
              Yaş:
            </label>
            <input
              type="number"
              id="petAge"
              name="petAge"
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="vaccinationStatus" className="block text-sm font-medium text-gray-600">
              Aşı Durumu:
            </label>
            <select
              id="vaccinationStatus"
              name="vaccinationStatus"
              value={vaccinationStatus}
              onChange={(e) => setVaccinationStatus(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="upToDate">Tam</option>
              <option value="notUpToDate">Tam Değil</option>
            </select>
          </div>

          

     

       

          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-300"
          >
            Patili Dostu Yayınla
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncement;
