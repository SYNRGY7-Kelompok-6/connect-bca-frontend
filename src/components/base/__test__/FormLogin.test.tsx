import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider } from "../../../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
import FormLogin from "../../layout/formlogin/FormLogin";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("berhasil submit form dengan data yang valid", async () => {
  mockedAxios.post.mockResolvedValue({
    data: { data: { accessToken: "dummy_token" } },
  });

  render(
    <MemoryRouter>
      <AuthProvider>
        <FormLogin />
      </AuthProvider>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Masukan User ID Anda"), {
    target: { value: "user001" },
  });

  fireEvent.change(screen.getByPlaceholderText("Masukan Pasword Anda"), {
    target: { value: "Password_0" },
  });

  fireEvent.click(screen.getByText("Masuk"));

  await waitFor(() => {
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/v1.0/auth/login`,
      { userID: "user001", password: "Password_0" }
    );
  });

  // Verifikasi token disimpan di localStorage
  await waitFor(() => {
    expect(localStorage.getItem("accessToken")).toBe("dummy_token");
  });

});
