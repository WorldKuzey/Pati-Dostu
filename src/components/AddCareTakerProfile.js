import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AddCaretakerProfile = () => {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [services, setServices] = useState([]);
  const [email, setEmail] = useState('');
 
  const [imagePreview, setImagePreview] = useState([]);

  const [address, setAddress] = useState('');

  const handleServiceToggle = (service) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service));
    } else {
      setServices([...services, service]);
    }
  };

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
    console.log(files)};

  const handleRemoveImage = (index) => {
    const updatedImages = [...imagePreview];
    updatedImages.splice(index, 1);
    setImagePreview(updatedImages);
  };


  const clearForm = () => {
    setName('');
    setExperience('');
    setServices([]);
    setEmail('');
    setImagePreview([]);
    setAddress('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('experience', experience);
    formData.append('services', services);
    formData.append('email', email);
    formData.append('address', address);

    
    for (let i = 0; i < imagePreview.length; i++) {
      formData.append('images', imagePreview[i].file);
    }
     clearForm();
            
    try {
      const response = await axios.post('http://localhost:3000/add-caretaker-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      );



      if (response.status === 201) {
        console.log('Caretaker profile added successfully');
        // Bakıcı profili eklemesi başarılı olduysa başka bir işlem gerçekleştirebilirsiniz, örneğin sayfayı yenileyebilirsiniz.
      } else {
        console.error('Error adding caretaker profile');
        // Hata durumunda gerekli işlemleri gerçekleştirebilirsiniz.
      }
    } catch (error) {
      console.log("hata burada amkk")

      console.error('Error:', error);
      // Hata durumunda gerekli işlemleri gerçekleştirebilirsiniz.
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl p-6 bg-white rounded-md shadow-md w-full mt-8 mb-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">Bakıcı Profili Ekle</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Ad Soyad:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-600">
              Deneyim:
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Hizmetler:</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={services.includes('Evcil Hayvan Bakımı')}
                  onChange={() => handleServiceToggle('Evcil Hayvan Bakımı')}
                  className="mr-2"
                />
                Evcil Hayvan Bakımı
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={services.includes('Köpek Gezdirme')}
                  onChange={() => handleServiceToggle('Köpek Gezdirme')}
                  className="mr-2"
                />
                Köpek Gezdirme
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              E-Posta:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="profileImages" className="block text-sm font-medium text-gray-600">
              Profil Fotoğrafı:
            </label>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="profileImages"
                className="flex items-center justify-center p-2 border rounded-md cursor-pointer bg-gray-200"
              >
                <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
                Choose file
              </label>
              <input
                type="file"
                id="profileImages"
                name="profileImages"
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
            <label htmlFor="address" className="block text-sm font-medium text-gray-600">
              Adres:
            </label>
            <textarea
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="2"
              className="mt-1 p-2 w-full border rounded-md"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-300"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCaretakerProfile;
