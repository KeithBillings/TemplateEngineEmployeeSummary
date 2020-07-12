const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const collectInputs = async (inputs = []) => {

  let questions = [
    {
      type: 'list',
      name: `employeeType`,
      message: 'This employee is a: ',
      choices: [
        'Manager',
        'Engineer',
        'Intern'
      ]
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is this employee\'s name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is this employee\'s id?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is this employee\'s email?'
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'What is this manager\'s office number?',
      when: function (answers) {
        return answers.employeeType === 'Manager'
      }
    },
    {
      type: 'input',
      name: `github`,
      message: 'What is this engineer\'s Github username?',
      when: function (answers) {
        return answers.employeeType === 'Engineer'
      }
    },
    {
      type: 'input',
      name: `school`,
      message: 'What is this name of this intern\'s school?',
      when: function (answers) {
        return answers.employeeType === 'Intern'
      }
    },
    {
      type: 'confirm',
      name: 'again',
      message: 'Enter another input? ',
      default: true
    }
  ];

  // Loops through questions recursively until user is done
  const { again, ...answers } = await inquirer.prompt(questions);
  const newInputs = [...inputs, answers];
  return again ? collectInputs(newInputs) : newInputs;
};

const buildHTML = async () => {
  const inputs = await collectInputs();
  let employeeList = [];
  // Loop through answers and apply classes to them, then push them to array
  for (i=0; i<inputs.length; i++){
    if (inputs[i].employeeType === 'Manager'){
      let emp = new Manager (inputs[i].name, inputs[i].id, inputs[i].email, inputs[i].officeNumber)
      employeeList.push(emp);
    }
    if (inputs[i].employeeType === 'Engineer'){
      let emp = new Engineer (inputs[i].name, inputs[i].id, inputs[i].email, inputs[i].github)
      employeeList.push(emp);
    }
    if (inputs[i].employeeType === 'Intern'){
      let emp = new Intern (inputs[i].name, inputs[i].id, inputs[i].email, inputs[i].school)
      employeeList.push(emp);
    }
  }

  // When done gathering input, renders HTML file and writes it to "output" folder
  fs.writeFile(outputPath, render(employeeList), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
};

buildHTML(); 