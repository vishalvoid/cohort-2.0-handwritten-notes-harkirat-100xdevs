type Employee = {
  name: String,
  startDate: Date
}

type Manager = {
  name: String,
  department: String
}

type TechLead = Employee & Manager