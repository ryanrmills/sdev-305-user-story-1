import express from 'express';
import mysql2 from 'mysql2'
import dotenv from 'dotenv'
//import data from './backend/assets/programs_50_years.json' assert {type: 'json'};
import { readFile } from 'fs/promises';

dotenv.config();

const app = express();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

const path = import.meta.dirname;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// const jsonData = await readFile('./backend/assets/programs_50_years_filled_modified.json', 'utf-8');
// let LOCData = JSON.parse(jsonData);

// let LOCData = [
//   {
//     "division": "Fine Arts",
//     "academicProgram": "Music",
//     "divisionChair": "Paul Metevier",
//     "dean": "Christie Gilliland",
//     "locRep": "Monica Bowen",
//     "penContact": "pen_contact_0@college.edu",
//     "dateSubmitted": "2025-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Humanities",
//     "academicProgram": "Communication Studies",
//     "divisionChair": "Katie Cunnion",
//     "dean": "Jamie Fitzgerald",
//     "locRep": "Lisa Luengo",
//     "penContact": "pen_contact_1@college.edu",
//     "dateSubmitted": "2024-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Social Science",
//     "academicProgram": "Anthropology",
//     "divisionChair": "Mark Thomason",
//     "dean": "Christie Gilliland",
//     "locRep": "Joy Crawford",
//     "penContact": "pen_contact_2@college.edu",
//     "dateSubmitted": "2023-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 7",
//     "academicProgram": "History",
//     "divisionChair": "Dr. David Lee",
//     "dean": "Dr. Frank Davis",
//     "locRep": "Dr. Helen Davis",
//     "penContact": "pen_contact_3@college.edu",
//     "dateSubmitted": "2022-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 4",
//     "academicProgram": "Political Science",
//     "divisionChair": "Dr. Jane Lee",
//     "dean": "Dr. Helen Brown",
//     "locRep": "Dr. Frank Smith",
//     "penContact": "pen_contact_4@college.edu",
//     "dateSubmitted": "2021-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 7",
//     "academicProgram": "Psychology",
//     "divisionChair": "Dr. Helen Davis",
//     "dean": "Dr. Carol Smith",
//     "locRep": "Dr. Grace Johnson",
//     "penContact": "pen_contact_5@college.edu",
//     "dateSubmitted": "2020-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "English",
//     "academicProgram": "English",
//     "divisionChair": "Ian Sherman",
//     "dean": "Jamie Fitzgerald",
//     "locRep": "Jake Frye",
//     "penContact": "pen_contact_6@college.edu",
//     "dateSubmitted": "2019-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Science",
//     "academicProgram": "Anatomy and Physiology",
//     "divisionChair": "Katy Shaw and Danny Najera",
//     "dean": "Miebeth Bustillo-Booth",
//     "locRep": "Nicole Feider",
//     "penContact": "pen_contact_7@college.edu",
//     "dateSubmitted": "2018-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 4",
//     "academicProgram": "Biology/Environmental Science",
//     "divisionChair": "Dr. Carol Lee",
//     "dean": "Dr. David Lee",
//     "locRep": "Dr. Alice Smith",
//     "penContact": "pen_contact_8@college.edu",
//     "dateSubmitted": "2017-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 6",
//     "academicProgram": "Geology/Oceanography",
//     "divisionChair": "Dr. Bob Brown",
//     "dean": "Dr. Emily Johnson",
//     "locRep": "Dr. Jane Lee",
//     "penContact": "pen_contact_9@college.edu",
//     "dateSubmitted": "2016-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Business, Law, and Education",
//     "academicProgram": "Accounting",
//     "divisionChair": "Lea Ann Simpson",
//     "dean": "Lea Ann Simpson",
//     "locRep": "Jane Swenson",
//     "penContact": "pen_contact_10@college.edu",
//     "dateSubmitted": "2015-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 8",
//     "academicProgram": "Business Management",
//     "divisionChair": "Dr. Helen Lee",
//     "dean": "Dr. Alice Davis",
//     "locRep": "Dr. Emily Brown",
//     "penContact": "pen_contact_11@college.edu",
//     "dateSubmitted": "2014-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 7",
//     "academicProgram": "Business Marketing/Entrepreneurship",
//     "divisionChair": "Dr. Grace Johnson",
//     "dean": "Dr. David Davis",
//     "locRep": "Dr. Jane Lee",
//     "penContact": "pen_contact_12@college.edu",
//     "dateSubmitted": "2013-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Technology",
//     "academicProgram": "Aviation",
//     "divisionChair": "Michael Wood",
//     "dean": "Lea Ann Simpson",
//     "locRep": "Josh Archer",
//     "penContact": "pen_contact_13@college.edu",
//     "dateSubmitted": "2012-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 7",
//     "academicProgram": "CAD Design and Engineering Tech.",
//     "divisionChair": "Dr. Carol Davis",
//     "dean": "Dr. Emily Davis",
//     "locRep": "Dr. Grace Smith",
//     "penContact": "pen_contact_14@college.edu",
//     "dateSubmitted": "2011-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 8",
//     "academicProgram": "Natural Resources",
//     "divisionChair": "Dr. Bob Johnson",
//     "dean": "Dr. Alice Brown",
//     "locRep": "Dr. Frank Davis",
//     "penContact": "pen_contact_15@college.edu",
//     "dateSubmitted": "2010-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Health Science",
//     "academicProgram": "Practical Nursing",
//     "divisionChair": "Leslie Kessler",
//     "dean": "Lionel Candido Flores",
//     "locRep": "Thom Jackson",
//     "penContact": "pen_contact_16@college.edu",
//     "dateSubmitted": "2009-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 3",
//     "academicProgram": "Physical Therapist Assistant",
//     "divisionChair": "Dr. Alice Smith",
//     "dean": "Dr. Helen Brown",
//     "locRep": "Dr. Helen Davis",
//     "penContact": "pen_contact_17@college.edu",
//     "dateSubmitted": "2008-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Trades",
//     "academicProgram": "Automotive Technology",
//     "divisionChair": "David Lewis",
//     "dean": "Lea Ann Simpson",
//     "locRep": "Ben Orr",
//     "penContact": "pen_contact_18@college.edu",
//     "dateSubmitted": "2007-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 2",
//     "academicProgram": "Manufacturing",
//     "divisionChair": "Dr. Ian Davis",
//     "dean": "Dr. Frank Johnson",
//     "locRep": "Dr. Bob Johnson",
//     "penContact": "pen_contact_19@college.edu",
//     "dateSubmitted": "2006-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Transitional Studies",
//     "academicProgram": "Health and Physical Education",
//     "divisionChair": "Dr. Grace Lee",
//     "dean": "Lionel Candido Flores",
//     "locRep": "Thom Jackson",
//     "penContact": "pen_contact_20@college.edu",
//     "dateSubmitted": "2005-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Fine Arts",
//     "academicProgram": "Music",
//     "divisionChair": "Paul Metevier",
//     "dean": "Christie Gilliland",
//     "locRep": "Monica Bowen",
//     "penContact": "pen_contact_21@college.edu",
//     "dateSubmitted": "2004-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Humanities",
//     "academicProgram": "Communication Studies",
//     "divisionChair": "Katie Cunnion",
//     "dean": "Jamie Fitzgerald",
//     "locRep": "Lisa Luengo",
//     "penContact": "pen_contact_22@college.edu",
//     "dateSubmitted": "2003-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Social Science",
//     "academicProgram": "Anthropology",
//     "divisionChair": "Mark Thomason",
//     "dean": "Christie Gilliland",
//     "locRep": "Joy Crawford",
//     "penContact": "pen_contact_23@college.edu",
//     "dateSubmitted": "2002-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 4",
//     "academicProgram": "History",
//     "divisionChair": "Dr. Jane Davis",
//     "dean": "Dr. Frank Smith",
//     "locRep": "Dr. Frank Davis",
//     "penContact": "pen_contact_24@college.edu",
//     "dateSubmitted": "2001-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 8",
//     "academicProgram": "Political Science",
//     "divisionChair": "Dr. Ian Brown",
//     "dean": "Dr. Jane Johnson",
//     "locRep": "Dr. Bob Davis",
//     "penContact": "pen_contact_25@college.edu",
//     "dateSubmitted": "2000-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 5",
//     "academicProgram": "Psychology",
//     "divisionChair": "Dr. Alice Brown",
//     "dean": "Dr. Grace Smith",
//     "locRep": "Dr. Alice Davis",
//     "penContact": "pen_contact_26@college.edu",
//     "dateSubmitted": "1999-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "English",
//     "academicProgram": "English",
//     "divisionChair": "Ian Sherman",
//     "dean": "Jamie Fitzgerald",
//     "locRep": "Jake Frye",
//     "penContact": "pen_contact_27@college.edu",
//     "dateSubmitted": "1998-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Science",
//     "academicProgram": "Anatomy and Physiology",
//     "divisionChair": "Katy Shaw and Danny Najera",
//     "dean": "Miebeth Bustillo-Booth",
//     "locRep": "Nicole Feider",
//     "penContact": "pen_contact_28@college.edu",
//     "dateSubmitted": "1997-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 7",
//     "academicProgram": "Biology/Environmental Science",
//     "divisionChair": "Dr. Frank Brown",
//     "dean": "Dr. Jane Lee",
//     "locRep": "Dr. Emily Lee",
//     "penContact": "pen_contact_29@college.edu",
//     "dateSubmitted": "1996-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 1",
//     "academicProgram": "Geology/Oceanography",
//     "divisionChair": "Dr. Helen Brown",
//     "dean": "Dr. Ian Lee",
//     "locRep": "Dr. Ian Davis",
//     "penContact": "pen_contact_30@college.edu",
//     "dateSubmitted": "1995-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Business, Law, and Education",
//     "academicProgram": "Accounting",
//     "divisionChair": "Lea Ann Simpson",
//     "dean": "Lea Ann Simpson",
//     "locRep": "Jane Swenson",
//     "penContact": "pen_contact_31@college.edu",
//     "dateSubmitted": "1994-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 5",
//     "academicProgram": "Business Management",
//     "divisionChair": "Dr. David Davis",
//     "dean": "Dr. David Johnson",
//     "locRep": "Dr. Emily Davis",
//     "penContact": "pen_contact_32@college.edu",
//     "dateSubmitted": "1993-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 2",
//     "academicProgram": "Business Marketing/Entrepreneurship",
//     "divisionChair": "Dr. David Lee",
//     "dean": "Dr. Frank Johnson",
//     "locRep": "Dr. Grace Brown",
//     "penContact": "pen_contact_33@college.edu",
//     "dateSubmitted": "1992-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Technology",
//     "academicProgram": "Aviation",
//     "divisionChair": "Michael Wood",
//     "dean": "Lea Ann Simpson",
//     "locRep": "Josh Archer",
//     "penContact": "pen_contact_34@college.edu",
//     "dateSubmitted": "1991-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 1",
//     "academicProgram": "CAD Design and Engineering Tech.",
//     "divisionChair": "Dr. Jane Smith",
//     "dean": "Dr. Frank Brown",
//     "locRep": "Dr. Carol Brown",
//     "penContact": "pen_contact_35@college.edu",
//     "dateSubmitted": "1990-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 9",
//     "academicProgram": "Natural Resources",
//     "divisionChair": "Dr. Bob Smith",
//     "dean": "Dr. Ian Smith",
//     "locRep": "Dr. Helen Johnson",
//     "penContact": "pen_contact_36@college.edu",
//     "dateSubmitted": "1989-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Health Science",
//     "academicProgram": "Practical Nursing",
//     "divisionChair": "Leslie Kessler",
//     "dean": "Lionel Candido Flores",
//     "locRep": "Thom Jackson",
//     "penContact": "pen_contact_37@college.edu",
//     "dateSubmitted": "1988-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 10",
//     "academicProgram": "Physical Therapist Assistant",
//     "divisionChair": "Dr. Grace Johnson",
//     "dean": "Dr. Helen Smith",
//     "locRep": "Dr. Alice Smith",
//     "penContact": "pen_contact_38@college.edu",
//     "dateSubmitted": "1987-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Trades",
//     "academicProgram": "Automotive Technology",
//     "divisionChair": "David Lewis",
//     "dean": "Lea Ann Simpson",
//     "locRep": "Ben Orr",
//     "penContact": "pen_contact_39@college.edu",
//     "dateSubmitted": "1986-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 2",
//     "academicProgram": "Manufacturing",
//     "divisionChair": "Dr. Bob Brown",
//     "dean": "Dr. Bob Davis",
//     "locRep": "Dr. Bob Johnson",
//     "penContact": "pen_contact_40@college.edu",
//     "dateSubmitted": "1985-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Transitional Studies",
//     "academicProgram": "Health and Physical Education",
//     "divisionChair": "Dr. Alice Smith",
//     "dean": "Lionel Candido Flores",
//     "locRep": "Thom Jackson",
//     "penContact": "pen_contact_41@college.edu",
//     "dateSubmitted": "1984-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Fine Arts",
//     "academicProgram": "Music",
//     "divisionChair": "Paul Metevier",
//     "dean": "Christie Gilliland",
//     "locRep": "Monica Bowen",
//     "penContact": "pen_contact_42@college.edu",
//     "dateSubmitted": "1983-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Humanities",
//     "academicProgram": "Communication Studies",
//     "divisionChair": "Katie Cunnion",
//     "dean": "Jamie Fitzgerald",
//     "locRep": "Lisa Luengo",
//     "penContact": "pen_contact_43@college.edu",
//     "dateSubmitted": "1982-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Social Science",
//     "academicProgram": "Anthropology",
//     "divisionChair": "Mark Thomason",
//     "dean": "Christie Gilliland",
//     "locRep": "Joy Crawford",
//     "penContact": "pen_contact_44@college.edu",
//     "dateSubmitted": "1981-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 6",
//     "academicProgram": "History",
//     "divisionChair": "Dr. Jane Smith",
//     "dean": "Dr. Emily Lee",
//     "locRep": "Dr. Jane Lee",
//     "penContact": "pen_contact_45@college.edu",
//     "dateSubmitted": "1980-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 9",
//     "academicProgram": "Political Science",
//     "divisionChair": "Dr. Jane Brown",
//     "dean": "Dr. Helen Smith",
//     "locRep": "Dr. Frank Lee",
//     "penContact": "pen_contact_46@college.edu",
//     "dateSubmitted": "1979-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Division 10",
//     "academicProgram": "Psychology",
//     "divisionChair": "Dr. Alice Brown",
//     "dean": "Dr. Bob Lee",
//     "locRep": "Dr. Bob Davis",
//     "penContact": "pen_contact_47@college.edu",
//     "dateSubmitted": "1978-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "English",
//     "academicProgram": "English",
//     "divisionChair": "Ian Sherman",
//     "dean": "Jamie Fitzgerald",
//     "locRep": "Jake Frye",
//     "penContact": "pen_contact_48@college.edu",
//     "dateSubmitted": "1977-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   },
//   {
//     "division": "Science",
//     "academicProgram": "Anatomy and Physiology",
//     "divisionChair": "Katy Shaw and Danny Najera",
//     "dean": "Miebeth Bustillo-Booth",
//     "locRep": "Nicole Feider",
//     "penContact": "pen_contact_49@college.edu",
//     "dateSubmitted": "1976-06-30",
//     "payees": "",
//     "hasBeenPaid": "0",
//     "reportSubmitted": "no",
//     "notes": ""
//   }
// ]

app.get('/', (req, res) => {
    res.render('dash2.ejs');
})

app.get('/sign-in', (req, res) => {
    res.render('signin');
})

app.get('/division-data', async (req, res) => {
    const division = req.query.division;

    const result = LOCData.filter(item => item.division === division);

    let sortedLOCData = [...result].sort((a, b) =>
        new Date(b['dateSubmitted']) - new Date(a['dateSubmitted'])
    );

    res.json(sortedLOCData);
})

app.get('/summary', async(req, res) => { 
    try{
      const [LOCData] = await 
      pool.query('SELECT * FROM divisiondata ORDER BY division DESC');
      res.render('summary', { LOCData })
    }catch(err){
      console.error('Database error:', err);
    }
})

//The post method that runs the SQL queries to execute changes in the database.
app.post('/submit-data', async(req, res) => {

  const datainput = req.body;

  //The SQL statement
  const sql = "UPDATE divisiondata SET division = ?, academic_program = ?, payees = ?, has_been_paid = ?, report_submitted = ?, notes = ? WHERE id = ?" 

  console.log(datainput)

  const params = [
    datainput["division-summary"],
    datainput["program-summary"],
    datainput["payee-summary"],
    datainput["paid-summary"],
    datainput["report-summary"],
    datainput["notes-summary"],
    datainput["id-summary"]
  ]

  try {
    const [result] = await pool.execute(sql, params);
    //Executes the statement above and then send the user back to the
    //summary page with the changes pulled after the edit below
    const [LOCData] = await 
    pool.query('SELECT * FROM divisiondata ORDER BY division DESC');

    res.render('summary', { LOCData })
  } catch(err) {
    console.log("Database Error", err)
  }
})


const PORT = 3003;
app.listen(PORT, (req, res) => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
