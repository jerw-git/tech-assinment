import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { prefDocuments } from "../mockData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

export const Documents = () => {
  const { selectedAccount } = useSelector((state) => state.account);
  const [documents, setDocuments] = useState();
  useEffect(() => {
    const docs = prefDocuments.filter((account) => {
      return account.account_key === selectedAccount;
    });
    setDocuments(docs[0].docs);
  }, [selectedAccount]);
  const sortTable = (isAscending) => {
    const sortedDocs = [...documents].sort((a, b) => {
      let x = a["document_type"];
      let y = b["document_type"];
      return isAscending ? x.localeCompare(y) : y.localeCompare(x);
    });
    setDocuments(sortedDocs);
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => sortTable(true)}
        >
          Sort Document Type (ASC)
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => sortTable(false)}
        >
          Sort Document Type ( DESC)
        </Button>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Document Type</TableCell>
              <TableCell>Delivery Method</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents &&
              documents.map((document) => {
                return (
                  <TableRow key={document.document_type}>
                    <TableCell>{document.document_type}</TableCell>
                    <TableCell>
                      {document.is_paper_flag ? "Paper" : "Paperless"}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
