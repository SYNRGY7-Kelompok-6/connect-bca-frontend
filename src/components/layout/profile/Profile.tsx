import React, { useState, useEffect } from "react";
import useProfile from "../../../contexts/useProfile";
import { ProfileData } from "../../../contexts/ProfileContext";
import Button from "../../base/button/Button";
import Popup from "../../base/popup/popup";

const formatDateForBackend = (date: string) => {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const Profile: React.FC = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileData>>({
    name: "",
    email: "",
    phone: "",
    birth: "",
    address: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error message

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        birth: profile.birth ? formatDateForDisplay(profile.birth) : "",
        address: profile.address,
      });
      setImagePreview(profile.imageUrl || null);
    }
  }, [profile]);

  useEffect(() => {
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setImagePreview(profile?.imageUrl || null);
    }
  }, [image, profile?.imageUrl]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        birth: profile.birth ? formatDateForDisplay(profile.birth) : "",
        address: profile.address,
      });
      setImage(null); // Reset the image
      setImagePreview(profile.imageUrl || null);
    }
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    setError(null);

    const maxNameLength = 50;
    const nameRegex = /^[a-zA-Z\s.]+$/;

    if (formData.name && formData.name.length > maxNameLength) {
      setError(`Nama tidak boleh lebih dari ${maxNameLength} karakter.`);
      setIsLoading(false);
      return;
    }

    if (formData.name && !nameRegex.test(formData.name)) {
      setError("Nama tidak boleh terdapat angka.");
      setIsLoading(false);
      return;
    }
    const currentYear = new Date().getFullYear();
    const birthYear = formData.birth
      ? parseInt(formData.birth.split("-")[0], 10)
      : null;

    if (birthYear && birthYear > currentYear) {
      setError("Tahun lahir tidak boleh lebih dari tahun saat ini.");
      setIsLoading(false);
      return;
    }
    try {
      const formattedBirth = formData.birth
        ? formatDateForBackend(formData.birth)
        : profile?.birth;
      await updateProfile(
        { ...formData, birth: formattedBirth },
        image || undefined
      );
      setIsEditing(false);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      console.error("Failed to update profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-[50px] pb-[50px] px-4">
      <div className="w-full bg-neutral-1 shadow-box p-10 rounded">
        <div className="flex flex-col gap-5 md:gap-4">
          {!isEditing && (
            <div className="flex justify-end">
              <button
                onClick={handleEditClick}
                className="px-14 py-2 bg-primary-dark-blue rounded-xl text-white"
                aria-label="Edit profile"
              >
                Edit
              </button>
            </div>
          )}

          <div className="flex md:flex-row flex-col gap-10 items-center">
            <div>
              <img
                src={imagePreview || "/path/to/default/image.png"}
                alt="Profile"
                className="w-[223px] h-[279px] object-cover rounded-xl"
              />
              {isEditing && (
                <div className="mt-4 flex text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="upload-image"
                    aria-label="Upload profile image"
                  />
                  <label
                    htmlFor="upload-image"
                    className="cursor-pointer px-6 py-2 bg-primary-dark-blue text-white rounded w-full text-center"
                  >
                    Unggah Foto
                  </label>
                </div>
              )}
            </div>
            <div className="flex flex-col w-full gap-7">
              <div className="flex md:flex-row flex-col gap-2 w-full">
                <label
                  htmlFor="name"
                  className="text-base text-primary-dark-blue w-60"
                >
                  Nama
                </label>
                <div className="text-base w-full">
                  {isEditing ? (
                    <input
                      id="name"
                      type="text"
                      className="border-b pb-2 border-primary-dark-blue w-full focus:outline focus:outline-2 focus:rounded focus:outline-primary-blue px-2"
                      value={formData.name || ""}
                      onChange={handleChange}
                      aria-label="Nama"
                    />
                  ) : (
                    <p className="border-b pb-2 border-primary-dark-blue w-full">
                      {profile.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-2 w-full">
                <label
                  htmlFor="email"
                  className="text-base text-primary-dark-blue w-60"
                >
                  Email
                </label>
                <div className="text-base w-full">
                  {isEditing ? (
                    <input
                      id="email"
                      type="email"
                      className="border-b pb-2 border-primary-dark-blue w-full focus:outline focus:outline-2 focus:rounded focus:outline-primary-blue px-2"
                      value={formData.email || ""}
                      onChange={handleChange}
                      aria-label="Email"
                    />
                  ) : (
                    <p className="border-b pb-2 border-primary-dark-blue w-full">
                      {profile.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-2 w-full">
                <label
                  htmlFor="phone"
                  className="text-base text-primary-dark-blue w-60"
                >
                  Nomor Handphone
                </label>
                <div className="text-base w-full">
                  {isEditing ? (
                    <input
                      id="phone"
                      type="text"
                      className="border-b pb-2 border-primary-dark-blue w-full focus:outline focus:outline-2 focus:rounded focus:outline-primary-blue px-2"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      aria-label="Nomor Handphone"
                    />
                  ) : (
                    <p className="border-b pb-2 border-primary-dark-blue w-full">
                      {profile.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-2 w-full">
                <label
                  htmlFor="birth"
                  className="text-base text-primary-dark-blue w-60"
                >
                  Tanggal Lahir
                </label>
                <div className="text-base w-full">
                  {isEditing ? (
                    <input
                      id="birth"
                      type="date"
                      className="border-b pb-2 border-primary-dark-blue w-full focus:outline focus:outline-2 focus:rounded focus:outline-primary-blue px-2"
                      value={formData.birth || ""}
                      onChange={handleChange}
                      aria-label="Tanggal Lahir"
                    />
                  ) : (
                    <p className="border-b pb-2 border-primary-dark-blue w-full">
                      {formatDateForDisplay(profile.birth || "")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-2 w-full">
                <label
                  htmlFor="address"
                  className="text-base text-primary-dark-blue w-60"
                >
                  Alamat
                </label>
                <div className="text-base w-full">
                  {isEditing ? (
                    <textarea
                      id="address"
                      className="border-b pb-2 border-primary-dark-blue w-full focus:outline focus:outline-2 focus:rounded focus:outline-primary-blue px-2"
                      value={formData.address || ""}
                      onChange={handleChange}
                      aria-label="Alamat"
                    />
                  ) : (
                    <p className="border-b pb-2 border-primary-dark-blue w-full">
                      {profile.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2 mt-10">
              <Button
                type="submit"
                ariaLabel="Simpan profile"
                variant="general"
                colorScheme="primary"
                state="active"
                isLoading={isLoading}
                onClick={handleSaveClick}
              >
                {isLoading ? (
                  <span className="h-4 w-4 border-2 border-t-2 border-t-transparent border-white rounded-full animate-spin"></span>
                ) : (
                  "Simpan"
                )}
              </Button>
              <Button
                type="submit"
                ariaLabel="Batal Edit"
                variant="general"
                colorScheme="reset"
                state="active"
                isLoading={isLoading}
                onClick={handleCancelClick}
              >
                Batal
              </Button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <Popup
          svgSrc="/AlertError.svg"
          svgAlt="Alert Error"
          message={error}
          button={true}
          buttonText="Tutup"
          labelButton="Tutup error"
          onButtonClick={() => setError(null)}
        />
      )}
    </div>
  );
};

export default Profile;
