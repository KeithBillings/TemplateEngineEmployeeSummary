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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// what is this employee?
// name, id, email, other
// is there another employee? 
// what is this employee?
// name, id, email, other 
// another? etc..

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

  const { again, ...answers } = await inquirer.prompt(questions);
  const newInputs = [...inputs, answers];
  return again ? collectInputs(newInputs) : newInputs;
};

const buildHTML = async () => {
  const inputs = await collectInputs();
  console.log(inputs); //change this to build html 
  console.log(inputs[0])
  console.log(inputs[0].name)
};

buildHTML();