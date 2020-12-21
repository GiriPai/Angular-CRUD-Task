const express = require('express');
const cors = require('cors');
let employees = require('./data.json');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/employees', (req, res) => {
  res.status(200).json({payload: employees});
});

app.get('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find(emp => emp.id === id);
  if (!employee)
    return res.status(404).json({error: `Employee not found with id ${id}`});
  res.status(200).json({payload: employee});
});

app.post('/employees', (req, res) => {
  const id = Number(req.params.id);

  if (!req.body)
    return res.status(404).json({error: `Form Body cannot be empty`});

  const employee = {};
  employee.name = req.body.name;
  employee.age = req.body.age;
  employee.gender = req.body.gender;
  employee.isActive = req.body.isActive;
  employee.id = employees.length + 1;

  employees.push(employee);

  res.status(201).json({payload: employee});
});

app.put('/employees/:id', (req, res) => {
  const id = Number(req.params.id);

  const employee = employees.find(emp => emp.id === id);
  if (!employee)
    return res.status(404).json({error: `Employee not found with id ${id}`});

  if (!req.body)
    return res.status(404).json({error: `Form Body cannot be empty`});

  employee.name = req.body.name;
  employee.age = req.body.age;
  employee.gender = req.body.gender;
  employee.isActive = req.body.isActive;
  employee.id = id;

  let index = employees.findIndex(emp => emp.id === id);

  employees.splice(index, 1, employee);

  res.status(200).json({payload: employee});
});

app.delete('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find(emp => emp.id === id);
  if (!employee)
    return res.status(404).json({error: `Employee not found with id ${id}`});

  let index = employees.findIndex(emp => emp.id === id);

  employees.splice(index, 1);

  res.status(200).json({payload: employee});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
