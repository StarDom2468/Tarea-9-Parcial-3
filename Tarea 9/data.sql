CREATE TABLE articulos (
    id INT PRIMARY KEY,
    nombre VARCHAR (100),
    precio DECIMAL (10,2),
    pesoKg DECIMAL (10,2),
    alturam DECIMAL (10,2)
);
INSERT INTO articulos (nombre, precio, pesoKg, alturam) VALUES
('Celular', 7599.00, 0.20, 0.15),
('Refrigerador', 17000.00, 70.65, 1.70),
('Televisor 4k', 24000.00, 18.00, 0.70),
('Estufa', 8600.00, 47.20, 1.10),
('Aire acondicionado', 11400.00, 24.40, 0.45),
('Impresora', 5600.00, 5.00, 0.35),
('Silla', 560.00, 3.57, 0.90),
('Escritorio', 4300.00, 29.30, 0.75),
('Armario', 7900.00, 49.00, 1.98),
('Escalera de mano', 2870.00, 14.10, 3.00),
('Pizarrón', 1400.00, 14.20, 1.47),
('Garrafón lleno', 40.00, 19.00, 0.54),
('Cuaderno', 45.30, 0.40, 0.30),
('Mochila', 1400.00, 2.17, 0.50),
('Casa para perro', 3400.00, 23.00, 1.40),
('Tinaco', 3000.00, 36.00, 1.80),
('Shampoo', 55.00, 0.6, 0.24),
('Bote de basura', 450.00, 8.90, 0.90),
('Caja de arena para gatos', 600.30, 5.00, 0.40),
('Bicicleta', 7690.80, 17.00, 1.16);