INSERT INTO department (name)
VALUES ("Sales"),
       ("Finance"),
       ("Engineering"),
       ("Legal");
       

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead",100000.00,1),
       ("SalesPerson",80000.00,1),
       ("Lead Engineer",150000.00,2),
       ("Software Engineer",120000.00,2),
       ("Account Manager",160000.00,3),
       ("Accountant",125000.00,3),
       ("Legal Team Lead",250000.00,4),
       ("Lawyer",190000.00,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Mike","Chan",1,null),
       ("Ashley","Rodriguez",2,0002),
       ("Kevin","Tupik",2,0003),
       ("Kunal","Singh",4,0004),
       ("Malia","Brown",3, null),
       ("Sarah","Lourd",4,0006),
       ("Tom","Allen",5,null),
       ("Sowmya","Nagayya",6,0005);
       