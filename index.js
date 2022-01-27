const express = require("express");

const app = express();

const PORT = 5000;

const helloText = {
    "message": "Hello JSON"
};

const courseDetail = [
    { code: "CSS101", name: "Introduction JS", semester: 1, active: true },
    { code: "CSS102", name: "Introduction ExpressJS", semester:2, active: false},
    { code: "CSS201", name: "Web programming", semester: 1, active: false },
    { code: "CSS102", name: "Database", semester: 2, active: true },
    { code: "CSS999", name: "How to win a lottery", semester:3, active: true }
];
    
const lecturerDetail = [
    { id: 1, name: "Tony Stark", department: "TECH", teachingHours: 100 },
    { id: 2, name: "Harry Potter", department: "MAGIC", teachingHours:50 }
];
    
app.use(express.json());


app.get("/hello", (req, res) => {
    res.send("hello endpoint");
});

app.get("/helloJSON", (req, res) => res.json(helloText));

app.post("/concat", (req, res) => {
    const concatString = {
        "concat_string": `${req.body.str1}-${req.body.str2.toUpperCase()}`
    }

    res.json(concatString);
});

app.get("/course", (req, res) => {
    let arrayCourse = courseDetail;

    if(req.query.code) {
        arrayCourse = arrayCourse.filter(findCourse => req.query.code === findCourse.code);
    }
    if(req.query.semester) {
        arrayCourse = arrayCourse.filter(findCourse => req.query.semester === findCourse.semester.toString());
    }
    if(req.query.active) {
        arrayCourse = arrayCourse.filter(findCourse => req.query.active === findCourse.active.toString());
    }

    const course = {
        "data": arrayCourse
    };

    res.json(course);

});

app.get("/course/:code", (req, res) => {
    const course = {
        "data": courseDetail[courseDetail.findIndex(course => {
            return course.code === req.params.code;
        })]
    }
    res.json(course);
});

app.post("/lecturer", (req, res) => {
    const newLecturer = {
        "id": req.body.id,
        "name": req.body.name,
        "department": req.body.department,
        "teachingHours": req.body.teachingHours
    }

    lecturerDetail.push(newLecturer);

    res.json(lecturerDetail);
});

app.put("/lecturer/:id", (req, res) => {
    const updateLecturer = req.body;

    lecturerDetail.forEach(lecturer => {
        if(parseInt(req.params.id) === lecturer.id) {
            lecturer.name = updateLecturer.name ? updateLecturer.name : lecturer.name;
            lecturer.department = updateLecturer.department ? updateLecturer.department : lecturer.department;
            lecturer.teachingHours = updateLecturer.teachingHours ? updateLecturer.teachingHours : lecturer.teachingHours;
        }
    });

    res.json(lecturerDetail);

});

app.delete("/lecturer/:id", (req, res) => {

    const lecturerIndex = lecturerDetail.findIndex(lecturer => parseInt(req.params.id) === lecturer.id );
    
    if(lecturerIndex !== -1) {
        lecturerDetail.splice(lecturerIndex,1);
    }

    res.json(lecturerDetail);

});

app.listen(PORT, () => console.log(`Server was started at ${PORT}`));