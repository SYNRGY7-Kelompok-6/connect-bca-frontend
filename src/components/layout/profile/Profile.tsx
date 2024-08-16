import React, { useState } from "react";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
    "./Profile.png"
  );

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto mt-[50px] pb-[50px] px-4">
      <div className="w-full bg-neutral-1 shadow-box p-10 rounded">
        <div className="flex flex-col gap-5 md:gap-4">
          <div className="flex justify-end">
            <button
              onClick={handleEditClick}
              className="px-14 py-2 bg-primary-dark-blue rounded-xl text-white"
              aria-label={isEditing ? "Save changes" : "Edit profile"}
            >
              {isEditing ? "Simpan" : "Edit"}
            </button>
          </div>
          <div className="flex md:flex-row flex-col gap-10 items-center">
            <div>
              <img src={profileImage as string} alt="Profile" className="" />
              {isEditing && (
                <div className="mt-4 flex text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="upload-image"
                    aria-label="Upload profile image"
                  />
                  <label
                    htmlFor="upload-image"
                    className="cursor-pointer px-6 py-2 bg-primary-dark-blue text-white rounded w-full"
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
                      className="border-b pb-2 border-primary-dark-blue w-full"
                      defaultValue="Budi Santoso"
                      aria-label="Nama"
                    />
                  ) : (
                    <p
                      className="border-b pb-2 border-primary-dark-blue w-full"
                      aria-label="Nama: Budi Santoso"
                    >
                      Budi Santoso
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
                      className="border-b pb-2 border-primary-dark-blue w-full"
                      defaultValue="budisantoso@gmail.com"
                      aria-label="Email"
                    />
                  ) : (
                    <p
                      className="border-b pb-2 border-primary-dark-blue w-full"
                      aria-label="Email: budisantoso@gmail.com"
                    >
                      budisantoso@gmail.com
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
                      className="border-b pb-2 border-primary-dark-blue w-full"
                      defaultValue="087171239818"
                      aria-label="Nomor Handphone"
                    />
                  ) : (
                    <p
                      className="border-b pb-2 border-primary-dark-blue w-full"
                      aria-label="Nomor Handphone: 087171239818"
                    >
                      087171239818
                    </p>
                  )}
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-2 w-full">
                <label
                  htmlFor="dob"
                  className="text-base text-primary-dark-blue w-60"
                >
                  Tanggal Lahir
                </label>
                <div className="text-base w-full">
                  {isEditing ? (
                    <input
                      id="dob"
                      type="date"
                      className="border-b pb-2 border-primary-dark-blue w-full"
                      defaultValue="2021-11-20"
                      aria-label="Tanggal Lahir"
                    />
                  ) : (
                    <p
                      className="border-b pb-2 border-primary-dark-blue w-full"
                      aria-label="Tanggal Lahir: 20/11/2021"
                    >
                      20/11/2021
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
                      className="border-b pb-2 border-primary-dark-blue w-full"
                      defaultValue="Jalan Nangka No. 1, Desa Baru, Kab. Merindu, Prov. Sana Dikit"
                      aria-label="Alamat"
                    />
                  ) : (
                    <p
                      className="border-b pb-2 border-primary-dark-blue w-full"
                      aria-label="Alamat: Jalan Nangka No. 1, Desa Baru, Kab. Merindu, Prov. Sana Dikit"
                    >
                      Jalan Nangka No. 1, Desa Baru, Kab. Merindu, Prov. Sana
                      Dikit
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
