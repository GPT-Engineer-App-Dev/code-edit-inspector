import { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const Index = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.split("\n");
      const headers = lines[0].split(",");
      const rows = lines.slice(1).map((line) => line.split(","));
      const data = rows.map((row) => {
        const obj = {};
        headers.forEach((header, i) => (obj[header] = row[i]));
        return obj;
      });
      setData(data);
    };
    reader.readAsText(file);
  };

  return (
    <Box>
      <input type="file" onChange={handleFileUpload} />

      <Table>
        <Thead>
          <Tr>{data[0] && Object.keys(data[0]).map((header) => <Th key={header}>{header}</Th>)}</Tr>
        </Thead>
        <Tbody>
          {data.map((row, i) => (
            <Tr key={i}>
              {Object.values(row).map((cell, j) => (
                <Td key={j}>{cell}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Index;
