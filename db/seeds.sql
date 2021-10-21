INSERT INTO department (name)
VALUES ("Sales"),
       ("Finance"),
       ("Engineering"),
       ("Legal");
       

INSERT INTO role (title,salary,department_id)
VALUES ("SalesPerson",80000.00,1),
       ("Lead Engineer",150000.00,2),
       ("Software Engineer",120000.00,3),
       ("Account Manager",160000.00,4),
       ("Accountant",125000.00,5),
       ("Legal Team Lead",250000.00,6),
       ("Lawyer",190000.00,7);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Mike","Chan",1111,0001),
       ("Ashley","Rodriguez",2222,0002),
       ("Kevin","Tupik",3333,0003),
       ("Kunal","Singh",4444,0004),
       ("Malia","Brown",5555,0005),
       ("Sarah","Lourd",6666,0006),
       ("Tom","Allen",7777,0007);
       