-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2022 at 02:45 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prod_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `revision` int(11) DEFAULT 0,
  `name` varchar(500) NOT NULL,
  `description` varchar(500) NOT NULL,
  `quantity` int(11) DEFAULT 0,
  `material_items` int(11) DEFAULT 0,
  `material_cost` float DEFAULT 0,
  `waste_percentage` float DEFAULT 0,
  `waste_amount` float DEFAULT 0,
  `labour_percentage` float DEFAULT 0,
  `labour_amount` float DEFAULT 0,
  `equipment_cost` float DEFAULT 0,
  `other_percentage` float DEFAULT 0,
  `other_amount` float DEFAULT 0,
  `margin_percentage` float DEFAULT 0,
  `margin_amount` float DEFAULT 0,
  `sub_total` float DEFAULT 0,
  `amount` float DEFAULT 0,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `revision`, `name`, `description`, `quantity`, `material_items`, `material_cost`, `waste_percentage`, `waste_amount`, `labour_percentage`, `labour_amount`, `equipment_cost`, `other_percentage`, `other_amount`, `margin_percentage`, `margin_amount`, `sub_total`, `amount`, `deleted`, `created_at`, `updated_at`, `deleted_at`, `modified_by`) VALUES
(1, 1, 'Wooden Table', 'Lorem ipsum dolor sit amet', 2, 7, 87.6, 5, 4.38, 15, 13.797, 10, 8, 9.26216, 10, 12.5039, 137.543, 275.086, 0, '2022-05-21 20:19:43', '2022-05-21 14:45:40', NULL, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `product_materials`
--

CREATE TABLE `product_materials` (
  `id` int(11) NOT NULL,
  `revision` int(11) NOT NULL DEFAULT 0,
  `product_id` int(11) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `rate` float NOT NULL,
  `amount` float DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_materials`
--

INSERT INTO `product_materials` (`id`, `revision`, `product_id`, `description`, `quantity`, `rate`, `amount`, `deleted`, `created_at`, `updated_at`, `deleted_at`, `modified_by`) VALUES
(1, 0, 1, 'MDF Sheets', 10, 5, 50, 0, '2022-05-21 14:46:06', '2022-05-21 14:46:06', NULL, NULL),
(2, 0, 1, 'Filler', 2, 10, 20, 0, '2022-05-21 14:46:28', '2022-05-21 14:46:28', NULL, NULL),
(3, 0, 1, 'Primer', 4, 1, 4, 0, '2022-05-21 14:46:47', '2022-05-21 14:46:47', NULL, NULL),
(4, 2, 1, 'Paint', 5, 0.5, 2.5, 0, '2022-05-21 14:47:12', '2022-05-21 14:48:22', NULL, 'admin'),
(5, 0, 1, 'Nail', 8, 1, 8, 0, '2022-05-21 14:48:38', '2022-05-21 14:48:38', NULL, NULL),
(6, 0, 1, 'Handle', 2, 0.8, 1.6, 0, '2022-05-21 14:49:10', '2022-05-21 14:49:10', NULL, NULL),
(7, 0, 1, 'Masking Tape', 1, 1.5, 1.5, 0, '2022-05-21 14:49:43', '2022-05-21 14:49:43', NULL, NULL);

--
-- Triggers `product_materials`
--
DELIMITER $$
CREATE TRIGGER `Delete Material` AFTER DELETE ON `product_materials` FOR EACH ROW UPDATE products 
SET products.waste_amount = (products.waste_percentage / 100) * products.material_cost,
products.labour_amount = (products.labour_percentage / 100) * (products.material_cost + products.waste_amount),
products.other_amount = (products.other_percentage / 100) * (products.equipment_cost + products.labour_amount + products.material_cost + products.waste_amount),
products.margin_amount = (products.margin_percentage / 100) * (products.other_amount + products.equipment_cost + products.labour_amount + products.material_cost + products.waste_amount),
products.sub_total = (products.margin_amount + products.other_amount + products.equipment_cost + products.labour_amount + products.material_cost + products.waste_amount),
products.amount = (products.quantity * products.sub_total)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Insert material` AFTER INSERT ON `product_materials` FOR EACH ROW UPDATE products 
SET products.waste_amount = (products.waste_percentage / 100) * products.material_cost,
products.labour_amount = (products.labour_percentage / 100) * (products.material_cost + products.waste_amount),
products.other_amount = (products.other_percentage / 100) * (products.equipment_cost + products.labour_amount + products.material_cost + products.waste_amount),
products.margin_amount = (products.margin_percentage / 100) * (products.other_amount + products.equipment_cost + products.labour_amount + products.material_cost + products.waste_amount),
products.sub_total = (products.margin_amount + products.other_amount + products.equipment_cost + products.labour_amount + products.material_cost + products.waste_amount),
products.amount = (products.quantity * products.sub_total)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Update Material` AFTER UPDATE ON `product_materials` FOR EACH ROW UPDATE products 
SET products.waste_amount = (products.waste_percentage / 100) * products.material_cost,
products.labour_amount = (products.labour_percentage / 100) * (products.material_cost + products.waste_amount),
products.other_amount = (products.other_percentage / 100) * (products.equipment_cost + products.labour_amount + products.material_cost + products.waste_amount),
products.margin_amount = (products.margin_percentage / 100) * (products.other_amount + products.equipment_cost + products.labour_amount + products.material_cost + products.waste_amount),
products.sub_total = (products.margin_amount + products.other_amount + products.equipment_cost + products.labour_amount + products.material_cost + products.waste_amount),
products.amount = (products.quantity * products.sub_total)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `material cost(del)` AFTER DELETE ON `product_materials` FOR EACH ROW UPDATE products SET products.material_cost = (SELECT SUM(product_materials.amount) FROM product_materials, products WHERE products.id = product_materials.product_id)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `material cost(ins)` AFTER INSERT ON `product_materials` FOR EACH ROW UPDATE products SET products.material_cost = (SELECT SUM(product_materials.amount) FROM product_materials, products WHERE products.id = product_materials.product_id)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `material cost(upd)` AFTER UPDATE ON `product_materials` FOR EACH ROW UPDATE products SET products.material_cost = (SELECT SUM(product_materials.amount) FROM product_materials, products WHERE products.id = product_materials.product_id)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `material item(del)` AFTER DELETE ON `product_materials` FOR EACH ROW UPDATE products SET material_items = (SELECT COUNT(*) FROM product_materials, products WHERE products.id = product_materials.product_id)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `material item(ins)` AFTER INSERT ON `product_materials` FOR EACH ROW UPDATE products SET material_items = (SELECT COUNT(*) FROM product_materials, products WHERE products.id = product_materials.product_id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'admin', 'admin@site.com', '$2y$10$mrF5oK4Tvh3pwoehVb5tF.jB9eaHa3ewNK0GqvIFaFxxdP5eXZDc.'),
(2, 'abhi', 'abhi@site.com', '$2y$10$o248JM049m7Y1R4hbNm0KeVGaJJ2LoRUbHINIRWsaYtfPYopjOSvu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_materials`
--
ALTER TABLE `product_materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product_materials`
--
ALTER TABLE `product_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
