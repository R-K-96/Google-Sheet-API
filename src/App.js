import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Button, Form, Header, Table } from "semantic-ui-react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [hobby, sethobby] = useState("");
  const [apiData, setApiData] = useState([]);
  const [refresh, setRefresh] = useState([]);

  const onSubmitting = () => {
    // e.preventDefault();
    const obj = { name, age, salary, hobby };

    axios
      .post(
        "https://sheet.best/api/sheets/dbbe0dcf-7570-4b11-b714-3507dde90d2d",
        obj
      )
      .then((res) => {
        console.log(res.data);
        setRefresh(res.data);
      });
    // console.log(name, age, salary, hobby);
  };

  useEffect(() => {
    axios
      .get("https://sheet.best/api/sheets/dbbe0dcf-7570-4b11-b714-3507dde90d2d")
      .then((res) => {
        console.log(res.data);
        setApiData(res.data);
      });
  }, [refresh]);

  return (
    <div style={{ padding: "20px", margin: "20px" }}>
      <Header as="h2">React Google Sheets!</Header>
      <Form className="form">
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Enter your name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Age</label>
          <input
            placeholder="Enter your age"
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Salary</label>
          <input
            placeholder="Enter your salary"
            type="number"
            name="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Hobby</label>
          <input
            placeholder="Enter your hobby"
            type="text"
            name="hobby"
            value={hobby}
            onChange={(e) => sethobby(e.target.value)}
          />
        </Form.Field>

        <Button color="blue" type="submit" onClick={onSubmitting}>
          Submit
        </Button>
      </Form>

      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Salary</Table.HeaderCell>
            <Table.HeaderCell>Hobby</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {apiData.map((row, index) => (
            <Table.Row key={index}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.age}</Table.Cell>
              <Table.Cell>{row.salary}</Table.Cell>
              <Table.Cell>{row.hobby}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default App;


// Google Sheet : -https://docs.google.com/spreadsheets/d/1T2bsPMgEzEMxHc5epPgV0SX0ODX5kNfpSFy27DHZWDc/edit#gid=0
