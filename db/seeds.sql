INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");

INSERT INTO role (id,  title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1),
       (2, "Salesperson", 80000, 1),
       (3, "Lead Engineer", 150000, 2),
       (4, "Software Engineer", 120000, 2),
       (5, "Accountant", 125000, 3),
       (6, "Account Manager", 16000, 3),
       (7, "Legal Team Lead", 250000, 4),
       (8, "Lawyer", 19000, 4);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Michael", "Jordan", 1, null),
       (2, "Lebron", "James", 1, 1),
       (3, "Bugs", "Bunny", 2, 1),
       (4, "Daffy", "Duck", 2, 1),
       (5, "Monkey", "D. Luffy", 3, 2),
       (6, "Naruto", "Uzumaki", 3, null ),
       (7, "Ichigo", "Kurosaki", 4, 4),
       (8, "Kobe", "Bryant", 4, null),
       (9, "Spongebob", "Squarepants", 1, 3),
       (10, "Patrick", "Star", 2, null);