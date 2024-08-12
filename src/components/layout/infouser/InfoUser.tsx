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
    <div className="flex h-40">
      <div
        className="container mx-auto my-auto flex justify-between items-center"
        aria-live="polite"
        role="region"
        aria-labelledby="info-user-heading"
      >
        <div className="flex flex-col gap-2">
          {bankStatement && (
            <h1
              id="info-user-heading"
              className="text-neutral-9 text-lg font-bold"
            >
              Selamat Datang,{" "}
              <span aria-label="Nama Akun">
                {bankStatement.accountInfo.name}
              </span>
            </h1>
          )}
          <div className="flex flex-row gap-4">
            {loginInfo && (
              <p className="text-neutral-9 text-base">
                Terakhir Masuk:{" "}
                <time
                  dateTime={loginInfo.lastSuccessfullLoginAttempt.timestamp}
                >
                  {new Date(
                    loginInfo.lastSuccessfullLoginAttempt.timestamp
                  ).toLocaleDateString()}
                </time>
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-neutral-9 text-base font-semibold underline flex gap-2"
            aria-label="Logout"
            type="button"
          >
            <img
              src="./logout.svg"
              alt="Logout Icon"
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
