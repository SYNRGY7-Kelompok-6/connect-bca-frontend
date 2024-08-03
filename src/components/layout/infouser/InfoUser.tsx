import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/useAuth";
import useBankStatement from "../../../contexts/useBankStatement";

const InfoUser: React.FC = () => {
  const { bankStatement } = useBankStatement();
  const { loginInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex bg-fill1 h-[128px]">
      <div className="container mx-auto my-auto flex justify-between" aria-live="polite">
        <div className="flex flex-col gap-[13px]">
          {bankStatement && (
            <h1 className="text-white text-md font-semibold">
              Selamat Datang, <span aria-label="Nama Akun">{bankStatement.accountInfo.name}</span>
            </h1>
          )}
          <div className="flex flex-row gap-4">
            {loginInfo && (
              <p className="text-white text-sm font-medium">
                Login Terakhir:{" "}
                <span aria-label="Waktu Login">
                  {new Date(loginInfo.lastSuccessfullLoginAttempt.timestamp).toLocaleDateString()}
                </span>
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-white text-sm font-medium underline"
            aria-label="Logout dari akun"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
