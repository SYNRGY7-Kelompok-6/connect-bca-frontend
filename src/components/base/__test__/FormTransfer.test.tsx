import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider } from "../../../contexts/AuthContext";
import TransferForm from "../../layout/TransferForm/TransferForm";
import axios from "axios";
import { BankStatementProvider } from "../../../contexts/BankStatementContext";
import { SavedAccountsProvider } from "../../../contexts/SavedAccountsContext";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("gagal transfer", async () => {
  mockedAxios.post.mockResolvedValue({
    data: { data: { transferId: "dummy_transfer_id" } },
  });

  render(
    <MemoryRouter>
      <AuthProvider>
        <BankStatementProvider>
          <SavedAccountsProvider>
            <TransferForm />
          </SavedAccountsProvider>
        </BankStatementProvider>
      </AuthProvider>
    </MemoryRouter>
    );

  fireEvent.change(
    screen.getByPlaceholderText("Masukan Nominal Anda"),
    {
      target: { value: "100000" },
    }
  );

  fireEvent.change(screen.getByPlaceholderText("Pembayaran"), {
    target: { value: "Sedekah" },
  });

  fireEvent.click(screen.getByText("Lanjut"));
  expect(screen.getByText("Ulangi")).toBeInTheDocument();

});