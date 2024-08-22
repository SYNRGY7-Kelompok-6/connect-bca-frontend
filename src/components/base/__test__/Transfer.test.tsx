import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider } from "../../../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
import TransferForm from "../../layout/TransferForm/TransferForm";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("berhasil submit form transffer dengan data yang valid", async () => {
  mockedAxios.post.mockResolvedValue({
    data: { data: { transferId: "dummy_transfer_id" } },
  });

  render(
    <MemoryRouter>
      <AuthProvider>
        <TransferForm />
      </AuthProvider>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Masukan Nomor Rekening Tujuan"), {
    target: { value: "1234567890" },
  });

  fireEvent.change(screen.getByPlaceholderText("Masukan Nama Penerima"), {
    target: { value: "John Doe" },
  });

  fireEvent.change(screen.getByPlaceholderText("Masukan Jumlah Transfer"), {
    target: { value: "100000" },
  });

  fireEvent.click(screen.getByText("Transfer"));

  await waitFor(() => {
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/v1.0/transfer`,
      {
        recipientAccountNumber: "1234567890",
        recipientName: "John Doe",
        amount: 100000,
      }
    );
  });

  // Verifikasi transfer ID disimpan di localStorage
  await waitFor(() => {
    expect(localStorage.getItem("transferId")).toBe("dummy_transfer_id");
  });
});

// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { TransferContext } from "../../../contexts/TransferContext";
// import { SavedAccountsContext } from "../../../contexts/SavedAccountsContext";
// import { MemoryRouter } from "react-router-dom";
// import TransferForm from "../../layout/TransferForm/TransferForm";
// import axios from "axios";

// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// test("berhasil submit form transfer dengan data yang valid", async () => {
//   mockedAxios.post.mockResolvedValue({
//     data: { message: "Transfer successful" },
//   });

//   const transferContext = {
//     transferAmount: 0,
//     transferTo: "",
//     transferFrom: "",
//     transferError: null,
//     transferSuccess: false,
//   };

//   const savedAccountsContext = {
//     savedAccounts: [
//       { id: 1, name: "Account 1", number: "1234567890" },
//       { id: 2, name: "Account 2", number: "9876543210" },
//     ],
//   };

//   render(
//     <MemoryRouter>
//       <TransferContext.Provider value={transferContext}>
//         <SavedAccountsContext.Provider value={savedAccountsContext}>
//           <TransferForm />
//         </SavedAccountsContext.Provider>
//       </TransferContext.Provider>
//     </MemoryRouter>
//   );

//   fireEvent.change(screen.getByPlaceholderText("Enter transfer amount"), {
//     target: { value: "100" },
//   });

//   fireEvent.change(screen.getByPlaceholderText("Select account to transfer from"), {
//     target: { value: "Account 1" },
//   });

//   fireEvent.change(screen.getByPlaceholderText("Select account to transfer to"), {
//     target: { value: "Account 2" },
//   });

//   fireEvent.click(screen.getByText("Transfer"));

//   await waitFor(() => {
//     expect(mockedAxios.post).toHaveBeenCalledWith(
//       `${import.meta.env.VITE_API_URL}/api/v1.0/transfers`,
//       {
//         amount: 100,
//         fromAccount: "Account 1",
//         toAccount: "Account 2",
//       }
//     );
//   });

//   // Verifikasi transfer berhasil
//   await waitFor(() => {
//     expect(screen.getByText("Transfer successful")).toBeInTheDocument();
//   });
// });

// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { AuthProvider } from "../../../contexts/AuthContext";
// import { MemoryRouter } from "react-router-dom";
// import FormLogin from "../../layout/formlogin/FormLogin";
// import axios from "axios";

// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// test("berhasil submit form dengan data yang valid", async () => {
//   const apiURL = `${import.meta.env.VITE_API_URL}/api/v1.0/auth/login`;
//   mockedAxios.post.mockResolvedValue({
//     data: { data: { accessToken: "dummy_token" } },
//   });

//   render(
//     <MemoryRouter>
//       <AuthProvider>
//         <FormLogin />
//       </AuthProvider>
//     </MemoryRouter>
//   );

//   fireEvent.change(screen.getByPlaceholderText("Masukan User ID Anda"), {
//     target: { value: "user001" },
//   });

//   fireEvent.change(screen.getByPlaceholderText("Masukan Pasword Anda"), {
//     target: { value: "Password_0" },
//   });

//   fireEvent.click(screen.getByText("Masuk"));

//   await waitFor(() => {
//     expect(mockedAxios.post).toHaveBeenCalledTimes(1);
//     expect(mockedAxios.post).toHaveBeenCalledWith(apiURL, {
//       userID: "user001",
//       password: "Password_0",
//     });
//   });

//   // Verifikasi token disimpan di localStorage
//   await waitFor(() => {
//     expect(localStorage.getItem("accessToken")).toBe("dummy_token");
//   });
// });


// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { TransferContext } from "../../../contexts/TransferContext";
// import { SavedAccountsContext } from "../../../contexts/SavedAccountsContext";
// import { MemoryRouter } from "react-router-dom";
// import TransferForm from "../../layout/TransferForm/TransferForm";
// import axios from "axios";

// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe("TransferForm", () => {
//   beforeEach(() => {
//     // Set up the TransferContext and SavedAccountsContext
//     const transferContext = {
//       transferAmount: 0,
//       transferTo: "",
//       transferFrom: "",
//       transferError: null,
//       transferSuccess: false,
//     };

//     const savedAccountsContext = {
//       savedAccounts: [
//         { id: 1, name: "Account 1", number: "1234567890" },
//         { id: 2, name: "Account 2", number: "9876543210" },
//       ],
//     };

//     render(
//       <MemoryRouter>
//         <TransferContext.Provider value={transferContext}>
//           <SavedAccountsContext.Provider value={savedAccountsContext}>
//             <TransferForm />
//           </SavedAccountsContext.Provider>
//         </TransferContext.Provider>
//       </MemoryRouter>
//     );
//   });

//   afterEach(() => {
//     // Clean up the TransferContext and SavedAccountsContext
//     jest.resetAllMocks();
//   });

//   it("validates user input", async () => {
//     // Test that the form validates user input
//     fireEvent.change(screen.getByPlaceholderText("Enter transfer amount"), {
//       target: { value: "abc" },
//     });

//     await waitFor(() => {
//       expect(screen.getByText("Invalid transfer amount")).toBeInTheDocument();
//     });

//     fireEvent.change(screen.getByPlaceholderText("Enter transfer amount"), {
//       target: { value: "100" },
//     });

//     await waitFor(() => {
//       expect(screen.queryByText("Invalid transfer amount")).not.toBeInTheDocument();
//     });
//   });

//   it("makes API call to transfer funds", async () => {
//     // Test that the form makes an API call to transfer funds
//     mockedAxios.post.mockResolvedValue({
//       data: { message: "Transfer successful" },
//     });

//     fireEvent.change(screen.getByPlaceholderText("Enter transfer amount"), {
//       target: { value: "100" },
//     });

//     fireEvent.change(screen.getByPlaceholderText("Select account to transfer from"), {
//       target: { value: "Account 1" },
//     });

//     fireEvent.change(screen.getByPlaceholderText("Select account to transfer to"), {
//       target: { value: "Account 2" },
//     });

//     fireEvent.click(screen.getByText("Transfer"));

//     await waitFor(() => {
//       expect(mockedAxios.post).toHaveBeenCalledWith(
//         `${import.meta.env.VITE_API_URL}/api/v1.0/transfers`,
//         {
//           amount: 100,
//           fromAccount: "Account 1",
//           toAccount: "Account 2",
//         }
//       );
//     });
//   });

//   it("displays success message on successful transfer", async () => {
//     // Test that the form displays a success message on successful transfer
//     mockedAxios.post.mockResolvedValue({
//       data: { message: "Transfer successful" },
//     });

//     fireEvent.change(screen.getByPlaceholderText("Enter transfer amount"), {
//       target: { value: "100" },
//     });

//     fireEvent.change(screen.getByPlaceholderText("Select account to transfer from"), {
//       target: { value: "Account 1" },
//     });

//     fireEvent.change(screen.getByPlaceholderText("Select account to transfer to"), {
//       target: { value: "Account 2" },
//     });

//     fireEvent.click(screen.getByText("Transfer"));

//     await waitFor(() => {
//       expect(screen.getByText("Transfer successful")).toBeInTheDocument();
//     });
//   });

//   it("displays error message on failed transfer", async () => {
//     // Test that the form displays an error message on failed transfer
//     mockedAxios.post.mockRejectedValue({
//       response: { data: { message: "Transfer failed" } },
//     });

//     fireEvent.change(screen.getByPlaceholderText("Enter transfer amount"), {
//       target: { value: "100" },
//     });

//     fireEvent.change(screen.getByPlaceholderText("Select account to transfer from"), {
//       target: { value: "Account 1" },
//     });

//     fireEvent.change(screen.getByPlaceholderText("Select account to transfer to"), {
//       target: { value: "Account 2" },
//     });

//     fireEvent.click(screen.getByText("Transfer"));

//     await waitFor(() => {
//       expect(screen.getByText("Transfer failed")).toBeInTheDocument();
//     });
//   });
// });