DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS cars(
   id       INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,brand    VARCHAR(20) NOT NULL
  ,model    VARCHAR(20) NOT NULL
  ,regnr    VARCHAR(6) NOT NULL
  ,color    VARCHAR(12) NOT NULL
  ,year     INTEGER NOT NULL
  ,price    INTEGER NOT NULL
  ,forSale  BOOLEAN NOT NULL
);
INSERT INTO cars(id,brand,model,regnr,color,year,price,forSale) VALUES (1,'Volkswagen','Golf','GIK925','gray','2010','75000','TRUE');
INSERT INTO cars(id,brand,model,regnr,color,year,price,forSale) VALUES (2,'Saab','900og','GIK151','red','1990','12000','TRUE');
INSERT INTO cars(id,brand,model,regnr,color,year,price,forSale) VALUES (3,'Volvo','240','GIK119','purple','1980','20000','FALSE');
INSERT INTO cars(id,brand,model,regnr,color,year,price,forSale) VALUES (4,'Audi','A6','GIK514','green','2001','13000','TRUE');
INSERT INTO cars(id,brand,model,regnr,color,year,price,forSale) VALUES (5,'Volkswagen','Passat','GIK127','stone','2023','250000','TRUE');
INSERT INTO cars(id,brand,model,regnr,color,year,price,forSale) VALUES (6,'Opel','Corsa','GIK758','yellow','2005','6000','TRUE');
INSERT INTO cars(id,brand,model,regnr,color,year,price,forSale) VALUES (7,'Volvo','850','GIK826','red','1995','11000','TRUE');
INSERT INTO cars(id,brand,model,regnr,color,year,price,forSale) VALUES (8,'Audi','RS5','GIK636','yellow','2019','750000','FALSE');
INSERT INTO cars(id,brand,model,regnr,color,year,price,forSale) VALUES (9,'Saab','9-5','GIK392','gray','2005','10000','TRUE');
INSERT INTO cars(id,brand,model,regnr,color,year,price,forSale) VALUES (10,'Ferrari','F40','GIK894','red','1988','28000000','TRUE');


select * from cars;