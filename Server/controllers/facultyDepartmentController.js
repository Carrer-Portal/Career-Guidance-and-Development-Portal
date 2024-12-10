import db from "../controllers/index.js";

const Faculty = db.faculty;
const Department = db.department;
// Get all faculties
const getAllFaculties = async (req, res) => {

  try {
    const faculties = await Faculty.findAll({
      include: [{
        model: Department,
        as: 'department'
      }]
    });
    if(faculties){
      res.status(200).json(faculties);
    }
    else if (res.status==400){
    res.status(400).json({ message: 'Bad Request', error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching faculties', error });
  }
};

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error });
  }
};

// Create a new faculty
const createFaculty = async (req, res) => {
  const { facultyName } = req.body;
  try {
    const newFaculty = await Faculty.create({ facultyName });
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(500).json({ message: 'Error creating faculty', error });
  }
};

// Create a new department
const createDepartment = async (req, res) => {
  const { departmentName } = req.body;
  try {
    const newDepartment = await Department.create({ departmentName });
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating department', error });
  }
};

// Update a department
const updateDepartment = async (req, res) => {
  const { departmentId } = req.params;
  const { departmentName } = req.body;
  try {
    const department = await Department.findByPk(departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    department.departmentName = departmentName;
    await department.save();
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error updating department', error });
  }
};

export { getAllFaculties, getAllDepartments, createFaculty, createDepartment, updateDepartment };