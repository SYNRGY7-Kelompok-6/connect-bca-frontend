import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../contexts/useAuth";
import useBankStatement from "../../../contexts/useBankStatement";
import Skeleton from "../../base/skeletonloading";

const InfoUser: React.FC = () => {
  const { bankStatement, fetchBankStatement } = useBankStatement();
  const { loginInfo, fetchLoginInfo, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchLoginInfo(), fetchBankStatement()]);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchLoginInfo, fetchBankStatement]);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex bg-fill1 h-[128px]">
      <div className="container mx-auto my-auto flex justify-between">
        <div className="flex flex-col gap-[13px]">
          {loading ? (
            <>
              <Skeleton className="h-6 w-48" />
              <div className="flex flex-row gap-4">
                <Skeleton className="h-5 w-40" />
              </div>
            </>
          ) : (
            <>
              {bankStatement && (
                <h1 className="text-white text-md font-semibold">
                  Selamat Datang {bankStatement.accountInfo.name}
                </h1>
              )}
              <div className="flex flex-row gap-4">
                {loginInfo && (
                  <p className="text-white text-sm font-medium">
                    Login Terakhir:{" "}
                    {new Date(
                      loginInfo.lastSuccessfullLoginAttempt.timestamp
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-white text-sm font-medium underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
